using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;


public partial class Default2 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        ReadOnlyCollection<TimeZoneInfo> zones = TimeZoneInfo.GetSystemTimeZones();
        Label1.Text = "The local system has the following time zones" + zones.Count;
        foreach (TimeZoneInfo zone in zones)
            ListBox1.Items.Add (zone.Id);
    }
}