using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Web.Services;
using System.Xml;
using System.Xml.Serialization;
using System.Text.RegularExpressions;
using System.Web.Services.Protocols;
using System.Web.Script.Services;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Data.SqlClient;
using System.Linq;
using System.Data;
using System.Globalization;
using HtmlAgilityPack;
using Pageflakes.Services; 
using Pageflakes.Data; 
using Pageflakes.Common;
using System.Web.Script.Serialization;
using Pageflakes.Utils;
using Pageflakes.Utilities;


namespace Pageflakes.ObjectModel
{
    /// <summary>
    /// Description résumée de CoreServices
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    // Pour autoriser l'appel de ce service Web depuis un script à l'aide d'ASP.NET AJAX, supprimez les marques de commentaire de la ligne suivante. 
    [System.Web.Script.Services.ScriptService]
    public class CoreServices : System.Web.Services.WebService
    {
        private const string ApiUrl = "http://api.ipinfodb.com/v2/ip_query.php?key={0}&ip={1}&timezone=false";
        public string MapHtmlFile(string url)
        {
            string connString = ConfigurationManager.ConnectionStrings["PageflakesConnectionString"].ConnectionString;
                    string sql = @"SELECT * FROM dbo.Module2 WHERE url = @url";
                    string html = "";
                    using (SqlConnection conn = new SqlConnection(connString)) 
                    using (SqlCommand cmd = new SqlCommand(sql, conn)) { 
                        cmd.Parameters.AddWithValue("@url", url); 
                        conn.Open();
                        using (SqlDataReader reader = cmd.ExecuteReader()) { 
                            if (reader.Read()) {                                              
                                html = reader.IsDBNull(reader.GetOrdinal("pageurl")) ? string.Empty : reader.GetString(reader.GetOrdinal("pageurl"));
                            }
                        }
                    }
                    //string physicalPath = Server.MapPath(html); // ex: "flakes/worldtimeclock.html" 
                    string htmlfile =  HttpContext.Current.Server.MapPath(html);
                    string loadedfile ="";
                        if(File.Exists(htmlfile))                        
                        {
                            
                            using(StreamReader readerHtml = new StreamReader(htmlfile))
                            {
                                loadedfile = readerHtml.ReadToEnd();
                            }
                        }
            return loadedfile;
        }
        public CoreServices()
        {

            //Supprimez les marques de commentaire dans la ligne suivante si vous utilisez des composants conçus 
            //InitializeComponent(); 
        }
        
        [WebMethod]
        public string AddReminder(string to, string from, string cc, string subject, string templateName, string[] templateParameters, string reminderTime, int timeZoneId)
        {
            try
            {
                // Ici tu pourrais insérer en base de données :
                // Table Reminders (Id GUID, To, From, CC, Subject, TemplateName, Parameters, ReminderTime, TimeZoneId)
                Guid reminderId = Guid.NewGuid();

                // Exemple simplifié : retour du GUID
                return reminderId.ToString();
            }
            catch (Exception ex)
            {
                // En cas d’erreur, tu peux renvoyer un GUID vide ou un message
                return "Error: " + ex.Message;
            }
        }
        // AddBookmark
        [WebMethod]
        public string AddBookmark(string title, string url)
        {
            try
            {
                // TODO: Persistance SQL (INSERT INTO Bookmarks ...)
                return string.Format("Bookmark added: Title='{title}', Url='{url}'");
            }
            catch (Exception ex)
            {
                return "Error: " + ex.Message;
            }
        }
        //Manque CanSendVerificationEmail

        //A Modifier ChangePassword
        [WebMethod]
        public void ChangePassword(string oldPassword, string newPassword)
        {
            try
            {
                // Exemple simplifié : en pratique tu vérifierais l'ancien mot de passe
                // dans ta base de données, puis mettrais à jour avec le nouveau.
                // Exemple :
                // if (!ValidateOldPassword(UserId, oldPassword)) throw new Exception("Invalid old password");
                // UpdatePassword(UserId, newPassword);

                // Ici, rien n'est retourné car la réponse SOAP est vide.
            }
            catch (Exception ex)
            {
                // Tu peux lever une SoapException pour signaler une erreur au client
                throw new SoapException("Error changing password: " + ex.Message,
                                        SoapException.ClientFaultCode);
            }
        }
        // CreateNewModule
        // CreateNewModule
        [WebMethod]
        [ScriptMethod(UseHttpGet=true)]
        public Module2 CreateNewModule(string title, string url, int pageID, int row, int col)
        {
            var doc = new XmlDocument();
            int CurrID = Pageflakes.Utilities.ModuleIdGenerator.GenerateModuleId();
            string FlakesID= "m" + CurrID.ToString();
            string htmlFile = MapHtmlFile(url);
            try{
                var flake = new Pageflakes.Services.Flake { 
                    internalId = CurrID, 
                    pageId = pageID, 
                    col = col, 
                    row = row, 
                    title = title, 
                    url = url // ou autre champ selon ton Flake.cs 
                }; 
                Pageflakes.Data.FlakeRepository.AddFlake(flake);
                var part = ModuleParser.ParseModuleHtml(FlakesID, url, htmlFile); 
                //part.id = CurrID; // IMPORTANT : ID interne INT 
                //part.PageID = pageID; 
                Pageflakes.Data.PagePartRepository.Add(part);
                return new Module2{
                    pageID = pageID,
                    row = row,
                    col = col,
                    title = title,
                    internalID = CurrID,
                    id = "m" + CurrID.ToString(),
                    url = url,
                    expanded = true,
                    Permission = new permission{CanEdit = true,CanClose = true,CanCollapse = true,CanDrag = true}
                    ,Parts = ModuleParser.ParseModuleHtml(FlakesID,url,htmlFile),
                    PrivateProfiles = new string[][]{},
                    PublicProfiles = new string[][]{},
                    ProtectedProfiles = new string[][]{},
                    Profiles = new string[][]{}                                                                                                           
                };                          
            }
            catch (Exception ex){
                return new Module2{
                    pageID = pageID,
                    row = row,
                    col = col,
                    title = "Error",                            
                    Parts = new PageParts{
                        scripts = new List<ScriptTag>{
                            new ScriptTag{id="error",src ="N/A", content = null}
                            ,new ScriptTag{id="m" + CurrID.ToString(),src = "N/A", content = "N/A"}
                        },styles = new List<Pageflakes.ObjectModel.StyleTag>{
                            new Pageflakes.ObjectModel.StyleTag{
                                href = "/f.axd?s=CommonFlakeCSS&t=c&v=217",
                                id="CommonFlakeCSS",
                                content =""
                            }
                        },body = ex.ToString(),
                        id = "m" + CurrID.ToString(),
                        title = title,
                        url ="N/A",// doit ajouter URL
                        icon ="images/pficon.gif",// doit ajouter icon
                                //importUrl = "", // ajouter import
                               // exportUrl = "", // ajouter export
                                //xslUrl ="",//dois ajouter si necessaire
                                
                        texts = new string[]{}
                    }
                };      
            }    
        }   
        // CreateNewPage
        [WebMethod]
        public pageSetting CreateNewPage(string title, int index)
{
    // Récupérer le thème de la page précédente
    var my = MyRepository.Get();
    PageTheme2 inheritedTheme = new PageTheme2();

    if (my.Profile.CurrentPageID > 0)
    {
        var previousPage = PageRepository.GetPage(my.Profile.CurrentPageID);
        if (previousPage != null && previousPage.Theme != null)
            inheritedTheme = ThemeUtils.CleanTheme(previousPage.Theme);
    }

    // IMPORTANT : on ne génère PAS d’ID positif ici
    // Le Framework garde son ID négatif
    var page = new pageSetting
    {
        ID = -1, // placeholder, remplacé par SavePage()
        Name = title,
        OrderNo = index,
        ColumnCount = 3,
        ColumnSizes = "33%,33%,33%",
        Theme = inheritedTheme,
        Modules = new List<Module>(),
        PageParts = new List<PageParts>()
    };

    // NE PAS SAUVEGARDER
    // NE PAS TOUCHER AU PROFIL

    return page;
}


