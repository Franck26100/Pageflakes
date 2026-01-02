namespace Pageflakes.ObjectModel
{
    public class PageData
    {
        public PageData()
        {
            //pageTheme = new Pageflakes.ObjectModel.PageTheme2();
            columnSizes = new string[]{};
        }
        public int id { get; set; }        
        public int index {get;set;}
        public string title { get; set; }
        public int columnCount {get;set;}
        public string[] columnSizes { get; set; }
        public object pageTheme{get;set;}               
    }
}