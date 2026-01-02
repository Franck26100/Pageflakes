using Pageflakes.ObjectModel;

namespace Pageflakes.DTO
{
    public class ModuleDTO
    {
        public string id { get; set; }
        public int row { get; set; }
        public int col { get; set; }
        public string title { get; set; }
        public string url { get; set; }
        public bool expanded { get; set; }
        public string body { get; set; }
        public string icon { get; set; }
        public string importUrl { get; set; }
        public string exportUrl { get; set; }
        public string xslUrl { get; set; }
        public object scripts { get; set; }
        public object styles { get; set; }
        public permission Permission { get; set; }
    }
}
