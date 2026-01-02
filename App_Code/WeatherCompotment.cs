using System;
using System.Collections.Generic;
using System.Data;
using System.Net;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
//using Newtonsoft.Json;
using System.Xml;
public class WeatherComFlakeComponents
{
    public List<WeatherComLocation> Locations { get; set; }
    public string LocationHtml { get; set; }
    public string TabHtml { get; set; }
    public string Unit { get; set; }

    public WeatherComFlakeComponents()
    {
        Locations = new List<WeatherComLocation>();
        LocationHtml = "";
        TabHtml = "";
        Unit = "m";
    }
}

[Serializable]
public class WeatherComLocation
{
    public string ID { get; set; }
    public string Name { get; set; }
    public string Enabled { get; set; }

    public WeatherComLocation() { }

    public WeatherComLocation(string id, string name, string enabled)
    {
        ID = id;
        Name = name;
        Enabled = enabled;
    }
}

public class GeoInfo
{
    public string City;
    public string Country;
    public double Lat;
    public double Lon;
}

public class ForecastItem
{
    public string Day;
    public double TempMax;
    public double TempMin;
    public string IconUrl;
}
