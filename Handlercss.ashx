<%@ WebHandler Language="C#" Class="Handlercss" %>

using System;
using System.Web;

public class Handlercss : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        context.Response.Write("Hello World");
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}