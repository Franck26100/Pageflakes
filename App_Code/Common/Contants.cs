namespace Pageflakes.Common
{
    public static class ConstantsHelper
    {
        // Nom de la chaîne de connexion
        public const string ConnectionStringName = "PageflakesDB";

        // Noms de tables
        public const string Table_UserInProductMessages = "UserInProductMessages";
        public const string Table_Modules = "Modules";
        public const string Table_Pages = "Pages";
        public const string Table_Users = "Users";

        // Messages d'erreur génériques
        public const string Error_Generic = "An unexpected error occurred.";
        public const string Error_NoModules = "No modules found for this page.";
        public const string Error_InvalidPage = "The requested page does not exist.";
    }

    public enum InProductMessageType
    {
        HOME = 1,
        WELCOME = 2,
        NEWSLETTER = 3,
        SHARE = 4
    }
    
}
