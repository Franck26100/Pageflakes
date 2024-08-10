<%@ Page Language="C#" AutoEventWireup="true" CodeFile="OPMLimporter.aspx.cs" Inherits="OPMLimporter" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server"><title>
	Untitled Page
</title>
    
    <script type="text/javascript">


        function showIfRequired() {
            var fld = null;
            fld = document.getElementById("ispostback");
            if (fld != null) {
                parent.AddContent_ManageBookmarks();
            }
        }

        //window.setTimeout (showIfRequired, 2000);

        var message = document.getElementById('message');
        if (message != null) {
            //parent.AddContent_loadBookmarks();
            //alert ('uploaded: '+message);
            parent.AddContent_showOPMLmessage(message.innerHTML);
            message = null;
        }
    
    </script>
    
    <style type="text/css">
    input
    {
        font-size:8pt;
        height:20px;
    }
    
</style>
    
    
</head>


<body class="popup_content" style="margin:0px;">

    <form runat="server" method="post" action="OPMLimporter.aspx?v=1" id="form1" enctype="multipart/form-data">
<div>
</div>

    <div>
        <table border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td>
            <input name="fileBrowser" type="file" id="fileBrowser" size="35" />
            <input type="submit" name="btnUpload" value="Upload" id="btnUpload" /></td>
            </tr>
            <tr><td valign="top"><span style="font-family:Tahoma; font-size:7pt; color:#DDD;">not recommended for large files</span> </td></tr>
        </table>
    </div>
    
<div>

</div></form>
    
</body>
</html>
