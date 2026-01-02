using System;
using System.Collections.Generic;
using Pageflakes.ObjectModel;

namespace Pageflakes.Utils
{
    public static class ThemeUtils
{
    public static PageTheme2 CleanTheme(PageTheme2 theme)
    {
        if (theme == null)
            return new PageTheme2();

        // Clonage propre et typé
        var clean = new PageTheme2
        {
            ThemeID = theme.ThemeID,
            ThemeName = theme.ThemeName,
            VersionNo = theme.VersionNo,
            CSS = theme.CSS,
            PreviewGraphics = theme.PreviewGraphics,
            PreviewHandlerUrl = theme.PreviewHandlerUrl,
            ThemeHandlerUrl = theme.ThemeHandlerUrl,
            ThemeShortcut = theme.ThemeShortcut,
            IsCustomTheme = theme.IsCustomTheme,
            CanEdit = theme.CanEdit,
            CanDelete = theme.CanDelete,

            // IMPORTANT : ne jamais copier Properties
            // car Framework.js peut envoyer un JSON brut
            Properties = null
        };

        return clean;
    }
}

}
