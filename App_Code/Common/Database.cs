using System;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
namespace Pageflakes.Common
{
    /// <summary>
    /// Couche d'accès aux données pour Pageflakes
    /// Centralise les appels aux procédures stockées
    /// </summary>
    public static class Database
    {
        private static readonly string _connectionString =
            System.Configuration.ConfigurationManager.ConnectionStrings[Pageflakes.Common.ConstantsHelper.ConnectionStringName].ConnectionString;

        /// <summary>
        /// Exécute une procédure stockée sans retour
        /// </summary>
        public static void ExecuteNonQuery(string storedProcName, params SqlParameter[] parameters)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            using (SqlCommand cmd = new SqlCommand(storedProcName, conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                if (parameters != null)
                    cmd.Parameters.AddRange(parameters);

                conn.Open();
                cmd.ExecuteNonQuery();
            }
        }

        /// <summary>
        /// Exécute une procédure stockée et retourne un DataTable
        /// </summary>
        public static DataTable ExecuteDataTable(string storedProcName, params SqlParameter[] parameters)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            using (SqlCommand cmd = new SqlCommand(storedProcName, conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                if (parameters != null)
                    cmd.Parameters.AddRange(parameters);

                using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                {
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    return dt;
                }
            }
        }

        /// <summary>
        /// Exécute une procédure stockée et retourne un seul scalaire
        /// </summary>
        public static object ExecuteScalar(string storedProcName, params SqlParameter[] parameters)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            using (SqlCommand cmd = new SqlCommand(storedProcName, conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                if (parameters != null)
                    cmd.Parameters.AddRange(parameters);

                conn.Open();
                return cmd.ExecuteScalar();
            }
        }
    }
}
