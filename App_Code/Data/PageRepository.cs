using System;
using System.Web;
using System.Web.Script.Serialization;
using System.Collections.Generic;   // ← OBLIGATOIRE pour List<T>
using Pageflakes.ObjectModel;
using Pageflakes.DataAccess;

using Pageflakes.Utilities;


namespace Pageflakes.Data
{
    public static class PageRepository{
        // Le stockage interne utilise TON modèle : pageSetting
        private static readonly Dictionary<int, pageSetting> _pages =
        new Dictionary<int, pageSetting>();

        public static pageSetting GetPage(int id)
        {
            pageSetting page;
            if (_pages.TryGetValue(id, out page))
                return ClonePage(page); // éviter les références partagées
            return null;
        }

        public static void Save(pageSetting page){
            if (page == null)
                throw new ArgumentNullException("page");

            _pages[page.ID] = ClonePage(page);
        }

        public static void Delete(int id)
        {
            if (_pages.ContainsKey(id))
                _pages.Remove(id);
        }

        public static IEnumerable<pageSetting> GetAll()
        {
            foreach (var p in _pages.Values)
                yield return ClonePage(p);
        }

            // Conversion pour StartupBuilder : ici inutile, car pageSetting est déjà le bon modèle
        public static List<pageSetting> GetPages()
        {
            var my = MyRepository.Get();

            // Normalisation de PageOrder
            var order = new List<string>();
            var raw = (my.Profile.PageOrder ?? "")
                .Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);

            foreach (var p in raw)
            {
                var trimmed = p.Trim();
                if (trimmed.Length > 0)
                    order.Add(trimmed);
            }
            var list = new List<pageSetting>();
            foreach (var idStr in order)
            {
                int id;
                if (int.TryParse(idStr, out id))
                {
                    var page = GetPage(id);
                    if (page != null)
                    list.Add(page);
                }
            }
            return list;
        }

        // Clonage manuel pour éviter les références partagées
        private static pageSetting ClonePage(pageSetting src)
        {
            var clone = new pageSetting();

            clone.ID = src.ID;
            clone.VersionNo = src.VersionNo;
            clone.Name = src.Name;
            clone.OrderNo = src.OrderNo;
            clone.SharingStatus = src.SharingStatus;
            clone.ColumnCount = src.ColumnCount;
            clone.OwnerName = src.OwnerName;
            clone.OwnerFullname = src.OwnerFullname;
            clone.HitCount = src.HitCount;
            clone.IsPublished = src.IsPublished;
            clone.IsOwner = src.IsOwner;
            clone.IsShared = src.IsShared;
            clone.Scripts = src.Scripts;
            clone.Stylesheets = src.Stylesheets;
            clone.CanMoveFlakes = src.CanMoveFlakes;
            clone.CanAddFlake = src.CanAddFlake;
                clone.CanEditFlake = src.CanEditFlake;
            clone.CanDeleteFlake = src.CanDeleteFlake;
            clone.CanChangeFlake = src.CanChangeFlake;
            clone.CanRemovePage = src.CanRemovePage;
            clone.CanChangePage = src.CanChangePage;
            clone.CanInviteOthers = src.CanInviteOthers;
            clone.IsNewlyShared = src.IsNewlyShared;
            clone.SharedBy = src.SharedBy;
            clone.ColumnSizes = src.ColumnSizes;
            clone.HasChanged = src.HasChanged;

            // Clonage des listes
            clone.Modules = src.Modules != null ? new List<Module>(src.Modules) : new List<Module>();
            clone.PageParts = src.PageParts != null ? new List<PageParts>(src.PageParts) : new List<PageParts>();

            // Clonage du thème
            clone.Theme = src.Theme != null ? new PageTheme2
            {
                IsCustomTheme = src.Theme.IsCustomTheme,
                ThemeName = src.Theme.ThemeName,
                CanEdit = src.Theme.CanEdit,
                CanDelete = src.Theme.CanDelete,
                ThemeID = src.Theme.ThemeID,
                VersionNo = src.Theme.VersionNo,
                CSS = src.Theme.CSS,
                PreviewGraphics = src.Theme.PreviewGraphics,
                Properties = src.Theme.Properties,
                ThemeHandlerUrl = src.Theme.ThemeHandlerUrl,
                ThemeShortcut = src.Theme.ThemeShortcut,
                PreviewHandlerUrl = src.Theme.PreviewHandlerUrl
            } : new PageTheme2();
            return clone;
        }
    
