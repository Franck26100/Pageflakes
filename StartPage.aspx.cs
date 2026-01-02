using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
namespace Pageflakes
{
    public partial class StartPage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {

                // Lancer l'initialisation côté client
                ClientScript.RegisterStartupScript(
                    this.GetType(),
                    "InitStartPage",
                    "StartPage.init();",
                    true
                );
            }
        }
    }
}