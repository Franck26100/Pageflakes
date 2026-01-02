using System;
using System.Data;
using System.Net;
using System.Web;
using System.Xml;
using System.Collections.Generic;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Web.Script.Services;
using System.Web.Security;
namespace Pageflakes
{
    [WebService(Namespace = "http://pageflakes.com/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.Web.Script.Services.ScriptService]
    public class WeatherComServices : System.Web.Services.WebService
    {    

        [WebMethod]
        public string[] GetWeatherUnits()
        {
            return new[] { "m", "e" }; // m = metric, e = english/imperial
        }

        
        [WebMethod]
        [ScriptMethod(ResponseFormat=ResponseFormat.Json, UseHttpGet=true)]
        public WeatherComFlakeComponents GetComponents(int flakeId)
        {
            Context.Response.ContentEncoding = System.Text.Encoding.UTF8;
            Context.Response.Charset = "UTF-8";
            WeatherComFlakeComponents weathcom = new WeatherComFlakeComponents();
            GeoInfo geo = WeatherComServicesHelper.GetGeoFromIP();
            List<ForecastItem> forecast = WeatherComServicesHelper.GetForecast(geo.Lat, geo.Lon);
            string ForecastString = "";
            weathcom.LocationHtml =            
            "<div id=\"m" + flakeId + "tabcontents0\"><div style=\"padding-top:14px;\">" + 
            "<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\">" +
            "<tr><td style=\"width:4px;height:12px;background-image:url(flakes/WeatherComFlake/images/bo_tl.png);\"></td>" +
            "<td style=\"background-image:url(flakes/WeatherComFlake/images/bo_tm.png);line-height:100%;vertical-align:top;padding-left:8px;\">" +
            "<span style=\"background-color:#ffffff;padding:0 4px;\">" + geo.City + "</span></td>" +
            "<td style=\"width:4px;height:12px;background-image:url(flakes/WeatherComFlake/images/bo_tr.png);\"></td></tr>" +
            "<tr><td style=\"background-image:url(flakes/WeatherComFlake/images/bo_ml.png);\"></td>" +
            "<td style=\"padding:10px 0 0px;\"><table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"><tr>";
            foreach (ForecastItem f in forecast)
            {
                ForecastString += "<td style=\"width:16%;vertical-align:top;text-align:center;\">" +
                              "<div>" + f.Day + "</div>" +
                              "<div><img src=\"" + f.IconUrl + "\" /></div><div>" +
                              f.TempMax + "° / " + f.TempMin + "°" +"<br /></div></td><br />" + 
                              "<span style=\"line-height:100%;\"></span></div></td>";
            }           
            weathcom.LocationHtml +="</tr></table><div style=\"text-align:right;font-size:7pt;padding-top:8px;padding-right:6px;color:#333333;\"><a href=\"http://www.weather.com/weather/hourbyhour/FRXX0102?par=pageflakesxml&site=pageflakes&cm_ven=bd_select&cm_cat=pageflakesxml&cm_pla=Pageflakes&cm_ite=CityPage\" target=\"_blank\" style=\"color:#333333;\">Hourly Forecast</a> | <a href=\"http://www.weather.com/weather/tenday/FRXX0102?par=pageflakesxml&site=pageflakes&cm_ven=bd_select&cm_cat=pageflakesxml&cm_pla=Pageflakes&cm_ite=CityPage\" target=\"_blank\" style=\"color:#333333;\">10-Day Forecast</a></div></td><td style=\"background-image:url(flakes/WeatherComFlake/images/bo_mr.png);\"></td></tr><tr><td style=\"width:4px;height:4px;background-image:url(flakes/WeatherComFlake/images/bo_bl.png);\"></td><td style=\"background-image:url(flakes/WeatherComFlake/images/bo_bm.png)\"></td><td style=\"width:4px;height:4px;background-image:url(flakes/WeatherComFlake/images/bo_br.png);\"></td></tr></table></div></div>";


            weathcom.Locations = WeatherComServicesHelper.SearchLocations(geo.City);
            weathcom.TabHtml = "<div id=\"m" + flakeId + "weathertabs\"></div>";    
            return weathcom;  
           

        }
    }
    public class WeatherComServicesHelper
    {
        static WeatherComServicesHelper()
        {
            System.Net.ServicePointManager.SecurityProtocol =
            System.Net.SecurityProtocolType.Tls12 |
            System.Net.SecurityProtocolType.Tls11 |
            System.Net.SecurityProtocolType.Tls;
        }
        private const string API_KEY = "36b3d898324da0fc7e2b613e1fe3a333";

        // Localisation auto via IP
        public static GeoInfo GetGeoFromIP()
        {
            GeoInfo info = new GeoInfo();
            using (var wc = new WebClient())
            {
                string xml = wc.DownloadString("http://ip-api.com/xml/");
                XmlDocument doc = new XmlDocument();
                doc.LoadXml(xml);
                string status = SafeXml(doc, "/query/status");
                if (status != "success")
                {
                    info.City = "Paris";
                    info.Country = "France";
                    info.Lat = 48.8566;
                    info.Lon = 2.3522;
                    return info;
                }
                info.City = SafeXml(doc, "/query/city");
                info.Country = SafeXml(doc, "/query/country");
                info.Lat = ParseDoubleSafe(SafeXml(doc, "/query/lat"));
                info.Lon = ParseDoubleSafe(SafeXml(doc, "/query/lon"));
            }
            return info;
        }
        public static List<ForecastItem> GetForecast(double lat, double lon)
        {
            string url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon +
                "&mode=xml&units=metric&lang=fr&appid=" + API_KEY;
            List<ForecastItem> list = new List<ForecastItem>();
            using (var wc = new WebClient())
            {
                string xml = wc.DownloadString(url);
                XmlDocument doc = new XmlDocument();
                doc.LoadXml(xml);
                XmlNodeList nodes = doc.SelectNodes("//forecast/time");
                int count = 0;
                foreach (XmlNode n in nodes)
                {
                    if (count == 5) break;
                        ForecastItem f = new ForecastItem();
                        DateTime dt = DateTime.Parse(n.Attributes["from"].Value);
                        f.Day = dt.ToString("dddd");
                        XmlNode temp = n.SelectSingleNode("temperature");
                        f.TempMax = ParseDoubleSafe(temp.Attributes["max"].Value);
                        f.TempMin = ParseDoubleSafe(temp.Attributes["min"].Value);
                        XmlNode symbol = n.SelectSingleNode("symbol");
                        string icon = symbol.Attributes["var"].Value;
                        f.IconUrl = "https://openweathermap.org/img/wn/" + icon + ".png";
                        list.Add(f);
                        count++;
                }
            }
            return list;
        }
        private static string GetXmlValue(XmlDocument doc, string xpath)
        {
            XmlNode n = doc.SelectSingleNode(xpath);
            return n == null ? "" : n.InnerText.Trim();
        }

        private static double ParseDoubleSafe(string s)
        {
            if (string.IsNullOrEmpty(s))
                return 0;
                // Remplace virgule FR par point US
            s = s.Replace(",", ".");
            double d;
            if (double.TryParse(s, System.Globalization.NumberStyles.Any,
                        System.Globalization.CultureInfo.InvariantCulture, out d))
            return d;
            return 0;
        }
        // Prévisions OpenWeatherMap
        private static DateTime UnixToDate(long unix)
        {
            return DateTimeOffset.FromUnixTimeSeconds(unix).DateTime;
        }
        private static string SafeXml(XmlDocument doc, string xpath)
        {
            XmlNode n = doc.SelectSingleNode(xpath);
            return n == null ? "" : n.InnerText.Trim();
        }        

        private static string ExtractJsonValue(string block, string key)
        {
            int i = block.IndexOf(key);
            if (i == -1) return "";
            i = block.IndexOf(":", i);
            if (i == -1) return "";
            i++;
            if (block[i] == '"')
            {
                i++;
                int j = block.IndexOf("\"", i);
                if (j == -1) return "";
                    return block.Substring(i, j - i);
            }
            else{
                int j = block.IndexOf(",", i);
                if (j == -1) j = block.Length;
                    return block.Substring(i, j - i).Trim();
            }
        }       
        // Recherche de ville
        public static List<WeatherComLocation> SearchLocations(string city)
        {
            List<WeatherComLocation> list = new List<WeatherComLocation>();
            if (string.IsNullOrEmpty(city))
                return list;
            string url = string.Format(
                "http://api.openweathermap.org/geo/1.0/direct?q={0}&limit=5&appid={1}", HttpUtility.UrlEncode(city), API_KEY );
            string json = "";
            using (var wc = new WebClient())
            {
                json = wc.DownloadString(url);
            }
            json = json.Trim();
            if (json == "[]" || json.Length < 5)
                return list;
                json = json.Substring(1, json.Length - 2).Trim();
                string[] items = json.Split(new string[] { "},{" }, StringSplitOptions.None);
                foreach (string raw in items)
                {
                    string block = raw.Replace("{", "").Replace("}", "").Trim();
                    string name = ExtractJsonValue(block, "\"name\"");
                    string country = ExtractJsonValue(block, "\"country\"");
                    string lat = ExtractJsonValue(block, "\"lat\"");
                    string lon = ExtractJsonValue(block, "\"lon\"");
                    if (name != "")
                    {
                        string id = lat + "," + lon;
                        list.Add(new WeatherComLocation(id, name + ", " + country, "1"));
                    }
                }
                return list;
        }    
    }
}




