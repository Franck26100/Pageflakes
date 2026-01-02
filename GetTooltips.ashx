<%@ WebHandler Language="C#" Class="GetTooltips" %>

using System;
using System.Web;

public class GetTooltips : IHttpHandler
{
    public void ProcessRequest(HttpContext context)
    {
        // Récupère le paramètre "language" dans l'URL
        string lang = context.Request["language"];

        context.Response.ContentType = "application/json";

        if (lang == "fr")
        {
            context.Response.Write("{\"Tooltip\":\"Ceci est une info-bulle en français\"}");
        }
        else if (lang == "en")
        {
            context.Response.Write("{\"Tooltip\":\"This is a tooltip in English\"}");
        }
        else
        {
            context.Response.Write("{\"Tooltip\":\"Langue non supportée\"}");
        }
    }

    public bool IsReusable { get { return true; } }
}
