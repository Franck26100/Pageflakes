using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;

namespace Pageflakes
{
    public partial class DefaultDevFinal :Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
           /* if (!IsPostBack)
            {
                // Charger le contenu historique (ancien ww.html)
               /* StartPageMarkup.Text = System.IO.File.ReadAllText(
                    Server.MapPath("~/ww/ww.html")
                );*/
                // Vérification de l'état utilisateur
               /* if (Context.User.IsFirstVisit) // (!Context.User.Identity.IsAuthenticated)
                {
                    // Injecter StartPage.aspx dans le popup
                    string startPageHtml;
                    string wwPagehtml;
                    var popUpCph = Master.FindControl("PopUp_Page") as ContentPlaceHolder;
                    if (popUpCph == null)
                    {
                        // Défense: log ou throw selon ta politique
                        return;
                    }
                    using (var sw = new StringWriter())

                    //ContentPlaceHolder cph = (ContentPlaceHolder)MasterPageFinal_Dev.FindControl("MainContent");
                    {
                        Server.Execute("~/StartPage3_Dev.aspx", sw);
                        startPageHtml = sw.ToString();
                        popUpCph.Controls.Add(new LiteralControl(startPageHtml));
                       /* Server.Execute("~/ww/ww.html", sw);
                        wwPagehtml = sw.ToString();
                        popUpCph.Controls.Add(new LiteralControl(wwPagehtml));*/
                   /* }
                    
                }
                else
                {
                    // Utilisateur connecté → charger directement la page
                    ClientScript.RegisterStartupScript(
                        this.GetType(),
                        "LoadUserPage",
                        "loadFirstPage();",
                        true
                    );
                }

            }*/
        }
    }
}
