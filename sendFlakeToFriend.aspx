<%@ Page Language="C#" AutoEventWireup="true" CodeFile="sendFlakeToFriend.aspx.cs" Inherits="sendFlakeToFriend" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div style="float:right;cursor:hand;cursor:pointer;position:relative;padding:8px 10px;" title="Cancel" onclick="SendFlakeToFriend.hide()"><div id="crossButton"></div></div>
<div class="box">
	<h1>Send this Flake to someone!</h1>
	<div class="yellowSuccessBox" id="SFTFSentMailConfirmation" style='display:none'><h1>Flake sent!</h1><p>Use the form below to send the flake to more people, or close this window to go back to your page.</p></div>
<table border="0" cellspacing="0" cellpadding="0" width="100%">
  <tr>
    <td valign="top">
	<fieldset>
		<legend>Email addresses</legend>
		<div style="padding:13px;">
			<textarea name="SPTFEmailAddresses" id="SPTFEmailAddresses" style="width:360px; border:#ccc 1px solid;"></textarea><span id="SPTFEmailAddresses_error" class="error" style="display:none">Please enter at least one email address</span>
			<div id="SPTFTip">
			<div id="SPTFImportIcons" style="float:right;clear:right;padding-top:2px;">
                    <img src="App_Themes/common/google_icon.gif" alt="GMail" title="GMail" style="cursor:pointer;" onclick="SendPageToFriend.showImport('Gmail')" />
                    <img src="App_Themes/common/hotmail_icon.gif" alt="MSN/Hotmail" title="MSN/Hotmail" style="cursor:pointer;padding:0 5px;" onclick="SendPageToFriend.showImport('MSN')" />
                    <img src="App_Themes/common/yahoo_icon.gif" alt="Yahoo" title="Yahoo" style="cursor:pointer;padding:0 5px 0 0;" onclick="SendPageToFriend.showImport('Yahoo')" />
                    <img src="App_Themes/common/aol_icon.gif" alt="AOL" title="AOL" style="cursor:pointer;" onclick="SendPageToFriend.showImport('AOL')" />
                </div>
			<div><b>Tip:</b> <a href="javascript:void(0)" onclick="SendPageToFriend.showImport()">
                Save typing, import from address book/a></div>
                
                </div>
			<div id="sendPageImportEmail" style="display:none;clear:right;">
				<div id="SPTFImportError" class="yellowErrorBox" style="display:none;"></div>
				<table width="100%" border="0" cellspacing="0" cellpadding="3">
  <tr>
    <td style="width:100px;padding-top:10px;" valign="top">Import from: </td>
    <td>
      <table cellpadding="0" cellspacing="0">
        <tr>
            <td style="width:20px;"><input name="importFrom" id="importGmailAB" onclick="SendPageToFriend.setImportFrom('Gmail')" type="radio" value="gmail" checked="checked" /></td>
            <td><img src="images/gmail.png" alt="GMail" width="75" height="28" /></td>
            <td style="width:20px;"><input name="importFrom" id="importMSNAB" type="radio" value="msn"  onclick="SendPageToFriend.setImportFrom('MSN')" /></td>
            <td><img src="images/hotmail.png" alt="Hotmail" width="102" height="28" /></td>
        </tr>
        <tr>
            <td style="width:20px;"><input name="importFrom" id="importYahooAB" type="radio" value="yahoo"  onclick="SendPageToFriend.setImportFrom('Yahoo')" /></td>
            <td><img src="images/yahoomail.png" alt="Yahoo!" width="102" height="28" /></td>
            <td style="width:20px;"><input name="importFrom" id="importAOLAB" type="radio" value="aol"  onclick="SendPageToFriend.setImportFrom('AOL')" /></td>
            <td><img src="images/aol.png" alt="AOL" width="70" height="28" /></td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td id="SPTFUsernameT">Gmail username: </td>
    <td style="width:245px;padding-left:7px;" ><input name="sendPageToFriendUsername" type="text" id="sendPageToFriendUsername" /><span id="sendPageToFriendUsername_error" class="error" style="display:none">Username can't be blank</span></td>
  </tr>
  <tr>
    <td id="SPTFPasswordT">Gmail password: </td>
    <td style="width:245px;padding-left:7px;" ><input name="sendPageToFriendPassword" type="password" id="sendPageToFriendPassword" onkeypress="if( event.keyCode == 13 )SendPageToFriend.scanAddressBook()"/><span id="sendPageToFriendPassword_error" class="error" style="display:none" onkeypress="if( event.keyCode == 13 )SendPageToFriend.scanAddressBook()">Password can't be blank</span></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td style="padding-left:7px;"><input type="submit" class="button" name="Submit" value="Scan Address Book" onclick="SendPageToFriend.scanAddressBook()" /> 
    or <a href="javascript:void(0)" class="cancel" onclick="SendPageToFriend.hideAddressInput()">Cancel</a> </td>
  </tr>
</table>

			</div>
			<div id="ScanningAddressBook" class="downloadInProgress" style="display:none; height:50px">Scanning address book...</div>
			<div id="SendFriendImportPanel" style="display:none;">
				<div id="SendFriendImportResult" style="height:150px;overflow-y:scroll;border:#999999 1px solid;width:365px;">
					<!--div style="background:#ccc; border-bottom:#999 1px solid;"><input name="user" type="checkbox" value="" /><span>Name of the person</span></div-->
				</div>
				<input name="import" type="button" id="SPTFImportButton" value="Import" onclick="SendPageToFriend.importEmails()" class="button"/> or <a href="javascript:void(0);" onclick="SendPageToFriend.scanAgain();">Scan again</a>
			</div>
		</div>
	</fieldset>
	<fieldset>
		<legend>Message</legend>
		<div style="padding:13px;"><textarea id="SPTFMessage" style="width:360px; height:120px;border:#ccc 1px solid">Hi,
I just found a really cool Flake, check it out.
Cheers.
</textarea><span id="SPTFMessage_error" class="error" style="display:none">Message can't be blank</span></div>
	</fieldset>
	<input id="SFTFButton" type="button" class="button" value="Send" onclick="SendFlakeToFriend.sendFlake()"/> or <a class="cancel" onclick="SendFlakeToFriend.hide()">Cancel</a>
</td>
    <td valign="top" align="right" style="width:370px;padding-top:15px;padding-bottom:15px;padding-left:38px;"><div id="SFTFModuleContainer" style="text-align:left;"></div></td>
  </tr>
</table>
</div>
<div id="SFTFBlockUI" style="display: none; background-color: black;
    width: 100%; height: 100px; position: absolute; left: 0px; top: 0px; z-index: 60000;
    -moz-opacity:0.0;opacity:0.0;filter:alpha(opacity=0);"
    onclick="return false" onmousedown="return false" onmousemove="return false"
    onmouseup="return false" ondblclick="return false">&nbsp;</div>
    </form>
</body>
</html>
