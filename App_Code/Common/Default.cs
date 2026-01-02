namespace Pageflakes.Common
{
    /// <summary>
    /// Valeurs par défaut pour l'expérience utilisateur Pageflakes
    /// </summary>
    public static class Defaults
    {
        // Page et colonnes
        public const int DefaultPageId = 1;
        public const int DefaultColumnCount = 3;

        // Modules
        public const int DefaultModuleWidth = 300;
        public const int DefaultModuleHeight = 200;
        public const int DefaultMaxModulesPerPage = 20;

        // Apparence
        public const string DefaultTheme = "Classic";
        public const string DefaultLanguage = "en-US";
        public const string DefaultTimeZone = "UTC";

        // Autres comportements
        public const bool DefaultShowWelcomeWizard = true;
        public const bool DefaultEnableNewsletterPrompt = false;
    }
}
