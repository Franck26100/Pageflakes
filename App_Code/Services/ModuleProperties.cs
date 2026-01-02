using System;

namespace Pageflakes.Services
{
    public class ModuleProperties
    {
        public string id { get; set; }           // "m356858293"
        public int internalId { get; set; }      // 356858293
        public int row { get; set; }             // 0
        public int col { get; set; }             // 1
        public string title { get; set; }        // "Calendar"
        public string url { get; set; }          // "__CALENDAR__"
        public bool expanded { get; set; }       // true
        public int pageId { get; set; }          // 2055980265

        public bool temp { get; set; }
        public bool isDirty { get; set; }
        public string[][] Profiles { get; set; }
        public string[][] PrivateProfiles { get; set; }
        public string[][] ProtectedProfiles { get; set; }
        public string[][] PublicProfiles { get; set; }
    }
}
