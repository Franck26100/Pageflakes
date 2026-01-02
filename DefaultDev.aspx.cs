using System;
using System.IO;
using System.Web;
using System.Web.UI;

namespace Pageflakes
{
    public partial class DefaultDev : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                // Vérification de l'état utilisateur
                if (!Context.User.Identity.IsAuthenticated)
                {
                    // Injecter StartPage.aspx dans le popup
                    string startPageHtml;
                    using (var sw = new StringWriter())
                    {
                        Server.Execute("~/StartPage.aspx", sw);
                        startPageHtml = sw.ToString();
                    }
                    StartPageContent.Controls.Add(new LiteralControl(startPageHtml));
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

            }
        }
    }
}