        /*
        // ChangeTheme
        [WebMethod]
        public ThemeResult ChangeTheme(string name)
        {
            try
            {
                return new ThemeResult
                {
                    ModuleHtml = string.Format("<div class='theme-module'>Theme applied: {name}</div>"),
                    StylesheetHref = string.Format("/themes/{name}/style.css"),
                    PopupHtml = string.Format("<div class='popup'>Theme {name} applied successfully</div>"),
                    ThemePath = string.Format("/themes/{name}/")
                };
            }
            catch (Exception ex)
            {
                return new ThemeResult
                {
                    ModuleHtml = string.Format("<div class='error'>Error: {ex.Message}</div>"),
                    StylesheetHref = string.Empty,
                    PopupHtml = string.Empty,
                    ThemePath = string.Empty
                };
            }
        }
        */
        // A Modifier Pour Appel BD
        [WebMethod]
        public string DeleteAllBookmark()
        {
            try
            {
                // Ici tu pourrais exécuter une commande SQL du type :
                // DELETE FROM Bookmarks WHERE UserId = @UserId

                // Exemple simplifié : confirmation
                return "All bookmarks deleted successfully";
            }
            catch (Exception ex)
            {
                return "Error: " + ex.Message;
            }
        }
        [WebMethod]
        public string DeleteBookmark(int bookmarkId)
        {
            try
            {
                // Ici tu pourrais exécuter une commande SQL du type :
                // DELETE FROM Bookmarks WHERE Id = @bookmarkId AND UserId = @UserId

                // Exemple simplifié : confirmation
                return string.Format("Bookmark with ID {bookmarkId} deleted successfully");
            }
            catch (Exception ex)
            {
                return "Error: " + ex.Message;
            }
        }
        [WebMethod]
        public void ErrorReports(string[] errors, string[] logs)
        {
            try
            {
                // Exemple fonctionnel : écrire les erreurs et logs dans un fichier
                string path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "ErrorReports.log");
                using (StreamWriter writer = new StreamWriter(path, true))
                {
                    writer.WriteLine("=== Error Report === " + DateTime.Now);

                    if (errors != null)
                    {
                        writer.WriteLine("Errors:");
                        foreach (var err in errors)
                            writer.WriteLine(" - " + err);
                    }

                    if (logs != null)
                    {
                        writer.WriteLine("Logs:");
                        foreach (var log in logs)
                            writer.WriteLine(" - " + log);
                    }

                    writer.WriteLine();
                }

                // Pas de retour attendu : la réponse SOAP est vide
            }
            catch (Exception ex)
            {
                // En cas d’erreur, lever une SoapException pour que le client soit informé
                throw new SoapException("Error while processing reports: " + ex.Message,
                                        SoapException.ServerFaultCode);
            }
        }
        [WebMethod]
        public Pageflakes.Services.GetAddFeedPopupResult GetAddFeedPopup(string version)
        {
            try
            {
                // Exemple fonctionnel : construire un popup avec scripts/styles
                return new Pageflakes.Services.GetAddFeedPopupResult
                {
                    scripts = new List<ScriptTag>
                    {
                        new ScriptTag { id = "script1", src = "/scripts/feed.js", content = "console.log('Feed popup loaded');" },
                        new ScriptTag { id = "script2", src = "/scripts/utils.js", content = "console.log('Utils loaded');" }
                    },
                    styles = new List<StyleTag>
                    {
                        new StyleTag { id = "style1", href = "/styles/feed.css", content = ".popup { background:#fff; }" },
                        new StyleTag { id = "style2", href = "/styles/theme.css", content = "body { font-family:Arial; }" }
                    },
                    body = string.Format("<div class='popup'>Add Feed Popup - Version {version}</div>"),
                    id = Guid.NewGuid().ToString(),
                    title = "Add Feed",
                    url = "/feeds/add",
                    icon = "/images/feed-icon.png",
                    texts = "<schema>...</schema><xml>...</xml>"
                };
            }
            catch (Exception ex)
            {
                return new Pageflakes.Services.GetAddFeedPopupResult
                {
                    scripts = new List<ScriptTag>(),
                    styles = new List<StyleTag>(),
                    body = "Error: " + ex.Message,
                    id = string.Empty,
                    title = "Error",
                    url = string.Empty,
                    icon = string.Empty,
                    texts = string.Empty
                };
            }
        }
        [WebMethod]
        public string GetAllBookmarksHtml()
        {
            try
            {
                // Définir une classe simple pour représenter un bookmark
                var bookmarks = new List<Pageflakes.Services.Bookmark>
                {
                    new Pageflakes.Services.Bookmark { Title = "Pageflakes", Url = "http://www.Pageflakes.com" },
                    new Pageflakes.Services.Bookmark { Title = "Microsoft", Url = "http://www.microsoft.com" },
                    new Pageflakes.Services.Bookmark { Title = "Copilot", Url = "http://copilot.microsoft.com" }
                };

                var sb = new StringBuilder();
                sb.Append("<ul class='bookmarks'>");
                foreach (Pageflakes.Services.Bookmark bm in bookmarks)
                {
                    sb.AppendFormat("<li><a href='{0}' target='_blank'>{1}</a></li>", bm.Url, bm.Title);
                }
                sb.Append("</ul>");

                return sb.ToString();
            }
            catch (Exception ex)
            {
                // Utiliser string.Format au lieu de l’interpolation
                return string.Format("<div class='error'>Error retrieving bookmarks: {0}</div>", ex.Message);
            }
        }
        [WebMethod]
        public string GetFlakesGrid(string version, bool loadAllFlakes)
        {
            try
            {
                // Exemple fonctionnel : construire une grille HTML des flakes
                var sb = new StringBuilder();
                sb.Append("<div class='flakes-grid'>");
                sb.AppendFormat("<p>Version: {0}</p>", version);
                sb.AppendFormat("<p>Load all flakes: {0}</p>", loadAllFlakes);

                // Simuler quelques flakes
                sb.Append("<ul>");
                sb.Append("<li>Flake 1 - Weather</li>");
                sb.Append("<li>Flake 2 - News</li>");
                sb.Append("<li>Flake 3 - Stocks</li>");
                if (loadAllFlakes)
                {
                    sb.Append("<li>Flake 4 - Calendar</li>");
                    sb.Append("<li>Flake 5 - Email</li>");
                }
                sb.Append("</ul>");

                sb.Append("</div>");

                return sb.ToString();
            }
            catch (Exception ex)
            {
                return string.Format("<div class='error'>Error building flakes grid: {ex.Message}</div>");
            }
        }
        [WebMethod]
        [ScriptMethod(UseHttpGet = true)]
        public string GetWWHtml()
        {
            try
            {
                // Chemin physique vers ww.html 
                string path = HttpContext.Current.Server.MapPath("~/ww/ww.html"); 
                // Lecture du fichier HTML 
                string html = File.ReadAllText(path); 
                // Renvoi du HTML brut au framework 
                return html;                
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }
                //GetLocationByIpAdress

  
           /*
            [WebMethod]
            [ScriptMethod(UseHttpGet = true)]
            public Pageflakes.ObjectModel.location GetLocationDetailByIPAddress()
            {
            var location = new Pageflakes.ObjectModel.location
            {
            City = "Unknown",
            RegionName = "",
            CountryName = "Unknown",
            TimeZone = 0,
            ZipCode = 0
            };

            try
            {
            using (var client = new WebClient())
            {
            client.Headers[HttpRequestHeader.UserAgent] = "Pageflakes/1.0";
            client.Encoding = Encoding.UTF8;

            // HTTP (pas TLS), compatible ASP.NET 4.5
            string json = client.DownloadString("http://ip-api.com/json/");
            var serializer = new JavaScriptSerializer();
            var data = serializer.Deserialize<Dictionary<string, object>>(json);

            string status = GetString(data, "status", "fail");
            if (!string.Equals(status, "success", StringComparison.OrdinalIgnoreCase))
            {
                // En cas d'échec ip-api renvoie "fail" et "message"
                System.Console.WriteLine("IP-API failure: " + GetString(data, "message", "unknown error"));
                return location; // garder valeurs par défaut
            }

            // Mapping des champs ip-api
            return new Pageflakes.ObjectModel.location
            {
                CountryName = GetString(data, "country", "Unknown"),
                RegionName       = GetString(data, "regionName", ""),
                City        = GetString(data, "city", "Unknown"),
                ZipCode     = GetInt32(data, "zip", 0),
                TimeZone    = GetInt32(data, "timezone", 0) // si ip-api renvoie un champ timezone
                // Latitude   = GetDouble(data, "lat", 0.0),
                // Longitude  = GetDouble(data, "lon", 0.0)
            };
                }
            }
            catch (Exception ex)
            {
            System.Console.WriteLine("Erreur GetLocationDetailByIPAddress: " + ex.Message);
            return location; // renvoyer valeurs par défaut en cas d'exception
            }
            }*/
            // Helpers robustes pour JavaScriptSerializer GetLocationByIPAddress()
        private static string GetString(Dictionary<string, object> data, string key, string defaultValue)
        {
            if (data == null || !data.ContainsKey(key) || data[key] == null)
                return defaultValue;

            object v = data[key];

            // En .NET 4.5, pas de pattern matching "is string s"
            if (v is string)
                return (string)v;

            return Convert.ToString(v, CultureInfo.InvariantCulture);
        }
        private static double GetDouble(Dictionary<string, object> data, string key, double defaultValue)
        {
            if (data == null || !data.ContainsKey(key) || data[key] == null)
                return defaultValue;

            object v = data[key];

            if (v is double) return (double)v;
            if (v is float) return (double)(float)v;
            if (v is decimal) return (double)(decimal)v;
            if (v is int) return (double)(int)v;
            if (v is long) return (double)(long)v;

            double parsed;
            if (double.TryParse(Convert.ToString(v, CultureInfo.InvariantCulture),
                                NumberStyles.Any,
                                CultureInfo.InvariantCulture,
                                out parsed))
            {
                return parsed;
            }

            return defaultValue;
        }
        private static int GetInt32(Dictionary<string, object> data, string key, int defaultValue)
        {
            if (data == null || !data.ContainsKey(key) || data[key] == null) return defaultValue;
            var v = data[key];

            if (v is int) return (int)v;
            if (v is long) return (int)(long)v; // prudence: cast
            if (v is double) return (int)(double)v;
            if (v is float) return (int)(float)v;
            if (v is decimal) return (int)(decimal)v;

            int parsed;
            if (int.TryParse(Convert.ToString(v, CultureInfo.InvariantCulture), NumberStyles.Integer, CultureInfo.InvariantCulture, out parsed))
                return parsed;

            return defaultValue;
        }
        // Fin Helper GetLocationByIPAddresse()


            /*
        [WebMethod]
        [ScriptMethod(UseHttpGet = true)]
        public Pageflakes.ObjectModel.location GetLocationDetailByIPAddress2()
        {
            Pageflakes.ObjectModel.location ipLoc = new Pageflakes.ObjectModel.location();
            string ipaddress;
            //HttpRequest Request = new HttpRequest();

            ipaddress = Context.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
            if (ipaddress == "" || ipaddress == null)
                ipaddress = Context.Request.ServerVariables["REMOTE_ADDR"];

            DataTable dt = GetLocation(ipaddress);

            if (dt != null)
            {
                if (dt.Rows.Count > 0)
                {
                    ipLoc.City = dt.Rows[0]["City"].ToString();
                    //ipLoc.RegionName = dt.Rows[0]["RegionName"].ToString();
                    //ipLoc.CountryName = dt.Rows[0]["CountryName"].ToString();
                   // ipLoc.CountryCode = dt.Rows[0]["CountryCode"].ToString();
                    //ipLoc.Longitude = (decimal)dt.Rows[0]["Longitude"];
                    //ipLoc.Latitude = (decimal)dt.Rows[0]["Latitude"];

                }
                else
                {

                }
            }
            return (Pageflakes.ObjectModel.location)ipLoc;
        }
            */
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<Pageflakes.ObjectModel.Module> GetModules(int pageId)
        {
            try
            {
                // Exemple fonctionnel : récupérer les Modules depuis une source (BDD, etc.)
                // Ici on simule avec une liste en mémoire
                var Modules = new List<Module>
                {
                    new Module
                    {
                        id = Guid.NewGuid().ToString(),
                        row = 0,
                        col = 0,
                        title = "Weather",
                        url = "http://10.0.0.1/Pageflakes/flakes",
                        internalID = 101,
                        pageID = pageId,
                        expanded = true,
                        Profiles = new string [][]{},
                        PrivateProfiles = new string[][]{},
                            ProtectedProfiles = new string[][]{},
                            PublicProfiles = new string[][]{}
                    },
                    new Module
                    {
                        id = Guid.NewGuid().ToString(),
                        row = 0,
                        col = 1,
                        title = "News",
                        url = "http://example.com/news",
                        internalID = 102,
                        pageID = pageId,
                        expanded = false,
                        Profiles =new string [][]{},
                        PrivateProfiles = new string[][]{},
                            ProtectedProfiles = new string[][]{},
                            PublicProfiles = new string[][]{}
                    }
                };

                return Modules;
            }
            catch (Exception ex)
            {
                // En cas d’erreur, renvoyer une liste vide ou lever une SoapException
                return new List<Module>();
            }
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet=true)]
        public PageParts GetPage(string id, string url)
        {
            string htmlFile = MapHtmlFile(url);
            PageParts parts = ModuleParser.ParseModuleHtml(id,url,htmlFile);    
                    
            return parts;
        }
        /*
        [WebMethod]
        [ScriptMethod(ResponseFormat= ResponseFormat.Json, UseHttpGet = true)]
        public List<Module> GetPageModules (int pageId)
        {
            try
            {
            var Mod = new List<Module>
            {
             new Module
             {
                PageID= 1,
                Col = 1,
                Row =0,
                Expanded = true,
                Title ="Test Page",
                PageParts = new PageParts
                {
                    Body =""
                },
             }
            };
                return Mod;
            }
            catch(Exception ex)
            {
            return new List<Module>();
            }
        }
        */

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet = true)]
        public Pageflakes.ObjectModel.pageSetting GetPageContent(Guid userGuid, int pageId, string siteVersion)
        {
            int ModuleId = Pageflakes.Utilities.ModuleIdGenerator.GenerateModuleId();
            try
            {                

                return new pageSetting
                {
                    
                            ID = pageId ,                            
                            IsOwner = true,
                            IsNewlyShared = false,
                            IsPublished = false,
                            IsShared = false,
                            Modules = new List<Pageflakes.ObjectModel.Module>{
                                new Module{
                                    id="m" + pageId,
                                    internalID = pageId,
                                    pageID=pageId,
                                    url = "/flakes/WeatherComFlake/Weather.html?useLocation=true",
                                    title = "Weather Flake",                                    
                                    Permission =new permission{
                                        CanClose=true,
                                        CanCollapse=true,
                                        CanDrag=true,
                                        CanEdit=true
                                    },
                                    col=1,
                                    row=0,
                                    expanded = true,
                                    PrivateProfiles ={},
                                    PublicProfiles={},
                                    ProtectedProfiles = {},
                                    Profiles = new string[][] {
                                         new  string[] {"UseLocation = True"} 
                                    }                                   
                                }
                            },
                            PageParts= new List<PageParts>{
                                new PageParts{
                                    scripts = new List<ScriptTag>{
                                        new ScriptTag{
                                            id="CommonFlakeJS_TopFlakes",
                                            src="/f.axd?s=CommonFlakeJS_TopFlakes&t=j&v=217",
                                            content=""
                                        },
                                        new ScriptTag{
                                            id="m"+ pageId + "Instance",
                                            src="",
                                            content ="$m" + pageId + "=function(){return new WeatherComFlake('m295724907');}"
                                        }
                                    },
                                    styles = new List<StyleTag>{
                                        new StyleTag{
                                            id="CommonFlakeCSS",
                                            href="/f.axd?s=CommonFlakeCSS&t=c&v=217",
                                            content=""
                                        }
                                    },
                                    body="",
                                    id="m" + pageId,
                                    title="the Weather Channel&amp;reg;",
                                    url="/flakes/WeatherComFlake/Weather.html?useLocation=true",
                                    icon="/images/pficon.gif",
                                    //import
                                    //export
                                    //xslUrl
                                    Permission = new permission{
                                        CanClose = true,
                                        CanCollapse = true,
                                        CanDrag = true,
                                        CanEdit = true
                                    }
                                    //text
                                }
                            },
                            CanInviteOthers = false,
                            CanAddFlake = true,
                            CanChangeFlake = true,
                            CanChangePage = true,
                            CanDeleteFlake = true,
                            CanEditFlake = true,
                            CanMoveFlakes = true,
                            CanRemovePage = true,
                            Theme = new PageTheme2{
                                CanDelete = false,
                                CanEdit = false,                        
                                CSS=".menu * { color:#ffffff; font:#ffffff; } .menu a { color:#ffffff; float:left; font-weight:bold; text-decoration:none; }",
                                IsCustomTheme = false,
                                ThemeID = 12,
                                ThemeHandlerUrl="/p.axd?i=12&t=&h=www.pageflakes.com&v=4&b=Alexa-1&m=0",
                                ThemeName="Cool Blue",
                                ThemeShortcut="T12"  
                            },
                            ColumnCount = 3,
                            ColumnSizes ="33%,33%,33%",
                            HasChanged = false,
                            HitCount =0,
                            Name = "New Page",
                            OrderNo =1,
                            OwnerFullname="",
                            OwnerName="",
                            Scripts="",
                            SharedBy =string.Empty,
                            SharingStatus= 0,
                            Stylesheets=""                        
                        
                    
                };
            }
            catch (Exception ex)
            {
                // Log interne
                System.Diagnostics.Trace.WriteLine("GetPageContent error: " + ex);
                // Retour minimal en cas d'erreur
                return new pageSetting
                {
                    
                            ID = pageId ,
                            IsOwner = true,
                            IsNewlyShared = false,
                            IsPublished = false,
                            IsShared = false,
                            Modules = new List<Pageflakes.ObjectModel.Module>{
                                new Module{
                                    id="m" + ModuleId.ToString(),
                                    internalID = ModuleId,
                                    pageID=pageId,
                                    url = "__WEATHERCOMFLAKE__?useLocation=true",
                                    title = "Weather Flake",                                    
                                    Permission =new permission{
                                        CanClose=true,
                                        CanCollapse=true,
                                        CanDrag=true,
                                        CanEdit=true
                                    },
                                    col=1,
                                    row=0,
                                    expanded = true,
                                    PrivateProfiles ={},
                                    PublicProfiles={},
                                    ProtectedProfiles = {},
                                    Profiles = new string[][] {
                                         new  string[] {"UseLocation = True"} 
                                    }                                   
                                }
                            },
                            PageParts= new List<PageParts>{
                                new PageParts{
                                    scripts = new List<ScriptTag>{
                                        new ScriptTag{
                                            id="CommonFlakeJS_TopFlakes",
                                            src="/f.axd?s=CommonFlakeJS_TopFlakes&t=j&v=217",
                                            content=""
                                        },
                                        new ScriptTag{
                                            id="m"+ ModuleId.ToString() + "Instance",
                                            src="",
                                            content ="$m" + ModuleId.ToString() + "=function(){return new WeatherComFlake('m295724907');}"
                                        }
                                    },
                                    styles = new List<StyleTag>{
                                        new StyleTag{
                                            id="CommonFlakeCSS",
                                            href="/f.axd?s=CommonFlakeCSS&t=c&v=217",
                                            content=""
                                        }
                                    },
                                    body="",
                                    id="m" + ModuleId.ToString(),
                                    title="the Weather Channel&amp;reg;",
                                    url="/flakes/WeatherComFlake/Weather.html?useLocation=true",
                                    icon="/images/pficon.gif",
                                    //import
                                    //export
                                    //xslUrl
                                    Permission = new permission{
                                        CanClose = true,
                                        CanCollapse = true,
                                        CanDrag = true,
                                        CanEdit = true
                                    }
                                    //text
                                }
                            },
                            CanInviteOthers = false,
                            CanAddFlake = true,
                            CanChangeFlake = true,
                            CanChangePage = true,
                            CanDeleteFlake = true,
                            CanEditFlake = true,
                            CanMoveFlakes = true,
                            CanRemovePage = true,
                            Theme = new PageTheme2{
                                CanDelete = false,
                                CanEdit = false,                        
                                CSS=".menu * { color:#ffffff; font:#ffffff; } .menu a { color:#ffffff; float:left; font-weight:bold; text-decoration:none; }",
                                IsCustomTheme = false,
                                ThemeID = 12,
                                ThemeHandlerUrl="/p.axd?i=12&t=&h=www.pageflakes.com&v=4&b=Alexa-1&m=0",
                                ThemeName="Cool Blue",
                                ThemeShortcut="T12"  
                            },
                            ColumnCount = 3,
                            ColumnSizes ="33%,33%,33%",
                            HasChanged = false,
                            HitCount =0,
                            Name = "New Page",
                            OrderNo =1,
                            OwnerFullname="",
                            OwnerName="",
                            Scripts="",
                            SharedBy =string.Empty,
                            SharingStatus= 0,
                            Stylesheets=""                        
                        
                    
                };
            }
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet = true)]
        public List<Pageflakes.ObjectModel.PageParts> GetPageModules(int pageId)
        {
            
            
            try
            {
                // Exemple fonctionnel : récupérer les Modules d'une page
                var parts = new List<PageParts>
                {
                    new PageParts
                    {
                        scripts = new List<ScriptTag>
                        {
                            new ScriptTag {
                                id = "CommonFlakeJS_TopFlakes",
                                src = "/Pageflakes/f.axd?s=CommonFlakeJS_TopFlakes&t=j&v=213en",
                                content = null
                        },
                            new ScriptTag {
                                id = "m313466497Instance",
                                src = null,
                                content = "\n$m313466497=function(){return new WeatherComFlake('m313466497');}"
                                }
                        },
                        styles = new List<StyleTag>
                        {
                            new StyleTag {
                                id = "CommonFlakeCSS",
                                href = "/Pageflakes/f.axd?s=CommonFlakeCSS&t=c&v=217",
                                content = (string)null
                            }
                        },
                        body = "<div>Météo test inline</div>",
                        id = "m313466497",
                        title = "The Weather Channel®",
                        url = "/Pageflakes/flakes/WeatherComFlake/Weather.html",
                        icon = "images/pficon.gif",
                        importUrl = (string)null,
                        exportUrl = (string)null,
                        //XlsUrl = (string)null,
                        texts = new string[]{},
                        Permission = new permission {
                            CanClose = true,
                            CanCollapse = true,
                            CanDrag = true,
                            CanEdit = true
                        }
                    }
                };

                return parts;
            }
            catch (Exception ex)
            {
                // En cas d’erreur, renvoyer une liste vide
                return new List<PageParts>();
            }
        }
        
       

        [WebMethod]
        public string GetPageUrl(int pageId)
        {
            try
            {
                // Utiliser string.Format au lieu de $"..."
                return string.Format("http://www.Pageflakes.com/page/{0}", pageId);
            }
            catch (Exception ex)
            {
                return "Error retrieving page URL: " + ex.Message;
            }
        }

        [WebMethod]
        public int GetPageVersionNo(int pageId)
        {
            try
            {
                // Exemple fonctionnel : récupérer le numéro de version d'une page
                // En pratique, tu irais chercher cette info dans ta base de données
                // Ici on simule avec une valeur calculée
                int versionNo = pageId * 10; // exemple simple

                return versionNo;
            }
            catch (Exception)
            {
                // En cas d’erreur, renvoyer une valeur par défaut
                return -1;
            }
        }
        /*
        [WebMethod]
        public GetPageflakeResult GetPageflake(string source, string pageID, string userUniqueName, string themeName)
        {
            try
            {
                return new GetPageflakeResult
                {
                    VersionSuffix = "v1.0",
                    Language = "en",
                    UserPublishURL = "http://www.Pageflakes.com/" + userUniqueName,
                    UserUniqueName = userUniqueName,
                    UserFullName = "Franck Architecte",
                    UserGUID = Guid.NewGuid().ToString(),
                    UserVersionNo = 1,
                    CurrentPageID = Convert.ToInt32(pageID),
                    CurrentPageVersionNo = 1,
                    IsSubscribedForNewsletter = true,
                    ThemeName = themeName,
                    ViewingPageOf = userUniqueName,
                    Timezone = 1,
                    ZipCode = "26000",
                    Template = new Template
                    {
                        ModuleHtml = "<div>Module HTML</div>",
                        StylesheetHref = "/styles/theme.css",
                        PopupHtml = "<div>Popup HTML</div>",
                        ThemePath = "/themes/" + themeName
                    },
                    OpenLinksIn = 1,
                    Pages = new List<PageSetting>
                    {
                        new PageSetting
                        {
                            ID = 101,
                            VersionNo = 1,
                            Name = "Home",
                            OrderNo = 1,
                            SharingStatus = 0,
                            ColumnCount = 3,
                            OwnerName = userUniqueName,
                            OwnerFullname = "Franck Architecte",
                            IsPublished = true,
                            IsOwner = true,
                            IsShared = false,
                            CanMoveFlakes = true,
                            CanAddFlake = true,
                            CanEditFlake = true,
                            CanDeleteFlake = true,
                            CanChangeFlake = true,
                            CanChangePage = true,
                            ColumnSizes = "33%,33%,34%"
                        },
                        new PageSetting
                        {
                            ID = 102,
                            VersionNo = 1,
                            Name = "News",
                            OrderNo = 2,
                            SharingStatus = 0,
                            ColumnCount = 2,
                            OwnerName = userUniqueName,
                            OwnerFullname = "Franck Architecte",
                            IsPublished = true,
                            IsOwner = true,
                            IsShared = false,
                            CanMoveFlakes = true,
                            CanAddFlake = true,
                            CanEditFlake = true,
                            CanDeleteFlake = true,
                            CanChangeFlake = true,
                            CanChangePage = true,
                            ColumnSizes = "50%,50%"
                        }
                    },
                    IsAnonymous = false,
                    IsMySite = true,
                    PageSharedWithMeCount = 0,
                    ShowSharedPagesWithMine = false,
                    DownloadFeedsAutometically = true,
                    Channels = new List<RSSChannel>
                    {
                        new RSSChannel
                        {
                            Type = "RSS",
                            FeedSource = "http://example.com/rss",
                            ReadItemIds = "1,2,3"
                        },
                        new RSSChannel
                        {
                            Type = "Atom",
                            FeedSource = "http://example.com/atom",
                            ReadItemIds = "10,11"
                        }
                    },
                    IsFirstVisit = false,
                    ErrorMsg = string.Empty
                };
            }
            catch (Exception ex)
            {
                return new GetPageflakeResult
                {
                    VersionSuffix = "error",
                    Language = "en",
                    ErrorMsg = ex.Message
                };
            }
        }
        */
        [WebMethod]
        public List<Pageflakes.ObjectModel.PageParts> GetPages(object[] pageInfos)
        {
            try
            {
                var pages = new List<PageParts>();

                // Exemple fonctionnel : construire deux pages fictives
                pages.Add(new PageParts
                {
                    scripts = new List<ScriptTag>
                    {
                        new ScriptTag { id = "script1", src = "/scripts/page1.js", content = "console.log('Page1 loaded');" }
                    },
                    styles = new List<StyleTag>
                    {
                        new StyleTag { id = "style1", href = "/styles/page1.css", content = ".page1 { background:#fafafa; }" }
                    },
                    body = "<div>Page 1 content</div>",
                    id = "page1",
                    title = "First Page",
                    url = "http://example.com/page1",
                    icon = "/images/page1.png",
                    texts = new string[]{}
                });

                pages.Add(new PageParts
                {
                    scripts = new List<ScriptTag>
                    {
                        new ScriptTag { id = "script2", src = "/scripts/page2.js", content = "console.log('Page2 loaded');" }
                    },
                    styles = new List<StyleTag>
                    {
                        new StyleTag { id = "style2", href = "/styles/page2.css", content = ".page2 { background:#eee; }" }
                    },
                    body = "<div>Page 2 content</div>",
                    id = "page2",
                    title = "Second Page",
                    url = "http://example.com/page2",
                    icon = "/images/page2.png",
                    texts = new string[]{}
                });

                return pages;
            }
            catch (Exception ex)
            {
                // En cas d’erreur, renvoyer une liste vide
                return new List<PageParts>();
            }
        }

        [WebMethod]
        public void GetPassword(string email)
        {
            try
            {
                // Exemple fonctionnel : déclencher un processus de récupération
                // En production, tu enverrais un email de réinitialisation
                // ou un lien sécurisé au lieu de renvoyer le mot de passe.

                // Ici on simule simplement un log
                System.Diagnostics.Debug.WriteLine("Password reset requested for: " + email);

                // Pas de retour attendu : la réponse SOAP est vide
            }
            catch (Exception ex)
            {
                // En cas d’erreur, lever une SoapException pour informer le client
                throw new System.Web.Services.Protocols.SoapException(
                    "Error processing GetPassword: " + ex.Message,
                    System.Web.Services.Protocols.SoapException.ServerFaultCode
                );
            }
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet = true)]
        public Pageflakes.ObjectModel.My GetPublicUrlInfo()
        {
            Pageflakes.ObjectModel.My PublicUrl = new Pageflakes.ObjectModel.My{
                FirstName = "Luffy26"
            };
            return PublicUrl;
        }
        //Voir DB
        [WebMethod]
        public List<string> GetPublishedPage(int pageId)
        {
            try
            {
                // Exemple fonctionnel : récupérer les pages publiées
                // En pratique, tu irais chercher ces infos dans ta base de données
                var publishedPages = new List<string>();

                // Simuler deux résultats
                publishedPages.Add("http://www.Pageflakes.com/page/" + pageId + "/public1");
                publishedPages.Add("http://www.Pageflakes.com/page/" + pageId + "/public2");

                return publishedPages;
            }
            catch (Exception ex)
            {
                // En cas d’erreur, renvoyer une liste vide
                return new List<string>();
            }
        }
        //Voir DB
        [WebMethod]
        public List<string> GetSharedPagesWithMe()
        {
            try
            {
                // Exemple fonctionnel : récupérer les pages partagées avec l’utilisateur
                // En pratique, tu irais chercher ces infos dans ta base de données
                var sharedPages = new List<string>();

                // Simuler deux résultats
                sharedPages.Add("http://www.Pageflakes.com/page/shared1");
                sharedPages.Add("http://www.Pageflakes.com/page/shared2");

                return sharedPages;
            }
            catch (Exception ex)
            {
                // En cas d’erreur, renvoyer une liste vide
                return new List<string>();
            }
        }
        //Voir DB
        [WebMethod]
        public List<string> GetSharedUserNames(int pageId)
        {
            try
            {
                // Exemple fonctionnel : récupérer les noms des utilisateurs
                // En pratique, tu irais chercher ces infos dans ta base de données
                var sharedUsers = new List<string>();

                // Simuler deux résultats
                sharedUsers.Add("alice");
                sharedUsers.Add("bob");

                return sharedUsers;
            }
            catch (Exception ex)
            {
                // En cas d’erreur, renvoyer une liste vide
                return new List<string>();
            }
        }
        //VoirDB
        [WebMethod]
        public Pageflakes.ObjectModel.template GetTemplate(string name)
        {
            try
            {
                // Exemple fonctionnel : récupérer un template par son nom
                // En pratique, tu irais chercher ces infos dans ta base de données ou fichiers
                return new template
                {
                    ModuleHtml = "\u003cdiv class=\"flake_placeholder\"\u003e \u003cdiv class=\"flake\"\u003e \u003cdiv class=\"flake_header\" onmouseover=\"opqTb(this)\" onmouseout=\"alphaTb(this)\" id=\"handle_FLAKE_ID_\"\u003e \u003cdiv class=\"flake_toolbar\"\u003e \u003ca class=\"refresh_icon\" style=\"display:none;\" title=\"Refresh Flake\" id=\"refresh_FLAKE_ID_\" onmouseover=\"hover(this)\" onmouseout=\"hout(this)\" onclick=\"$module(\u0027_FLAKE_ID_\u0027).refresh()\"\u003eRefresh\u003c/a\u003e \u003ca class=\"sendFlake_icon\" id=\"sendFlake_FLAKE_ID_\" onmouseover=\"hover(this)\" onmouseout=\"hout(this)\" onmousedown=\"$stopBubble(event)\" onclick=\"$module(\u0027_FLAKE_ID_\u0027).showFlakeMenu()\"\u003eSend\u003c/a\u003e \u003ca class=\"settings_icon\" id=\"editLink_FLAKE_ID_\" title=\"Edit Flake settings\" onmouseover=\"hover(this)\" onmouseout=\"hout(this)\" onmousedown=\"$stopBubble(event)\" onclick=\"$module(\u0027_FLAKE_ID_\u0027).toggleEdit()\"\u003eEDIT\u003c/a\u003e \u003ca class=\"close_icon\" id=\"closeLink_FLAKE_ID_\" title=\"Remove Flake\" onmouseover=\"hover(this)\" onmousedown=\"$stopBubble(event)\" onmouseout=\"hout(this)\" onclick=\"$module(\u0027_FLAKE_ID_\u0027).close()\" \u003ex\u003c/a\u003e \u003c/div\u003e \u003cdiv class=\"flake_title\"\u003e \u003cdiv class=\"flake_icon\"\u003e\u003cimg OnError=\u0027$module(\"_FLAKE_ID_\").loadDefaultFavicon(\"icon_FLAKE_ID_\");\u0027 id=\"icon_FLAKE_ID_\" /\u003e\u003c/div\u003e \u003cdiv class=\"flake_name_container\"\u003e \u003cspan class=\"flake_name\" id=\"title_FLAKE_ID_\"\u003e_FLAKE_TITLE_\u003c/span\u003e \u003cspan class=\"rss_number\" id=\"number_FLAKE_ID_\"\u003e\u003c/span\u003e \u003c/div\u003e \u003c/div\u003e \u003c/div\u003e \u003cdiv id=\"editContainer_FLAKE_ID_\" style=\"display:none\" \u003e \u003ctable class=\"flake_tabbar\" cellspacing=\"0\" cellpadding=\"0\"\u003e \u003ctr\u003e \u003ctd width=\"100\" id=\"td_tab_basic_FLAKE_ID_\"\u003e\u003cdiv id=\"tab_basic_FLAKE_ID_\" class=\"edit_tabup\" onclick=\"$module(\u0027_FLAKE_ID_\u0027).showBasicSetting()\" disable=\"$remove(\u0027td_tab_basic_FLAKE_ID_\u0027)\" \u003eSettings\u003c/div\u003e\u003c/td\u003e \u003ctd width=\"100\" id=\"td_tab_other_FLAKE_ID_\"\u003e\u003cdiv id=\"tab_other_FLAKE_ID_\" class=\"edit_tabdown\" onclick=\"$module(\u0027_FLAKE_ID_\u0027).showAdvancedSetting()\" disable=\"$remove(\u0027td_tab_other_FLAKE_ID_\u0027)\" \u003ePreferences\u003c/div\u003e\u003c/td\u003e \u003ctd \u003e&nbsp;\u003c/td\u003e \u003c/tr\u003e \u003c/table\u003e \u003cdiv class=\"flake_settings\" \u003e \u003cdiv id=\"editBody_FLAKE_ID_\" style=\"padding:8px\"\u003e\u003c/div\u003e \u003cdiv id=\"editOthers_FLAKE_ID_\" style=\"padding:8px;display:none; height:100px\"\u003e \u003ctable width=100%\u003e \u003ctr\u003e\u003ctd width=70\u003eFlake title:\u003c/td\u003e\u003ctd\u003e\u003cinput style=\"width:70%\" type=\"text\" id=\"flakeTitleEdit_FLAKE_ID_\" onkeypress=\"if(event.keyCode==13)$module(\u0027_FLAKE_ID_\u0027).editEdit();\" value=\"_FLAKE_TITLE_\"/\u003e\u003c/td\u003e\u003c/tr\u003e \u003ctr\u003e\u003ctd\u003e&nbsp;\u003c/td\u003e\u003ctd\u003e\u003cinput type=\"button\" value=\"Save\" onclick=\"$module(\u0027_FLAKE_ID_\u0027).editEdit()\" class=\"button\"/\u003e&nbsp;&nbsp;\u003cinput type=\"button\" onclick=\"$module(\u0027_FLAKE_ID_\u0027).toggleEdit()\" class=\"button cancel\" value=\"Cancel\"/\u003e\u003c/td\u003e\u003c/tr\u003e \u003c/table\u003e \u003c/div\u003e \u003c/div\u003e \u003c/div\u003e \u003cdiv class=\"flake_content\" style=\"_FLAKE_COLLAPSED_\" id=\"body_FLAKE_ID_\"\u003e \u003cdiv class=\"flake_spaceholder\"\u003eLoading...\u003c/div\u003e \u003c/div\u003e \u003cdiv class=\"flake_footer\"\u003e\u003ca id=\"collapseLink_FLAKE_ID_\" title=\"Collapse Flake\" class=\"colapse_icon\" onmouseover=\"hover(this)\" onmouseout=\"hout(this)\" style=\"_FLAKE_COLLAPSED_\" onclick=\"$module(\u0027_FLAKE_ID_\u0027).collapse()\"\u003e-\u003c/a\u003e \u003ca id=\"expandLink_FLAKE_ID_\" class=\"expand_icon\" title=\"Expand Flake\" style=\"_FLAKE_EXPANDED_\" onmouseover=\"hover(this)\" onmouseout=\"hout(this)\" onclick=\"$module(\u0027_FLAKE_ID_\u0027).expand()\"\u003e+\u003c/a\u003e\u003c/div\u003e \u003c/div\u003e\u003c/div\u003e",
                    StylesheetHref = "http://10.0.0.1/Pageflakes/App_Themes/T12/s.axd?s=CSS1&h=www.pageflakes.com&l=en&v=&b=Mozilla&m=5&t=T12",
                    PopupHtml = "\u003cdiv class=\"flake_placeholder\"\u003e\u003cdiv class=\"flake\"\u003e\u003cdiv class=\"flake_header\" id=\"handle_FLAKE_ID_\" onmouseover=\"opqTb(this)\" onmouseout=\"alphaTb(this)\"\u003e\u003cdiv class=\"flake_toolbar\"\u003e\u003cdiv class=\"close_icon\" id=\"closeLink_FLAKE_ID_\" onmouseover=\"hover(this)\" onmouseout=\"hout(this)\"\u003ex\u003c/div\u003e\u003c/div\u003e\u003cdiv class=\"flake_title\"\u003e\u003cspan class=\"flake_icon\"\u003e\u003cimg src=\"images/pficon.gif\" id=\"icon_FLAKE_ID_\" /\u003e\u003c/span\u003e\u003cspan class=\"flake_name flake_name_popup\" id=\"title_FLAKE_ID_\"\u003e_FLAKE_TITLE_\u003c/span\u003e\u003c/div\u003e\u003c/div\u003e\u003cdiv class=\"popup_content\" id=\"body_FLAKE_ID_\"\u003eLoading...\u003c/div\u003e\u003cdiv class=\"flake_footer\"\u003e\u003c/div\u003e\u003c/div\u003e\u003c/div\u003e",
                    ThemePath = "http://10.0.0.1/Pageflakes/App_Themes/T12/"                    
                };
            }
            catch (Exception ex)
            {
                // En cas d’erreur, renvoyer un template avec message d’erreur
                return new template
                {
                    ModuleHtml = "<div class='error'>Error loading template: " + ex.Message + "</div>",
                    StylesheetHref = string.Empty,
                    PopupHtml = string.Empty,
                    ThemePath = string.Empty
                };
            }
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet=true)]
        public List<Pageflakes.ObjectModel.PageTheme2> GetThemesOfUser()
        {
            List<Pageflakes.ObjectModel.PageTheme2> themes = new List<Pageflakes.ObjectModel.PageTheme2>();
            string connString = ConfigurationManager.ConnectionStrings["PageflakesConnectionString"].ConnectionString;

            string sql = @" SELECT * FROM Pagetheme2Ref WHERE IsCustomTheme = 0 ORDER BY ThemeID "; 
            using (SqlConnection conn = new SqlConnection(connString)) 
            using (SqlCommand cmd = new SqlCommand(sql, conn)) { 
                conn.Open(); 
                using (SqlDataReader reader = cmd.ExecuteReader()) { 
                    while (reader.Read()) { 
                        Pageflakes.ObjectModel.PageTheme2 theme = new Pageflakes.ObjectModel.PageTheme2 { 
                            ThemeID = reader.GetInt32(reader.GetOrdinal("ThemeID")),
                            ThemeShortcut = reader.IsDBNull(reader.GetOrdinal("ThemeShortcut")) ? string.Empty : reader.GetString(reader.GetOrdinal("ThemeShortcut")),
                            PreviewHandlerUrl = reader.IsDBNull(reader.GetOrdinal("PreviewHandlerUrl")) ? string.Empty : reader.GetString(reader.GetOrdinal("PreviewHandlerUrl")),                                                      
                            ThemeName = reader.IsDBNull(reader.GetOrdinal("ThemeName")) ? string.Empty : reader.GetString(reader.GetOrdinal("ThemeName")), 
                            CSS = reader.IsDBNull(reader.GetOrdinal("CSS")) ? string.Empty : reader.GetString(reader.GetOrdinal("CSS")), 
                            PreviewGraphics = reader.IsDBNull(reader.GetOrdinal("PreviewGraphics")) ? string.Empty : reader.GetString(reader.GetOrdinal("PreviewGraphics")), 
                            IsCustomTheme = reader.GetBoolean(reader.GetOrdinal("IsCustomTheme")),
                            ThemeHandlerUrl = reader.IsDBNull(reader.GetOrdinal("ThemeHandlerUrl")) ? string.Empty : reader.GetString(reader.GetOrdinal("ThemeHandlerUrl"))
                        }; 
                    themes.Add(theme); 
                    } 
                } 
            }

            return themes;    
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet=true )]
        public List<string> GetTooltips()
        {
            var language = "fr";
            var lang = "fr";
            if (lang == "fr")
                return new List<string> { "Astuce 1", "Astuce 2" };
            else
                return new List<string> { "Tip 1", "Tip 2" };
    
            /*
            var tips = new List<object>();
            using (var conn = new SqlConnection(ConnectionString))
            using (var cmd = new SqlCommand("SELECT KeyName, Text FROM Tooltips WHERE Language=@lang", conn))
            {
                cmd.Parameters.AddWithValue("@lang", language);
                conn.Open();
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        tips.Add(new { Key = reader["KeyName"], Text = reader["Text"] });
                    }
                }
            }
            return new { Success = true, Language = language, Tooltips = tips };
             * */
            
           
        }
        //IsUserRequiredToVerifyEmail Manquant
        //Voir DB
       
        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<string> MatchLocation1(string location)
        {
            var output = new List<string>();
            if (string.IsNullOrWhiteSpace(location) || location.Length < 3)
                return output; // rien si moins de 3 lettres
                string requestUrl = string.Format(
                    "http://geodb-cities-api.wirefreethought.com/v1/geo/cities?namePrefix={0}&limit=5",
                HttpUtility.UrlEncode(location.Trim()));

            using (var client = new WebClient())
            {
                string json = client.DownloadString(requestUrl);
                var serializer = new JavaScriptSerializer();
                var results = serializer.Deserialize<Dictionary<string, object>>(json);
                if (results.ContainsKey("data"))
                {
                    var cities = results["data"] as object[];
                    foreach (Dictionary<string, object> city in cities)
                    {
                        string cityName = city.ContainsKey("city") ? city["city"].ToString() : "";
                        string country  = city.ContainsKey("country") ? city["country"].ToString() : "";
                        string region   = city.ContainsKey("region") ? city["region"].ToString() : "";
                        output.Add(string.Format("{0},|{1},|{2}", cityName, country, region));
                    }
                }
            }
            return output;
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet=true )]
        public string GetUserEmail()
        {
            return "Shinigami26@live.fr";
        }
        [WebMethod]
        [ScriptMethod(UseHttpGet= true, ResponseFormat=ResponseFormat.Json)]
        public List<string> MatchLocation(string location)
        {
            var output = new List<string>();

            if (string.IsNullOrWhiteSpace(location))
            {
                output.Add("Invalid|Location");
                return output;
            }

            string apiKey = "5672995c705a1b48cd178e10e73c6c4d"; // remplace par ta clé OpenWeatherMap
            string requestUrl = string.Format(
                "http://api.openweathermap.org/geo/1.0/direct?q={0}&limit=5&appid={1}",
                HttpUtility.UrlEncode(location.Trim()), apiKey);

           using (var client = new WebClient())
            {
                string json = client.DownloadString(requestUrl);
                var serializer = new JavaScriptSerializer();
                var results = serializer.Deserialize<List<Dictionary<string, object>>>(json);
                foreach (var r in results)
                {
                    string City    = r.ContainsKey("name") ? r["name"].ToString() : "";
                    string CountryName = r.ContainsKey("country") ? r["country"].ToString() : "";
                    string state   = r.ContainsKey("state") ? r["state"].ToString() : "";
                    output.Add(string.Format("{0},{1}", City, state));
                    //output.Add(string.Format("{0},{2},{1}", City, CountryName, state));
                }
            }
            return output;
        }
        [WebMethod]
        public int MakePrivate(int pageId)
        {
            try
            {
                // Exemple fonctionnel : rendre une page privée
                // En pratique, tu mettrais à jour ta base de données
                // Ici on simule avec un retour "1" pour succès

                // Logique simulée : si pageId > 0, succès
                if (pageId > 0)
                {
                    // Exemple : UPDATE Pages SET IsPrivate = 1 WHERE Id = pageId
                    return 1; // succès
                }
                else
                {
                    return 0; // échec
                }
            }
            catch (Exception)
            {
                // En cas d’erreur, renvoyer -1
                return -1;
            }
        }
        //MatchLocation Manquant
        //Voir DB
        [WebMethod]
        [ScriptMethod(UseHttpGet = true)]
        public int MoveModuleToPage(int moduleId, int fromPageId, int toPageId) {
            try { // 🔥 1) Faux appel : déplacement dans la même page 
                if (fromPageId == toPageId) { 
                    var page = PageRepository.GetPage(fromPageId); 
                    if (page == null) return 0; 
                    var module = page.Modules.FirstOrDefault(m => m.internalID == moduleId); 
                    if (module == null) return 0; 
                    // 🔥 Correction du bug : mettre à jour le PageID du module 
                    module.pageID = fromPageId; 
                    // 🔥 Sauvegarder la page pour corriger l'état interne 
                    PageRepository.Save(page); 
                    return 1; // succès 
                } 
                // 🔥 2) Déplacement réel vers une autre page 
                var fromPage = PageRepository.GetPage(fromPageId); 
                if (fromPage == null) return 0; 
                var moduleToMove = fromPage.Modules.FirstOrDefault(m => m.internalID == moduleId); 
                if (moduleToMove == null) return 0; 
                fromPage.Modules.Remove(moduleToMove); 
                var toPage = PageRepository.GetPage(toPageId); 
                if (toPage == null) return 0; // Placement simple : col=1, row=0 
                moduleToMove.col = 1; 
                moduleToMove.row = 0; // Mise à jour du PageID 
                moduleToMove.pageID = toPageId; 
                toPage.Modules.Add(moduleToMove); 
                PageRepository.Save(fromPage); 
                PageRepository.Save(toPage); 
                return 1; // succès 
                } 
                catch { 
                    return 0; // échec 
            }
        }
        
        //Voir DB
        [WebMethod]
        public List<string> PublishInCommunity(int pageId, string description, string tags)
        {
            try
            {
                // Exemple fonctionnel : publier une page dans la communauté
                // En pratique, tu mettrais à jour ta base de données
                // Ici on simule avec un retour de confirmation

                var result = new List<string>();
                result.Add("Page " + pageId + " published successfully.");
                result.Add("Tags applied: " + tags);

                return result;
            }
            catch (Exception ex)
            {
                // En cas d’erreur, renvoyer un message d’erreur
                var error = new List<string>();
                error.Add("Error publishing page: " + ex.Message);
                return error;
            }
        }
        //Voir DB
        [WebMethod]
        public List<string> PublishPage(int pageId, string tags, string emailAddresses)
        {
            try
            {
                // Exemple fonctionnel : publier une page
                // En pratique, tu mettrais à jour ta base de données et enverrais des notifications

                var result = new List<string>();
                result.Add("Page " + pageId + " published successfully.");
                result.Add("Tags applied: " + tags);

                if (!string.IsNullOrEmpty(emailAddresses))
                {
                    result.Add("Notifications sent to: " + emailAddresses);
                }

                return result;
            }
            catch (Exception ex)
            {
                // En cas d’erreur, renvoyer un message d’erreur
                var error = new List<string>();
                error.Add("Error publishing page: " + ex.Message);
                return error;
            }
        }
        [WebMethod]
        //Voir DB
        public string PublishPageInvite(int pageId, string[] emailAddresses)
        {
            try
            {
                // Exemple fonctionnel : envoyer des invitations
                // En pratique, tu enverrais des emails ou mettrais à jour ta base de données

                if (emailAddresses == null || emailAddresses.Length == 0)
                {
                    return "No email addresses provided.";
                }

                // Simuler l'envoi
                string joined = string.Join(", ", emailAddresses);
                return "Page " + pageId + " invitations sent to: " + joined;
            }
            catch (Exception ex)
            {
                // En cas d’erreur, renvoyer un message d’erreur
                return "Error sending invitations: " + ex.Message;
            }
        }
        //Voir DB Pour Suppression en cascade des module et descendant
        [WebMethod]
        [ScriptMethod(UseHttpGet= true, ResponseFormat=ResponseFormat.Json)]
        public int RemoveModule(int id) { // 1. Récupérer la page active 
            var my = MyRepository.Get(); 
            var currentPageId = my.Profile.CurrentPageID; 
            if (currentPageId <= 0) return 1; 
            var page = PageRepository.GetPage(currentPageId); 
            if (page == null) return 1; 
            // 2. Supprimer le module dans Modules (ID interne = int) 
            if (page.Modules != null) { 
                page.Modules.RemoveAll(m => m.internalID == id); 
            } // 3. Supprimer les PageParts associés (ID client = "m12345") 
            string moduleKey = "m" + id; 
            if (page.PageParts != null) { 
                page.PageParts.RemoveAll(p => p.id == moduleKey); 
            } // 4. Sauvegarder la page 
            PageRepository.Save(page);            
            return 1; 
        }
        //VoirDB 
        [WebMethod]
        [ScriptMethod(UseHttpGet= true, ResponseFormat=ResponseFormat.Json)]
        public int RemovePage(int pageId)
        {
            
                var my = MyRepository.Get(); 
                // 1. Supprimer la page (les modules ont déjà été supprimés) 
                PageRepository.Delete(pageId); 
                // 2. Mettre à jour PageOrder 
                var order = new List<string>(); 
                var raw = (my.Profile.PageOrder ?? "") .Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries); 
                foreach (var p in raw) { 
                    var trimmed = p.Trim(); 
                    if (trimmed != pageId.ToString() && trimmed.Length > 0) order.Add(trimmed); 
                } 
                my.Profile.PageOrder = string.Join(",", order.ToArray()); 
                // 3. Si la page supprimée était active → choisir une nouvelle page 
                if (my.Profile.CurrentPageID == pageId) { 
                    if (order.Count > 0) my.Profile.CurrentPageID = int.Parse(order[0]); 
                    else my.Profile.CurrentPageID = 0; 
                } // 4. Sauvegarder 
                MyRepository.Save(my); // 5. Réponse simple 
                return 1; 
           
        }
        //Voir DB
        [WebMethod]
        public void RemoveReminder(Guid id)
        {
            try
            {
                // Exemple fonctionnel : suppression d'un rappel
                // En pratique, tu mettrais à jour ta base de données :
                // DELETE FROM Reminders WHERE Id = @id

                System.Diagnostics.Debug.WriteLine(
                    string.Format("Reminder {0} removed successfully.", id)
                );

                // Pas de retour attendu : la réponse SOAP est vide
            }
            catch (Exception ex)
            {
                // En cas d’erreur, lever une SoapException pour informer le client
                throw new SoapException(
                    "Error removing reminder: " + ex.Message,
                    SoapException.ServerFaultCode
                );
            }
        }
        // Manque ResendVerificationEmail
        //Voir DB
        [WebMethod]
        public int SaveLayout(PagePropertiesData pageProperties, Flake[] modules)
        {
            if (pageProperties == null)
                throw new Exception("pageProperties is null");

            if (modules == null)
                throw new Exception("modules is null");

            // ---------------------------------------------------------
            // 1. Charger ou créer la page (pageSetting)
            // ---------------------------------------------------------
            var page = PageRepository.GetPage(pageProperties.id);

            if (page == null)
            {
                page = new pageSetting();
                page.ID = pageProperties.id;
            }

            // Mise à jour des propriétés de la page
            page.Name = pageProperties.title;
            page.OrderNo = pageProperties.index;
            page.ColumnCount = pageProperties.columnCount;

            // Conversion tableau → CSV
            if (pageProperties.columnSizes != null)
                page.ColumnSizes = string.Join(",", pageProperties.columnSizes);
            else
            page.ColumnSizes = "";

            // ---------------------------------------------------------
            // 2. Conversion du thème (pageTheme = object JSON brut)
            // ---------------------------------------------------------
            if (pageProperties.pageTheme != null)
            {
                try
                {
                    var serializer = new JavaScriptSerializer();
                    page.Theme = serializer.ConvertToType<PageTheme2>(pageProperties.pageTheme);
                }
                catch
                {
                // fallback si le JSON contient des propriétés inconnues
                    page.Theme = new PageTheme2();
                }
            }

            // Sauvegarde dans le repository interne
            PageRepository.Save(page);

            // ---------------------------------------------------------
            // 3. Récupérer les flakes existants
            // ---------------------------------------------------------
            var existingFlakes = FlakeRepository
                .GetFlakesByPage(page.ID)
                .ToDictionary(f => f.internalId);

            // ---------------------------------------------------------
            // 4. Mise à jour des flakes envoyés
            // ---------------------------------------------------------
            foreach (var fl in modules)
            {
                if (existingFlakes.ContainsKey(fl.internalId))
                {
                    var f = existingFlakes[fl.internalId];

                    f.pageId = fl.pageId;
                    f.col = fl.col;
                    f.row = fl.row;
                    f.expanded = fl.expanded;
                    f.isDirty = fl.isDirty;

                    FlakeRepository.UpdateFlake(f);
                    existingFlakes.Remove(fl.internalId);
                }
                else
                {
                    var newFlake = new Flake
                    {
                        internalId = fl.internalId,
                        pageId = fl.pageId,
                        col = fl.col,
                        row = fl.row,
                        expanded = fl.expanded,
                        isDirty = fl.isDirty
                    };

                    FlakeRepository.AddFlake(newFlake);
                }
            }

            // ---------------------------------------------------------
            // 5. Supprimer les flakes absents
            // ---------------------------------------------------------
            foreach (var leftover in existingFlakes.Values)
                FlakeRepository.DeleteFlake(leftover.internalId);

            return 1;
        }


        [WebMethod]
        public int SaveModule(int pageId, Flake moduleProperties)
        {
            if (moduleProperties == null)
                throw new Exception("moduleProperties is null");
                // Charger la page
            var page = PageRepository.GetPage(pageId);
            if (page == null)
                throw new Exception("Page not found: " + pageId);
            // Vérifier si le flake existe déjà
            var existing = FlakeRepository.GetFlake(moduleProperties.internalId);
            if (existing != null){
                // Mise à jour du flake existant
                existing.pageId = moduleProperties.pageId;
                existing.col = moduleProperties.col;
                existing.row = moduleProperties.row;
                existing.title = moduleProperties.title;
                existing.url = moduleProperties.url;
                existing.expanded = moduleProperties.expanded;
                existing.isDirty = moduleProperties.isDirty;
                FlakeRepository.UpdateFlake(existing);
            }
            else{
                    // Nouveau flake
                var newFlake = new Flake
                {
                    internalId = moduleProperties.internalId,
                    pageId = moduleProperties.pageId,
                    col = moduleProperties.col,
                    row = moduleProperties.row,
                    title = moduleProperties.title,
                    url = moduleProperties.url,
                    expanded = moduleProperties.expanded,
                    isDirty = moduleProperties.isDirty
                };
                FlakeRepository.AddFlake(newFlake);
            }
            // 🔥 OBLIGATOIRE : return final
            return 1;
        }
        [WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public SavePageResult SavePage(PageData pageData)
{
    if (pageData == null)
        throw new Exception("pageData is null");

    // ---------------------------------------------------------
    // 1. Charger ou créer la pageSetting interne
    // ---------------------------------------------------------
    pageSetting page = null;

    // Si ID négatif → nouvelle page
    bool isNewPage = pageData.id < 0;

    if (isNewPage)
    {
        page = new pageSetting();
        page.ID = ModuleIdGenerator.GeneratePageId(); // ID positif officiel
    }
    else
    {
        page = PageRepository.GetPage(pageData.id) ?? new pageSetting();
        page.ID = pageData.id;
    }

    // ---------------------------------------------------------
    // 2. Mise à jour des propriétés de la page
    // ---------------------------------------------------------
    page.Name = pageData.title;
    page.OrderNo = pageData.index;
    page.ColumnCount = pageData.columnCount;

    // Tableau → CSV
    if (pageData.columnSizes != null)
        page.ColumnSizes = string.Join(",", pageData.columnSizes);
    else
        page.ColumnSizes = "";

    // ---------------------------------------------------------
    // 3. Conversion du thème (JSON brut → PageTheme2)
    // ---------------------------------------------------------
    if (pageData.pageTheme != null)
    {
        try
        {
            var serializer = new JavaScriptSerializer();
            page.Theme = serializer.ConvertToType<PageTheme2>(pageData.pageTheme);
        }
        catch
        {
            page.Theme = new PageTheme2();
        }
    }

    // Nettoyage du thème
    page.Theme = ThemeUtils.CleanTheme(page.Theme);

    // ---------------------------------------------------------
    // 4. Sauvegarder la page dans le repository interne
    // ---------------------------------------------------------
    PageRepository.Save(page);

    // ---------------------------------------------------------
    // 5. Si nouvelle page → mettre à jour PageOrder + CurrentPageID
    // ---------------------------------------------------------
    if (isNewPage)
    {
        var my = MyRepository.Get();

        var order = new List<string>();
        var raw = (my.Profile.PageOrder ?? "")
            .Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);

        foreach (var p in raw)
        {
            var trimmed = p.Trim();
            if (trimmed.Length > 0)
                order.Add(trimmed);
        }

        // Ajouter la nouvelle page
        order.Add(page.ID.ToString());

        my.Profile.PageOrder = string.Join(",", order.ToArray());
        my.Profile.CurrentPageID = page.ID;

        MyRepository.Save(my);
    }

    // ---------------------------------------------------------
    // 6. Construire la réponse SavePageResult
    // ---------------------------------------------------------
    var result = new SavePageResult
    {
        ID = page.ID,
        VersionNo = 1,
        Name = page.Name,
        OrderNo = page.OrderNo,
        SharingStatus = 0,
        ColumnCount = page.ColumnCount,
        OwnerName = "",
        OwnerFullname = "",
        IsPublished = false,
        IsOwner = true,
        IsShared = false,
        CanMoveFlakes = true,
        CanAddFlake = true,
        CanEditFlake = true,
        CanDeleteFlake = true,
        CanChangeFlake = true,
        CanChangePage = true,

        ColumnSizes = page.ColumnSizes ?? "",

        // IMPORTANT : SavePage ne renvoie pas les modules
        Modules = new SavePageResultModule[0],
        PageParts = new SavePageResultPagePart[0],

        Theme = ThemeUtils.CleanTheme(page.Theme)
    };

    return result;
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public int SaveProfile(string name, string value)
{
    if (string.IsNullOrEmpty(name))
        throw new Exception("name is null");

    var my = MyRepository.Get();

    switch (name)
    {
        case "PageOrder":
            // Le Framework envoie une liste CSV
            // Exemple : "1648789789,550547310"
            my.Profile.PageOrder = value ?? "";
            break;

        default:
            // D'autres propriétés pourraient exister dans Pageflakes original
            // mais pour l'instant on ignore tout sauf PageOrder
            break;
    }

    MyRepository.Save(my);

    return 1;
}


        [WebMethod] 
        [ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet=true)] 
        public int SetCurrentPage(int pageId) { // Charger le profil utilisateur 
            var my = MyRepository.Get(); // Mettre à jour la page courante 
            my.Profile.CurrentPageID = pageId; // --------------------------------------------------------- 
            // Maintenir PageOrder cohérent 
            // --------------------------------------------------------- 
            var order = new List<string>(); 
            var raw = (my.Profile.PageOrder ?? "") .Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries); 
            foreach (var p in raw) { 
                var trimmed = p.Trim(); 
                if (trimmed.Length > 0) 
                order.Add(trimmed); 
            } 
            var pageIdStr = pageId.ToString(); 
            // Si la page n'est pas déjà dans PageOrder, on l’ajoute à la fin 
            if (!order.Contains(pageIdStr)) order.Add(pageIdStr); 
            my.Profile.PageOrder = string.Join(",", order.ToArray()); 
            // Sauvegarder le profil 
            MyRepository.Save(my); 
            // Réponse JSON simple 
            return 1; 
        }


        private Pageflakes.Services.SavePageResultModule[] BuildModules(int pageId) { 
            var list = new List<Pageflakes.Services.SavePageResultModule>(); 
            foreach (var m in Pageflakes.Data.FlakeRepository.GetFlakesByPage(pageId)) { 
                list.Add(new Pageflakes.Services.SavePageResultModule { 
                    id = m.id, 
                    row = m.row, 
                    col = m.col, 
                    title = m.title, 
                    url = m.url, 
                    internalID = m.internalId, 
                    pageID = m.pageId, 
                    expanded = m.expanded, 
                    Profiles = null, 
                    PrivateProfiles = null, 
                    ProtectedProfiles = null, 
                    PublicProfiles = null 
                }); 
            } return list.ToArray(); 
        } 






    }



    public static class ModuleParser {
        public static string Get_JS_PageParts(string jsName)
        {
            
            switch(jsName){
                case Constants.PRODUCTIVITY :
                    return Constants.PRODUCT_JS;
                
                case Constants.TOPFLAKES:
                    return Constants.TOPFLAKE_JS;
                
                case Constants.ENTERTAINMENT:
                    return  Constants.ENTERTAI_JS;
                default:
                     return "";
            }
            
        }
    
        public static PageParts ParseModuleHtml(string flakeId,string URL,string filehtml)
        {
            PageParts parts = new PageParts();
            HtmlDocument doc = new HtmlDocument();
            string connString = ConfigurationManager.ConnectionStrings["PageflakesConnectionString"].ConnectionString;
            string sql = @"SELECT * FROM dbo.Module2 WHERE url = @url";
            string html = "";
            using (SqlConnection conn = new SqlConnection(connString)) 
            using (SqlCommand cmd = new SqlCommand(sql, conn)) { 
                cmd.Parameters.AddWithValue("@url", URL); 
                conn.Open();
                using (SqlDataReader reader = cmd.ExecuteReader()) { 
                    if (reader.Read()) { 
                        // Métadonnées
                        parts.id = flakeId; 
                        parts.title = reader.IsDBNull(reader.GetOrdinal("title")) ? string.Empty : reader.GetString(reader.GetOrdinal("title")); 
                        parts.url = reader.IsDBNull(reader.GetOrdinal("pageurl")) ? string.Empty : reader.GetString(reader.GetOrdinal("pageurl")); 
                        parts.icon = reader.IsDBNull(reader.GetOrdinal("icon")) ? string.Empty : reader.GetString(reader.GetOrdinal("icon")); 
                        
                        doc.LoadHtml(filehtml);
                            // ---------------------------------------------------------
                                    // 1. LINK → StyleTag
                                        // ---------------------------------------------------------
                        var linkNodes = doc.DocumentNode.SelectNodes("//link");
                        if (linkNodes != null){
                            foreach (var link in linkNodes)
                            {
                                string linkAttrId =""; //= link.GetAttributeValue("id", "")
                                if(!string.IsNullOrEmpty(link.GetAttributeValue("id", ""))){
                                    if (Constants.COMMONFLAKECSS == link.GetAttributeValue("id",""))
                                    {
                                        linkAttrId = Constants.COMMON_FLAKE_CSS;
                                    }
                                    else{
                                        linkAttrId = link.GetAttributeValue("href", "");
                                    }
                                }
                                parts.styles.Add(new StyleTag
                                {
                                    id = link.GetAttributeValue("id", ""),
                                    href = linkAttrId,
                                    content = "test" // jamais inline dans Pageflakes
                                });
                            }
                        }
                            // ---------------------------------------------------------
                            // 2. SCRIPT → ScriptTag
                            // ---------------------------------------------------------
                        var scriptNodes = doc.DocumentNode.SelectNodes("//script");
                        if (scriptNodes != null){
                            foreach (var script in scriptNodes)
                            {
                                string id = script.GetAttributeValue("id", "");
                                string src1 = script.GetAttributeValue("src", "");
                                string content = script.InnerHtml ?? "";
                                string srcc = "";
                                // Remplacement _PAGEFLAKES_
                                if(!id.Contains("_TESTBLOCK_")){
                                if (!string.IsNullOrEmpty(content))                                    
                                    content = content.Replace("_PAGEFLAKES_", flakeId);
                                    if(id.ToString() == Constants.TOPFLAKES || id.ToString() == Constants.PRODUCTIVITY || id.ToString() == Constants.ENTERTAINMENT){
                                        srcc= Get_JS_PageParts(id);
                                    }                                
                                    parts.scripts.Add(new ScriptTag{
                                    id = id.Replace("_PAGEFLAKES_",flakeId),
                                    src = srcc,
                                    content = content
                                });
                                }
                            }
                        }
                            // ---------------------------------------------------------
                            // 3. flakeMeta → importUrl, exportUrl, xslUrl
                            // ---------------------------------------------------------
                        var metaNode = doc.DocumentNode.SelectSingleNode("//flakeMeta");
                        if (metaNode != null){
                            parts.exportUrl = metaNode.GetAttributeValue("exportUrl", "").Replace("__SITEPREFIX__", Pageflakes.Common.Constants.SITE_PREFIX); 
                            parts.importUrl = metaNode.GetAttributeValue("importUrl", "").Replace("__SITEPREFIX__",Pageflakes.Common.Constants.SITE_PREFIX); 
                            parts.xslUrl = metaNode.GetAttributeValue("xslUrl", "").Replace("__SITEPREFIX__",Pageflakes.Common.Constants.SITE_PREFIX);
                        }
                            // ---------------------------------------------------------
                            // 4. BODY → PageParts.body
                            // ---------------------------------------------------------
                        var bodyNode = doc.DocumentNode.SelectSingleNode("//body");
                        if (bodyNode != null){
                            parts.body = bodyNode.InnerHtml.Trim().Replace("_PAGEFLAKES_",flakeId);
                            //parts.body = Parts.body.Replace("_PAGEFLAKES_",flakeId);
                        }
                        else{
                            parts.body =filehtml.ToString();
                        }
                    }                     
                    else { 
                        // Aucun module trouvé 
                        parts.body = "<div class='error'>Aucun module trouvé pour cette URL.</div>"; 
                        parts.id = flakeId; 
                        parts.title = "Inconnu"; 
                        parts.url = URL; 
                        parts.icon = ""; 
                        //page.texts = new ModuleTexts { schema = "", xml = "" }; 
                    }
                } 
            } 
            parts.Permission = new permission{
                CanClose = true,
                CanEdit = true,
                CanCollapse = true,
                CanDrag = true
            };
            return parts;
        }

    }


            
}
