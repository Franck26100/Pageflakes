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
    public class PageParts
    {   
        public PageParts()
        {
            styles = new List<StyleTag>();
            scripts = new List<ScriptTag>();
            Permission = new permission();
        } 
        [XmlArray("scripts")]
        [XmlArrayItem("ScriptTag")]
        public List<ScriptTag> scripts { get; set; }
        [XmlArray("styles")]
        [XmlArrayItem("StyleTag")]
        public List<StyleTag> styles { get; set; }
        [XmlElement]
        public string body { get; set; }
        [XmlElement]
        public string id { get; set; }
        [XmlElement]
        public string title { get; set; }
        [XmlElement]
        public string url { get; set; }
        [XmlElement]
        public string icon { get; set; }
        [XmlElement]
        public string importUrl { get; set; }
        [XmlElement]
        public string exportUrl { get; set; }
        [XmlElement]
        public string xslUrl { get; set; }
        [XmlIgnore]        
        public string[] texts { get; set; }        
        public permission Permission { get; set; }
    }
    public class ScriptTag
    {    
        [XmlElement("id")]
        public string id { get; set; }
        [XmlElement("src")]
        public string src { get; set; }
        [XmlElement("content")]
        public string content { get; set; }
    }
    public class StyleTag
    {        
        [XmlElement("id")]
        public string id { get; set; }
        [XmlElement("href")]
        public string href { get; set; }
        [XmlElement("content")]
        public string content { get; set; }
    }
}    