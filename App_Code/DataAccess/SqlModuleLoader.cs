using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Pageflakes.ObjectModel;
using Pageflakes.Utilities;
using System.Configuration;

namespace Pageflakes.DataAccess
{
    public static class ConnectionStrings { 
        public static string Default { 
            get { 
                return ConfigurationManager.ConnectionStrings["PageflakesConnectionString"].ConnectionString; 
            } 
        } 
    }
    public static class SqlModuleLoader
    {
        public static List<Module> LoadDefaultModules(int pPage)
        {
            var modules = new List<Module>();
            
            // Random pour choisir la colonne 
            var rnd = new Random(); // Row par colonne (sinon les modules se superposent) 
            int[] rowIndex = new int[3] { 0, 0, 0 };
            using (var conn = new SqlConnection(ConnectionStrings.Default))
            using (var cmd = new SqlCommand("SELECT Id, url, title, pageurl, icon, importUrl, exportUrl, xslUrl " + "FROM Module2 WHERE IsDefault = 1", conn))
            {
                conn.Open();

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        int CurrID = ModuleIdGenerator.GenerateModuleId();
                        int colun = rnd.Next(0, 3);
                        modules.Add(new Module
                        {
                            id = "m" + CurrID.ToString(),
                            internalID= CurrID,                            
                            title = reader["Title"].ToString(),
                            expanded = true,
                            url = reader["url"].ToString(),
                            col = colun,
                            pageID = pPage,
                            row = rowIndex[colun]++,
                            Permission = new permission{
                                CanDrag = true,
                                CanEdit = true,
                                CanCollapse = true,
                                CanClose = true
                            }                            
                        });
                    }
                }
            }

            return modules;
        }
    }
}
