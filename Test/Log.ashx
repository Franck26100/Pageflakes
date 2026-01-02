<%@ WebHandler Language="C#" Class="Log" %>

using System;
using System.Web;

public class Log : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        context.Response.Write("");
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}