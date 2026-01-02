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
    public class PageflakeInfo{  
        public PageflakeInfo()
            {
                Template = new template();
                CurrentPageTheme = new PageTheme2();
                Pages = new List<pageSetting>();
                My = new UserMetaData();
            }          
        public string VersionSuffix {get;set;}
        public string Language {get;set;}
        public int DomainID {get;set;}
        public int LanguageID{get;set;}
        public string UserPublishURL {get;set;}
        public string UserUniqueName {get;set;}
        public string UserFullName {get;set;}
        public string UserGUID {get;set;}
        public int UserVersionNo {get;set;}
        public int CurrentPageID {get;set;}
        public int CurrentPageVersionNo {get;set;}
        public bool IsSubscribedForNewsletter {get;set;}
        public string ViewingPageOf {get;set;}
        public template Template {get;set;}
        public PageTheme2 CurrentPageTheme {get;set;}
        public List<pageSetting> Pages {get;set;}
        public int SearchEngine {get;set;}
        public bool ShowSearchBar {get;set;}
        public bool IsAnonymous {get;set;}
        public bool IsMySite{get;set;}
        // Ajouter les manquant
        public bool IsFirstVisit{get;set;}
        public bool ShowWelcomeWizard {get;set;}
        public string ErrorMsg {get;set;}
        public UserMetaData My {get;set;}
        public bool IsCurrentPageLoaded{get;set;} 

    }
    public class template {        
        [XmlElement("ModuleHtml")]
        public string ModuleHtml { get; set; }
        [XmlElement("StylesheetHref")]
        public string StylesheetHref { get; set; }
        [XmlElement("PopupHtml")]
        public string PopupHtml { get; set; }
        [XmlElement("ThemePath")]
        public string ThemePath { get; set; }
    }
}