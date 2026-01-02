using Pageflakes.ObjectModel;
using System;

namespace Pageflakes.Data
{
    public static class MyRepository
    {
        private static UserMetaData _my = new UserMetaData
        {
            UniqueName = "",
            Interests = new string[] { },
            SpecificInterests = "",
            Country = "",
            State = "",
            City = "",
            Timezone = 0,
            ZipCode = "",
            FirstName = "",
            LastName = "",
            InProductMessage = "homepage|<strong>Tip: <a class=\"InProductLink\" id=\"SetHomePageLink\" href=\"javascript:void(0);\" onclick=\"StartPageHelper.setAsStartPage(this, true);\" title=\"Make Pageflakes your home page\" ><u>Make Pageflakes your home page!</u></a></strong>",

            Profile = new profile
            {
                BVSTT = 1,
                Language = "en",
                WelcomeWizardCompleted = true,
                IsRealUser = true,
                MSHP = 1,
                MSUI = 0,
                UV = 19,
                MLSV = 0,
                CurrentPageID = 0,
                PageOrder = "0"
            }
        };

        public static UserMetaData Get()
        {
            return _my;
        }

        public static void Save(UserMetaData data)
        {
            _my = data;
        }
    }
}
