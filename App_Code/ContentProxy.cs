using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Caching;
using System.Web.Services;
using System.Net;
using System.Text;
using System.IO;
using System.Web.Services.Protocols;
using System.Web.Script.Services;
using System.Web.Security;

/// <summary>
/// Description résumée de ContentProxy
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// Pour autoriser l'appel de ce service Web depuis un script à l'aide d'ASP.NET AJAX, supprimez les marques de commentaire de la ligne suivante. 
// [System.Web.Script.Services.ScriptService]
public class ContentProxy : System.Web.Services.WebService {

    public ContentProxy () {

        //Supprimez les marques de commentaire dans la ligne suivante si vous utilisez des composants conçus 
        //InitializeComponent(); 
    }

            public class NameValue
        {
            public string Name { get; set; }
            public string Value { get; set; }
        }

        // ----------------- Méthodes exposées -----------------

            [WebMethod]
            public string GetUrl(string url)
            {
                try
                {
                    HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                    request.Method = "GET";

                    using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
                    using (StreamReader reader = new StreamReader(response.GetResponseStream()))
                    {
                        return reader.ReadToEnd();
                    }
                }
                catch (Exception ex)
                {
                    return "Error: " + ex.Message;
                }
            }

        [WebMethod]
        public string GetUrl1(string url, int cacheSeconds, string userAgent, string referer, NameValue[] headers)
        {
            return Fetch(url, "GET", headers, null, cacheSeconds, userAgent, referer);
        }

