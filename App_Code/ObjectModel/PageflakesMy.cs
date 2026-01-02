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
    public class My{
        public My()
        {
            Profile = new profile();
        }    
        public string[] Interests {get;set;}
        public string SpecificInterests { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public int Timezone { get; set; }
        public int ZipCode { get; set; }
        public profile Profile{get;set;}
        public string FirstName {get;set;}
        public string LastName{get;set;}
    }
    public class profile{
        public string Language {get;set;}
        public bool WelcomeWizardCompleted {get;set;}
        public bool IsRealUser {get;set;}
        public int BVSTT {get;set;}
        public int  MSHP {get;set;}
        public int  MSUI {get;set;}
        public int UV {get;set;}
        public int MLSV {get;set;}
        public int CurrentPageID {get;set;}
        public string PageOrder{get;set;}
    }
    public class UserMetaData
    {
        public UserMetaData()
        {
            Profile = new profile();
        }        
        public string UniqueName { get; set; }
        public string[] Interests { get; set; }
        public string SpecificInterests { get; set; }
        public string Country { get; set; }
         public string State { get; set; }
        public string City { get; set; }
        public int Timezone { get; set; }
        public string ZipCode { get; set; }
        public profile Profile {get;set;}
        public string FirstName {get;set;}
        public string LastName {get;set;}
        public string InProductMessage{get;set;}
    }   
}