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
    
    
   
    
    public class pageSetting
    {
        public pageSetting()
        {
            PageParts = new List<PageParts>();
            Theme = new PageTheme2();
            Modules = new List<Module>();
        } 
        [XmlElement]      
        public int ID { get; set; }
        [XmlElement]
        public int VersionNo { get; set; }
        [XmlElement]
        public string Name { get; set; }
        [XmlElement]
        public int OrderNo { get; set; }
        [XmlElement]
        public int SharingStatus { get; set; }
        [XmlElement]
        public int ColumnCount { get; set; }
        [XmlElement]
        public string OwnerName { get; set; }
        [XmlElement]
        public string OwnerFullname { get; set; }
        [XmlElement]
        public int HitCount { get; set; }
        [XmlElement]
        public bool IsPublished { get; set; }
        [XmlElement]
        public bool IsOwner { get; set; }
        [XmlElement]
        public bool IsShared { get; set; }       
        public List<Module> Modules { get; set; }        
        public List<PageParts> PageParts { get; set; }
        [XmlElement]        
        public string Scripts { get; set; }
        [XmlElement]       
        public string Stylesheets {get;set;}
        [XmlElement]
        public bool CanMoveFlakes { get; set; }
        [XmlElement]
        public bool CanAddFlake { get; set; }
        [XmlElement]
        public bool CanEditFlake { get; set; }
        [XmlElement]
        public bool CanDeleteFlake { get; set; }
        [XmlElement]
        public bool CanChangeFlake { get; set; }
        [XmlElement]
        public bool CanRemovePage { get; set; }
        [XmlElement]
        public bool CanChangePage { get; set; }
        [XmlElement]
        public bool CanInviteOthers { get; set; }
        [XmlElement]
        public bool IsNewlyShared { get; set; }
        [XmlElement]
        public string SharedBy { get; set; }
        [XmlElement]
        public string ColumnSizes { get; set; }
        [XmlElement]
        public bool HasChanged { get; set; }
        [XmlElement]
        public PageTheme2 Theme { get; set; }
    }
}    