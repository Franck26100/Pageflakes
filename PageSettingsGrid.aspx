<%@ Page Language="C#" AutoEventWireup="true" CodeFile="PageSettingsGrid.aspx.cs" Inherits="PageSettingsGrid" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>Gestion de PageSettingsGrid</title>
    <style>
        body { font-family: Arial; margin: 20px; }
        h1 { color: #2c3e50; }
        .grid { margin-top: 20px; }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <h1>Gestion de la table PageSettingsGrid</h1>

        <asp:GridView ID="GridView1" runat="server" CssClass="grid"
            AutoGenerateColumns="False" DataKeyNames="Id"
            DataSourceID="SqlDataSource1"
            AllowPaging="True" AllowSorting="True">
            <Columns>
                <asp:BoundField DataField="Id" HeaderText="Id" ReadOnly="True" />
                <asp:BoundField DataField="SettingName" HeaderText="Nom" />
                <asp:BoundField DataField="SettingValue" HeaderText="Valeur" />
                <asp:BoundField DataField="DomainId" HeaderText="Domaine" />
                <asp:BoundField DataField="LanguageId" HeaderText="Langue" />
                <asp:CommandField ShowEditButton="True" ShowDeleteButton="True" />
            </Columns>
        </asp:GridView>

        <asp:SqlDataSource ID="SqlDataSource1" runat="server"
            ConnectionString="<%$ ConnectionStrings:PageflakesConnectionString %>"
            SelectCommand="SELECT Id FROM PageSettingsGrid"
            UpdateCommand="UPDATE PageSettingsGrid SET SettingName=@SettingName, SettingValue=@SettingValue WHERE Id=@Id"
            DeleteCommand="DELETE FROM PageSettingsGrid WHERE Id=@Id"
            InsertCommand="INSERT INTO PageSettingsGrid (SettingName, SettingValue, DomainId, LanguageId) VALUES (@SettingName, @SettingValue, @DomainId, @LanguageId)">
            <UpdateParameters>
                <asp:Parameter Name="SettingName" Type="String" />
                <asp:Parameter Name="SettingValue" Type="String" />
                <asp:Parameter Name="DomainId" Type="Int32" />
                <asp:Parameter Name="LanguageId" Type="Int32" />
                <asp:Parameter Name="Id" Type="Int32" />
            </UpdateParameters>
            <DeleteParameters>
                <asp:Parameter Name="Id" Type="Int32" />
            </DeleteParameters>
            <InsertParameters>
                <asp:Parameter Name="SettingName" Type="String" />
                <asp:Parameter Name="SettingValue" Type="String" />
                <asp:Parameter Name="DomainId" Type="Int32" />
                <asp:Parameter Name="LanguageId" Type="Int32" />
            </InsertParameters>
        </asp:SqlDataSource>

        <h2>Ajouter un nouvel enregistrement</h2>
        <asp:DetailsView ID="DetailsView1" runat="server"
            DataSourceID="SqlDataSource1"
            DefaultMode="Insert" AutoGenerateRows="False">
            <Fields>
                <asp:BoundField DataField="SettingName" HeaderText="Nom" />
                <asp:BoundField DataField="SettingValue" HeaderText="Valeur" />
                <asp:BoundField DataField="DomainId" HeaderText="Domaine" />
                <asp:BoundField DataField="LanguageId" HeaderText="Langue" />
                <asp:CommandField ShowInsertButton="True" />
            </Fields>
        </asp:DetailsView>
    </form>
</body>
</html>
