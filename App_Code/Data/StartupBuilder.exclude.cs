//Code Venant IA Copilot Statup offline

using Pageflakes.ObjectModel;
using Pageflakes.Data;
using System.Collections.Generic;

namespace Pageflakes.Data
{
    public static class StartupBuilder
    {
        public static PageflakeInfo BuildStartupInfo()
        {
            var my = MyRepository.Get();

var info = new PageflakeInfo
{
    VersionSuffix = "",
    Language = "en",
    DomainID = 1,
    LanguageID = 1,

    UserPublishURL = "", 
    UserUniqueName = my.UniqueName, 
    UserFullName = ((my.FirstName ?? "") + " " + (my.LastName ?? "")).Trim(), 
    UserGUID = "", 
    UserVersionNo = 1,

    CurrentPageID = my.Profile.CurrentPageID,
    CurrentPageVersionNo = 1,
    IsCurrentPageLoaded = true,

    IsSubscribedForNewsletter = false,
    ViewingPageOf = my.UniqueName,

    Template = TemplateRepository.GetDefaultTemplate(),
    CurrentPageTheme = ThemeRepository.GetTheme(),

    Pages = PageRepository.GetPages(),

    SearchEngine = 0,
    ShowSearchBar = true,

    IsAnonymous = false,
    IsMySite = true,
    IsFirstVisit = false,
    ShowWelcomeWizard = false,
    ErrorMsg = null,

    My = my
    };


            return info;
        }
    }
}
