using System;
using System.Web;
using System.Web.Script.Serialization;
using Pageflakes.ObjectModel;
using Pageflakes.Data;
using System.Collections.Generic;
using System.Linq;

//namespace Pageflakes.Handlers
//{
    public class GetJSON : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            var info = StartupBuilder(context);

            //string json = JsonConvert.SerializeObject(info);
            var serializer = new JavaScriptSerializer();
            string json = serializer.Serialize(info);
            //context.Response.ContentType = "application/json";
            //context.Response.Write(json);
            HttpContext.Current.Response.ContentType = "application/javascript";
            HttpContext.Current.Response.Write(";(function(){ window.__json = true; window.startupInfo= (");
            HttpContext.Current.Response.Write(json);
            HttpContext.Current.Response.Write("); window.__preCachedRSS = null; })();");
        }

        public bool IsReusable { get { return true; } }

       /* private PageflakeInfo StartupBuilder()
        {
            // On va le remplir juste après
            return new PageflakeInfo();
        }*/
      private PageflakeInfo StartupBuilder(HttpContext context)
{
    // ---------------------------------------------------------
    // 1) Créer PageflakeInfo en premier
    // ---------------------------------------------------------
    var info = new PageflakeInfo();

    // ---------------------------------------------------------
    // 2) Déterminer si l'utilisateur est nouveau via cookie GUID
    // ---------------------------------------------------------
    string guid = null;
    var cookie = context.Request.Cookies["PFUserGUID"];
    if (cookie != null)
        guid = cookie.Value;

    bool isNewUser = false;

    if (string.IsNullOrEmpty(guid))
    {
        guid = Guid.NewGuid().ToString();
        context.Response.Cookies.Add(new HttpCookie("PFUserGUID", guid));
        isNewUser = true; // 🔥 NOUVEL UTILISATEUR
    }

    // Le GUID devient l'identifiant utilisateur stable
    info.UserGUID = guid;

    // ---------------------------------------------------------
    // 3) Charger l'utilisateur (MyRepository)
    // ---------------------------------------------------------
    var user = MyRepository.Get();

    // ---------------------------------------------------------
    // 4) Charger les pages associées à CE GUID
    // ---------------------------------------------------------
    var pageIds = ProfileStartUpRepository.GetPagesForUser(guid);
    var pages = new List<pageSetting>();

    // ---------------------------------------------------------
    // 5) Cas : nouvel utilisateur OU aucun historique de pages
    // ---------------------------------------------------------
    if (isNewUser || pageIds.Count == 0)
    {
        var newPage = PageRepository.CreateDefaultPage();
        ProfileStartUpRepository.AddPageForUser(guid, newPage.ID);

        pages.Add(newPage);

        // Mise à jour du profil utilisateur
        user.Profile.CurrentPageID = newPage.ID;
        user.Profile.PageOrder = newPage.ID.ToString();
    }
    else
    {
        // ---------------------------------------------------------
        // 6) Cas : utilisateur déjà venu → reconstruire ses pages
        // ---------------------------------------------------------
        foreach (var id in pageIds)
        {
            var page = PageRepository.GetPage(id);
            if (page != null)
                pages.Add(page);
        }

        // Si CurrentPageID n'est pas dans la liste → prendre la première
        if (!pages.Any(p => p.ID == user.Profile.CurrentPageID))
        {
            user.Profile.CurrentPageID = pages[0].ID;
        }

        // Re-synchroniser PageOrder
        user.Profile.PageOrder = string.Join(",", pageIds);
    }

    // ---------------------------------------------------------
    // 7) Sauvegarder le profil utilisateur mis à jour
    // ---------------------------------------------------------
    MyRepository.Save(user);

    // ---------------------------------------------------------
    // 8) Charger la page courante
    // ---------------------------------------------------------
    var currentPage = PageRepository.GetPage(user.Profile.CurrentPageID);

    // ---------------------------------------------------------
    // 9) Remplir PageflakeInfo
    // ---------------------------------------------------------
    info.VersionSuffix = "213en";
    info.Language = user.Profile.Language;
    info.DomainID = 1;
    info.LanguageID = 1;

    info.Template = TemplateRepository.GetDefaultTemplate();

    info.UserUniqueName = user.UniqueName;
    info.UserFullName = (user.FirstName + " " + user.LastName).Trim();
    info.UserVersionNo = 1;

    info.CurrentPageID = user.Profile.CurrentPageID;
    info.CurrentPageVersionNo = currentPage.VersionNo;
    info.CurrentPageTheme = currentPage.Theme;

    info.Pages = pages;
    info.IsCurrentPageLoaded = true;

    info.SearchEngine = 0;
    info.ShowSearchBar = true;

    info.IsAnonymous = !user.Profile.IsRealUser;
    info.IsMySite = true;
    info.IsFirstVisit = !user.Profile.WelcomeWizardCompleted;
    info.ShowWelcomeWizard = !user.Profile.WelcomeWizardCompleted;

    info.ErrorMsg = null;
    info.My = user;

    return info;
}











    }
//}
