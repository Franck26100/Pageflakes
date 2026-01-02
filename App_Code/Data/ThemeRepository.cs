

using Pageflakes.ObjectModel;
using System;

namespace Pageflakes.Data
{
    public static class ThemeRepository
    {
        public static PageTheme2 GetTheme()
        {
            return new PageTheme2
            {
                IsCustomTheme = false,
                ThemeName = "T12",
                CanEdit = false,
                CanDelete = false,
                ThemeID = 12,
                VersionNo = 1,

                // Le CSS exact utilisé par ton Template T12
                CSS = "http://10.0.0.1/Pageflakes/App_Themes/T12/s.axd?s=CSS1&h=www.pageflakes.com&l=en&v=&b=Mozilla&m=5&t=T12",

                // Valeurs historiques : null ou objets dynamiques
                PreviewGraphics = null,
                Properties = null,
                ThemeHandlerUrl = null,
                PreviewHandlerUrl = null,

                // Le raccourci du thème (souvent utilisé par Framework.js)
                ThemeShortcut = "T12"
            };
        }
        public static PageTheme2 GetDefaultTheme() { 
            return new PageTheme2 { 
                IsCustomTheme = false, 
                ThemeName = "Cool Blue", 
                CanEdit = false, 
                CanDelete = false, 
                ThemeID = 12, 
                VersionNo = 4, 
                CSS = ".menu a { color:#ffffff; font-weight:bold; }", 
                PreviewGraphics = "App_Themes/Purple_Unified/ThemePreview.png", 
                Properties = null, 
                ThemeHandlerUrl = "/p.axd?i=12&t=&h=www.pageflakes.com&v=4&b=AppleMAC-Safari&m=5", 
                ThemeShortcut = "T12", 
                PreviewHandlerUrl = "App_Themes/Purple_Unified/ThemePreview.png" 
            }; 
        }
    }
}
