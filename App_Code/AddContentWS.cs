using System;
using System.Web.Services;
using System.Collections;
using System.Text;
using System.Web.Script.Services;
using System.IO;
using System.IO.Compression;
using System.Web.Util;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace Pageflakes
{
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.Web.Script.Services.ScriptService]
    public class AddContentWS : System.Web.Services.WebService
    {
        [WebMethod(Description = "Retourne la grille des flakes pour une catégorie donnée.")]
        public string GetOnsiteFlakeGrid(int categoryId)
        {
            try
            {
                // Exemple simple : concaténation
                return "FlakeGrid pour catégorie " + categoryId;
            }
            catch (Exception ex)
            {
                return "Erreur: " + ex.Message;
            }
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public string GetOnsiteItemGrid(int categoryId, string version)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(
                    ConfigurationManager.ConnectionStrings["PageflakesConnectionString"].ConnectionString))
                {
                    conn.Open();
                    using (SqlCommand comm = new SqlCommand("GetOnsiteItemGrid", conn))
                    {
                        comm.CommandType = CommandType.StoredProcedure;
                        comm.Parameters.AddWithValue("@CategoryID", categoryId);                        

                        object result = comm.ExecuteScalar();
                        if (result == null || result == DBNull.Value)
                        {
                            return "<div class='error'>Pas de contenu en DB</div>";
                        }

                        // Retourne le HTML tel qu'il est stocké
                        return result.ToString();
                    }
                }
            }
            catch (SqlException ex)
            {
                return "<div class='error'>Erreur SQL: " + ex.Message + "</div>";
            }
            catch (Exception ex)
            {
                return "<div class='error'>Erreur interne: " + ex.Message + "</div>";
            }
        }              

        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public string GetPageSettingsGrid(int pageSettingValue, int domainid, int languageid, string version)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection( ConfigurationManager.ConnectionStrings["PageflakesConnectionString"].ConnectionString)) 
                { 
                    conn.Open(); 
                    string sql = "SELECT pageSettingsGrid FROM [dbo].[PageSettingsGrid] WHERE pageSettingValue = @pageSettingValue"; 
                    using (SqlCommand comm = new SqlCommand(sql, conn)) { 
                        comm.Parameters.AddWithValue("@pageSettingValue", pageSettingValue); 
                        object result = comm.ExecuteScalar(); 
                        if (result == null || result == DBNull.Value) { 
                            return "<div class='error'>Pas de contenu en DB</div>"; 
                        } 
                        return result.ToString(); 
                    } 
                }
            }
            catch (SqlException ex)
            {
                return "<div class='error'>Erreur SQL: " + ex.Message + "</div>";
            }
            catch (Exception ex)
            {
                return "<div class='error'>Erreur interne: " + ex.Message + "</div>";
            }
        }
    }
}
