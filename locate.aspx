<%@ Page Language="C#" AutoEventWireup="true" CodeFile="locate.aspx.cs" Inherits="locate" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="Form1" method="post" runat="server">

<h2>Resolve Weather Location ID</h2>

<p>Weather.com allows you to resolve a text string like "Atlanta" or "Atlanta, GA" to a Location ID.
This Location ID is needed to determine current weather conditions at that location and 
is to be used with the <a href="http://www.aspnetresources.com/articles/weather_server_control.aspx" 
title="Add weather to your site">weather custom server control</a>.</p>

<p class="note">All US Postal Codes are already valid Location IDs, so they do not require a search.</p>

<p>Search location: <asp:TextBox id="edtLocation" Runat="server" /> <asp:Button id="btnSearch" Runat="server" Text="Search" /><input type="text" style="visibility:hidden;" /></p>

<p id="lblStatus" Runat="server" Visible="False" class="error" />

<!-- Thanks to Bugzilla Bug 915 the "align" attribute is not implemented for <col> and <colgroup> :( -->
<asp:Repeater id="SearchResults" Runat="server">
    <HeaderTemplate>
        <table>
          <colgroup>
            <col width="100px" align="center" />
            <col/>
          </colgroup>
          <thead>
            <tr>
                <th>Location ID</th>
                <th>Description</th>
            </tr>
          </thead>
          <tbody>
    </HeaderTemplate>
    
    <ItemTemplate>
        <tr>
            <td align="center"><strong><%# DataBinder.Eval(Container.DataItem, "locid") %></strong></td>
            <td><%# DataBinder.Eval(Container.DataItem, "name") %></td>
        </tr>
    </ItemTemplate>
    
    <AlternatingItemTemplate>
        <tr class="alt">
            <td align="center"><strong><%# DataBinder.Eval(Container.DataItem, "locid") %></strong></td>
            <td><%# DataBinder.Eval(Container.DataItem, "name") %></td>
        </tr>
    </AlternatingItemTemplate>
    
    <FooterTemplate>
          </tbody>
        </table>
    </FooterTemplate>
</asp:Repeater>

</form>
</body>
</html>
