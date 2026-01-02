using System.Collections.Generic;
using System.Web.Services;
using System.Web.Script.Services;

[WebService(Namespace = "http://pageflakes.com/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
[ScriptService]
public class RSSServices : System.Web.Services.WebService
{
    public class RSSChannel
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public string Icon { get; set; }
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet = true)]
    public List<RSSChannel> GetRSSChannelList()
    {
        try
        {
            var channels = new List<RSSChannel>
            {
                new RSSChannel {
                    Id = "rss1",
                    Title = "BBC News",
                    Url = "http://feeds.bbci.co.uk/news/rss.xml",
                    Icon = "/images/rss_bbc.png"
                },
                new RSSChannel {
                    Id = "rss2",
                    Title = "CNN Top Stories",
                    Url = "http://rss.cnn.com/rss/edition.rss",
                    Icon = "/images/rss_cnn.png"
                },
                new RSSChannel {
                    Id = "rss3",
                    Title = "Le Monde",
                    Url = "https://www.lemonde.fr/rss/une.xml",
                    Icon = "/images/rss_lemonde.png"
                }
            };

            return channels;
        }
        catch
        {
            return new List<RSSChannel>();
        }
    }
}
