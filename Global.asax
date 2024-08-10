<%@ Application Language="C#" %>
<%@ Import Namespace="Pageflakes.Facade.Context" %>

<script runat="server">

    const string APPLICATION_WORKFLOW_RUNTIME_KEY = "GlobalSynchronousWorkflowRuntime";

    void Application_Start(object sender, EventArgs e)
    {
        Pageflakes.Facade.Facade.BootStrap();

        Pageflakes.Utils.ConstantHelper.SetupCompleted = System.IO.File.Exists(Server.MapPath(Pageflakes.Utils.ConstantHelper.SETUP_COMPLETE_FILE));
    }

    void Application_End(object sender, EventArgs e)
    {
        Pageflakes.Utils.Services.Dispose();
    }
    void Session_Start(object sender, EventArgs e)
    {
       
    }
    
    protected void Application_BeginRequest(object sender, EventArgs e)
    {
        // Simulate internet latency on local browsing
        if (Request.IsLocal)
            System.Threading.Thread.Sleep(50);

        var request = Request;
        var url = request.Url;
        var applicationPath = request.ApplicationPath;

        string fullurl = url.ToString();
        string baseUrl = url.Scheme + "://" + url.Authority + applicationPath.TrimEnd('/') + '/';

        string currentRelativePath = request.AppRelativeCurrentExecutionFilePath;

        if (request.HttpMethod == "GET")
        {
            if (currentRelativePath.EndsWith(".aspx"))
            {
                // Make sure the setup was run before any .aspx page is hit. Without
                // the setup, the site might not work properly
                if (!Pageflakes.Utils.ConstantHelper.SetupCompleted)
                {
                    if (!fullurl.ToLower().Contains("/setup/"))
                    {
                        Response.Redirect("~/setup/default.aspx");
                    }
                }
                else
                {
                    Response.Filter = new Pageflakes.WebUtil.ScriptDeferFilter(baseUrl, Response);

                    // get the folder path from relative path. Eg ~/page.aspx returns empty. ~/folder/page.aspx returns folder/                    
                    var folderPath = currentRelativePath.Substring(2, currentRelativePath.LastIndexOf('/') - 1);

                    Response.Filter = new Pageflakes.WebUtil.StaticContentFilter(Response,
                        Pageflakes.Utils.ConstantHelper.ImagePrefix,
                        Pageflakes.Utils.ConstantHelper.ScriptPrefix,
                        Pageflakes.Utils.ConstantHelper.CssPrefix,
                        baseUrl,
                        applicationPath,
                        folderPath);
                    //Response.Redirect("~/handler.ashx?Default.aspx");
                }
            }            
        }
    }
    protected void Application_PreRequestHandlerExecute(object sender, EventArgs e)
    {
        var localPath = Request.Url.LocalPath;
        if (localPath.Contains(".ashx") 
            || localPath.Contains(".aspx") 
            //|| localPath.Contains(".axd")
            || localPath.Contains(".asmx")
            || localPath.Contains(".svc"))
        {
            // Register Facade and AppContext in HttpContext.Current.Items so that when 
            // Facade is resolved by Services.Get<>(), it returns this pre-configured facade
            if(localPath.Contains(".asmx"))
            {
                
            }
            var context = HttpContext.Current;
            context.Items[typeof(Pageflakes.Facade.Facade).FullName] = new Pageflakes.Facade.Facade(new AppContext(context, string.Empty, context.Profile.UserName));
            
            
        }
    }
    void Application_Error(object sender, EventArgs e)
    {
        // Code qui s'exécute lorsqu'une erreur non gérée se produit
        HttpCookie mycookie = new HttpCookie(Response.Cookies["ASP.NET_SessionId"].Name,Response.Cookies["ASP.NET_SessionId"].Value);
        Response.Cookies.Remove("ASP.NET_SessionId");
        mycookie.Path = "t=";
        

    }
    protected void Application_EndRequest(object sender, EventArgs e)
    {
        AppContext context = AppContext.GetContext(Context);
        if (null != context)
            context.Dispose();

        foreach (object obj in Context.Items)
        {
            if (obj is IDisposable)
            {
                (obj as IDisposable).Dispose();
            }
        }
    }
	
	
</script>
