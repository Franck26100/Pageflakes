using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Linq;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Profile;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Workflow.Runtime;

using Pageflakes.WebUtil;
using Pageflakes.Facade;
using Pageflakes.Model;
using Pageflakes.Facade.Context;
using Pageflakes.Utils;
using Pageflakes.WebFramework;
using OmarALZabir.AspectF;



public partial class _Default : BasePage
{
    private UserSetup _Setup
    {
        get { return Context.Items[typeof(UserSetup)] as UserSetup; }
        set { Context.Items[typeof(UserSetup)] = value; }
    }
    protected override void OnInit(EventArgs e)
    {
        base.OnInit(e);

        AspectF.Define
            .Log(Services.Get<ILogger>(), "OnInit: " + Profile.UserName)
            .Retry(errors => errors.ToArray().Each(x => ErrorOnPage.InnerText += x.ToString()), Services.Get<ILogger>())
            .Do(() =>
            {

                // Check if revisit is valid or not
                if (!base.IsPostBack)
                {
                    // Block cookie less visit attempts
                    if (Profile.IsFirstVisit)
                    {
                        if (!ActionValidator.IsValid(ActionValidator.ActionTypeEnum.FirstVisit)) Response.End();
                    }
                    else
                    {
                        if (!ActionValidator.IsValid(ActionValidator.ActionTypeEnum.Revisit)) Response.End();
                    }
                }
                else
                {
                    // Limit number of postbacks
                    if (!ActionValidator.IsValid(ActionValidator.ActionTypeEnum.Postback)) Response.End();
                }
            });
    }
    protected override void CreateChildControls()
    {
        var me = this;

        AspectF.Define
            .Log(Services.Get<ILogger>(), "User visit: " + Profile.UserName)
            .Retry(2000, x => ErrorOnPage.InnerText += x.ToString() + Environment.NewLine, Services.Get<ILogger>())
            .Do(() =>
            {
                me.CallBaseCreateChildControl();
                me.LoadUserPageSetup(false);
            }
        );
    }
    private void LoadUserPageSetup(bool noCache)
    {
        // If URL has the page title, load that page by default
        string pageTitle = (Request.Url.Query ?? Resources.SharedResources.NewTabTitle).TrimStart('?');

        var facade = Services.Get<Facade>();
        if (Profile.IsAnonymous)
        {
            //Context.Session["currentuser"] = "u=" + Profile.UserName; //HttpContext.Current.Session.SessionID.ToString();
            //Context.Session["TimeSpamp"] = "r=" + DateTime.Now.Ticks.ToString();
            if (Profile.IsFirstVisit)
            {
                // First visit
                Profile.IsFirstVisit = false;
                Profile.Save();
                _Setup = facade.FirstVisitHomeTab(Profile.UserName, pageTitle, true, Profile.IsFirstVisitAfterLogin);
            }
            else
            {
                _Setup = facade.RepeatVisitHomeTab(Profile.UserName, pageTitle, true, Profile.IsFirstVisitAfterLogin);
            }
            Context.Session["currentuser"] = "u=" + facade.Context.CurrentUserName; //HttpContext.Current.Session.SessionID.ToString();
            Context.Session["TimeSpamp"] = "r=" + DateTime.Now.Ticks.ToString();
        }
        else
        {
            _Setup = facade.RepeatVisitHomeTab(Profile.UserName, pageTitle, false, Profile.IsFirstVisitAfterLogin);

            // OMAR: If user's cookie remained in browser but the database was changed, there will be no pages. So, we need
            // to recrate the pages
            if (_Setup == null || _Setup.UserTabs == null || _Setup.UserTabs.Count() == 0)
            {
                _Setup = facade.FirstVisitHomeTab(Profile.UserName, pageTitle, true, Profile.IsFirstVisitAfterLogin);
            }
            Context.Session["currentuser"] = "u=" + HttpContext.Current.Session.SessionID.ToString();
            Context.Session["TimeSpamp"] = "r=" + HttpContext.Current.Request.LogonUserIdentity.User.Value;

        }

        //save the profile to keep LastActivityAt updated
        Profile.LastActivityAt = DateTime.Now;
        Profile.IsFirstVisitAfterLogin = false;
        Profile.Save();
    }   
    private void OnReloadPage(object sender, EventArgs e)
    {
        this.ReloadCurrentPage();
    }
    protected override void OnPreRender(EventArgs e)
    {
        base.OnPreRender(e);

        if (ErrorOnPage.InnerText.Length > 0)
            ErrorOnPage.Visible = true;
    }
    private void CallBaseCreateChildControl()
    {
        base.CreateChildControls();
    }
    private void ReloadCurrentPage()
    {
        this.LoadUserPageSetup(false);
        //this.SetupTabs();
        //this.WidgetTabHost.LoadWidgets(_Setup.CurrentTab, WIDGET_CONTAINER_CONTROL);
    }
    protected void Page_Load(object sender, EventArgs e)
    {
        /*
        var facade = Services.Get<Facade>();
        ScriptReference SRef = new ScriptReference();
        ServiceReference ServRef = new ServiceReference();
        ScriptReference sjson = new ScriptReference();
        ServRef.Path = "CoreServices.asmx";
        SRef.Path = "/script/Framework.js";
        sjson.Path = "GetJSON2.ashx?r=" + facade.Context.CurrentUserName;
        */

    }
}