        [WebMethod]
        public string GetUrl2(string url, string[] headers)
        {
            try
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.Method = "GET";

                // Ajout des en-têtes si fournis
                if (headers != null)
                {
                    foreach (string header in headers)
                    {
                        if (!string.IsNullOrEmpty(header))
                        {
                            string[] parts = header.Split(new[] { ':' }, 2);
                            if (parts.Length == 2)
                            {
                                request.Headers[parts[0].Trim()] = parts[1].Trim();
                            }
                        }
                    }
                }

                // Lecture de la réponse
                using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
                using (StreamReader reader = new StreamReader(response.GetResponseStream()))
                {
                    return reader.ReadToEnd();
                }
            }
            catch (Exception ex)
            {
                return "Error: " + ex.Message;
            }
        }

        [WebMethod]
        public string GetUrl3(string url, int cacheSeconds, string userAgent, string referer, NameValue[] headers, int timeoutMs)
        {
            return Fetch(url, "GET", headers, null, cacheSeconds, userAgent, referer, timeoutMs);
        }

        [WebMethod]
        public string GetUrlNonCached(string url, int cacheSeconds, string userAgent, string referer)
        {
            return Fetch(url, "GET", null, null, 0, userAgent, referer);
        }

        [WebMethod]
        public string GetUrlNonCached2(string url, int cacheSeconds, string userAgent, string referer, NameValue[] headers, int timeoutMs)
        {
            return Fetch(url, "GET", headers, null, 0, userAgent, referer, timeoutMs);
        }

        [WebMethod]
        public string GetXml(string url, int cacheSeconds, string userAgent, string referer)
        {
            return Fetch(url, "GET", null, null, cacheSeconds, userAgent, referer);
        }

        [WebMethod]
        public string FormPost(string url, string parameters)
        {
            try
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.Method = "POST";
                request.ContentType = "application/x-www-form-urlencoded";

                // Corps de la requête (paramètres du formulaire)
                if (!string.IsNullOrEmpty(parameters))
                {
                    byte[] data = Encoding.UTF8.GetBytes(parameters);
                    request.ContentLength = data.Length;
                    using (Stream stream = request.GetRequestStream())
                    {
                        stream.Write(data, 0, data.Length);
                    }
                }

                // Lecture de la réponse
                using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
                using (StreamReader reader = new StreamReader(response.GetResponseStream()))
                {
                    return reader.ReadToEnd();
                }
            }
            catch (Exception ex)
            {
                return "Error: " + ex.Message;
            }
        }

        [WebMethod]
        public string FormPost2(string url, string parameters, string[] headers)
        {
            try
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.Method = "POST";
                request.ContentType = "application/x-www-form-urlencoded";

                // Ajout des en-têtes si fournis
                if (headers != null)
                {
                    foreach (string header in headers)
                    {
                        if (!string.IsNullOrEmpty(header))
                        {
                            string[] parts = header.Split(new[] { ':' }, 2);
                            if (parts.Length == 2)
                            {
                                request.Headers[parts[0].Trim()] = parts[1].Trim();
                            }
                        }
                    }
                }

                // Corps de la requête (paramètres du formulaire)
                if (!string.IsNullOrEmpty(parameters))
                {
                    byte[] data = Encoding.UTF8.GetBytes(parameters);
                    request.ContentLength = data.Length;
                    using (Stream stream = request.GetRequestStream())
                    {
                        stream.Write(data, 0, data.Length);
                    }
                }

                // Lecture de la réponse
                using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
                using (StreamReader reader = new StreamReader(response.GetResponseStream()))
                {
                    return reader.ReadToEnd();
                }
            }
            catch (Exception ex)
            {
                return "Error: " + ex.Message;
            }
        }

        [WebMethod]
        public string FormPost3(string url, NameValue[] fields, NameValue[] headers, int cacheSeconds, int timeoutMs, string userAgent, string contentType)
        {
            string body = EncodeFormFields(fields);
            return Fetch(url, "POST", headers, body, cacheSeconds, userAgent, null, timeoutMs, contentType);
        }

        [WebMethod]
        public string UploadString(string url, string requestData)
        {
            try
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.Method = "POST";
                request.ContentType = "application/x-www-form-urlencoded";
                // ou "application/json" selon ton usage

                // Écriture du corps
                using (var writer = new StreamWriter(request.GetRequestStream()))
                {
                    writer.Write(requestData);
                }

                // Lecture de la réponse
                using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
                using (StreamReader reader = new StreamReader(response.GetResponseStream()))
                {
                    return reader.ReadToEnd();
                }
            }
            catch (Exception ex)
            {
                return "Error: " + ex.Message;
            }
        }

        public string UploadString2(string url, string[] headers, string requestData)
        {
            try
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.Method = "POST";

                // Ajout des en-têtes
                if (headers != null)
                {
                    foreach (string header in headers)
                    {
                        if (!string.IsNullOrEmpty(header))
                        {
                            string[] parts = header.Split(new[] { ':' }, 2);
                            if (parts.Length == 2)
                            {
                                request.Headers[parts[0].Trim()] = parts[1].Trim();
                            }
                        }
                    }
                }

                // Corps de la requête
                if (!string.IsNullOrEmpty(requestData))
                {
                    using (var writer = new StreamWriter(request.GetRequestStream()))
                    {
                        writer.Write(requestData);
                    }
                }

                // Réponse
                using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
                using (StreamReader reader = new StreamReader(response.GetResponseStream()))
                {
                    return reader.ReadToEnd();
                }
            }
            catch (Exception ex)
            {
                // Retourne l’erreur sous forme de texte
                return "Error: " + ex.Message;
            }
        }

        // ----------------- Implémentation commune -----------------

        private string Fetch(string url, string method, NameValue[] headers, string body, int cacheSeconds,
                             string userAgent, string referer, int timeoutMs = 30000, string contentTypeOverride = null)
        {
            if (string.IsNullOrWhiteSpace(url))
                return "URL manquante.";

            string cacheKey = "CP:" + method + ":" + url;

            if (cacheSeconds > 0)
            {
                var cached = HttpRuntime.Cache[cacheKey] as string;
                if (cached != null) return cached;
            }

            try
            {
                var req = (HttpWebRequest)WebRequest.Create(url);
                req.Method = method;
                req.Timeout = timeoutMs > 0 ? timeoutMs : 30000;
                if (!string.IsNullOrEmpty(userAgent)) req.UserAgent = userAgent;
                if (!string.IsNullOrEmpty(referer)) req.Referer = referer;

                if (headers != null)
                {
                    foreach (var h in headers)
                    {
                        if (h == null || string.IsNullOrEmpty(h.Name))
                            continue;

                        if (h.Name.Equals("Content-Type", StringComparison.OrdinalIgnoreCase))
                        {
                            req.ContentType = h.Value;
                        }
                        else if (h.Name.Equals("Accept", StringComparison.OrdinalIgnoreCase))
                        {
                            req.Accept = h.Value;
                        }
                        else
                        {
                            req.Headers[h.Name] = (h.Value != null) ? h.Value : string.Empty;
                        }
                    }

                }

                if (method == "POST")
                {
                    string ct = contentTypeOverride ?? req.ContentType;
                    if (string.IsNullOrEmpty(ct)) ct = "application/x-www-form-urlencoded";
                    byte[] data = Encoding.UTF8.GetBytes(body ?? "");
                    req.ContentType = ct;
                    req.ContentLength = data.Length;
                    using (var stream = req.GetRequestStream())
                        stream.Write(data, 0, data.Length);
                }

                using (var resp = (HttpWebResponse)req.GetResponse())
                {
                    var encoding = GetEncodingFromResponse(resp) ?? Encoding.UTF8;
                    using (var sr = new StreamReader(resp.GetResponseStream(), encoding))
                    {
                        string text = sr.ReadToEnd();
                        if (cacheSeconds > 0)
                        {
                            HttpRuntime.Cache.Insert(cacheKey, text, null,
                                DateTime.UtcNow.AddSeconds(cacheSeconds),
                                Cache.NoSlidingExpiration);
                        }
                        return text;
                    }
                }
            }
            catch (Exception ex)
            {
                return string.Format("<!-- Error: {ex.Message} -->");
            }
        }

        private static string EncodeFormFields(NameValue[] fields)
        {
            if (fields == null || fields.Length == 0)
                return "";

            var sb = new StringBuilder();
            for (int i = 0; i < fields.Length; i++)
            {
                string n = (fields[i] != null && fields[i].Name != null) ? fields[i].Name : "";
                string v = (fields[i] != null && fields[i].Value != null) ? fields[i].Value : "";

                if (i > 0) sb.Append('&');
                sb.Append(Uri.EscapeDataString(n));
                sb.Append('=');
                sb.Append(Uri.EscapeDataString(v));
            }
            return sb.ToString();
        }

        private static Encoding GetEncodingFromResponse(HttpWebResponse resp)
        {
            string ct = resp.ContentType ?? "";
            int idx = ct.IndexOf("charset=", StringComparison.OrdinalIgnoreCase);
            if (idx >= 0)
            {
                string charset = ct.Substring(idx + 8).Trim();
                int semi = charset.IndexOf(';');
                if (semi >= 0) charset = charset.Substring(0, semi).Trim();
                try { return Encoding.GetEncoding(charset); } catch { }
            }
            return null;
        }
    
    
}
