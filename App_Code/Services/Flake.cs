using System;

namespace Pageflakes.Services
{
    public class Flake { 
        public string id { get; set; } // "m1793713226" 
        public int internalId { get; set; } // 1793713226 
        public int row { get; set; } // 0 
        public int col { get; set; } // 2 
        public string title { get; set; } // "Weather Channel" 
        public string url { get; set; } // "__WEATHERCOMFLAKE__?..." 
        public bool expanded { get; set; } // true 
        public int pageId { get; set; } // 747157070 
        public bool temp { get; set; } // false 
        public bool isDirty { get; set; } // false
    }
}
