using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class AddFlake : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string requestStart = Context.Request["Title"];
        if(requestStart == "Photo Viewer")
        {
            Server.TransferRequest(Context.Request.QueryString["url"]);
        }

    }
}