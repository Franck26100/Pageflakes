<%@ WebHandler Language="C#" Class="ImageHandler" %>

using System;
using System.IO;
using System.Web;
using PersonalWebSite.ImageManagement;
public class ImageHandler : IHttpHandler {

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "image.jpeg";
        context.Response.Cache.SetCacheability(HttpCacheability.Public);
        context.Response.BufferOutput = false;
        PhotoSize size;
        switch (context.Request.QueryString["Size"])
        {
            case "S":
                size = PhotoSize.Small;
                break;
            case "M":
                size = PhotoSize.Medium;
                break;
            case "L":
                size = PhotoSize.Large;
                break;
            default:
                size = PhotoSize.Original;
                break;
        }
        Stream stream = null;
        if (context.Request.QueryString["ImageLocation"] != null && context.Request.QueryString["ImageLocation"] != "")
        {
            string path = Convert.ToString(context.Request.QueryString["ImageLocation"]);
            string currPath = ImageManager.GetImage(path);
            if (currPath == null | currPath == "")
            {
                stream = ImageManager.GetImage(size);
            }
            else
            {
                stream = new FileStream(currPath, FileMode.Open, FileAccess.Read, FileShare.Read);
                stream = ImageManager.ResizeImageFile(stream, size);
                if (stream == null)
                {
                    stream = ImageManager.GetImage(size);
                }
            }
        }
        else
        {
            stream = ImageManager.GetImage(size);
        }
        if (stream == null) stream = ImageManager.GetImage(size);
        const int buffersize = 1024 * 16;
        byte[] buffer = new byte[buffersize];
        int count = stream.Read(buffer, 0, buffersize);
        while (count > 0)
        {
            context.Response.OutputStream.Write(buffer, 0, count);
            count = stream.Read(buffer, 0, buffersize);
        }

    }

    public bool IsReusable
    {
        get
        {
            return true;
        }
    }

}