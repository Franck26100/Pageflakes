<%@ Page Title="" Language="C#" MasterPageFile="~/MasterTest.master" AutoEventWireup="true" CodeFile="DefaultTest.aspx.cs" Inherits="DefaultTest" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

    <!-- Contenu spécifique à cette page -->
    <h2>Bienvenue sur DefaultTest.aspx</h2>
    <p>Ceci est une page enfant qui hérite de la MasterPage Pageflakes.</p>

    <!-- Exemple de flake de test -->
    <div class="flake">
        <div class="flake_header">Flake de test</div>
        <div class="flake_content">
            <p>Contenu inséré depuis DefaultTest.aspx</p>
        </div>
    </div>

</asp:Content>