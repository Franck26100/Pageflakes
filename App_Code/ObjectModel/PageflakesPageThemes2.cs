using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml;
using System.Xml.Serialization;
using System.Text.RegularExpressions;
using System.Web.Script.Services;
using System.Web.Script.Serialization;
/// Description résumée de PageflakesConstants
/// </summary>
/// 
namespace Pageflakes.ObjectModel
{
    
    
   
    public class PageTheme2{
        [XmlElement]        
        public bool IsCustomTheme { get; set; }
        [XmlElement]       
        public string ThemeName { get; set; }        
        public bool CanEdit { get; set; }
        [XmlElement]
        public bool CanDelete { get; set; }
        [XmlElement]
        public int ThemeID { get; set; }
        [XmlElement]
        public int VersionNo { get; set; }
        [XmlElement]
        public string CSS { get; set; }
        [XmlElement]
        public object PreviewGraphics { get; set; }
        [XmlElement]
        public object Properties {get;set;}        
        [XmlElement]
        public object ThemeHandlerUrl { get; set; }
        [XmlElement]
        public string ThemeShortcut { get; set; }
        [XmlElement]
        public object PreviewHandlerUrl { get; set; }

    }
}