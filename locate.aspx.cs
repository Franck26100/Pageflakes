using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml;
using System.Data;
public partial class locate : System.Web.UI.Page
{
    

    #region Events
    // ------------------------------------------------------------------------
    private void Page_Load(object sender, System.EventArgs e)
    {
    }

    // ------------------------------------------------------------------------
    private void btnSearch_Click(object sender, System.EventArgs e)
    {
        lblStatus.Visible = false;
        SearchResults.Visible = true;

        try
        {
            string requestUrl = "http://xoap.weather.com/search/search?where=" + HttpUtility.UrlEncode(edtLocation.Text.Trim());
            XmlDocument xmlResponse = new XmlDocument();
            XmlNodeList locIds = null;
            DataTable dt = null;
            DataRow row = null;


            // Place a call to Weather.com and search for this location
            xmlResponse.Load(requestUrl);

            locIds = xmlResponse.SelectNodes("/search/loc");

            if (locIds == null || locIds.Count == 0)
                throw new Exception("Unable to find location IDs. Please, specify a diffirent location.");

            // List all location IDs
            dt = new DataTable();
            dt.Columns.Add(new DataColumn("locid", typeof(string)));
            dt.Columns.Add(new DataColumn("name", typeof(string)));

            foreach (XmlNode node in locIds)
            {
                row = dt.NewRow();
                row["locid"] = node.Attributes["id"].InnerText;
                row["name"] = node.InnerText;
                dt.Rows.Add(row);
            }

            SearchResults.DataSource = dt;
            SearchResults.DataBind();
        }
        catch (Exception ex)
        {
            lblStatus.InnerText = ex.Message;
            lblStatus.Visible = true;
            SearchResults.Visible = false;
        }
    }
    #endregion

    #region Web Form Designer generated code
    override protected void OnInit(EventArgs e)
    {
        InitializeComponent();
        base.OnInit(e);
    }

    /// <summary>
    /// Required method for Designer support - do not modify
    /// the contents of this method with the code editor.
    /// </summary>
    private void InitializeComponent()
    {
        this.btnSearch.Click += new System.EventHandler(this.btnSearch_Click);
        this.Load += new System.EventHandler(this.Page_Load);

    }
    #endregion
}