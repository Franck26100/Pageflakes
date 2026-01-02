using System;

namespace Pageflakes.Services
{
    public class SavePageResult
    {
        public int ID { get; set; }
        public int VersionNo { get; set; }
        public string Name { get; set; }
        public int OrderNo { get; set; }
        public int SharingStatus { get; set; }
        public int ColumnCount { get; set; }

        public string OwnerName { get; set; }
        public string OwnerFullname { get; set; }

        public bool IsPublished { get; set; }
        public bool IsOwner { get; set; }
        public bool IsShared { get; set; }

        public SavePageResultModule[] Modules { get; set; }
        public SavePageResultPagePart[] PageParts { get; set; }

        public bool CanMoveFlakes { get; set; }
        public bool CanAddFlake { get; set; }
        public bool CanEditFlake { get; set; }
        public bool CanDeleteFlake { get; set; }
        public bool CanChangeFlake { get; set; }
        public bool CanChangePage { get; set; }

        public string ColumnSizes { get; set; }

        // ⭐ Indispensable pour éviter le crash ThemeShortcut undefined
        public object Theme { get; set; }
    }
}
