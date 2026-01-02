using System;
using System.IO;
using System.Web;
namespace Pageflakes.Handlers{
    

public class Log : IHttpHandler
{
    public void ProcessRequest(HttpContext context)
    {
        HttpResponse response = context.Response;
        response.Cache.SetCacheability(HttpCacheability.NoCache);

        string action = context.Request.QueryString["a"];   // ex: a=login, a=logout, a=error
        string message = context.Request.QueryString["m"];  // ex: m=texte du log
        string user = context.Request.QueryString["u"];     // ex: u=franckMdeRomans

        try
        {
            // Exemple : écrire dans un fichier log
            string logPath = context.Server.MapPath("~/App_Data/Pageflakes.log");
            string line = DateTime.Now.ToString("u") + " | " + (user ?? "anonymous") + " | " + (action ?? "none") + " | " + (message ?? "");
            File.AppendAllText(logPath, line + Environment.NewLine);

            // Retour côté client : petit script JS
            response.ContentType = "application/javascript";
            response.Write(";(function(){ window.logStatus='ok'; window.lastLog='" + HttpUtility.JavaScriptStringEncode(line) + "'; })();");
        }
        catch (Exception ex)
        {
            response.ContentType = "application/javascript";
            response.Write(";(function(){ window.logStatus='error'; window.logMessage='" + HttpUtility.JavaScriptStringEncode(ex.Message) + "'; })();");
        }
    }

    public bool IsReusable { get { return true; } }
}
}