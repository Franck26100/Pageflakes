using System;
using System.Data.SqlClient;

public static class UserRepository2
{
    private static readonly string _connectionString =
        System.Configuration.ConfigurationManager
        .ConnectionStrings["PageflakesConnectionString"].ConnectionString;

    public static bool IsUserRegistered(Guid guid)
    {
        const string sql = "SELECT COUNT(*) FROM PageflakesInfo WHERE UserGuid = @g";

        using (var cn = new SqlConnection(_connectionString))
        using (var cmd = new SqlCommand(sql, cn))
        {
            cmd.Parameters.AddWithValue("@g", guid);
            cn.Open();
            int count = (int)cmd.ExecuteScalar();
            return count > 0;
        }
    }
    public static bool IsUserRegistered(string guidString)
    {
        // 1) Conversion sécurisée string → Guid
        Guid guid;
        if (!Guid.TryParse(guidString, out guid))
        {
            // GUID invalide → forcément pas un utilisateur enregistré
            return false;
        }

        // 2) Vérification dans la base
        return IsUserRegistered(guid);
    }
}