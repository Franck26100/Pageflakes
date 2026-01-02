<%@ Page Language="C#" AutoEventWireup="true" CodeFile="AddFlake.aspx.cs" Inherits="AddFlake" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Add Flakes</title>
    <style type="text/css">
    
    html, body { background: url(/web/20060220172702im_/http://www.Pageflakes.com/App_Themes/BlackBlue/background.png); }
    * { font-family: "Trebuchet MS",  Tahoma; font-size: 12pt; color: dimgray;}
    
    h1 { font-size: 150% }

    #AddFlake
    {
        position: relative;
        left: 25%; top: 100px;
        width: 50%;
        border: solid 10px #D9E2E1;
        padding: 20px;
        background-color: white;
    }
    
    #AddFlake input
    { 
        padding: 5px;
        font-size: 120%;
    } 
    
    #AddFlake label
    {
        font-size: 120%;
        line-height: 180%;
    }
    
    #AddFlake br
    {
    }

    
    #AddFlake a
    {
        font-size: 120%;
        line-height: 180%;
        margin-left: 0px;
    }
    
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div id="AddFlake">
        <h1><span id="lblStatus">Invalid Url, Flakes Cannot be added.</span></h1>
        <br/>
        <br/>
        Do you want to see the flake now or go back to the site where you came from?
        <br/>
        <br/>
        <a href="javascript:history.go(-1)">&lt;-- Go Back</a>
        <br/>
        <a href="default.aspx">See my Pageflakes Page --&gt;</a>
    
    </div>
    </form>
</body>
</html>




