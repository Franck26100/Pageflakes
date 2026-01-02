using System;

namespace Pageflakes.Services
{
    public class SavePageResultModule
    {
        public string id { get; set; }
        public string url { get; set; }
        public string title { get; set; }
        public int col { get; set; }
        public int row{ get; set; }
        public bool IsMinimized { get; set; }
        public bool IsLocked { get; set; }

        // Toujours null dans Pageflakes
        public object Properties { get; set; }
         public int internalID {get;set;} 
        public int pageID {get;set;} 
        public bool expanded {get;set;} 
        public string[][] Profiles {get;set;}
        public string [][] PrivateProfiles {get;set;}
        public string [][] ProtectedProfiles {get;set;}
        public string[][] PublicProfiles {get;set;}
    }
}
