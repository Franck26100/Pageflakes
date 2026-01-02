using System;
using System.Collections.Generic;
using System.Linq;
using Pageflakes.Services;

namespace Pageflakes.Data
{
    public static class FlakeRepository
    {
        private static readonly Dictionary<int, Flake> _flakes =
            new Dictionary<int, Flake>();
        private static int _nextId = 1;
        // ---------------------------------------------------------
        // GET ALL FLAKES FOR A PAGE
        // ---------------------------------------------------------
        public static List<Flake> GetFlakesByPage(int pageID)
        {
            return _flakes.Values
                .Where(f => f.pageId == pageID)
                .OrderBy(f => f.col)
                .ThenBy(f => f.row)
                .ToList();
        }
        // ---------------------------------------------------------
        // ADD NEW FLAKE
        // ---------------------------------------------------------
        public static Flake AddFlake(Flake f)
        {
            if (f == null)
                throw new ArgumentNullException("f");
            f.internalId = _nextId++;
            _flakes[f.internalId] = f;
            return f;
        }
        // ---------------------------------------------------------
        // UPDATE EXISTING FLAKE
        // ---------------------------------------------------------
        public static void UpdateFlake(Flake f)
        {
            if (f == null)
                throw new ArgumentNullException("f");
            if (!_flakes.ContainsKey(f.internalId))
                throw new Exception("Flake not found: " + f.internalId);
            _flakes[f.internalId] = f;
        }
        // ---------------------------------------------------------
        // MOVE FLAKE
        // ---------------------------------------------------------
        public static void MoveFlake(int flakeId, int newColumn, int newRow)
        {
            if (!_flakes.ContainsKey(flakeId))
                throw new Exception("Flake not found: " + flakeId);
            var f = _flakes[flakeId];
            f.col = newColumn;
            f.row = newRow;
            _flakes[flakeId] = f;
        }
        // ---------------------------------------------------------
        // DELETE FLAKE
        // ---------------------------------------------------------
        public static void DeleteFlake(int id) { 
            if (_flakes.ContainsKey(id)) _flakes.Remove(id); 
            // Supprimer automatiquement le PagePart associé 
            Pageflakes.Data.PagePartRepository.Delete(id); 
        }
        // ---------------------------------------------------------
        // GET SINGLE FLAKE
        // ---------------------------------------------------------
        public static Flake GetFlake(int id)
        {
            Flake f;
            if (_flakes.TryGetValue(id, out f))
                return f;
            return null;
        }
    }
}
