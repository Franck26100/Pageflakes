<%@ Page Title="" Language="C#" MasterPageFile="~/MasterDev.master" AutoEventWireup="true" CodeFile="StartPage2.aspx.cs" Inherits="Pageflakes.StartPage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    
<script type="text/javascript">
    if (typeof Lang == "undefined" || Lang == null) $reload("Lang");
    if (typeof $delayCall == "undefined") $reload("$delayCall");
    if (typeof SessionTracker == "undefined") $reload("SessionTracker");
    if (typeof WW == "undefined") $reload("WW");
    $delayCall(function () { SearchForm.init(); SessionTracker.init(); });
</script>   
    <script id="humanIdentifier" type="text/javascript" src="/Pageflakes/human.ashx"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="PlaceHolder_T12" Runat="Server">
</asp:Content>
<asp:Content ID="Content_StartWizard" ContentPlaceHolderID="PaceHolder_StartWizard" runat="server">
    <!--<script id="StartWizard" src="StartWizard.aspx?v=5en" type="text/javascript"></script> -->
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceBody" Runat="Server">
<!-- Markup historique injecté via document.write() -->    
    <asp:Literal ID="StartPageMarkup" runat="server" />
    <!-- Inclusion du script original -->
    <script type="text/javascript" src="/Pageflakes/script/StartPage.js"></script>
    <span>
   
    </span>
    <img class="Location_Progress" src="/Pageflakes/images/indicator.gif" style="display: none;">
    <div class="Location_Match" style="visibility: hidden;"></div>
    <script type="text/javascript">
        if (typeof Sys == "undefined") $reload();
        if (typeof App == "undefined") $reload("App");
        if (typeof PrimaryFramework == "undefined") $reload("PrimaryFramework");
    </script>
    <script id="AdditionalContent" type="text/javascript" src="http://Localhost/Pageflakes/DefaultPageContent.aspx?v=5en"></script>
    <div id="improvedTooltip_NO_" class="improvedTooltip"> 
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tbody>
                <tr>
                    <td class="improvedTooltip_lt">  </td>  
                    <td class="improvedTooltip_t">  <span id="improvedTooltipTop_NO_" class="improvedTooltipArrow_top"></span>  </td>  
                    <td class="improvedTooltip_rt">  </td> 
                </tr>
                <tr>
                    <td class="improvedTooltip_l">  <span id="improvedTooltipLeft_NO_" class="improvedTooltipArrow_left"></span>  </td>  
                    <td bgcolor="#ffffcc">  <span class="improvedTooltip_close" id="improvedTooltipClose_NO_">X</span>
                        <div class="improvedTooltipContent"> _CONTENT_</div>  
                    </td>
                    <td class="improvedTooltip_r">  <span id="improvedTooltipRight_NO_" class="improvedTooltipArrow_right"></span>  </td> 
                </tr> 
                <tr>
                    <td class="improvedTooltip_lb">  </td>  
                    <td class="improvedTooltip_b">  <span id="improvedTooltipBottom_NO_" class="improvedTooltipArrow_bottom"></span>  </td>  
                    <td class="improvedTooltip_rb">  
                    </td>
                </tr> 
            </tbody>
        </table>
    </div>
    <div id="FlakePreview" style="left: 0px; top: -1000px"> 
        <div id="FlakeContainer"> </div> 
        <div id="FlakePreviewButtons"> 
            <input id="AddToPageButton" type="button" value="Add to Page"> 
            <input id="CancelFlakeAdd" type="button" value="Cancel"> 
        </div>
    </div>
    <div id="confirmDialog" class="popup container hidden" style="left: 0px; top: -1000px"> 
        <div class="header"> </div> 
        <div class="content padding15"> 
            <div id="confirmDialog_title">  Are you sure you want to do this? </div> 
            <fieldset>  <legend>What would you like to do?</legend>  
                <div class="confirm_choices">  
                    <div class="confirmDialog_yes_div"> 
                        <input id="confirmDialog_yes" checked="checked" type="radio" name="confirmDialog_choice">
                        <label id="confirmDialog_yes_title" for="confirmDialog_yes">Yes</label>
                    </div>  
                    <div class="confirmDialog_no_div"> 
                        <input id="confirmDialog_no" type="radio" name="confirmDialog_choice">
                        <label id="confirmDialog_no_title" for="confirmDialog_no">No</label>
                    </div>  
                </div> 
            </fieldset> 
            <br> 
            <table>  
                <tbody>
                    <tr>  
                        <td> 
                            <input type="button" id="confirmDialog_ok" class="button" style="width: 50px" value="OK">
                        </td>  
                        <td id="confirm_cancel_content" style="padding-top: 8px"> or <a href="javascript:void(0)" class="cancel" id="confirmDialog_cancel"> Cancel </a>  
                        </td>  
                    </tr> 
                </tbody>
            </table> 
        </div>
    </div>

</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="PlaceHolder_SetAsStartPage" Runat="Server">
</asp:Content>
<asp:Content ID="Content5" ContentPlaceHolderID="ContentPlaceFooter" Runat="Server">
</asp:Content>
<asp:Content ID="Content6" ContentPlaceHolderID="PlaceHolderGetJson_Default" Runat="Server">
</asp:Content>
<asp:Content ID="Content7" ContentPlaceHolderID="PlaceHolder_Login_Register" Runat="Server">
</asp:Content>
<asp:Content ID="Content8" ContentPlaceHolderID="ContentGA" Runat="Server">
</asp:Content>
<asp:Content ID="Content9" ContentPlaceHolderID="PlaceHolderAutre" Runat="Server">
</asp:Content>
<asp:Content ID="Content10" ContentPlaceHolderID="PlaceHolder_Fin_Script" Runat="Server">
</asp:Content>

