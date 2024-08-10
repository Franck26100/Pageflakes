<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Web;
using Pageflakes.ObjectModel;
using Pageflakes.Facade;
using Pageflakes.Utils;
using Pageflakes.Facade.Context;
using System.Web.Script.Serialization;
using System.Text;
using System.Text.RegularExpressions;

public class Handler : IHttpHandler {

    static Regex guidRegEx = new Regex("^[A-Fa-f0-9]{32}$|" +
                        "^({|\\()?[A-Fa-f0-9]{8}-([A-Fa-f0-9]{4}-){3}[A-Fa-f0-9]{12}(}|\\))?$|" +
                        "^({)?[0xA-Fa-f0-9]{3,10}(, {0,1}[0xA-Fa-f0-9]{3,6}){2}, {0,1}({)([0xA-Fa-f0-9]{3,4}, {0,1}){7}[0xA-Fa-f0-9]{3,4}(}})$", RegexOptions.Compiled);
    public void ProcessRequest(HttpContext context)
    {
        var serialiazer = new JavaScriptSerializer(new Pageflakes.Util.MyTypeResolver());
        
        TimeSpan ts = new TimeSpan(0, 0, 0);
        context.Response.Cache.SetMaxAge(ts);
        context.Response.Cache.SetNoStore();
        context.Response.Cache.SetCacheability(HttpCacheability.Private);
        context.Response.Cache.AppendCacheExtension("must-revalidate, proxy-revalidate");
        context.Response.AddHeader("Connection", "Keep-Alive");
        //context.Response.AddHeader("Content-Type", "text/html");
        var facade = Services.Get<Facade>();
        string url = context.Request.QueryString.ToString();
        string user = facade.Context.CurrentUserName;
        if (context.Request["s"] == "SetCurrentPage")
        {

            context.Response.Redirect("~/GetJSON2.ashx?r=" + user); 
        }

    }
    public bool IsReusable
    {
        get
        {
            return false;
        }
    }


}