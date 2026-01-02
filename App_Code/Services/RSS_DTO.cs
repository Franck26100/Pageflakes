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

namespace Pageflakes.Services
{
     public class RSSChannel
    {
        [XmlElement("Type")]
        public string Type { get; set; }
        [XmlElement("FeedSource")]
        public string FeedSource { get; set; }
        [XmlElement("ReadItemIds")]
        public string ReadItemIds { get; set; }
    }
    // Classe simple pour remplacer les tuples modernes
    public class Bookmark
    {
        public string Title { get; set; }
        public string Url { get; set; }
    }
    public class ContentType
    {
        public string Title { get; set; }
        public string Url { get; set; }
        // Values: "Invalid", "Unknown", "RSS", "Atom", "Pageflake"
        public string TypeOfContent { get; set; }
    }

    internal class FetchResult
    {
        public string ContentType { get; set; }
        public string Body { get; set; }
    }

    public class GetAddFeedPopupResult
    {
        [XmlArray("scripts")]
        [XmlArrayItem("ScriptTag")]
        public List<Pageflakes.ObjectModel.ScriptTag> scripts { get; set; }

        [XmlArray("styles")]
        [XmlArrayItem("StyleTag")]
        public List<Pageflakes.ObjectModel.StyleTag> styles { get; set; }

        [XmlElement("body")]
        public string body { get; set; }

        [XmlElement("id")]
        public string id { get; set; }

        [XmlElement("title")]
        public string title { get; set; }

        [XmlElement("url")]
        public string url { get; set; }

        [XmlElement("icon")]
        public string icon { get; set; }

        [XmlElement("texts")]
        public string texts { get; set; }
    }
    public class FeedHelper{
    private static string DetectXmlPrologCharset(string body)
        {
            try
            {
                var m = Regex.Match(body ?? "", @"<\?xml[^>]*encoding\s*=\s*[""']([^""']+)[""']", RegexOptions.IgnoreCase);
                if (m.Success) return m.Groups[1].Value.Trim();
            }
            catch { }
            return null;
        }
     private static bool IsXmlContentType(string contentType)
        {
            if (string.IsNullOrWhiteSpace(contentType)) return false;
            contentType = contentType.ToLowerInvariant();
            return contentType.Contains("application/rss+xml")
                || contentType.Contains("application/atom+xml")
                || contentType.Contains("application/xml")
                || contentType.Contains("text/xml");
        }
        private static bool IsHtmlContentType(string contentType)
        {
            if (string.IsNullOrWhiteSpace(contentType)) return false;
            contentType = contentType.ToLowerInvariant();
            return contentType.Contains("text/html");
        }

        private static bool LooksLikeXml(string body)
        {
            if (string.IsNullOrWhiteSpace(body)) return false;
            var trimmed = body.TrimStart();
            return trimmed.StartsWith("<");
        }

        private static bool LooksLikeHtml(string body)
        {
            if (string.IsNullOrWhiteSpace(body)) return false;
            // Heuristique rapide: présence d'une balise html ou doctype
            return body.IndexOf("<html", StringComparison.OrdinalIgnoreCase) >= 0
                || body.IndexOf("<!doctype html", StringComparison.OrdinalIgnoreCase) >= 0;
        }

        private static string SafeTitleFromXml(string xml)
        {
            try
            {
                var doc = new XmlDocument();
                doc.XmlResolver = null;
                doc.LoadXml(xml);
                // RSS: /rss/channel/title
                var rssTitle = doc.SelectSingleNode("/rss/channel/title");
                if (rssTitle != null) return rssTitle.InnerText.Trim();
                // Atom: /feed/title
                var atomTitle = doc.SelectSingleNode("/*[local-name()='feed']/*[local-name()='title']");
                if (atomTitle != null) return atomTitle.InnerText.Trim();
                // Pageflake personnalisé
                var pfTitle = doc.SelectSingleNode("/*[local-name()='Pageflake' or local-name()='parts']/*[local-name()='title']");
                if (pfTitle != null) return pfTitle.InnerText.Trim();
            }
            catch { }
            return "XML content";
        }

        private static ContentType DetectFromXml(string xml, string sourceUrl)
        {
            try
            {
                var doc = new XmlDocument();
                doc.XmlResolver = null;
                doc.LoadXml(xml);

                var root = doc.DocumentElement;
                var lname = root.LocalName.ToLowerInvariant();
                var ns = root.NamespaceURI ?? "";

                // Détection RSS (root rss)
                if (lname == "rss")
                {
                    var node = doc.SelectSingleNode("/rss/channel/title");
                    string title = string.Empty;
                    return new ContentType
                    {
                        Title = string.IsNullOrWhiteSpace(title) ? "RSS Feed" : title,
                        Url = sourceUrl,
                        TypeOfContent = "RSS"
                    };
                }

                // Détection Atom (root feed)
                if (lname == "feed" && (ns.Contains("atom") || ns == "http://www.w3.org/2005/Atom" || ns == "http://purl.org/atom/ns#"))
                {
                    var node = doc.SelectSingleNode("/*[local-name()='feed']/*[local-name()='title']");
                    string title = string.Empty;
                    return new ContentType
                    {
                        Title = string.IsNullOrWhiteSpace(title) ? "Atom Feed" : title,
                        Url = sourceUrl,
                        TypeOfContent = "Atom"
                    };
                }

                // Détection Pageflake (manifest/parts connus)
                // On considère soit une racine <Pageflake>, soit présence d'un namespace Pageflakes, soit structure Parts similaire.
                if (lname == "pageflake" || ns.Contains("Pageflakes") ||
                    doc.SelectSingleNode("/*[local-name()='Parts' or local-name()='page' or local-name()='Pageflake']") != null)
                {
                    var node = doc.SelectSingleNode("/*/*[local-name()='title']");
                    string title = string.Empty;
                    if (string.IsNullOrWhiteSpace(title)) title = "Pageflake Content";
                    return new ContentType
                    {
                        Title = title,
                        Url = sourceUrl,
                        TypeOfContent = "Pageflake"
                    };
                }

                // Si on arrive ici, non reconnu
                return null;
            }
            catch
            {
                return null;
            }
        }

