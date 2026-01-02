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
    public class permission
    {       
        public bool CanDrag { get; set; }
        public bool CanEdit { get; set; }
        public bool CanCollapse { get; set; }
        public bool CanClose { get; set; }
    }
    
    
}

