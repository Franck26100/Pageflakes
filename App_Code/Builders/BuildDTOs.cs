using System.Collections.Generic;
using Pageflakes.ObjectModel;
using Pageflakes.DTO;


namespace Pageflakes.Builders
{
    public static partial class DTOBuilder
    {
        public static List<PageDTO> BuildPagesDTO(List<pageSetting> pages)
        {
            var list = new List<PageDTO>();

            if (pages == null)
                return list;

            foreach (var p in pages)
            {
                list.Add(BuildPageDTO(p));
            }

            return list;
        }
        public static PageDTO BuildPageDTO(pageSetting page) { 
            if (page == null) return null; 
            return new PageDTO { 
                ID = page.ID, 
                Name = page.Name, 
                OrderNo = page.OrderNo, 
                IsOwner = page.IsOwner, 
                IsShared = page.IsShared, 
                SharingStatus = page.SharingStatus 
            }; 
        }
        public static List<ModuleDTO> BuildModulesDTO(pageSetting page) { 
            var list = new List<ModuleDTO>(); 
            if (page == null || page.Modules == null) 
                return list; 
            foreach (var module in page.Modules) { // On récupère le PageParts correspondant 
                var part = page.PageParts.Find(p => p.id == module.id); 
                list.Add(BuildModuleDTO(module, part)); 
            } 
            return list; 
        }
        public static ModuleDTO BuildModuleDTO(Module module, PageParts part) { 
            if (module == null) 
                return null; 
            var dto = new ModuleDTO { 
                id = module.id, 
                row = module.row, 
                col = module.col, 
                title = module.title, 
                url = module.url, 
                expanded = module.expanded, 
                Permission = module.Permission 
            }; // PageParts (template) 
            if (part != null) { 
                dto.body = part.body; 
                dto.icon = part.icon; 
                dto.importUrl = part.importUrl; 
                dto.exportUrl = part.exportUrl; 
                dto.xslUrl = part.xslUrl; 
                dto.scripts = part.scripts; 
                dto.styles = part.styles; 
            } 
            return dto; 
        }
        /*public static ThemeDTO BuildThemeDTO(PageTheme2 theme) { 
            if (theme == null) 
                return null; 
            return new ThemeDTO { 
                Name = theme.Name, 
                CssUrl = theme.CssUrl, 
                ImageUrl = theme.ImageUrl, 
                BackgroundColor = theme.BackgroundColor, 
                TextColor = theme.TextColor 
            }; 
        }*/
    }
}
