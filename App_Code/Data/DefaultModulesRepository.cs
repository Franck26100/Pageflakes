using Pageflakes.ObjectModel;
using System.Collections.Generic;   // ← OBLIGATOIRE pour List<T>
using Pageflakes.DataAccess;

public static class DefaultModulesRepository
{
    public static List<Module> GetDefaultModules(int cPage)
    {
        // Ici tu vas charger depuis ta DB
        return SqlModuleLoader.LoadDefaultModules(cPage);
    }
}
//var core = new CoreServices(); string html = core.MapHtmlFile(url);
//int CurrID = Pageflakes.Utilities.ModuleIdGenerator.GenerateModuleId();