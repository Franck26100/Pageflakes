using System; 
using System.Collections.Generic; 
using System.Web; 
using System.Web.Services; 
using System.Web.Script.Services; 
using System.Xml; 
using System.Net; 
using System.Data.SqlClient; 
using System.Configuration;
public partial class Test : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try { 
            using (SqlConnection cn = new SqlConnection("Data Source=localhost\\SQLEXPRESS2012;Initial Catalog=Pageflakes;Integrated Security=True;")) 
                { 
                    cn.Open(); 
                } 
            } catch (Exception ex) 
                {
                 // log ou affichage Response.Write(ex.ToString()); 
                 }
    }
}