using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

/// <summary>
/// Description résumée de Constants
/// </summary>
 namespace Pageflakes.Common
{
    public static class Constants
    {
        public const string VERSION_SUFFIX = "213en";
        public static string SITE_PREFIX = "http://10.0.0.1/Pageflakes/";
        public const string IMAGE_PREFIX = "http://10.0.0.1/Pagflakes/images";
        public const string DEFAULT_THEME_PATH = "T12";
        public const string DEFAULT_STYLE_SHEET = "/f.axd?s=CSS1&t=c&v=213";
    
        public const string PRODUCTIVITY = "CommonFlakeJS_Productivity";
        public const string ENTERTAINMENT = "CommonFlakeJS_Entertainment";
        public const string TOPFLAKES = "CommonFlakeJS_TopFlakes";

        public const string PRODUCT_JS ="f.axd?s=CommonFlakeJS_Productivity&t=j&v=217";
        public const string ENTERTAI_JS ="f.axd?s=CommonFlakeJS_Entertainment&t=j&v=217";
        public const string  TOPFLAKE_JS = "f.axd?s=CommonFlakeJS_TopFlakes&t=j&v=217";
    
        public const string COMMONFLAKECSS = "CommonFlakeCSS";

        public const string COMMON_FLAKE_CSS = "f.axd?s=CommonFlakeCSS&t=c&v=217";
        
    [Serializable]
    public class location

    {
        //public string IP { get; set; }       // IP
        public string CountryName { get; set; }
        public string RegionName { get; set; }       
        public string City { get; set; }
        public int TimeZone { get; set; }
        public int ZipCode { get; set; }

        /*
        public string CountryCode { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        
        public string Status { get; set; }
        public string Message { get; set; }
        public string RegionName { get; set; }
        */
    }

    }

}