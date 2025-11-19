using System;
using System.IO;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Caching;
using System.Web.Services;

namespace Pageflakes
{
    [WebService(Namespace = "http://pageflakes.com/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    public class ContentProxy : WebService
    {
        public class NameValue
        {
            public string Name { get; set; }
            public string Value { get; set; }
        }

        // ----------------- Méthodes exposées -----------------

        [WebMethod]
        public string GetUrl(string url, int cacheSeconds, string userAgent, string referer)
        {
            return Fetch(url, "GET", null, null, cacheSeconds, userAgent, referer);
        }

        [WebMethod]
        public string GetUrl1(string url, int cacheSeconds, string userAgent, string referer, NameValue[] headers)
        {
            return Fetch(url, "GET", headers, null, cacheSeconds, userAgent, referer);
        }

        [WebMethod]
        public string GetUrl2(string url, int cacheSeconds, string userAgent, string referer, NameValue[] headers)
        {
            return Fetch(url, "GET", headers, null, cacheSeconds, userAgent, referer);
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
        public string FormPost(string url, NameValue[] fields, NameValue[] headers, int cacheSeconds, int timeoutMs)
        {
            string body = EncodeFormFields(fields);
            return Fetch(url, "POST", headers, body, cacheSeconds, null, null, timeoutMs, "application/x-www-form-urlencoded");
        }

        [WebMethod]
        public string FormPost2(string url, NameValue[] fields, NameValue[] headers, int cacheSeconds, int timeoutMs, string userAgent)
        {
            string body = EncodeFormFields(fields);
            return Fetch(url, "POST", headers, body, cacheSeconds, userAgent, null, timeoutMs, "application/x-www-form-urlencoded");
        }

        [WebMethod]
        public string FormPost3(string url, NameValue[] fields, NameValue[] headers, int cacheSeconds, int timeoutMs, string userAgent, string contentType)
        {
            string body = EncodeFormFields(fields);
            return Fetch(url, "POST", headers, body, cacheSeconds, userAgent, null, timeoutMs, contentType);
        }

        [WebMethod]
        public string UploadString(string url, string body, string contentType, NameValue[] headers, int cacheSeconds)
        {
            return Fetch(url, "POST", headers, body, cacheSeconds, null, null, 30000, contentType);
        }

        [WebMethod]
        public string UploadString2(string url, string body, string contentType, NameValue[] headers, int cacheSeconds, int timeoutMs)
        {
            return Fetch(url, "POST", headers, body, cacheSeconds, null, null, timeoutMs, contentType);
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
                        if (string.IsNullOrEmpty(h?.Name)) continue;
                        if (h.Name.Equals("Content-Type", StringComparison.OrdinalIgnoreCase))
                            req.ContentType = h.Value;
                        else if (h.Name.Equals("Accept", StringComparison.OrdinalIgnoreCase))
                            req.Accept = h.Value;
                        else
                            req.Headers[h.Name] = h.Value ?? string.Empty;
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
            if (fields == null || fields.Length == 0) return "";
            var sb = new StringBuilder();
            for (int i = 0; i < fields.Length; i++)
            {
                var n = fields[i]?.Name ?? "";
                var v = fields[i]?.Value ?? "";
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
}
