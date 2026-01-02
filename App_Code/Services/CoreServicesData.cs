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
namespace Pageflakes.Services{
    // DTOs pour sérialisation SOAP
    
    public class Parts{
        public string __type {get;set;}
        public string body {get;set;}
        public string url{get;set;}
        public List<Pageflakes.ObjectModel.ScriptTag> scripts {get;set;}
        public List<Pageflakes.ObjectModel.StyleTag> styles {get;set;}
        public string id{get;set;}
        public string title{get;set;}
        public string icon{get;set;}
        //public string importUrl {get;set;}
        //public string exportUrl {get;set;}
        //public string xslUrl {get;set;}
        //public Permission Permission{get;set;}
        public string[] texts {get;set;}
    }
    

    
    public class PublicInfo{

    }
            
    /*
    public class SavePageResultModule { 
        public string id { get; set; } 
        public int row { get; set; } 
        public int col { get; set; } 
        public string title { get; set; } 
        public string url { get; set; } 
        public int internalID { get; set; } 
        public int pageID { get; set; } 
        public bool expanded { get; set; } 
        public object Profiles { get; set; } 
        public object PrivateProfiles { get; set; } 
        public object ProtectedProfiles { get; set; } 
        public object PublicProfiles { get; set; } 
    }*/
    public class SavePageResultPagePart { 
        public object scripts { get; set; } 
        public object styles { get; set; } 
        public string body { get; set; } 
        public string id { get; set; } 
        public string title { get; set; } 
        public string url { get; set; } 
        public string icon { get; set; } 
        public object texts { get; set; } 
    }
}


    