        private static Module BuildModule(dynamic raw)
        {
            if (raw == null)
            return null;

            var module = new Module();

            // Identifiant client : "m12345"
            module.id = raw.id;

            // Position dans la page
            module.row = raw.row;
            module.col = raw.col;

            // Titre affiché
            module.title = raw.title;

            // URL du module (RSS, Weather, Notes…)
            module.url = raw.url;

            // Identifiant interne (int)
            module.internalID = raw.internalID;

            // Page à laquelle appartient le module
            module.pageID = raw.pageID;

            // Etat du flake
            module.expanded = raw.expanded;

            // Permissions
            module.Permission = raw.Permission;

            // Profils (exactement comme dans le stockage)
            module.Profiles = raw.Profiles;
            module.PrivateProfiles = raw.PrivateProfiles;
            module.ProtectedProfiles = raw.ProtectedProfiles;
            module.PublicProfiles = raw.PublicProfiles;

            return module;
        }
        private static pageSetting BuildPage(dynamic raw)
        {
            if (raw == null)
                return null;

            var page = new pageSetting();

            // Propriétés simples
            page.ID = raw.ID;
            page.VersionNo = raw.VersionNo;
            page.Name = raw.Name;
            page.OrderNo = raw.OrderNo;
            page.SharingStatus = raw.SharingStatus;
            page.ColumnCount = raw.ColumnCount;
            page.OwnerName = raw.OwnerName;
            page.OwnerFullname = raw.OwnerFullname;
            page.HitCount = raw.HitCount;
            page.IsPublished = raw.IsPublished;
            page.IsOwner = raw.IsOwner;
            page.IsShared = raw.IsShared;

            page.Scripts = raw.Scripts;
            page.Stylesheets = raw.Stylesheets;

            page.CanMoveFlakes = raw.CanMoveFlakes;
            page.CanAddFlake = raw.CanAddFlake;
            page.CanEditFlake = raw.CanEditFlake;
            page.CanDeleteFlake = raw.CanDeleteFlake;
            page.CanChangeFlake = raw.CanChangeFlake;
            page.CanRemovePage = raw.CanRemovePage;
            page.CanChangePage = raw.CanChangePage;
            page.CanInviteOthers = raw.CanInviteOthers;

            page.IsNewlyShared = raw.IsNewlyShared;
            page.SharedBy = raw.SharedBy;
            page.ColumnSizes = raw.ColumnSizes;
            page.HasChanged = raw.HasChanged;

            // Thème
            page.Theme = raw.Theme;

            // Modules
            page.Modules = new List<Module>();
            if (raw.Modules != null)
            {
                foreach (var m in raw.Modules)
                {
                    var module = BuildModule(m);
                    if (module != null)
                        page.Modules.Add(module);
                }
            }

            // PageParts
            page.PageParts = new List<PageParts>();
            if (raw.PageParts != null)
            {
                foreach (var p in raw.PageParts)
                {
                    var part = BuildPagePart(p);
                    if (part != null)
                        page.PageParts.Add(part);
                }
            }
            return page;
        }
        private static PageParts BuildPagePart(dynamic raw)
        {
            if (raw == null)
                return null;

            var part = new PageParts();

            // Scripts
            if (raw.scripts != null)
            {
                foreach (var s in raw.scripts)
                {
                    part.scripts.Add(new ScriptTag
                    {
                        id = s.id,
                        src = s.src,
                        content = s.content
                    });
                }
            }

            // Styles
            if (raw.styles != null)
            {
                foreach (var st in raw.styles)
                {
                    part.styles.Add(new StyleTag
                    {
                        id = st.id,
                        href = st.href,
                        content = st.content
                    });
                }
            }

            // Propriétés simples
            part.body = raw.body;
            part.id = raw.id;               // ex: "m12345"
            part.title = raw.title;
            part.url = raw.url;
            part.icon = raw.icon;
            part.importUrl = raw.importUrl;
            part.exportUrl = raw.exportUrl;
            part.xslUrl = raw.xslUrl;

            // Texts (XmlIgnore → pas dans le XML)
            part.texts = raw.texts;

            // Permissions
            part.Permission = raw.Permission;

            return part;
        }
        public static pageSetting CreateDefaultPage()
{
    var page = new pageSetting();

    page.ID = Pageflakes.Utilities.ModuleIdGenerator.GeneratePageId();
    page.VersionNo = 1;
    page.Name = "Click & Type Page Name";
    page.OrderNo = 1;
    page.SharingStatus = 0;
    page.ColumnCount = 3;
    page.ColumnSizes = "33%,33%,33%";
    page.IsOwner = true;
    page.IsShared = false;
    // Charger les modules par défaut depuis la DB 
    var defaultModules = SqlModuleLoader.LoadDefaultModules(page.ID); 
    // Liste finale des modules placés page.Modules = new List<moduleSetting>();
    page.Modules = new List<Module>();
    page.PageParts = new List<PageParts>();
    var core = new CoreServices(); //string html = core.MapHtmlFile(url);
    foreach (var m in defaultModules) {        
        var module = new Module { 
            id = m.id, 
            url = m.url, 
            title = m.title, 
            col = m.col, 
            row = m.row,
            pageID = m.pageID,
            expanded = m.expanded,
            internalID = m.internalID, // 🔥 Ajout des PageParts ici 
            Permission = m.Permission 
        };
        //PageParts = ;

        string htmlFile = core.MapHtmlFile(m.url);
        page.Modules.Add(module); 
        page.PageParts.Add(ModuleParser.ParseModuleHtml(m.id, m.url, htmlFile));
    }

    page.Scripts = "";
    page.Stylesheets = "";

    page.CanMoveFlakes = true;
    page.CanAddFlake = true;
    page.CanEditFlake = true;
    page.CanDeleteFlake = true;
    page.CanChangeFlake = true;
    page.CanRemovePage = true;
    page.CanChangePage = true;
    page.CanInviteOthers = true;

    page.Theme = ThemeRepository.GetDefaultTheme();

    Save(page);   // ✔ TA fonction, pas SavePage()

    return page;
}

    }
}
