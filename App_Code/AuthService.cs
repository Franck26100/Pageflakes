using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.Services;

namespace Pageflakes
{
    [WebService(Namespace = "http://pageflakes.com/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    public class AuthService : WebService
    {
        [WebMethod]
        public LoginResult Login(string userName, string password)
        {
            var result = new LoginResult { Success = false, UserId = 0, IsFirstVisit = false };

            string connString = ConfigurationManager.ConnectionStrings["PageflakesConnectionString"].ConnectionString;
            using (SqlConnection conn = new SqlConnection(connString))
            using (SqlCommand cmd = new SqlCommand("ValidateUser", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@UserName", SqlDbType.NVarChar, 50).Value = userName;
                cmd.Parameters.Add("@Password", SqlDbType.NVarChar, 50).Value = password;

                conn.Open();
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        result.Success = true;
                        result.UserId = reader.GetInt32(reader.GetOrdinal("UserId"));
                        result.IsFirstVisit = reader.GetBoolean(reader.GetOrdinal("IsFirstVisit"));
                    }
                }
            }

            return result;
        }
    }

    public class LoginResult
    {
        public bool Success { get; set; }
        public int UserId { get; set; }
        public bool IsFirstVisit { get; set; }
    }
}