        private static string ExtractHtmlTitle(string html)
        {
            try
            {
                var m = Regex.Match(html, @"<title[^>]*>(.*?)</title>", RegexOptions.IgnoreCase | RegexOptions.Singleline);
                if (m.Success) return WebUtility.HtmlDecode(m.Groups[1].Value.Trim());
            }
            catch { }
            return string.Empty;
        }

        private static List<string> DiscoverFeedsInHtml(string html, string baseUrl)
        {
            var list = new List<string>();
            try
            {
                // link rel="alternate" type="application/rss+xml" or "application/atom+xml"
                var rx = new Regex(@"<link[^>]+rel\s*=\s*[""']alternate[""'][^>]*>", RegexOptions.IgnoreCase);
                var matches = rx.Matches(html);
                foreach (Match match in matches)
                {
                    var tag = match.Value;
                    var type = ExtractAttr(tag, "type");
                    if (type == null) continue;
                    var t = type.ToLowerInvariant();
                    if (t.Contains("application/rss+xml") || t.Contains("application/atom+xml"))
                    {
                        var href = ExtractAttr(tag, "href");
                        if (!string.IsNullOrWhiteSpace(href))
                        {
                            var absolute = ToAbsoluteUrl(baseUrl, href);
                            list.Add(absolute);
                        }
                    }
                }

                // Heuristique additionnelle: balises a vers .rss/.atom
                var rxA = new Regex(@"<a[^>]+href\s*=\s*[""']([^""']+)[""'][^>]*>", RegexOptions.IgnoreCase);
                var aMatches = rxA.Matches(html);
                foreach (Match m in aMatches)
                {
                    var href = m.Groups[1].Value;
                    if (href.EndsWith(".rss", StringComparison.OrdinalIgnoreCase) ||
                        href.EndsWith(".xml", StringComparison.OrdinalIgnoreCase) ||
                        href.EndsWith(".atom", StringComparison.OrdinalIgnoreCase))
                    {
                        list.Add(ToAbsoluteUrl(baseUrl, href));
                    }
                }
            }
            catch { }
            return Dedup(list);
        }

        private static string ExtractAttr(string tag, string attr)
        {
            var rx = new Regex(attr + @"\s*=\s*[""'](.*?)[""']", RegexOptions.IgnoreCase);
            var m = rx.Match(tag);
            return m.Success ? m.Groups[1].Value : null;
        }

        private static List<string> Dedup(List<string> input)
        {
            var set = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
            var res = new List<string>();
            foreach (var s in input)
            {
                if (string.IsNullOrWhiteSpace(s)) continue;
                if (set.Add(s)) res.Add(s);
            }
            return res;
        }

        private static string ToAbsoluteUrl(string baseUrl, string href)
        {
            try
            {
                // Vérification manuelle au lieu de string.IsNullOrWhiteSpace
                if (href == null || href.Trim().Length == 0)
                    return href;

                Uri abs;
                if (Uri.TryCreate(href, UriKind.Absolute, out abs))
                    return abs.ToString();

                Uri rel;
                if (Uri.TryCreate(new Uri(baseUrl), href, out rel))
                    return rel.ToString();
            }
            catch
            {
                // Ignorer les erreurs
            }

            return href;
        }

        private static FetchResult FetchUrl(string url)
        {
            var req = (HttpWebRequest)WebRequest.Create(url);
            req.Method = "GET";
            req.UserAgent = "Pageflakes-Discover/1.0 (+https://www.Pageflakes.com)";
            req.AllowAutoRedirect = true;
            req.MaximumAutomaticRedirections = 8;
            req.Timeout = 15000;
            req.ReadWriteTimeout = 15000;

            using (var resp = (HttpWebResponse)req.GetResponse())
            {
                var ct = resp.ContentType ?? "";
                var encoding = DetectEncoding(resp, ct);
                using (var stream = resp.GetResponseStream())
                using (var ms = new MemoryStream())
                {
                    stream.CopyTo(ms);
                    var bytes = ms.ToArray();
                    var body = encoding.GetString(bytes);
                    // Si XML avec prolog et charset différent, re-détecter
                    var xmlDeclCharset = DetectXmlPrologCharset(body);
                    if (!string.IsNullOrWhiteSpace(xmlDeclCharset))
                    {
                        try
                        {
                            var enc = Encoding.GetEncoding(xmlDeclCharset);
                            body = enc.GetString(bytes);
                        }
                        catch { /* garder body tel quel */ }
                    }
                    return new FetchResult { ContentType = ct, Body = body };
                }
            }
        }
        
        private static Encoding DetectEncoding(HttpWebResponse resp, string contentType)
        {
            try
            {
                // charset=... dans Content-Type
                var m = Regex.Match(contentType ?? "", @"charset\s*=\s*([^\s;]+)", RegexOptions.IgnoreCase);
                if (m.Success)
                {
                    var name = m.Groups[1].Value.Trim().Trim('"').Trim('\'');
                    return Encoding.GetEncoding(name);
                }
            }
            catch { }
            // Fallback UTF-8
            return Encoding.UTF8;
        }
    }
}