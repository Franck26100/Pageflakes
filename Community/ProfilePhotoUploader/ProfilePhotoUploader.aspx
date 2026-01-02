<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ProfilePhotoUploader.aspx.cs" Inherits="ProfilePhotoUploader" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server" id="Head1"><title>
	Profile Photo Uploader
</title>
    <style>
    .PreviewPicture { margin: 10px; clear:both; }
    BODY {background:none transparent; maring:0; padding:0;}
    * { font: 8pt Tahoma, Arial, Helvetica; margin:0; padding:0; }
    #ThemeImagePreview { cursor: hand; cursor: pointer; margin-bottom: 10px; }
    #ThemeImage { width: 200px }
    </style>

    <script type="text/javascript">
        function showUploadProgressBar() {
            var uploadControl = document.getElementById("divUploaderControl");
            var progressbar = document.getElementById("divUploadInProgress");

            uploadControl.style.display = "none";
            progressbar.style.display = "block";
        }

        function hideUploadProgressBar() {
            var uploadControl = document.getElementById("divUploaderControl");
            var progressbar = document.getElementById("divUploadInProgress");

            uploadControl.style.display = "block";
            progressbar.style.display = "none";
        }
    </script>

</head>
<body>
    <form runat="server" method="post" id="form1" enctype="multipart/form-data">
<div>
</div>

        
        <div id="divUploaderControl" style="color:#DDD;">
            Upload a new image:<br />
            <input type="file" name="PhotoUpload" id="PhotoUpload" />
            <br />
            <input type="submit" name="UploadPicture" value="Upload" onclick="showUploadProgressBar();" id="UploadPicture" />
            <input type="button" id="CancelUpload" value="Cancel" onclick="window.parent.Start.Profile.cancelUploadPhoto()" />
        </div>
        <div style="display: none; height: 20px; line-height: 20px;color:#DDD;" id="divUploadInProgress">
            <img alt="" src="/Pageflakes/App_themes/indicator.gif" style="float: left; padding-right: 5px;" />
            <div>
                uploading...</div>
        </div>
    
<div>

	
</div></form>

    <script type="text/javascript">
    
    
    </script>

</body>
</html>

