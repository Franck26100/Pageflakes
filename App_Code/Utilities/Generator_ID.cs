using System;

namespace Pageflakes.Utilities
{
    public static class ModuleIdGenerator
    {
        private static readonly Random _rnd = new Random();

        public static int GenerateModuleId()
        {
            // Option 1 : simple aléatoire dans une plage
            int randomValue = _rnd.Next(1000, int.MaxValue);

            // Option 2 : basé sur un GUID pour plus d'unicité
            int guidHash = Guid.NewGuid().GetHashCode();

            // Défensif : éviter les valeurs négatives ou nulles
            if (guidHash <= 0)
            {
                guidHash = randomValue;
            }

            return guidHash;
        }
        public static int GeneratePageId()
        {
            // Générateur pseudo-aléatoire
            Random rnd = new Random();
            // Option 1 : simple aléatoire dans une plage
            int pageId = rnd.Next(1000, int.MaxValue);
            // Option 2 : basé sur un GUID pour plus d'unicité
            int guidHash = Guid.NewGuid().GetHashCode();
            // Défensif : éviter les valeurs négatives ou nulles
            if (guidHash <= 0)
            {
                guidHash = rnd.Next(1000, int.MaxValue);
            }
            return guidHash;    
        }
    }
}
