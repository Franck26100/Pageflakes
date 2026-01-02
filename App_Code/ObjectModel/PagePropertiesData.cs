namespace Pageflakes.ObjectModel
{
    public class PagePropertiesData
    {
        public int id { get; set; }
        public int index { get; set; }
        public string title { get; set; }
        public int columnCount { get; set; }
        public string[] columnSizes { get; set; }
        public object pageTheme { get; set; }

        public PagePropertiesData()
        {
            columnSizes = new string[] { };
        }
    }
}
