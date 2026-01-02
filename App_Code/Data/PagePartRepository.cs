using System.Collections.Generic;
using Pageflakes.ObjectModel;

namespace Pageflakes.Data
{
    public static class PagePartRepository
    {
        // Stockage interne : clé = internalID (int)
        private static readonly Dictionary<int, PageParts> _parts =
            new Dictionary<int, PageParts>();

        // Récupérer un PageParts par son ID interne
        public static PageParts Get(int id)
        {
            PageParts p;
            if (_parts.TryGetValue(id, out p))
                return p;

            return null;
        }

        // Ajouter un PageParts
        public static void Add(PageParts part)
        {
            // part.id est un STRING → on doit le convertir en INT
            int internalId;

            if (int.TryParse(part.id, out internalId))
            {
                _parts[internalId] = part;
            }
            else
            {
                // Si jamais part.id = "m1234", on enlève le 'm'
                if (part.id.StartsWith("m"))
                {
                    if (int.TryParse(part.id.Substring(1), out internalId))
                    {
                        _parts[internalId] = part;
                    }
                }
            }
        }

        // Mettre à jour un PageParts
        public static void Update(PageParts part)
        {
            int internalId;

            if (int.TryParse(part.id, out internalId))
            {
                _parts[internalId] = part;
            }
            else if (part.id.StartsWith("m"))
            {
                if (int.TryParse(part.id.Substring(1), out internalId))
                {
                    _parts[internalId] = part;
                }
            }
        }

        // Supprimer un PageParts
        public static void Delete(int id)
        {
            if (_parts.ContainsKey(id))
                _parts.Remove(id);
        }

        // Récupérer tous les PageParts d'une page
        public static List<PageParts> GetByPage(int pageId)
        {
            var list = new List<PageParts>();

            foreach (var kv in _parts)
            {
                // PageParts n’a PAS de PageID → tu me diras si tu veux l’ajouter
                // Pour l’instant on ne peut pas filtrer par page
            }

            return list;
        }
        
    }
}
