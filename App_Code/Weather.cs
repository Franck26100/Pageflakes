using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml;
using System.Resources;
using System.Globalization;

using System.Web.UI;
using System.Web.UI.WebControls;
/// <summary>
/// Description résumée de Weather
/// </summary>
/// 
namespace Pageflakes.Weather
{
    public class Weather
    {
        public static Conditions GetConditions(string location)
        {
            XmlDocument xmlGeoLookUp = new XmlDocument();
            XmlDocument xmlCurrentObj = new XmlDocument();

            xmlGeoLookUp.Load("http://api.wunderground.com/auto/wui/geo/GeoLookupXML/index.xml?query=" + location);

            Conditions current = new Conditions();
            current.City = xmlGeoLookUp.SelectSingleNode("location/city").InnerText;
            current.Country = xmlGeoLookUp.SelectSingleNode("location/country").InnerText;

            XmlNode stationNode = xmlGeoLookUp.SelectSingleNode("location/nearby_weather_stations/airport/station/icao");
            if (stationNode != null)
            {
                xmlCurrentObj.Load("http://api.wunderground.com/auto/wui/geo/WXCurrentObXML/index.xml?query=" + stationNode.InnerText);
            }
            else
            {
                int min_dist = int.MaxValue;
                string stationID = null;
                foreach (XmlNode node in xmlGeoLookUp.SelectNodes("location/nearby_weather_stations/pws"))
                {
                    try
                    {
                        int dist_km = Convert.ToInt32(node.SelectSingleNode("station/distance_km").InnerText);

                        if (dist_km < min_dist)
                        {
                            stationID = node.SelectSingleNode("station/id").InnerText;
                            min_dist = dist_km;
                        }
                    }
                    catch (Exception e) { }
                }
                if (stationID != null)
                    xmlCurrentObj.Load("http://api.wunderground.com/weatherstation/WXCurrentObXML.asp?ID=" + stationID);
                else
                    return null;
            }
            if (xmlCurrentObj.SelectSingleNode("current_observation/station_id") != null &&
                xmlCurrentObj.SelectSingleNode("current_observation/station_id").InnerText != "")
            {
                current.Condition = xmlCurrentObj.SelectSingleNode("current_observation/weather").InnerText;
                current.TempC = xmlCurrentObj.SelectSingleNode("current_observation/temp_c").InnerText;
                current.TempF = xmlCurrentObj.SelectSingleNode("current_observation/temp_f").InnerText;
                current.Wind_Dir = xmlCurrentObj.SelectSingleNode("current_observation/wind_dir").InnerText;
                current.Wind_Mph = xmlCurrentObj.SelectSingleNode("current_observation/wind_mph").InnerText;

                foreach (XmlNode node in xmlCurrentObj.SelectNodes("current_observation/icons/icon_set"))
                {
                    if (node.Attributes["name"].Value.ToUpper().Equals("GENERIC"))
                    { current.Icon = node.SelectSingleNode("icon_url").InnerText; }
                }
            }
            return current;

            
        }
        public static Conditions[] GetForecast(string location)
        {
            List<Conditions> conditions = new List<Conditions> ();

            XmlDocument xmlForecast = new XmlDocument();
            xmlForecast.Load("http://api.wunderground.com/auto/wui/geo/ForecastXML/index.xml?query=" + location);

            XmlDocument xmlGeoLookUp = new XmlDocument();
            xmlGeoLookUp.Load("http://api.wunderground.com/auto/wui/geo/GeoLookupXML/index.xml?query=" + location);

            string city = xmlGeoLookUp.SelectSingleNode("location/city").InnerText;
            string country = xmlGeoLookUp.SelectSingleNode("location/country").InnerText;

            foreach (XmlNode node in xmlForecast.SelectNodes("forecast/simpleforecast/forecastday"))
            {
                Conditions forecast = new Conditions();
                forecast.City = city;
                forecast.Country = country;
                
                forecast.DayOfWeek =  node.SelectSingleNode("date/weekday").InnerText;
                forecast.High = "<div>" + node.SelectSingleNode("high/celsius").InnerText + "&deg;C / ";
                forecast.Low = node.SelectSingleNode("low/celsius").InnerText + " &deg;C<br /><span style=\"line-height:100%;\"></span></div></td>";
                forecast.Condition = node.SelectSingleNode("conditions").InnerText;
                foreach (XmlNode node2 in node.SelectNodes("icons/icon_set"))
                {
                    if (node2.Attributes["name"].Value.ToUpper().Equals("CONTEMPORARY"))
                    { forecast.Icon = "<div><img src=\"" + node2.SelectSingleNode("icon_url").InnerText + "\" width=\"50\" height=\"50\" border=\"0\"></div>"; }
                }
                conditions.Add(forecast);
            }

            return conditions.ToArray();
        }
    }

    public class Conditions
    {
        string city = null;
        string country = null;
        string dayOfWeek =  DateTime.Now.DayOfWeek.ToString();
        string condition = null;
        string tempF = null;
        string tempC = null;
        string humidity = null;
        string wind_dir = null;
        string wind_mph = null;
        string wind_kph = null;
        string high = null;
        string low = null;
        string icon = null;

        public string City
        {
            get { return city; }
            set { city = value; }
        }

        public string Country
        {
            get { return country; }
            set { country = value; }
        }

        public string Icon
        {
            get { return icon; }
            set { icon = value; }
        }

        public string Condition
        {
            get { return condition; }
            set { condition = value; }
        }

        public string TempF
        {
            get { return tempF; }
            set { tempF = value; }
        }

        public string TempC
        {
            get { return tempC; }
            set { tempC = value; }
        }

        public string Humidity
        {
            get { return humidity; }
            set { humidity = value; }
        }

        public string Wind_Dir
        {
            get { return wind_dir; }
            set { wind_dir = value; }
        }

        public string Wind_Mph
        {
            get { return wind_mph; }
            set { wind_mph = value; }
        }

        public string Wind_Kph
        {
            get { return wind_kph; }
            set { wind_kph = value; }
        }
        public string DayOfWeek
        {
            get { return dayOfWeek; }
            set { dayOfWeek = value; }
        }

        public string High
        {
            get { return high; }
            set { high = value; }
        }

        public string Low
        {
            get { return low; }
            set { low = value; }
        }
    }
}