using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Security;
using System.Web.Security;

public partial class Login : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Page.IsPostBack)
        {
            if (Request.QueryString["track"] == "header")
            {
                this.returnUrlFromLogin.Value = FormsAuthentication.GetRedirectUrl(LoginWizard_EmailField.Text, LoginWizard_RememberMe.Checked);
            }
        }

    }
    
    protected void LoginButton_Click(object sender, CommandEventArgs e)
    {
        /*
        if (Membership.ValidateUser(LoginWizard_EmailField.Text, LoginWizard_PasswordField.Text))
        {
            var profile = Profile.GetProfile(LoginWizard_EmailField.Text);
            profile.IsFirstVisitAfterLogin = true;
            profile.Save();
            //FormsAuthentication.RedirectFromLoginPage(LoginWizard_EmailField.Text, LoginWizard_RememberMe.Checked);
            FormsAuthentication.SetAuthCookie(LoginWizard_EmailField.Text, LoginWizard_RememberMe.Checked);
            Response.Redirect("/Default.aspx");
        }
        else
        {
            ErrorMsgLogin.Visible = true;
        }
         * */
        if (e.CommandName != null)
        {
            if (e.CommandName == "Login")
            {
                if (Request.QueryString["track"] == "header")
                {
                    FormsAuthentication.RedirectFromLoginPage(LoginWizard_EmailField.Text, LoginWizard_RememberMe.Checked);
                }
                else
                {
                    FormsAuthentication.GetRedirectUrl(LoginWizard_EmailField.Text, LoginWizard_RememberMe.Checked);
                }
            }
        }
    }
}