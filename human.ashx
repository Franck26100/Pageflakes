<%@ WebHandler Language="C#" Class="human" %>

using System;
using System.Web;
using System.Text.RegularExpressions;
using System.Text;
using System.Collections.Generic;

public class human : IHttpHandler {
          
    
        public void ProcessRequest(HttpContext context)
    {
        string action = (context.Request.QueryString["action"] ?? "").ToUpperInvariant();

        context.Response.ContentType = "application/javascript";
        context.Response.Cache.SetCacheability(HttpCacheability.NoCache);

        switch (action)
        {
            case "WW_STEP_2":
                // ww.js attend ce flag
                context.Response.Write("window.humanIdentifier_WW_STEP_2 = true;");
                break;
            case "WW_STEP_3":
                context.Response.Write("window.humanIdentifier_WW_STEP_3 = true;");
                break;
            case "WW_JUST_LET_ME_IN":
                // ww.js attend ce flag
                context.Response.Write("window.humanIdentifier_WW_JUST_LET_ME_IN = true;");
                break;
            case "WW_FINISH":
                context.Response.Write("window.humanIdentifier_WW_FINISH = true;");
                break;                
            default:
                // Défense: toujours renvoyer quelque chose
                context.Response.Write("window.humanIdentifier_UNKNOWN = true;");
                break;
        }
    }

    public bool IsReusable
    {
        get { return true; }
    }

}