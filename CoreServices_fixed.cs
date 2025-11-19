using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Web.Script.Services;
using System.Web.Security;
using System.Web.Services;

[WebService(Namespace = "http://pageflakes.com/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// Pour autoriser l'appel de ce service Web depuis un script à l'aide d'ASP.NET AJAX, supprimez les marques de commentaire de la ligne suivante. 
// [System.Web.Script.Services.ScriptService]
public class CoreServices : System.Web.Services.WebService {
    private string ConnectionString
{
    get
    {
        var conn = ConfigurationManager.ConnectionStrings["PageflakesConnectionString"];
        if (conn == null || string.IsNullOrEmpty(conn.ConnectionString))
            throw new InvalidOperationException("Connection string 'PageflakesConnectionString' not found.");
        return conn.ConnectionString;
    }
}   
    private Guid? GetCurrentUserId()
{
    MembershipUser user = Membership.GetUser();
    if (user == null || user.ProviderUserKey == null)
        return null;

    try
    {
        return (Guid)user.ProviderUserKey;
    }
    catch
    {
        return null; // fallback si cast échoue
    }
}
    public CoreServices () {

    }

   [WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object RemovePage(string pageId)
{  
       Guid? userId = GetCurrentUserId();
    if (userId == null)
        return new { Success = false, Error = "User not authenticated" };

    int pid; if (!int.TryParse(pageId, out pid))
        return new { Success = false, Error = "Invalid pageId" };

    using (var conn = new SqlConnection(ConnectionString))
    {
        conn.Open();
        using (var tran = conn.BeginTransaction())
        {
            try
            {
                // Supprimer profils liés aux modules de la page
                var cmdProfiles = new SqlCommand(
                    @"DELETE FROM Profiles 
                      WHERE ModuleId IN (SELECT ModuleId FROM Modules WHERE PageId=@pid AND UserId=@uid)", conn, tran);
                cmdProfiles.Parameters.AddWithValue("@pid", pid);
                cmdProfiles.Parameters.AddWithValue("@uid", userId);
                cmdProfiles.ExecuteNonQuery();

                // Supprimer permissions liées
                var cmdPerms = new SqlCommand(
                    @"DELETE FROM Permissions 
                      WHERE ModuleId IN (SELECT ModuleId FROM Modules WHERE PageId=@pid AND UserId=@uid)", conn, tran);
                cmdPerms.Parameters.AddWithValue("@pid", pid);
                cmdPerms.Parameters.AddWithValue("@uid", userId);
                cmdPerms.ExecuteNonQuery();

                // Supprimer préférences liées
                var cmdPrefs = new SqlCommand(
                    @"DELETE FROM ModulePreferences 
                      WHERE ModuleId IN (SELECT ModuleId FROM Modules WHERE PageId=@pid AND UserId=@uid)", conn, tran);
                cmdPrefs.Parameters.AddWithValue("@pid", pid);
                cmdPrefs.Parameters.AddWithValue("@uid", userId);
                cmdPrefs.ExecuteNonQuery();

                // Supprimer modules
                var cmdModules = new SqlCommand(
                    "DELETE FROM Modules WHERE PageId=@pid AND UserId=@uid", conn, tran);
                cmdModules.Parameters.AddWithValue("@pid", pid);
                cmdModules.Parameters.AddWithValue("@uid", userId);
                cmdModules.ExecuteNonQuery();

                // Supprimer la page
                var cmdPage = new SqlCommand(
                    "DELETE FROM Pages WHERE PageId=@pid AND UserId=@uid", conn, tran);
                cmdPage.Parameters.AddWithValue("@pid", pid);
                cmdPage.Parameters.AddWithValue("@uid", userId);
                int rows = cmdPage.ExecuteNonQuery();

                if (rows == 0)
                {
                    tran.Rollback();
                    return new { Success = false, Error = "Page not found or not owned by user" };
                }

                tran.Commit();
                return new { Success = true, RemovedPageId = pid };
            }
            catch (Exception ex)
            {
                tran.Rollback();
                return new { Success = false, Error = ex.Message };
            }
        }
    }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object RemoveModule(string id)
{
    Guid? userId = GetCurrentUserId();
    if (userId == null)
        return new { Success = false, Error = "User not authenticated" };
    int mid; if (!int.TryParse(id, out mid))
        return new { Success = false, Error = "Invalid moduleId" };
    using (var conn = new SqlConnection(ConnectionString))
    {
        conn.Open();
        using (var tran = conn.BeginTransaction())
        {
            try
            {
                // Supprimer profils liés au module
                var cmdProfiles = new SqlCommand("DELETE FROM Profiles WHERE ModuleId=@mid", conn, tran);
                cmdProfiles.Parameters.AddWithValue("@mid", mid);
                cmdProfiles.ExecuteNonQuery();
                // Supprimer permissions liées
                var cmdPerms = new SqlCommand("DELETE FROM Permissions WHERE ModuleId=@mid", conn, tran);
                cmdPerms.Parameters.AddWithValue("@mid", mid);
                cmdPerms.ExecuteNonQuery();
                // Supprimer préférences liées
                var cmdPrefs = new SqlCommand("DELETE FROM ModulePreferences WHERE ModuleId=@mid", conn, tran);
                cmdPrefs.Parameters.AddWithValue("@mid", mid);
                cmdPrefs.ExecuteNonQuery();
                // Supprimer le module
                var cmdModule = new SqlCommand("DELETE FROM Modules WHERE ModuleId=@mid AND UserId=@uid", conn, tran);
                cmdModule.Parameters.AddWithValue("@mid", mid);
                cmdModule.Parameters.AddWithValue("@uid", userId);
                int rows = cmdModule.ExecuteNonQuery();
                if (rows == 0)
                {
                    tran.Rollback();
                    return new { Success = false, Error = "Module not found or not owned by user" };
                }
                tran.Commit();
                return new { Success = true, RemovedModuleId = mid };
            }
            catch (Exception ex)
            {
                tran.Rollback();
                return new { Success = false, Error = ex.Message };
            }
        }
    }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object CreateNewModule(string title, string url, string pageID, int row, int col)
{
    Guid? userId = GetCurrentUserId();
    int pid;
    if (userId == null)
        return new { Success = false, Error = "User not authenticated" };
    if (!int.TryParse(pageID, out pid))
        return new { Success = false, Error = "Invalid pageId" };
    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand(
            @"INSERT INTO Modules (PageId, UserId, Title, Url, Row, Col) 
              OUTPUT INSERTED.ModuleId 
              VALUES (@pid, @uid, @title, @url, @row, @col)", conn))
        {
            cmd.Parameters.AddWithValue("@pid", pid);
            cmd.Parameters.AddWithValue("@uid", userId);
            cmd.Parameters.AddWithValue("@title", title);
            cmd.Parameters.AddWithValue("@url", url);
            cmd.Parameters.AddWithValue("@row", row);
            cmd.Parameters.AddWithValue("@col", col);
            conn.Open();
            int newModuleId = (int)cmd.ExecuteScalar();
            return new
            {
                Success = true,
                ModuleId = newModuleId,
                PageId = pid,
                Title = title,
                Url = url,
                Row = row,
                Col = col
            };
        }
    }
    catch (Exception ex)
    {
        return new { Success = false, Error = ex.Message };
    }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object GetWWHtml()
{
    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand("SELECT HtmlContent FROM SiteContents WHERE Name='ww'", conn))
        {
            conn.Open();
            object result = cmd.ExecuteScalar();
            var html = result != null ? result.ToString() :"<div>No content</div>";
            return new { Success = true, Html = html };
        }
    }
    catch (Exception ex)
    {
        return new { Success = false, Error = ex.Message };
    }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object TestETag(string param)
{
    return new { Success = true, Param = param, Timestamp = DateTime.UtcNow };
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object RebuildPage(string pageId, string interests, string location)
{
    Guid? userId = GetCurrentUserId();
    if (userId == null) return new { Success = false, Error = "User not authenticated" };
    return new { Success = true, PageId = pageId, Interests = interests, Location = location, RebuiltAt = DateTime.UtcNow };
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object GetUserEmail()
{
    string email = (Membership.GetUser() != null ? Membership.GetUser().Email : null);
    return string.IsNullOrEmpty(email) ? new { Success = false, Error = "No email found" } : new { Success = true, Email = email };
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object UpdateInProductMessageSettings(string inProductMessageType)
{
    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand("UPDATE UserSettings SET Value=@val WHERE UserId=@uid AND Name='InProductMessageType'", conn))
        {
            cmd.Parameters.AddWithValue("@val", inProductMessageType);
            cmd.Parameters.AddWithValue("@uid", ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null));
            conn.Open();
            int rows = cmd.ExecuteNonQuery();
            return rows > 0 ? new { Success = true, Type = inProductMessageType }
                            : new { Success = false, Error = "Setting not found" };
        }
    }
    catch (Exception ex)
    {
        return new { Success = false, Error = ex.Message };
    }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object DeleteProfilePhoto()
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    if (string.IsNullOrEmpty(userId))
        return new { Success = false, Error = "User not authenticated" };
    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand("UPDATE UserProfiles SET Photo=NULL WHERE UserId=@uid", conn))
        {
            cmd.Parameters.AddWithValue("@uid", userId);
            conn.Open();
            int rows = cmd.ExecuteNonQuery();
            return rows > 0 ? new { Success = true } : new { Success = false, Error = "Profile not found" };
        }
    }
    catch (Exception ex)
    {
        return new { Success = false, Error = ex.Message };
    }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object GetPublicUrlInfo()
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    return new { Success = true, Url = userId + "http://pageflakes.com/user/" };
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object GetPublicProfile()
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand("SELECT PublicProfile FROM UserProfiles WHERE UserId=@uid", conn))
        {
            cmd.Parameters.AddWithValue("@uid", userId);
            conn.Open();
            var profile = Convert.ToString(cmd.ExecuteScalar()) ?? "";
            return new { Success = true, Profile = profile };
        }
    }
    catch (Exception ex)
    {
        return new { Success = false, Error = ex.Message };
    }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object GetUserProfile()
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand("SELECT ProfileData FROM UserProfiles WHERE UserId=@uid", conn))
        {
            cmd.Parameters.AddWithValue("@uid", userId);
            conn.Open();
            var profile = Convert.ToString(cmd.ExecuteScalar()) ?? "";
            return new { Success = true, Profile = profile };
        }
    }
    catch (Exception ex)
    {
        return new { Success = false, Error = ex.Message };
    }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object SavePublicProfile(string profileData)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand("UPDATE UserProfiles SET PublicProfile=@data WHERE UserId=@uid", conn))
        {
            cmd.Parameters.AddWithValue("@data", profileData);
            cmd.Parameters.AddWithValue("@uid", userId);
            conn.Open();
            int rows = cmd.ExecuteNonQuery();
            return rows > 0 ? new { Success = true, ProfileData = profileData }
                            : new { Success = false, Error = "Profile not found" };
        }
    }
    catch (Exception ex)
    {
        return new { Success = false, Error = ex.Message };
    }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object SaveUserProfile(string profileString)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    if (string.IsNullOrEmpty(userId)) return new { Success = false, Error = "User not authenticated" };
    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand("UPDATE UserProfiles SET ProfileData=@data WHERE UserId=@uid", conn))
        {
            cmd.Parameters.AddWithValue("@data", profileString);
            cmd.Parameters.AddWithValue("@uid", userId);
            conn.Open();
            int rows = cmd.ExecuteNonQuery();
            return rows > 0 ? new { Success = true, ProfileString = profileString }
                            : new { Success = false, Error = "Profile not found" };
        }
    }
    catch (Exception ex) { return new { Success = false, Error = ex.Message }; }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object SetupPage(string setupInfo)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    if (string.IsNullOrEmpty(userId)) return new { Success = false, Error = "User not authenticated" };

    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand("INSERT INTO PageSetup (UserId, SetupInfo) VALUES (@uid, @info)", conn))
        {
            cmd.Parameters.AddWithValue("@uid", userId);
            cmd.Parameters.AddWithValue("@info", setupInfo);
            conn.Open();
            cmd.ExecuteNonQuery();
        }
        return new { Success = true, SetupInfo = setupInfo };
    }
    catch (Exception ex) { return new { Success = false, Error = ex.Message }; }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object GetPageflake(string source, string pageID, string userUniqueName, string themeName)
{
    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand("SELECT * FROM Pages WHERE PageId=@pid", conn))
        {
            cmd.Parameters.AddWithValue("@pid", pageID);
            conn.Open();
            using (var reader = cmd.ExecuteReader())
            {
                if (reader.Read())
                {
                    return new {
                        Success = true,
                        PageId = reader["PageId"],
                        Title = reader["Title"],
                        Theme = themeName,
                        Source = source,
                        User = userUniqueName
                    };
                }
            }
        }
        return new { Success = false, Error = "Page not found" };
    }
    catch (Exception ex) { return new { Success = false, Error = ex.Message }; }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object GetPassword(string email)
{
    // ⚠️ En production, on ne renvoie jamais le mot de passe en clair.
    // Ici on simule un reset.
    try
    {
        // Logique : insérer une demande de reset dans PasswordResets
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand("INSERT INTO PasswordResets (Email, RequestedAt) VALUES (@mail, GETDATE())", conn))
        {
            cmd.Parameters.AddWithValue("@mail", email);
            conn.Open();
            cmd.ExecuteNonQuery();
        }
        return new { Success = true, Email = email, Message = "Password reset instructions sent." };
    }
    catch (Exception ex) { return new { Success = false, Error = ex.Message }; }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object GetPageModules(string pageId)
{
    int pid; if (!int.TryParse(pageId, out pid)) return new { Success = false, Error = "Invalid pageId" };
    var modules = new List<object>();
    using (var conn = new SqlConnection(ConnectionString))
    using (var cmd = new SqlCommand("SELECT ModuleId, Title, Url, Row, Col FROM Modules WHERE PageId=@pid", conn))
    {
        cmd.Parameters.AddWithValue("@pid", pid);
        conn.Open();
        using (var reader = cmd.ExecuteReader())
        {
            while (reader.Read())
            {
                modules.Add(new {
                    ModuleId = reader["ModuleId"],
                    Title = reader["Title"],
                    Url = reader["Url"],
                    Row = reader["Row"],
                    Col = reader["Col"]
                });
            }
        }
    }
    return new { Success = true, PageId = pid, Modules = modules };
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object Login(string username, string password, bool rememberme)
{
    bool valid = Membership.ValidateUser(username, password);
    if (!valid) return new { Success = false, Error = "Invalid login" };
    FormsAuthentication.SetAuthCookie(username, rememberme);
    return new { Success = true, Username = username };
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object GetPageVersionNo(string pageId)
{
    int pid; if (!int.TryParse(pageId, out pid)) return new { Success = false, Error = "Invalid pageId" };
    using (var conn = new SqlConnection(ConnectionString))
    using (var cmd = new SqlCommand("SELECT VersionNo FROM Pages WHERE PageId=@pid", conn))
    {
        cmd.Parameters.AddWithValue("@pid", pid);
        conn.Open();
        var version = Convert.ToString(cmd.ExecuteScalar()) ?? "0";
        return new { Success = true, PageId = pid, Version = version };
    }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object GetPageContent(string userGuid, string pageId, string siteVersion)
{
    int pid; if (!int.TryParse(pageId, out pid)) return new { Success = false, Error = "Invalid pageId" };
    using (var conn = new SqlConnection(ConnectionString))
    using (var cmd = new SqlCommand("SELECT Content FROM Pages WHERE PageId=@pid", conn))
    {
        cmd.Parameters.AddWithValue("@pid", pid);
        conn.Open();
        var content = Convert.ToString(cmd.ExecuteScalar()) ?? "";
        return new { Success = true, PageId = pid, Content = content, SiteVersion = siteVersion };
    }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object GetPages(string pageInfos)
{
    var pages = new List<object>();
    using (var conn = new SqlConnection(ConnectionString))
    using (var cmd = new SqlCommand("SELECT PageId, Title, Url FROM Pages WHERE UserId=@uid", conn))
    {
        cmd.Parameters.AddWithValue("@uid", ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null));
        conn.Open();
        using (var reader = cmd.ExecuteReader())
        {
            while (reader.Read())
            {
                pages.Add(new {
                    PageId = reader["PageId"],
                    Title = reader["Title"],
                    Url = reader["Url"]
                });
            }
        }
    }
    return new { Success = true, Pages = pages };
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object SavePage(string pageData)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    if (string.IsNullOrEmpty(userId)) return new { Success = false, Error = "User not authenticated" };
    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand("UPDATE Pages SET Data=@data WHERE UserId=@uid", conn))
        {
            cmd.Parameters.AddWithValue("@data", pageData);
            cmd.Parameters.AddWithValue("@uid", userId);
            conn.Open();
            int rows = cmd.ExecuteNonQuery();
            return rows > 0 ? new { Success = true, PageData = pageData }
                            : new { Success = false, Error = "Page not found" };
        }
    }
    catch (Exception ex) { return new { Success = false, Error = ex.Message }; }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object RemovePage(string pageId)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    if (string.IsNullOrEmpty(userId)) return new { Success = false, Error = "User not authenticated" };
    int pid; if (!int.TryParse(pageId, out pid)) return new { Success = false, Error = "Invalid pageId" };
    using (var conn = new SqlConnection(ConnectionString))
    {
        conn.Open();
        using (var tran = conn.BeginTransaction())
        {
            try
            {
                // Supprimer modules liés
                var cmdModules = new SqlCommand("DELETE FROM Modules WHERE PageId=@pid AND UserId=@uid", conn, tran);
                cmdModules.Parameters.AddWithValue("@pid", pid);
                cmdModules.Parameters.AddWithValue("@uid", userId);
                cmdModules.ExecuteNonQuery();
                // Supprimer la page
                var cmdPage = new SqlCommand("DELETE FROM Pages WHERE PageId=@pid AND UserId=@uid", conn, tran);
                cmdPage.Parameters.AddWithValue("@pid", pid);
                cmdPage.Parameters.AddWithValue("@uid", userId);
                int rows = cmdPage.ExecuteNonQuery();
                if (rows == 0)
                {
                    tran.Rollback();
                    return new { Success = false, Error = "Page not found or not owned by user" };
                }

                tran.Commit();
                return new { Success = true, RemovedPageId = pid };
            }
            catch (Exception ex)
            {
                tran.Rollback();
                return new { Success = false, Error = ex.Message };
            }
        }
    }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object GetModules(string pageId)
{
    int pid; if (!int.TryParse(pageId, out pid)) return new { Success = false, Error = "Invalid pageId" };
    var modules = new List<object>();
    using (var conn = new SqlConnection(ConnectionString))
    using (var cmd = new SqlCommand("SELECT ModuleId, Title, Url, Row, Col FROM Modules WHERE PageId=@pid", conn))
    {
        cmd.Parameters.AddWithValue("@pid", pid);
        conn.Open();
        using (var reader = cmd.ExecuteReader())
        {
            while (reader.Read())
            {
                modules.Add(new {
                    ModuleId = reader["ModuleId"],
                    Title = reader["Title"],
                    Url = reader["Url"],
                    Row = reader["Row"],
                    Col = reader["Col"]
                });
            }
        }
    }
    return new { Success = true, PageId = pid, Modules = modules };
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object SaveLayout(string pageProperties, string modules)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    if (string.IsNullOrEmpty(userId)) return new { Success = false, Error = "User not authenticated" };
    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand("UPDATE Pages SET Properties=@props WHERE UserId=@uid", conn))
        {
            cmd.Parameters.AddWithValue("@props", pageProperties);
            cmd.Parameters.AddWithValue("@uid", userId);
            conn.Open();
            int rows = cmd.ExecuteNonQuery();
            return rows > 0 ? new { Success = true, Properties = pageProperties, Modules = modules }
                            : new { Success = false, Error = "Page not found" };
        }
    }
    catch (Exception ex) { return new { Success = false, Error = ex.Message }; }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object SavePageOrder(string pageOrders)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand("UPDATE Pages SET OrderData=@orders WHERE UserId=@uid", conn))
        {
            cmd.Parameters.AddWithValue("@orders", pageOrders);
            cmd.Parameters.AddWithValue("@uid", userId);
            conn.Open();
            cmd.ExecuteNonQuery();
        }
        return new { Success = true, PageOrders = pageOrders };
    }
    catch (Exception ex) { return new { Success = false, Error = ex.Message }; }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object SetCurrentPage(string pageId)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand("UPDATE Users SET CurrentPageId=@pid WHERE UserId=@uid", conn))
        {
            cmd.Parameters.AddWithValue("@pid", pageId);
            cmd.Parameters.AddWithValue("@uid", userId);
            conn.Open();
            cmd.ExecuteNonQuery();
        }
        return new { Success = true, CurrentPageId = pageId };
    }
    catch (Exception ex) { return new { Success = false, Error = ex.Message }; }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object GetPage(string id, string url)
{
    using (var conn = new SqlConnection(ConnectionString))
    using (var cmd = new SqlCommand("SELECT PageId, Title, Url FROM Pages WHERE PageId=@id OR Url=@url", conn))
    {
        cmd.Parameters.AddWithValue("@id", id);
        cmd.Parameters.AddWithValue("@url", url);
        conn.Open();
        using (var reader = cmd.ExecuteReader())
        {
            if (reader.Read())
            {
                return new
                {
                    Success = true,
                    PageId = reader["PageId"],
                    Title = reader["Title"],
                    Url = reader["Url"]
                };
            }
        }
    }
    return new { Success = false, Error = "Page not found" };
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object GetModule(string instanceId)
{
    using (var conn = new SqlConnection(ConnectionString))
    using (var cmd = new SqlCommand("SELECT ModuleId, Title, Url, Row, Col FROM Modules WHERE ModuleId=@mid", conn))
    {
        cmd.Parameters.AddWithValue("@mid", instanceId);
        conn.Open();
        using (var reader = cmd.ExecuteReader())
        {
            if (reader.Read())
            {
                return new
                {
                    Success = true,
                    ModuleId = reader["ModuleId"],
                    Title = reader["Title"],
                    Url = reader["Url"],
                    Row = reader["Row"],
                    Col = reader["Col"]
                };
            }
        }
    }
    return new { Success = false, Error = "Module not found" };
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object SaveModule(string pageId, string moduleProperties)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand("UPDATE Modules SET Properties=@props WHERE PageId=@pid AND UserId=@uid", conn))
        {
            cmd.Parameters.AddWithValue("@props", moduleProperties);
            cmd.Parameters.AddWithValue("@pid", pageId);
            cmd.Parameters.AddWithValue("@uid", userId);
            conn.Open();
            int rows = cmd.ExecuteNonQuery();
            return rows > 0 ? new { Success = true, PageId = pageId, Properties = moduleProperties }
                            : new { Success = false, Error = "Module not found" };
        }
    }
    catch (Exception ex) { return new { Success = false, Error = ex.Message }; }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object RemoveModule(string id)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    if (string.IsNullOrEmpty(userId)) return new { Success = false, Error = "User not authenticated" };
    int mid; if (!int.TryParse(id, out mid)) return new { Success = false, Error = "Invalid moduleId" };
    using (var conn = new SqlConnection(ConnectionString))
    {
        conn.Open();
        using (var tran = conn.BeginTransaction())
        {
            try
            {
                // Vérifier que le module appartient à l'utilisateur
                var check = new SqlCommand("SELECT COUNT(1) FROM Modules WHERE ModuleId=@mid AND UserId=@uid", conn, tran);
                check.Parameters.AddWithValue("@mid", mid);
                check.Parameters.AddWithValue("@uid", userId);
                int owned = (int)check.ExecuteScalar();
                if (owned == 0)
                {
                    tran.Rollback();
                    return new { Success = false, Error = "Module not found or not owned by user" };
                }

                // Supprimer préférences
                var cmdPrefs = new SqlCommand("DELETE FROM ModulePreferences WHERE ModuleId=@mid", conn, tran);
                cmdPrefs.Parameters.AddWithValue("@mid", mid);
                cmdPrefs.ExecuteNonQuery();

                // Supprimer permissions
                var cmdPerms = new SqlCommand("DELETE FROM Permissions WHERE ModuleId=@mid", conn, tran);
                cmdPerms.Parameters.AddWithValue("@mid", mid);
                cmdPerms.ExecuteNonQuery();

                // Supprimer profils liés (si table Profiles existe)
                var cmdProfiles = new SqlCommand("DELETE FROM Profiles WHERE ModuleId=@mid", conn, tran);
                cmdProfiles.Parameters.AddWithValue("@mid", mid);
                cmdProfiles.ExecuteNonQuery();

                // Supprimer le module
                var cmdModule = new SqlCommand("DELETE FROM Modules WHERE ModuleId=@mid AND UserId=@uid", conn, tran);
                cmdModule.Parameters.AddWithValue("@mid", mid);
                cmdModule.Parameters.AddWithValue("@uid", userId);
                int rows = cmdModule.ExecuteNonQuery();
                if (rows == 0)
                {
                    tran.Rollback();
                    return new { Success = false, Error = "Module delete failed" };
                }

                tran.Commit();
                return new { Success = true, RemovedModuleId = mid };
            }
            catch (Exception ex)
            {
                tran.Rollback();
                return new { Success = false, Error = ex.Message };
            }
        }
    }
}
    [WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object MoveModuleToPage(string moduleId, string fromPageId, string toPageId)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    if (string.IsNullOrEmpty(userId))
        return new { Success = false, Error = "User not authenticated" };
    int mid; if (!int.TryParse(moduleId, out mid))
        return new { Success = false, Error = "Invalid moduleId" };
    int fromPid; if (!int.TryParse(fromPageId, out fromPid))
        return new { Success = false, Error = "Invalid fromPageId" };
    int toPid; if (!int.TryParse(toPageId, out toPid))
        return new { Success = false, Error = "Invalid toPageId" };
    using (var conn = new SqlConnection(ConnectionString))
    {
        conn.Open();
        using (var tran = conn.BeginTransaction())
        {
            try
            {
                // Vérifier que le module existe et appartient à l'utilisateur
                var checkModule = new SqlCommand(
                    "SELECT COUNT(1) FROM Modules WHERE ModuleId=@mid AND PageId=@fromPid AND UserId=@uid",
                    conn, tran);
                checkModule.Parameters.AddWithValue("@mid", mid);
                checkModule.Parameters.AddWithValue("@fromPid", fromPid);
                checkModule.Parameters.AddWithValue("@uid", userId);
                int exists = (int)checkModule.ExecuteScalar();
                if (exists == 0)
                {
                    tran.Rollback();
                    return new { Success = false, Error = "Module not found or not owned by user" };
                }

                // Vérifier que la page destination existe
                var checkPage = new SqlCommand(
                    "SELECT COUNT(1) FROM Pages WHERE PageId=@toPid AND UserId=@uid",
                    conn, tran);
                checkPage.Parameters.AddWithValue("@toPid", toPid);
                checkPage.Parameters.AddWithValue("@uid", userId);
                int pageExists = (int)checkPage.ExecuteScalar();
                if (pageExists == 0)
                {
                    tran.Rollback();
                    return new { Success = false, Error = "Destination page not found or not owned by user" };
                }
                // Déplacer le module
                var moveCmd = new SqlCommand(
                    "UPDATE Modules SET PageId=@toPid WHERE ModuleId=@mid AND UserId=@uid",
                    conn, tran);
                moveCmd.Parameters.AddWithValue("@toPid", toPid);
                moveCmd.Parameters.AddWithValue("@mid", mid);
                moveCmd.Parameters.AddWithValue("@uid", userId);
                int rows = moveCmd.ExecuteNonQuery();

                if (rows == 0)
                {
                    tran.Rollback();
                    return new { Success = false, Error = "Failed to move module" };
                }

                tran.Commit();
                return new
                {
                    Success = true,
                    ModuleId = mid,
                    FromPage = fromPid,
                    ToPage = toPid
                };
            }
            catch (Exception ex)
            {
                tran.Rollback();
                return new { Success = false, Error = ex.Message };
            }
        }
    }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object CreateNewModule(string title, string url, string pageID, int row, int col)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    if (string.IsNullOrEmpty(userId)) return new { Success = false, Error = "User not authenticated" };
    int pid; if (!int.TryParse(pageID, out pid)) return new { Success = false, Error = "Invalid pageId" };
    if (string.IsNullOrWhiteSpace(title)) return new { Success = false, Error = "Title required" };

    using (var conn = new SqlConnection(ConnectionString))
    {
        conn.Open();
        using (var tran = conn.BeginTransaction())
        {
            try
            {
                // Vérifier que la page appartient à l’utilisateur
                var check = new SqlCommand("SELECT COUNT(1) FROM Pages WHERE PageId=@pid AND UserId=@uid", conn, tran);
                check.Parameters.AddWithValue("@pid", pid);
                check.Parameters.AddWithValue("@uid", userId);
                if ((int)check.ExecuteScalar() == 0)
                {
                    tran.Rollback();
                    return new { Success = false, Error = "Page not found or not owned by user" };
                }

                // Créer le module
                var cmd = new SqlCommand(
                    @"INSERT INTO Modules (PageId, UserId, Title, Url, Row, Col, Properties, CreatedAt)
                      OUTPUT INSERTED.ModuleId
                      VALUES (@pid, @uid, @title, @url, @row, @col, '{}', GETUTCDATE())", conn, tran);
                cmd.Parameters.AddWithValue("@pid", pid);
                cmd.Parameters.AddWithValue("@uid", userId);
                cmd.Parameters.AddWithValue("@title", title);
                cmd.Parameters.AddWithValue("@url", (object)url ?? DBNull.Value);
                cmd.Parameters.AddWithValue("@row", row);
                cmd.Parameters.AddWithValue("@col", col);
                int newModuleId = (int)cmd.ExecuteScalar();
                tran.Commit();
                return new
                {
                    Success = true,
                    ModuleId = newModuleId,
                    PageId = pid,
                    Title = title,
                    Url = url,
                    Row = row,
                    Col = col
                };
            }
            catch (Exception ex)
            {
                tran.Rollback();
                return new { Success = false, Error = ex.Message };
            }
        }
    }
}
    //non dispo dans coreservices
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object UpdateModulePosition(string moduleId, int row, int col)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    int mid; if (!int.TryParse(moduleId, out mid)) return new { Success = false, Error = "Invalid moduleId" };

    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand("UPDATE Modules SET Row=@row, Col=@col WHERE ModuleId=@mid AND UserId=@uid", conn))
        {
            cmd.Parameters.AddWithValue("@row", row);
            cmd.Parameters.AddWithValue("@col", col);
            cmd.Parameters.AddWithValue("@mid", mid);
            cmd.Parameters.AddWithValue("@uid", userId);
            conn.Open();
            int rows = cmd.ExecuteNonQuery();
            return rows > 0
                ? new { Success = true, ModuleId = mid, Row = row, Col = col }
                : new { Success = false, Error = "Module not found or not owned by user" };
        }
    }
    catch (Exception ex) { return new { Success = false, Error = ex.Message }; }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object UpdateModuleTitle(string moduleId, string newTitle)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    int mid; if (!int.TryParse(moduleId, out mid)) return new { Success = false, Error = "Invalid moduleId" };
    if (string.IsNullOrWhiteSpace(newTitle)) return new { Success = false, Error = "Title required" };

    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand("UPDATE Modules SET Title=@title WHERE ModuleId=@mid AND UserId=@uid", conn))
        {
            cmd.Parameters.AddWithValue("@title", newTitle);
            cmd.Parameters.AddWithValue("@mid", mid);
            cmd.Parameters.AddWithValue("@uid", userId);
            conn.Open();
            int rows = cmd.ExecuteNonQuery();
            return rows > 0
                ? new { Success = true, ModuleId = mid, Title = newTitle }
                : new { Success = false, Error = "Module not found or not owned by user" };
        }
    }
    catch (Exception ex) { return new { Success = false, Error = ex.Message }; }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object CloneModule(string moduleId, string targetPageId)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    int mid; if (!int.TryParse(moduleId, out mid)) return new { Success = false, Error = "Invalid moduleId" };
    int tpid; if (!int.TryParse(targetPageId, out tpid)) return new { Success = false, Error = "Invalid targetPageId" };

    using (var conn = new SqlConnection(ConnectionString))
    {
        conn.Open();
        using (var tran = conn.BeginTransaction())
        {
            try
            {
                // Lire le module source
                var read = new SqlCommand("SELECT Title, Url, Row, Col, Properties FROM Modules WHERE ModuleId=@mid AND UserId=@uid", conn, tran);
                read.Parameters.AddWithValue("@mid", mid);
                read.Parameters.AddWithValue("@uid", userId);
                using (var r = read.ExecuteReader())
                {
                    if (!r.Read())
                    {
                        r.Close();
                        tran.Rollback();
                        return new { Success = false, Error = "Source module not found or not owned by user" };
                    }
                    string title = r["Title"].ToString();
                    string url = r["Url"] as string;
                    int row = Convert.ToInt32(r["Row"]);
                    int col = Convert.ToInt32(r["Col"]);
                    string props = r["Properties"].ToString();
                    r.Close();

                    // Vérifier page destination
                    var checkPage = new SqlCommand("SELECT COUNT(1) FROM Pages WHERE PageId=@pid AND UserId=@uid", conn, tran);
                    checkPage.Parameters.AddWithValue("@pid", tpid);
                    checkPage.Parameters.AddWithValue("@uid", userId);
                    if ((int)checkPage.ExecuteScalar() == 0)
                    {
                        tran.Rollback();
                        return new { Success = false, Error = "Target page not found or not owned by user" };
                    }

                    // Insérer le clone
                    var insert = new SqlCommand(
                        @"INSERT INTO Modules (PageId, UserId, Title, Url, Row, Col, Properties, CreatedAt)
                          OUTPUT INSERTED.ModuleId
                          VALUES (@pid, @uid, @title, @url, @row, @col, @props, GETUTCDATE())", conn, tran);
                    insert.Parameters.AddWithValue("@pid", tpid);
                    insert.Parameters.AddWithValue("@uid", userId);
                    insert.Parameters.AddWithValue("@title", title);
                    insert.Parameters.AddWithValue("@url", (object)url ?? DBNull.Value);
                    insert.Parameters.AddWithValue("@row", row);
                    insert.Parameters.AddWithValue("@col", col);
                    insert.Parameters.AddWithValue("@props", props);
                    int newId = (int)insert.ExecuteScalar();

                    tran.Commit();
                    return new { Success = true, ClonedFrom = mid, NewModuleId = newId, TargetPageId = tpid };
                }
            }
            catch (Exception ex)
            {
                tran.Rollback();
                return new { Success = false, Error = ex.Message };
            }
        }
    }
}
    // FIN DE NON DISPO
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object CreateNewPage(string title, string urlSlug, string templateName)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    if (string.IsNullOrEmpty(userId)) return new { Success = false, Error = "User not authenticated" };
    if (string.IsNullOrWhiteSpace(title)) return new { Success = false, Error = "Title required" };

    using (var conn = new SqlConnection(ConnectionString))
    {
        conn.Open();
        using (var tran = conn.BeginTransaction())
        {
            try
            {
                // URL slug unique pour l'utilisateur
                var exists = new SqlCommand("SELECT COUNT(1) FROM Pages WHERE Url=@url AND UserId=@uid", conn, tran);
                exists.Parameters.AddWithValue("@url", urlSlug);
                exists.Parameters.AddWithValue("@uid", userId);
                if ((int)exists.ExecuteScalar() > 0)
                {
                    tran.Rollback();
                    return new { Success = false, Error = "Url already exists" };
                }

                var insert = new SqlCommand(
                    @"INSERT INTO Pages (UserId, Title, Url, Properties, Content, VersionNo, CreatedAt)
                      OUTPUT INSERTED.PageId
                      VALUES (@uid, @title, @url, '{}', '', 1, GETUTCDATE())", conn, tran);
                insert.Parameters.AddWithValue("@uid", userId);
                insert.Parameters.AddWithValue("@title", title);
                insert.Parameters.AddWithValue("@url", (object)urlSlug ?? DBNull.Value);
                int newPageId = (int)insert.ExecuteScalar();

                // Optionnel: appliquer un template (ex: modules par défaut)
                if (!string.IsNullOrWhiteSpace(templateName))
                {
                    var seed = new SqlCommand(
                        @"INSERT INTO Modules (PageId, UserId, Title, Url, Row, Col, Properties, CreatedAt)
                          VALUES (@pid, @uid, @mtitle, @murl, 0, 0, '{ }', GETUTCDATE())", conn, tran);
                    seed.Parameters.AddWithValue("@pid", newPageId);
                    seed.Parameters.AddWithValue("@uid", userId);
                    seed.Parameters.AddWithValue("@mtitle", templateName + "starter");
                    seed.Parameters.AddWithValue("@murl", DBNull.Value);
                    seed.ExecuteNonQuery();
                }

                tran.Commit();
                return new { Success = true, PageId = newPageId, Title = title, Url = urlSlug };
            }
            catch (Exception ex)
            {
                tran.Rollback();
                return new { Success = false, Error = ex.Message };
            }
        }
    }
}
// NON DISPO
    [WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object RenamePage(string pageId, string newTitle)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    int pid; if (!int.TryParse(pageId, out pid)) return new { Success = false, Error = "Invalid pageId" };
    if (string.IsNullOrWhiteSpace(newTitle)) return new { Success = false, Error = "Title required" };

    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand("UPDATE Pages SET Title=@title WHERE PageId=@pid AND UserId=@uid", conn))
        {
            cmd.Parameters.AddWithValue("@title", newTitle);
            cmd.Parameters.AddWithValue("@pid", pid);
            cmd.Parameters.AddWithValue("@uid", userId);
            conn.Open();
            int rows = cmd.ExecuteNonQuery();
            return rows > 0
                ? new { Success = true, PageId = pid, Title = newTitle }
                : new { Success = false, Error = "Page not found or not owned by user" };
        }
    }
    catch (Exception ex) { return new { Success = false, Error = ex.Message }; }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object PublishPage(string pageId, bool isPublic)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    int pid; if (!int.TryParse(pageId, out pid)) return new { Success = false, Error = "Invalid pageId" };

    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand("UPDATE Pages SET IsPublic=@pub, PublishedAt=CASE WHEN @pub=1 THEN GETUTCDATE() ELSE NULL END WHERE PageId=@pid AND UserId=@uid", conn))
        {
            cmd.Parameters.AddWithValue("@pub", isPublic);
            cmd.Parameters.AddWithValue("@pid", pid);
            cmd.Parameters.AddWithValue("@uid", userId);
            conn.Open();
            int rows = cmd.ExecuteNonQuery();
            return rows > 0
                ? new { Success = true, PageId = pid, IsPublic = isPublic }
                : new { Success = false, Error = "Page not found or not owned by user" };
        }
    }
    catch (Exception ex) { return new { Success = false, Error = ex.Message }; }
}
    //MANQUE PARTIE CODE
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object UnpublishPage(string pageId)
{
    return PublishPage(pageId, false);
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object SharePage(string pageId, string emailAddresses, bool allowEdit)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    int pid; if (!int.TryParse(pageId, out pid)) return new { Success = false, Error = "Invalid pageId" };
    if (string.IsNullOrWhiteSpace(emailAddresses)) return new { Success = false, Error = "Recipients required" };

    var recipients = emailAddresses.Split(new[] { ',', ';' }, StringSplitOptions.RemoveEmptyEntries);

    using (var conn = new SqlConnection(ConnectionString))
    {
        conn.Open();
        using (var tran = conn.BeginTransaction())
        {
            try
            {
                // Vérifier propriété de la page
                var check = new SqlCommand("SELECT COUNT(1) FROM Pages WHERE PageId=@pid AND UserId=@uid", conn, tran);
                check.Parameters.AddWithValue("@pid", pid);
                check.Parameters.AddWithValue("@uid", userId);
                if ((int)check.ExecuteScalar() == 0)
                {
                    tran.Rollback();
                    return new { Success = false, Error = "Page not found or not owned by user" };
                }

                // Insérer partages
                var insert = new SqlCommand(
                    @"INSERT INTO PageShares (PageId, OwnerUserId, RecipientEmail, AllowEdit, SharedAt)
                      VALUES (@pid, @uid, @email, @edit, GETUTCDATE())", conn, tran);
                insert.Parameters.AddWithValue("@pid", pid);
                insert.Parameters.AddWithValue("@uid", userId);
                insert.Parameters.AddWithValue("@edit", allowEdit);

                foreach (var email in recipients)
                {
                    insert.Parameters.RemoveAt("@email");
                    insert.Parameters.AddWithValue("@email", email.Trim());
                    insert.ExecuteNonQuery();
                }

                tran.Commit();
                return new { Success = true, PageId = pid, SharedWith = recipients, AllowEdit = allowEdit };
            }
            catch (Exception ex)
            {
                tran.Rollback();
                return new { Success = false, Error = ex.Message };
            }
        }
    }
}
    [WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object UnsharePage(string pageId, string email)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    int pid; if (!int.TryParse(pageId, out pid)) return new { Success = false, Error = "Invalid pageId" };
    if (string.IsNullOrWhiteSpace(email)) return new { Success = false, Error = "Email required" };

    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand("DELETE FROM PageShares WHERE PageId=@pid AND OwnerUserId=@uid AND RecipientEmail=@mail", conn))
        {
            cmd.Parameters.AddWithValue("@pid", pid);
            cmd.Parameters.AddWithValue("@uid", userId);
            cmd.Parameters.AddWithValue("@mail", email.Trim());
            conn.Open();
            int rows = cmd.ExecuteNonQuery();
            return rows > 0
                ? new { Success = true, PageId = pid, UnsharedEmail = email }
                : new { Success = false, Error = "Share not found" };
        }
    }
    catch (Exception ex) { return new { Success = false, Error = ex.Message }; }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object PublishInCommunity(string pageId, string description, string tags, string title)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    int pid; if (!int.TryParse(pageId, out pid)) return new { Success = false, Error = "Invalid pageId" };

    using (var conn = new SqlConnection(ConnectionString))
    {
        conn.Open();
        try
        {
            var cmd = new SqlCommand(
                @"INSERT INTO CommunityPages (PageId, UserId, Title, Description, Tags, PublishedAt)
                  VALUES (@pid, @uid, @title, @desc, @tags, GETUTCDATE())", conn);
            cmd.Parameters.AddWithValue("@pid", pid);
            cmd.Parameters.AddWithValue("@uid", userId);
            cmd.Parameters.AddWithValue("@title", title);
            cmd.Parameters.AddWithValue("@desc", description);
            cmd.Parameters.AddWithValue("@tags", tags);
            cmd.ExecuteNonQuery();

            return new { Success = true, PageId = pid, Title = title, Tags = tags, Description = description };
        }
        catch (Exception ex) { return new { Success = false, Error = ex.Message }; }
    }
}
    [WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object CreateCopyOfPage(string pageId, string pageOf)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    int pid; if (!int.TryParse(pageId, out pid)) return new { Success = false, Error = "Invalid pageId" };

    using (var conn = new SqlConnection(ConnectionString))
    {
        conn.Open();
        using (var tran = conn.BeginTransaction())
        {
            try
            {
                // Lire la page source
                var read = new SqlCommand("SELECT Title, Url, Properties, Content FROM Pages WHERE PageId=@pid AND UserId=@uid", conn, tran);
                read.Parameters.AddWithValue("@pid", pid);
                read.Parameters.AddWithValue("@uid", userId);
                using (var r = read.ExecuteReader())
                {
                    if (!r.Read())
                    {
                        r.Close();
                        tran.Rollback();
                        return new { Success = false, Error = "Page not found or not owned by user" };
                    }
                    string title = r["Title"].ToString() + " (Copy)";
                    string url = r["Url"].ToString() + "-copy";
                    string props = r["Properties"].ToString();
                    string content = r["Content"].ToString();
                    r.Close();

                    // Créer la copie
                    var insert = new SqlCommand(
                        @"INSERT INTO Pages (UserId, Title, Url, Properties, Content, VersionNo, CreatedAt)
                          OUTPUT INSERTED.PageId
                          VALUES (@uid, @title, @url, @props, @content, 1, GETUTCDATE())", conn, tran);
                    insert.Parameters.AddWithValue("@uid", userId);
                    insert.Parameters.AddWithValue("@title", title);
                    insert.Parameters.AddWithValue("@url", url);
                    insert.Parameters.AddWithValue("@props", props);
                    insert.Parameters.AddWithValue("@content", content);
                    int newPageId = (int)insert.ExecuteScalar();

                    tran.Commit();
                    return new { Success = true, OriginalPageId = pid, NewPageId = newPageId, Title = title };
                }
            }
            catch (Exception ex)
            {
                tran.Rollback();
                return new { Success = false, Error = ex.Message };
            }
        }
    }
}
    [WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object GetRandomPageUrlFromRepository()
{
    using (var conn = new SqlConnection(ConnectionString))
    using (var cmd = new SqlCommand("SELECT TOP 1 Url FROM Pages ORDER BY NEWID()", conn))
    {
        conn.Open();
        var url = Convert.ToString(cmd.ExecuteScalar()) ?? "";
        return new { Success = true, Url = url };
    }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object UnpublishPage(string pageId)
{
    return PublishPage(pageId, false);
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object PublishPageInvite(string pageId, string emailAddresses)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    int pid; if (!int.TryParse(pageId, out pid)) return new { Success = false, Error = "Invalid pageId" };

    var recipients = emailAddresses.Split(new[] { ',', ';' }, StringSplitOptions.RemoveEmptyEntries);

    using (var conn = new SqlConnection(ConnectionString))
    {
        conn.Open();
        try
        {
            var insert = new SqlCommand(
                @"INSERT INTO PageInvites (PageId, OwnerUserId, RecipientEmail, InvitedAt)
                  VALUES (@pid, @uid, @mail, GETUTCDATE())", conn);
            insert.Parameters.AddWithValue("@pid", pid);
            insert.Parameters.AddWithValue("@uid", userId);

            foreach (var email in recipients)
            {
                insert.Parameters.RemoveAt("@mail");
                insert.Parameters.AddWithValue("@mail", email.Trim());
                insert.ExecuteNonQuery();
            }

            return new { Success = true, PageId = pid, Invited = recipients };
        }
        catch (Exception ex) { return new { Success = false, Error = ex.Message }; }
    }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object MakePrivate(string pageId)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    int pid; if (!int.TryParse(pageId, out pid)) return new { Success = false, Error = "Invalid pageId" };

    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand("UPDATE Pages SET IsPublic=0 WHERE PageId=@pid AND UserId=@uid", conn))
        {
            cmd.Parameters.AddWithValue("@pid", pid);
            cmd.Parameters.AddWithValue("@uid", userId);
            conn.Open();
            int rows = cmd.ExecuteNonQuery();
            return rows > 0 ? new { Success = true, PageId = pid, Private = true }
                            : new { Success = false, Error = "Page not found or not owned by user" };
        }
    }
    catch (Exception ex) { return new { Success = false, Error = ex.Message }; }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object SetSharedUsers(string pageId, string email, bool allowEdit)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    int pid; if (!int.TryParse(pageId, out pid)) return new { Success = false, Error = "Invalid pageId" };

    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand(
            @"UPDATE PageShares SET AllowEdit=@edit WHERE PageId=@pid AND OwnerUserId=@uid AND RecipientEmail=@mail", conn))
        {
            cmd.Parameters.AddWithValue("@edit", allowEdit);
            cmd.Parameters.AddWithValue("@pid", pid);
            cmd.Parameters.AddWithValue("@uid", userId);
            cmd.Parameters.AddWithValue("@mail", email.Trim());
            conn.Open();
            int rows = cmd.ExecuteNonQuery();
            return rows > 0 ? new { Success = true, PageId = pid, Email = email, AllowEdit = allowEdit }
                            : new { Success = false, Error = "Share not found" };
        }
    }
    catch (Exception ex) { return new { Success = false, Error = ex.Message }; }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object GetSharedPagesWithMe()
{
    string email = (Membership.GetUser() != null ? Membership.GetUser().Email : null);
    var pages = new List<object>();

    using (var conn = new SqlConnection(ConnectionString))
    using (var cmd = new SqlCommand(
        @"SELECT p.PageId, p.Title, p.Url, s.AllowEdit
          FROM PageShares s
          JOIN Pages p ON s.PageId=p.PageId
          WHERE s.RecipientEmail=@mail", conn))
    {
        cmd.Parameters.AddWithValue("@mail", email);
        conn.Open();
        using (var reader = cmd.ExecuteReader())
        {
            while (reader.Read())
            {
                pages.Add(new {
                    PageId = reader["PageId"],
                    Title = reader["Title"],
                    Url = reader["Url"],
                    AllowEdit = reader["AllowEdit"]
                });
            }
        }
    }
    return new { Success = true, SharedPages = pages };
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object ApproveOrRejectSharedPage(string pageId, bool approve)
{
    string email = (Membership.GetUser() != null ? Membership.GetUser().Email : null);
    if (string.IsNullOrEmpty(email)) return new { Success = false, Error = "User email not found" };
    int pid; if (!int.TryParse(pageId, out pid)) return new { Success = false, Error = "Invalid pageId" };

    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand(
            @"UPDATE PageShares
              SET Approved=@approve,
                  ApprovedAt = CASE WHEN @approve=1 THEN GETUTCDATE() ELSE ApprovedAt END,
                  RejectedAt = CASE WHEN @approve=0 THEN GETUTCDATE() ELSE RejectedAt END
              WHERE PageId=@pid AND RecipientEmail=@mail", conn))
        {
            cmd.Parameters.AddWithValue("@approve", approve);
            cmd.Parameters.AddWithValue("@pid", pid);
            cmd.Parameters.AddWithValue("@mail", email);
            conn.Open();
            int rows = cmd.ExecuteNonQuery();

            return rows > 0
                ? new { Success = true, PageId = pid, Approved = approve }
                : new { Success = false, Error = "Share request not found for this user" };
        }
    }
    catch (Exception ex)
    {
        return new { Success = false, Error = ex.Message };
    }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object GetUserProfileId(string pageId)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    if (string.IsNullOrEmpty(userId))
        return new { Success = false, Error = "User not authenticated" };

    // Optionnel: si pageId fourni, vérifier la propriété
    if (!string.IsNullOrEmpty(pageId) && int.TryParse(pageId, out pid))
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand("SELECT COUNT(1) FROM Pages WHERE PageId=@pid AND UserId=@uid", conn))
        {
            cmd.Parameters.AddWithValue("@pid", pid);
            cmd.Parameters.AddWithValue("@uid", userId);
            conn.Open();
            if ((int)cmd.ExecuteScalar() == 0)
                return new { Success = false, Error = "Page not found or not owned by user" };
        }
    }

    using (var conn2 = new SqlConnection(ConnectionString))
    using (var cmd2 = new SqlCommand("SELECT ProfileId FROM UserProfiles WHERE UserId=@uid", conn2))
    {
        cmd2.Parameters.AddWithValue("@uid", userId);
        conn2.Open();
        var profileId = Convert.ToString(cmd2.ExecuteScalar());
        return string.IsNullOrEmpty(profileId)
            ? new { Success = false, Error = "Profile not found" }
            : new { Success = true, ProfileId = profileId };
    }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object BookmarkPageForUser(string pageId, string pageOf)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    int pid; if (!int.TryParse(pageId, out pid))
        return new { Success = false, Error = "Invalid pageId" };

    using (var conn = new SqlConnection(ConnectionString))
    {
        conn.Open();
        using (var tran = conn.BeginTransaction())
        {
            try
            {
                // Vérifier que la page existe
                var check = new SqlCommand("SELECT Title, Url FROM Pages WHERE PageId=@pid", conn, tran);
                check.Parameters.AddWithValue("@pid", pid);
                using (var r = check.ExecuteReader())
                {
                    if (!r.Read())
                    {
                        r.Close();
                        tran.Rollback();
                        return new { Success = false, Error = "Page not found" };
                    }
                    string title = r["Title"].ToString();
                    string url = r["Url"].ToString();
                    r.Close();

                    // Insérer le bookmark
                    var insert = new SqlCommand(
                        @"INSERT INTO Bookmarks (UserId, PageId, Title, Url, PageOf, CreatedAt)
                          OUTPUT INSERTED.BookmarkId
                          VALUES (@uid, @pid, @title, @url, @pageOf, GETUTCDATE())", conn, tran);
                    insert.Parameters.AddWithValue("@uid", userId);
                    insert.Parameters.AddWithValue("@pid", pid);
                    insert.Parameters.AddWithValue("@title", title);
                    insert.Parameters.AddWithValue("@url", url);
                    insert.Parameters.AddWithValue("@pageOf", (object)pageOf ?? DBNull.Value);
                    int bid = (int)insert.ExecuteScalar();

                    tran.Commit();
                    return new { Success = true, BookmarkId = bid, PageId = pid, Title = title, Url = url, PageOf = pageOf };
                }
            }
            catch (Exception ex)
            {
                tran.Rollback();
                return new { Success = false, Error = ex.Message };
            }
        }
    }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object Discover(string url)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    if (string.IsNullOrWhiteSpace(url))
        return new { Success = false, Error = "Url required" };

    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand(
            @"INSERT INTO DiscoverRequests (UserId, Url, RequestedAt)
              OUTPUT INSERTED.RequestId
              VALUES (@uid, @url, GETUTCDATE())", conn))
        {
            cmd.Parameters.AddWithValue("@uid", (object)userId ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@url", url);
            conn.Open();
            int rid = (int)cmd.ExecuteScalar();
            // En pratique, on pourrait lancer un job d'analyse (meta, feeds, favicon...)
            return new { Success = true, RequestId = rid, Url = url, Status = "Queued" };
        }
    }
    catch (Exception ex) { return new { Success = false, Error = ex.Message }; }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object GetAddFeedPopup(string version)
{
    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand(
            "SELECT Html FROM UiTemplates WHERE Name='AddFeedPopup' AND (Version=@ver OR @ver IS NULL)", conn))
        {
            cmd.Parameters.AddWithValue("@ver", (object)version ?? DBNull.Value);
            conn.Open();
            var html = Convert.ToString(cmd.ExecuteScalar());
            return string.IsNullOrEmpty(html)
                ? new { Success = false, Error = "Template not found" }
                : new { Success = true, Html = html, Version = version };
        }
    }
    catch (Exception ex) { return new { Success = false, Error = ex.Message }; }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object GetPageSettingsPopup(string version)
{
    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand(
            "SELECT Html FROM UiTemplates WHERE Name='PageSettingsPopup' AND (Version=@ver OR @ver IS NULL)", conn))
        {
            cmd.Parameters.AddWithValue("@ver", (object)version ?? DBNull.Value);
            conn.Open();
            var html = Convert.ToString(cmd.ExecuteScalar());
            return string.IsNullOrEmpty(html)
                ? new { Success = false, Error = "Template not found" }
                : new { Success = true, Html = html, Version = version };
        }
    }
    catch (Exception ex) { return new { Success = false, Error = ex.Message }; }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object GetHtmlViewer(string url)
{
    if (string.IsNullOrWhiteSpace(url))
        return new { Success = false, Error = "Url required" };

    // On logge la consultation et renvoie un viewer HTML
    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var log = new SqlCommand(
            "INSERT INTO HtmlViewerLogs (Url, ViewedAt) VALUES (@url, GETUTCDATE())", conn))
        {
            log.Parameters.AddWithValue("@url", url);
            conn.Open();
            log.ExecuteNonQuery();
        }
        string html = string.Format("<iframe src=\"" + System.Web.HttpUtility.HtmlEncode(url) + "\" style=\"width:100%;height:100%\" frameborder=\"0\"></iframe>");
        return new { Success = true, Html = html };
    }
    catch (Exception ex) { return new { Success = false, Error = ex.Message }; }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object GetTemplate(string name)
{
    if (string.IsNullOrWhiteSpace(name))
        return new { Success = false, Error = "Template name required" };

    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand("SELECT Html FROM UiTemplates WHERE Name=@name", conn))
        {
            cmd.Parameters.AddWithValue("@name", name);
            conn.Open();
            var html = Convert.ToString(cmd.ExecuteScalar());
            return string.IsNullOrEmpty(html)
                ? new { Success = false, Error = "Template not found" }
                : new { Success = true, TemplateName = name, Html = html };
        }
    }
    catch (Exception ex) { return new { Success = false, Error = ex.Message }; }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object ErrorReports(string errors, string logs)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);

    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand(
            @"INSERT INTO ErrorReports (UserId, ErrorsJson, LogsText, ReportedAt)
              OUTPUT INSERTED.ReportId
              VALUES (@uid, @errors, @logs, GETUTCDATE())", conn))
        {
            cmd.Parameters.AddWithValue("@uid", (object)userId ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@errors", (object)errors ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@logs", (object)logs ?? DBNull.Value);
            conn.Open();
            int rid = (int)cmd.ExecuteScalar();
            return new { Success = true, ReportId = rid };
        }
    }
    catch (Exception ex) { return new { Success = false, Error = ex.Message }; }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object SendFeedback(string feedback)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    string email = (Membership.GetUser() != null ? Membership.GetUser().Email : null);
    if (string.IsNullOrWhiteSpace(feedback))
        return new { Success = false, Error = "Feedback required" };

    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand(
            @"INSERT INTO Feedback (UserId, Email, Message, SubmittedAt)
              OUTPUT INSERTED.FeedbackId
              VALUES (@uid, @mail, @msg, GETUTCDATE())", conn))
        {
            cmd.Parameters.AddWithValue("@uid", (object)userId ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@mail", (object)email ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@msg", feedback.Trim());
            conn.Open();
            int fid = (int)cmd.ExecuteScalar();
            return new { Success = true, FeedbackId = fid };
        }
    }
    catch (Exception ex) { return new { Success = false, Error = ex.Message }; }
}
    [WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object SendEmails(string fromName, string toNames, string subject, string emailTemplateName, string mailFormat, string templateParameters)
{
    var recipients = (toNames ?? "").Split(new[] { ',', ';' }, StringSplitOptions.RemoveEmptyEntries);
    if (recipients.Length == 0) return new { Success = false, Error = "Recipients required" };

    var queuedIds = new List<int>();
    using (var conn = new SqlConnection(ConnectionString))
    {
        conn.Open();
        using (var tran = conn.BeginTransaction())
        {
            try
            {
                // Charger le template si fourni
                string body = null;
                if (!string.IsNullOrWhiteSpace(emailTemplateName))
                {
                    var tmpl = new SqlCommand("SELECT Body FROM EmailTemplates WHERE Name=@name", conn, tran);
                    tmpl.Parameters.AddWithValue("@name", emailTemplateName);
                    body = Convert.ToString(tmpl.ExecuteScalar());
                }

                var ins = new SqlCommand(
                    @"INSERT INTO EmailQueue (FromName, ToName, Subject, Body, Format, TemplateParams, QueuedAt)
                      OUTPUT INSERTED.EmailId
                      VALUES (@from, @to, @subj, @body, @fmt, @params, GETUTCDATE())", conn, tran);
                ins.Parameters.AddWithValue("@from", (object)fromName ?? DBNull.Value);
                ins.Parameters.AddWithValue("@subj", subject ?? "");
                ins.Parameters.AddWithValue("@body", (object)body ?? DBNull.Value);
                ins.Parameters.AddWithValue("@fmt", (object)mailFormat ?? DBNull.Value);
                ins.Parameters.AddWithValue("@params", (object)templateParameters ?? DBNull.Value);

                foreach (var to in recipients)
                {
                    ins.Parameters.RemoveAt("@to");
                    ins.Parameters.AddWithValue("@to", to.Trim());
                    int qid = (int)ins.ExecuteScalar();
                    queuedIds.Add(qid);
                }

                tran.Commit();
                return new { Success = true, QueuedEmailIds = queuedIds, Count = queuedIds.Count };
            }
            catch (Exception ex)
            {
                tran.Rollback();
                return new { Success = false, Error = ex.Message };
            }
        }
    }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object SendEmail(string fromName, string toName, string subject, string emailTemplateName, string mailFormat, string templateParameters)
{
    if (string.IsNullOrWhiteSpace(toName))
        return new { Success = false, Error = "Recipient required" };

    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        {
            conn.Open();
            // Charger le template si fourni
            string body = null;
            if (!string.IsNullOrWhiteSpace(emailTemplateName))
            {
                using (var tmpl = new SqlCommand("SELECT Body FROM EmailTemplates WHERE Name=@name", conn))
                {
                    tmpl.Parameters.AddWithValue("@name", emailTemplateName);
                    body = Convert.ToString(tmpl.ExecuteScalar());
                }
            }

            using (var ins = new SqlCommand(
                @"INSERT INTO EmailQueue (FromName, ToName, Subject, Body, Format, TemplateParams, QueuedAt)
                  OUTPUT INSERTED.EmailId
                  VALUES (@from, @to, @subj, @body, @fmt, @params, GETUTCDATE())", conn))
            {
                ins.Parameters.AddWithValue("@from", (object)fromName ?? DBNull.Value);
                ins.Parameters.AddWithValue("@to", toName.Trim());
                ins.Parameters.AddWithValue("@subj", subject ?? "");
                ins.Parameters.AddWithValue("@body", (object)body ?? DBNull.Value);
                ins.Parameters.AddWithValue("@fmt", (object)mailFormat ?? DBNull.Value);
                ins.Parameters.AddWithValue("@params", (object)templateParameters ?? DBNull.Value);

                int qid = (int)ins.ExecuteScalar();
                return new { Success = true, QueuedEmailId = qid };
            }
        }
    }
    catch (Exception ex) { return new { Success = false, Error = ex.Message }; }
}
    [WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object SendEmail2(string fromName, string toName, string subject, string body, string format, string templateName, string templateParams, string cc, string bcc, string replyTo)
{
    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand(
            @"INSERT INTO EmailQueue (FromName, ToName, Subject, Body, Format, TemplateName, TemplateParams, Cc, Bcc, ReplyTo, QueuedAt)
              OUTPUT INSERTED.EmailId
              VALUES (@from, @to, @subj, @body, @fmt, @tmpl, @params, @cc, @bcc, @reply, GETUTCDATE())", conn))
        {
            cmd.Parameters.AddWithValue("@from", fromName ?? "");
            cmd.Parameters.AddWithValue("@to", toName ?? "");
            cmd.Parameters.AddWithValue("@subj", subject ?? "");
            cmd.Parameters.AddWithValue("@body", body ?? "");
            cmd.Parameters.AddWithValue("@fmt", format ?? "html");
            cmd.Parameters.AddWithValue("@tmpl", (object)templateName ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@params", (object)templateParams ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@cc", (object)cc ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@bcc", (object)bcc ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@reply", (object)replyTo ?? DBNull.Value);
            conn.Open();
            int eid = (int)cmd.ExecuteScalar();
            return new { Success = true, EmailId = eid };
        }
    }
    catch (Exception ex) { return new { Success = false, Error = ex.Message }; }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object DeleteAllBookmarks()
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    if (string.IsNullOrEmpty(userId)) return new { Success = false, Error = "User not authenticated" };

    using (var conn = new SqlConnection(ConnectionString))
    using (var cmd = new SqlCommand("DELETE FROM Bookmarks WHERE UserId=@uid", conn))
    {
        cmd.Parameters.AddWithValue("@uid", userId);
        conn.Open();
        int rows = cmd.ExecuteNonQuery();
        return new { Success = true, DeletedCount = rows };
    }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object DeleteBookmark(string bookmarkId)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    int bid; if (!int.TryParse(bookmarkId, out bid)) return new { Success = false, Error = "Invalid bookmarkId" };

    using (var conn = new SqlConnection(ConnectionString))
    using (var cmd = new SqlCommand("DELETE FROM Bookmarks WHERE BookmarkId=@bid AND UserId=@uid", conn))
    {
        cmd.Parameters.AddWithValue("@bid", bid);
        cmd.Parameters.AddWithValue("@uid", userId);
        conn.Open();
        int rows = cmd.ExecuteNonQuery();
        return rows > 0 ? new { Success = true, DeletedBookmarkId = bid }
                        : new { Success = false, Error = "Bookmark not found or not owned by user" };
    }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object GetAllBookmarksHtml()
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    var html = new StringBuilder();

    using (var conn = new SqlConnection(ConnectionString))
    using (var cmd = new SqlCommand("SELECT Title, Url FROM Bookmarks WHERE UserId=@uid ORDER BY CreatedAt DESC", conn))
    {
        cmd.Parameters.AddWithValue("@uid", userId);
        conn.Open();
        using (var reader = cmd.ExecuteReader())
        {
            while (reader.Read())
            {
                string title = reader["Title"].ToString();
                string url = reader["Url"].ToString();
                html.AppendFormat("<li><a href=\"{0}\">{1}</a></li>", System.Web.HttpUtility.HtmlEncode(url), System.Web.HttpUtility.HtmlEncode(title));
            }
        }
    }
    return new { Success = true, Html = html + "<ul></ul>" };
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object AddBookmark(string pageId, string title, string url, string pageOf)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    int pid; if (!int.TryParse(pageId, out pid)) return new { Success = false, Error = "Invalid pageId" };

    using (var conn = new SqlConnection(ConnectionString))
    using (var cmd = new SqlCommand(
        @"INSERT INTO Bookmarks (UserId, PageId, Title, Url, PageOf, CreatedAt)
          OUTPUT INSERTED.BookmarkId
          VALUES (@uid, @pid, @title, @url, @pageOf, GETUTCDATE())", conn))
    {
        cmd.Parameters.AddWithValue("@uid", userId);
        cmd.Parameters.AddWithValue("@pid", pid);
        cmd.Parameters.AddWithValue("@title", title ?? "");
        cmd.Parameters.AddWithValue("@url", url ?? "");
        cmd.Parameters.AddWithValue("@pageOf", (object)pageOf ?? DBNull.Value);
        conn.Open();
        int bid = (int)cmd.ExecuteScalar();
        return new { Success = true, BookmarkId = bid };
    }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object GetFlakesGrid(string pageId)
{
    int pid; if (!int.TryParse(pageId, out pid)) return new { Success = false, Error = "Invalid pageId" };
    var grid = new List<object>();

    using (var conn = new SqlConnection(ConnectionString))
    using (var cmd = new SqlCommand(
        @"SELECT ModuleId, Title, PositionX, PositionY, Width, Height
          FROM Modules WHERE PageId=@pid ORDER BY PositionY, PositionX", conn))
    {
        cmd.Parameters.AddWithValue("@pid", pid);
        conn.Open();
        using (var reader = cmd.ExecuteReader())
        {
            while (reader.Read())
            {
                grid.Add(new {
                    ModuleId = reader["ModuleId"],
                    Title = reader["Title"],
                    X = reader["PositionX"],
                    Y = reader["PositionY"],
                    Width = reader["Width"],
                    Height = reader["Height"]
                });
            }
        }
    }
    return new { Success = true, PageId = pid, Grid = grid };
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object RemoveReminder(string reminderId)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    int rid; if (!int.TryParse(reminderId, out rid)) return new { Success = false, Error = "Invalid reminderId" };

    using (var conn = new SqlConnection(ConnectionString))
    using (var cmd = new SqlCommand("DELETE FROM Reminders WHERE ReminderId=@rid AND UserId=@uid", conn))
    {
        cmd.Parameters.AddWithValue("@rid", rid);
        cmd.Parameters.AddWithValue("@uid", userId);
        conn.Open();
        int rows = cmd.ExecuteNonQuery();
        return rows > 0 ? new { Success = true, DeletedReminderId = rid }
                        : new { Success = false, Error = "Reminder not found or not owned by user" };
    }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object GetNearbyMetroLocation(string latitude, string longitude)
{
    if (!double.TryParse(latitude, out lat) || !double.TryParse(longitude, out lng))
        return new { Success = false, Error = "Invalid coordinates" };

    var results = new List<object>();
    using (var conn = new SqlConnection(ConnectionString))
    using (var cmd = new SqlCommand(
        @"SELECT TOP 5 LocationId, Name, Latitude, Longitude
          FROM MetroLocations
          ORDER BY SQRT(POWER(Latitude - @lat, 2) + POWER(Longitude - @lng, 2))", conn))
    {
        cmd.Parameters.AddWithValue("@lat", lat);
        cmd.Parameters.AddWithValue("@lng", lng);
        conn.Open();
        using (var reader = cmd.ExecuteReader())
        {
            while (reader.Read())
            {
                results.Add(new {
                    LocationId = reader["LocationId"],
                    Name = reader["Name"],
                    Latitude = reader["Latitude"],
                    Longitude = reader["Longitude"]
                });
            }
        }
    }
    return new { Success = true, Nearby = results };
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object GetLocationDetailByIPAddress()
{
    string ip = (HttpContext.Current != null && HttpContext.Current.Request != null ? HttpContext.Current.Request.UserHostAddress : null);
    if (string.IsNullOrEmpty(ip))
        return new { Success = false, Error = "Unable to determine IP address" };

    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand(
            @"SELECT TOP 1 City, Region, Country, Latitude, Longitude
              FROM IpLocationCache
              WHERE IpAddress = @ip", conn))
        {
            cmd.Parameters.AddWithValue("@ip", ip);
            conn.Open();
            using (var reader = cmd.ExecuteReader())
            {
                if (reader.Read())
                {
                    return new
                    {
                        Success = true,
                        IP = ip,
                        City = reader["City"],
                        Region = reader["Region"],
                        Country = reader["Country"],
                        Latitude = reader["Latitude"],
                        Longitude = reader["Longitude"]
                    };
                }
            }
        }

        // fallback: unknown IP
        return new { Success = false, Error = "Location not found for IP", IP = ip };
    }
    catch (Exception ex)
    {
        return new { Success = false, Error = ex.Message, IP = ip };
    }
}
    [WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object SaveUserInfo(string firstName, string lastName, string gender, string birthDate)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    if (string.IsNullOrEmpty(userId)) return new { Success = false, Error = "User not authenticated" };

    DateTime? dob = null;
    if (DateTime.TryParse(birthDate, out parsedDate))
        dob = parsedDate;

    using (var conn = new SqlConnection(ConnectionString))
    using (var cmd = new SqlCommand(
        @"UPDATE UserProfiles
          SET FirstName=@first, LastName=@last, Gender=@gender, BirthDate=@dob, UpdatedAt=GETUTCDATE()
          WHERE UserId=@uid", conn))
    {
        cmd.Parameters.AddWithValue("@uid", userId);
        cmd.Parameters.AddWithValue("@first", firstName ?? "");
        cmd.Parameters.AddWithValue("@last", lastName ?? "");
        cmd.Parameters.AddWithValue("@gender", gender ?? "");
        cmd.Parameters.AddWithValue("@dob", (object)dob ?? DBNull.Value);
        conn.Open();
        int rows = cmd.ExecuteNonQuery();
        return rows > 0 ? new { Success = true } : new { Success = false, Error = "User profile not found" };
    }
}

    [WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object SaveProfile(string displayName, string bio, string location, string website)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    if (string.IsNullOrEmpty(userId)) return new { Success = false, Error = "User not authenticated" };

    using (var conn = new SqlConnection(ConnectionString))
    using (var cmd = new SqlCommand(
        @"UPDATE UserProfiles
          SET DisplayName=@name, Bio=@bio, Location=@loc, Website=@web, UpdatedAt=GETUTCDATE()
          WHERE UserId=@uid", conn))
    {
        cmd.Parameters.AddWithValue("@uid", userId);
        cmd.Parameters.AddWithValue("@name", displayName ?? "");
        cmd.Parameters.AddWithValue("@bio", bio ?? "");
        cmd.Parameters.AddWithValue("@loc", location ?? "");
        cmd.Parameters.AddWithValue("@web", website ?? "");
        conn.Open();
        int rows = cmd.ExecuteNonQuery();
        return rows > 0 ? new { Success = true } : new { Success = false, Error = "Profile not found" };
    }
}

[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object ChangePassword(string oldPassword, string newPassword)
{
    var user = Membership.GetUser();
    if (user == null) return new { Success = false, Error = "User not authenticated" };

    try
    {
        bool changed = user.ChangePassword(oldPassword, newPassword);
        return changed
            ? new { Success = true, Message = "Password changed successfully" }
            : new { Success = false, Error = "Invalid old password or new password not valid" };
    }
    catch (Exception ex) { return new { Success = false, Error = ex.Message }; }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object UsernameAvailable(string username)
{
    if (string.IsNullOrWhiteSpace(username))
        return new { Success = false, Error = "Username required" };

    var user = Membership.GetUser(username);
    return user == null
        ? new { Success = true, Available = true }
        : new { Success = true, Available = false };
}
    [WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object AddReminder(string title, DateTime remindAt, string notes)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    if (string.IsNullOrEmpty(userId)) return new { Success = false, Error = "User not authenticated" };

    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand(
            @"INSERT INTO Reminders (UserId, Title, Notes, RemindAt, CreatedAt)
              OUTPUT INSERTED.ReminderId
              VALUES (@uid, @title, @notes, @remindAt, GETUTCDATE())", conn))
        {
            cmd.Parameters.AddWithValue("@uid", userId);
            cmd.Parameters.AddWithValue("@title", title);
            cmd.Parameters.AddWithValue("@notes", (object)notes ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@remindAt", remindAt);
            conn.Open();
            int rid = (int)cmd.ExecuteScalar();
            return new { Success = true, ReminderId = rid, Title = title, RemindAt = remindAt };
        }
    }
    catch (Exception ex) { return new { Success = false, Error = ex.Message }; }
}
//MANQUE REMOVE REMINDER
    [WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object MatchLocation(string city, string country)
{
    if (string.IsNullOrWhiteSpace(city) || string.IsNullOrWhiteSpace(country))
        return new { Success = false, Error = "City and country required" };

    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand(
            "SELECT TOP 1 LocationId, City, Country FROM Locations WHERE City=@city AND Country=@country", conn))
        {
            cmd.Parameters.AddWithValue("@city", city);
            cmd.Parameters.AddWithValue("@country", country);
            conn.Open();
            using (var reader = cmd.ExecuteReader())
            {
                if (reader.Read())
                {
                    return new
                    {
                        Success = true,
                        LocationId = reader["LocationId"],
                        City = reader["City"],
                        Country = reader["Country"]
                    };
                }
            }
        }
        return new { Success = false, Error = "Location not found" };
    }
    catch (Exception ex) { return new { Success = false, Error = ex.Message }; }
}
//MANQUE GETNEARBYMETROLOCATION
    //MANQUE GETLOCATIONDETAILBYIPADRESSE
    //SENDPUBLICPAGEINVITATION
    [WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object SendPublicPageInvitation(string pageId, string recipientEmail)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    int pid; if (!int.TryParse(pageId, out pid)) return new { Success = false, Error = "Invalid pageId" };

    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand(
            @"INSERT INTO PublicPageInvites (PageId, OwnerUserId, RecipientEmail, SentAt)
              OUTPUT INSERTED.InviteId
              VALUES (@pid, @uid, @email, GETUTCDATE())", conn))
        {
            cmd.Parameters.AddWithValue("@pid", pid);
            cmd.Parameters.AddWithValue("@uid", userId);
            cmd.Parameters.AddWithValue("@email", recipientEmail.Trim());
            conn.Open();
            int inviteId = (int)cmd.ExecuteScalar();
            return new { Success = true, InviteId = inviteId, PageId = pid, Recipient = recipientEmail };
        }
    }
    catch (Exception ex) { return new { Success = false, Error = ex.Message }; }
}

    [WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object ImportContacts(string provider, string accessToken)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    if (string.IsNullOrEmpty(userId)) return new { Success = false, Error = "User not authenticated" };

    // Ici on simule l’import, en pratique il faudrait appeler l’API du provider
    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand(
            @"INSERT INTO ContactImports (UserId, Provider, AccessToken, ImportedAt)
              OUTPUT INSERTED.ImportId
              VALUES (@uid, @prov, @token, GETUTCDATE())", conn))
        {
            cmd.Parameters.AddWithValue("@uid", userId);
            cmd.Parameters.AddWithValue("@prov", provider);
            cmd.Parameters.AddWithValue("@token", accessToken);
            conn.Open();
            int iid = (int)cmd.ExecuteScalar();
            return new { Success = true, ImportId = iid, Provider = provider };
        }
    }
    catch (Exception ex) { return new { Success = false, Error = ex.Message }; }
}
//MANQUE IMPORTPAGEFLAKESCONTACTS
    //MANQUE SEPARATEPFUSERS
    [WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object SeperatePFUsers(string[] emails)
{
    var existing = new List<string>();
    var newUsers = new List<string>();

    using (var conn = new SqlConnection(ConnectionString))
    {
        conn.Open();
        foreach (var email in emails)
        {
            using (var cmd = new SqlCommand("SELECT COUNT(1) FROM aspnet_Users WHERE LoweredEmail = LOWER(@email)", conn))
            {
                cmd.Parameters.AddWithValue("@email", email);
                int count = (int)cmd.ExecuteScalar();
                if (count > 0) existing.Add(email);
                else newUsers.Add(email);
            }
        }
    }

    return new
    {
        Success = true,
        ExistingUsers = existing,
        NewUsers = newUsers
    };
}

    [WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object ImportPageflakesContacts(string provider, string token)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    if (string.IsNullOrEmpty(userId)) return new { Success = false, Error = "User not authenticated" };

    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand(
            @"INSERT INTO ContactImports (UserId, Provider, AccessToken, ImportedAt)
              OUTPUT INSERTED.ImportId
              VALUES (@uid, @provider, @token, GETUTCDATE())", conn))
        {
            cmd.Parameters.AddWithValue("@uid", userId);
            cmd.Parameters.AddWithValue("@provider", provider);
            cmd.Parameters.AddWithValue("@token", token);
            conn.Open();
            int importId = (int)cmd.ExecuteScalar();
            return new { Success = true, ImportId = importId, Provider = provider };
        }
    }
    catch (Exception ex) { return new { Success = false, Error = ex.Message }; }
}

    [WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object AddFriends(string emails)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    if (string.IsNullOrEmpty(userId)) return new { Success = false, Error = "User not authenticated" };

    var recipients = emails.Split(new[] { ',', ';' }, StringSplitOptions.RemoveEmptyEntries);
    var added = new List<string>();

    using (var conn = new SqlConnection(ConnectionString))
    {
        conn.Open();
        using (var tran = conn.BeginTransaction())
        {
            try
            {
                var insert = new SqlCommand(
                    @"INSERT INTO Friends (UserId, FriendEmail, AddedAt)
                      VALUES (@uid, @mail, GETUTCDATE())", conn, tran);
                insert.Parameters.AddWithValue("@uid", userId);

                foreach (var email in recipients)
                {
                    insert.Parameters.RemoveAt("@mail");
                    insert.Parameters.AddWithValue("@mail", email.Trim());
                    insert.ExecuteNonQuery();
                    added.Add(email.Trim());
                }

                tran.Commit();
                return new { Success = true, AddedFriends = added };
            }
            catch (Exception ex)
            {
                tran.Rollback();
                return new { Success = false, Error = ex.Message };
            }
        }
    }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object GetTooltips(string language)
{
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
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object SendThisPageToFriend(string pageId, string friendEmail)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    int pid; if (!int.TryParse(pageId, out pid)) return new { Success = false, Error = "Invalid pageId" };

    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand(
            @"INSERT INTO PageInvites (PageId, OwnerUserId, RecipientEmail, InvitedAt)
              OUTPUT INSERTED.InviteId
              VALUES (@pid, @uid, @mail, GETUTCDATE())", conn))
        {
            cmd.Parameters.AddWithValue("@pid", pid);
            cmd.Parameters.AddWithValue("@uid", userId);
            cmd.Parameters.AddWithValue("@mail", friendEmail.Trim());
            conn.Open();
            int iid = (int)cmd.ExecuteScalar();
            return new { Success = true, InviteId = iid, PageId = pid, FriendEmail = friendEmail };
        }
    }
    catch (Exception ex) { return new { Success = false, Error = ex.Message }; }
}
//MANQUE SENDTHISFLAKESTOFRIENDS
    
    [WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object SendThisFlakeToFriend(string moduleId, string friendEmail)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    int mid; if (!int.TryParse(moduleId, out mid)) return new { Success = false, Error = "Invalid moduleId" };

    try
    {
        using (var conn = new SqlConnection(ConnectionString))
        using (var cmd = new SqlCommand(
            @"INSERT INTO ModuleInvites (ModuleId, OwnerUserId, RecipientEmail, InvitedAt)
              OUTPUT INSERTED.InviteId
              VALUES (@mid, @uid, @email, GETUTCDATE())", conn))
        {
            cmd.Parameters.AddWithValue("@mid", mid);
            cmd.Parameters.AddWithValue("@uid", userId);
            cmd.Parameters.AddWithValue("@email", friendEmail.Trim());
            conn.Open();
            int inviteId = (int)cmd.ExecuteScalar();
            return new { Success = true, InviteId = inviteId, ModuleId = mid, Recipient = friendEmail };
        }
    }
    catch (Exception ex) { return new { Success = false, Error = ex.Message }; }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object ResendVerificationEmail()
{
    var user = Membership.GetUser();
    string email = user?.Email;
    string userId = user?.ProviderUserKey?.ToString();

    if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(userId))
        return new { Success = false, Error = "User not authenticated or no email found" };

    using (var conn = new SqlConnection(ConnectionString))
    {
        conn.Open();
        using (var tran = conn.BeginTransaction())
        {
            try
            {
                // Générer/mettre à jour le token de vérification
                string token = Guid.NewGuid().ToString("N");

                var upsertToken = new SqlCommand(
                    @"IF EXISTS (SELECT 1 FROM VerificationTokens WHERE UserId=@uid)
                        UPDATE VerificationTokens
                           SET Token=@token, ExpiresAt=DATEADD(day, 2, GETUTCDATE()), UpdatedAt=GETUTCDATE()
                         WHERE UserId=@uid
                      ELSE
                        INSERT INTO VerificationTokens (UserId, Token, ExpiresAt, CreatedAt)
                        VALUES (@uid, @token, DATEADD(day, 2, GETUTCDATE()), GETUTCDATE())",
                    conn, tran);
                upsertToken.Parameters.AddWithValue("@uid", userId);
                upsertToken.Parameters.AddWithValue("@token", token);
                upsertToken.ExecuteNonQuery();

                // Construire le lien de vérification
                string baseUrl = ConfigurationManager.AppSettings["PublicBaseUrl"] ?? "https://pageflakes.example.com";
                string verifyUrl = baseUrl + "/verify?token={token}&uid={userId}";

                // Mettre en file d’attente l’e-mail
                var queueEmail = new SqlCommand(
                    @"INSERT INTO EmailQueue (FromName, ToName, Subject, Body, Format, QueuedAt)
                      OUTPUT INSERTED.EmailId
                      VALUES ('Pageflakes', @to, @subj, @body, 'html', GETUTCDATE())",
                    conn, tran);
                queueEmail.Parameters.AddWithValue("@to", email);
                queueEmail.Parameters.AddWithValue("@subj", "Verify your account");
                queueEmail.Parameters.AddWithValue("@body",
                    $"<p>Hello,</p><p>Please verify your account by clicking the link below:</p>" +
                    $"<p><a href=\"" + System.Web.HttpUtility.HtmlEncode(verifyUrl) + "\">Verify my account</a></p>" +
                    $"<p>This link expires in 48 hours.</p>");
                int emailId = (int)queueEmail.ExecuteScalar();

                tran.Commit();
                return new { Success = true, EmailId = emailId, SentTo = email, VerifyUrl = verifyUrl };
            }
            catch (Exception ex)
            {
                tran.Rollback();
                return new { Success = false, Error = ex.Message };
            }
        }
    }
}

    // MANQUE CANSENDVERIFICATIONEMAIL
    //MANQUE ISUSERREQUIREDTOVERIFYEMAIL
    [WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object IsUserRequiredToVerifyEmail()
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    if (string.IsNullOrEmpty(userId)) return new { Success = false, Error = "User not authenticated" };

    using (var conn = new SqlConnection(ConnectionString))
    using (var cmd = new SqlCommand(
        @"SELECT IsEmailVerified FROM UserProfiles WHERE UserId=@uid", conn))
    {
        cmd.Parameters.AddWithValue("@uid", userId);
        conn.Open();
        var result = cmd.ExecuteScalar();
        if (result == null) return new { Success = false, Error = "User profile not found" };

        bool isVerified = Convert.ToBoolean(result);
        return new { Success = true, Required = !isVerified };
    }
}

    [WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object CanSendVerificationEmail()
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    if (string.IsNullOrEmpty(userId)) return new { Success = false, Error = "User not authenticated" };

    using (var conn = new SqlConnection(ConnectionString))
    using (var cmd = new SqlCommand(
        @"SELECT COUNT(1) FROM VerificationTokens
          WHERE UserId=@uid AND ExpiresAt > GETUTCDATE()", conn))
    {
        cmd.Parameters.AddWithValue("@uid", userId);
        conn.Open();
        int count = (int)cmd.ExecuteScalar();
        return new { Success = true, CanSend = count == 0 };
    }
}

    [WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object GetZipCodes(string city, string country)
{
    if (string.IsNullOrWhiteSpace(city) || string.IsNullOrWhiteSpace(country))
        return new { Success = false, Error = "City and country required" };

    var zips = new List<string>();
    using (var conn = new SqlConnection(ConnectionString))
    using (var cmd = new SqlCommand("SELECT ZipCode FROM ZipCodes WHERE City=@city AND Country=@country", conn))
    {
        cmd.Parameters.AddWithValue("@city", city);
        cmd.Parameters.AddWithValue("@country", country);
        conn.Open();
        using (var reader = cmd.ExecuteReader())
        {
            while (reader.Read())
                zips.Add(reader["ZipCode"].ToString());
        }
    }
    return new { Success = true, City = city, Country = country, ZipCodes = zips };
}
    // MANQUE GETZIPCODE
    [WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object GetZipCode(string city, string country)
{
    if (string.IsNullOrWhiteSpace(city) || string.IsNullOrWhiteSpace(country))
        return new { Success = false, Error = "City and country required" };

    using (var conn = new SqlConnection(ConnectionString))
    using (var cmd = new SqlCommand(
        @"SELECT TOP 1 ZipCode FROM ZipCodes WHERE City=@city AND Country=@country", conn))
    {
        cmd.Parameters.AddWithValue("@city", city);
        cmd.Parameters.AddWithValue("@country", country);
        conn.Open();
        var zip = cmd.ExecuteScalar();
        return zip != null
            ? new { Success = true, ZipCode = zip.ToString() }
            : new { Success = false, Error = "Zip code not found" };
    }
}

    [WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object GetThemesOfUser()
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    var themes = new List<object>();

    using (var conn = new SqlConnection(ConnectionString))
    using (var cmd = new SqlCommand("SELECT ThemeId, Name, Css FROM Themes WHERE UserId=@uid", conn))
    {
        cmd.Parameters.AddWithValue("@uid", userId);
        conn.Open();
        using (var reader = cmd.ExecuteReader())
        {
            while (reader.Read())
            {
                themes.Add(new {
                    ThemeId = reader["ThemeId"],
                    Name = reader["Name"],
                    Css = reader["Css"]
                });
            }
        }
    }
    return new { Success = true, Themes = themes };
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object CreateCustomTheme(string name, string css)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    if (string.IsNullOrWhiteSpace(name)) return new { Success = false, Error = "Name required" };

    using (var conn = new SqlConnection(ConnectionString))
    using (var cmd = new SqlCommand(
        @"INSERT INTO Themes (UserId, Name, Css, CreatedAt)
          OUTPUT INSERTED.ThemeId
          VALUES (@uid, @name, @css, GETUTCDATE())", conn))
    {
        cmd.Parameters.AddWithValue("@uid", userId);
        cmd.Parameters.AddWithValue("@name", name);
        cmd.Parameters.AddWithValue("@css", css ?? "");
        conn.Open();
        int tid = (int)cmd.ExecuteScalar();
        return new { Success = true, ThemeId = tid, Name = name };
    }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object DeleteCustomTheme(string themeId)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    int tid; if (!int.TryParse(themeId, out tid)) return new { Success = false, Error = "Invalid themeId" };

    using (var conn = new SqlConnection(ConnectionString))
    using (var cmd = new SqlCommand("DELETE FROM Themes WHERE ThemeId=@tid AND UserId=@uid", conn))
    {
        cmd.Parameters.AddWithValue("@tid", tid);
        cmd.Parameters.AddWithValue("@uid", userId);
        conn.Open();
        int rows = cmd.ExecuteNonQuery();
        return rows > 0 ? new { Success = true, DeletedThemeId = tid }
                        : new { Success = false, Error = "Theme not found or not owned by user" };
    }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object ChangeCustomTheme(string pageId, string themeId)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    int pid; if (!int.TryParse(pageId, out pid)) return new { Success = false, Error = "Invalid pageId" };
    int tid; if (!int.TryParse(themeId, out tid)) return new { Success = false, Error = "Invalid themeId" };

    using (var conn = new SqlConnection(ConnectionString))
    using (var cmd = new SqlCommand("UPDATE Pages SET ThemeId=@tid WHERE PageId=@pid AND UserId=@uid", conn))
    {
        cmd.Parameters.AddWithValue("@tid", tid);
        cmd.Parameters.AddWithValue("@pid", pid);
        cmd.Parameters.AddWithValue("@uid", userId);
        conn.Open();
        int rows = cmd.ExecuteNonQuery();
        return rows > 0 ? new { Success = true, PageId = pid, ThemeId = tid }
                        : new { Success = false, Error = "Page not found or not owned by user" };
    }
}
    [WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object SendTheme(string themeId, string recipientEmail)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    int tid; if (!int.TryParse(themeId, out tid)) return new { Success = false, Error = "Invalid themeId" };

    using (var conn = new SqlConnection(ConnectionString))
    using (var cmd = new SqlCommand(
        @"INSERT INTO ThemeShares (ThemeId, OwnerUserId, RecipientEmail, SharedAt)
          OUTPUT INSERTED.ShareId
          VALUES (@tid, @uid, @mail, GETUTCDATE())", conn))
    {
        cmd.Parameters.AddWithValue("@tid", tid);
        cmd.Parameters.AddWithValue("@uid", userId);
        cmd.Parameters.AddWithValue("@mail", recipientEmail.Trim());
        conn.Open();
        int sid = (int)cmd.ExecuteScalar();
        return new { Success = true, ShareId = sid, ThemeId = tid, Recipient = recipientEmail };
    }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object Test(string input)
{
    return new { Success = true, Echo = input, Timestamp = DateTime.UtcNow };
}
//MANQUE TESTETAG
    [WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object TestETag(string input)
{
    string etag = "\"" + Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(input)).Substring(0, 16) + "\"";
    HttpContext.Current.Response.AddHeader("ETag", etag);
    return new { Success = true, ETag = etag };
}

    [WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object GetUserSettings()
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    var settings = new Dictionary<string, string>();

    using (var conn = new SqlConnection(ConnectionString))
    using (var cmd = new SqlCommand("SELECT Name, Value FROM UserSettings WHERE UserId=@uid", conn))
    {
        cmd.Parameters.AddWithValue("@uid", userId);
        conn.Open();
        using (var reader = cmd.ExecuteReader())
        {
            while (reader.Read())
                settings[reader["Name"].ToString()] = reader["Value"].ToString();
        }
    }
    return new { Success = true, Settings = settings };
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object UpdateUserSetting(string name, string value)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    if (string.IsNullOrWhiteSpace(name)) return new { Success = false, Error = "Name required" };

    using (var conn = new SqlConnection(ConnectionString))
    using (var cmd = new SqlCommand(
        @"IF EXISTS (SELECT 1 FROM UserSettings WHERE UserId=@uid AND Name=@name)
            UPDATE UserSettings SET Value=@val WHERE UserId=@uid AND Name=@name
          ELSE
            INSERT INTO UserSettings (UserId, Name, Value) VALUES (@uid, @name, @val)", conn))
    {
        cmd.Parameters.AddWithValue("@uid", userId);
        cmd.Parameters.AddWithValue("@name", name);
        cmd.Parameters.AddWithValue("@val", value ?? "");
        conn.Open();
        cmd.ExecuteNonQuery();
        return new { Success = true, Name = name, Value = value };
    }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object DeleteUserSetting(string name)
{
    string userId = ((Membership.GetUser() != null && Membership.GetUser().ProviderUserKey != null) ? Membership.GetUser().ProviderUserKey.ToString() : null);
    if (string.IsNullOrWhiteSpace(name)) return new { Success = false, Error = "Name required" };

    using (var conn = new SqlConnection(ConnectionString))
    using (var cmd = new SqlCommand("DELETE FROM UserSettings WHERE UserId=@uid AND Name=@name", conn))
    {
        cmd.Parameters.AddWithValue("@uid", userId);
        cmd.Parameters.AddWithValue("@name", name);
        conn.Open();
        int rows = cmd.ExecuteNonQuery();
        return rows > 0 ? new { Success = true, DeletedName = name }
                        : new { Success = false, Error = "Setting not found" };
    }
}
[WebMethod]
[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
public object GetSystemStatus()
{
    var startedAt = DateTime.UtcNow;
    string version = ConfigurationManager.AppSettings["SiteVersion"] ?? "unknown";
    string env = ConfigurationManager.AppSettings["Environment"] ?? "prod";

    try
    {
        int pageCount = 0, moduleCount = 0, queueDepth = 0;
        long dbLatencyMs;

        using (var conn = new SqlConnection(ConnectionString))
        using (var ping = new SqlCommand("SELECT 1", conn))
        {
            var sw = System.Diagnostics.Stopwatch.StartNew();
            conn.Open();
            ping.ExecuteScalar();
            sw.Stop();
            dbLatencyMs = sw.ElapsedMilliseconds;

            using (var cmdPages = new SqlCommand("SELECT COUNT(1) FROM Pages", conn))
                pageCount = (int)cmdPages.ExecuteScalar();

            using (var cmdModules = new SqlCommand("SELECT COUNT(1) FROM Modules", conn))
                moduleCount = (int)cmdModules.ExecuteScalar();

            using (var cmdQueue = new SqlCommand("SELECT COUNT(1) FROM EmailQueue WHERE SentAt IS NULL", conn))
                queueDepth = (int)cmdQueue.ExecuteScalar();
        }

        var uptime = (DateTime.UtcNow - startedAt).TotalMilliseconds; // processing time

        return new
        {
            Success = true,
            Version = version,
            Environment = env,
            Db = "OK",
            DbLatencyMs = dbLatencyMs,
            Metrics = new
            {
                Pages = pageCount,
                Modules = moduleCount,
                EmailQueuePending = queueDepth
            },
            ProcessMs = uptime,
            Timestamp = DateTime.UtcNow
        };
    }
    catch (Exception ex)
    {
        return new
        {
            Success = false,
            Error = ex.Message,
            Version = version,
            Environment = env,
            Db = "ERROR"
        };
    }
}

}
