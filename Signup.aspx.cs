using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Signup : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Page.IsPostBack)
        {
            //if (User.Identity.IsAuthenticated)
            //{
            var CreateUserWizardSt = CreateUserWizard1.FindControl("CreateUserWizardStep1") as CreateUserWizardStep;
            if (CreateUserWizardSt != null)
            {
                TextBox txtUserName = UtilsCLS.FindControlRecursive(CreateUserWizardSt, "UserName") as TextBox;
                if (txtUserName != null)
                {
                    Page.SetFocus(txtUserName);                    
                }
                TextBox txtinterest = UtilsCLS.FindControlRecursive(CreateUserWizardSt, "txtInterests") as TextBox;
                if (txtinterest != null)
                {
                    LiteralControl input = UtilsCLS.FindControlRecursive(aspnetForm,"controlInitialValue") as LiteralControl;
                    if (input != null)
                    {
                        input.Text = txtinterest.Text;
                    }
                }
                
                /* CreateUserWizard1___CustomNav0_StepNextButtonButton
                var btnLogin = login1.FindControl("btnLogin");
                if (btnLogin != null)
                {
                    Page.Form.DefaultButton = btnLogin.UniqueID;
                }*/
            }
            
            
        }

    }
    protected void CreateUserWizard1_CreatedUser(object sender, EventArgs e)
    {

    }
}