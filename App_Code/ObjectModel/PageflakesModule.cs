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
    
    public class Module
    {        
        [XmlElement]
        public string id { get; set; }
        [XmlElement]
        public int row { get; set; }
        [XmlElement]
        public int col { get; set; }
        [XmlElement]
        public string title { get; set; }
        [XmlElement]
        public string url { get; set; }
        [XmlElement]
        public int internalID { get; set; }
        [XmlElement]
        public int pageID { get; set; }
        [XmlElement]
        public bool expanded { get; set; }        
        [XmlElement]
        public permission Permission { get; set; }        
        public string[][] Profiles { get; set; }
        public string[][] PrivateProfiles { get; set; }
        public string[][] ProtectedProfiles { get; set; }
        public string[][] PublicProfiles { get; set; }
    }
    public class Module2{
        public Module2()
        {
            Parts = new PageParts();
            Permission = new permission();
        }        
        public PageParts Parts{get;set;}
        public string id{get;set;}
        public int row {get;set;}
        public int col{get;set;}
        public string title{get;set;}
        public string url{get;set;}                
        public int internalID{get;set;}
        public int pageID{get;set;}
        public bool expanded{get;set;}
        public permission Permission{get;set;}
        public string[][] Profiles { get; set; }
        public string[][] PublicProfiles{get;set;}
        public string[][] PrivateProfiles{get;set;}
        public string[][] ProtectedProfiles{get;set;}
    }
}