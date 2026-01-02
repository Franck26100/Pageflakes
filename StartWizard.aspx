<%@ Page Title="" Language="C#" MasterPageFile="~/MasterDev.master" AutoEventWireup="true" CodeFile="StartWizard.aspx.cs" Inherits="StartWizard" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="PlaceHolderAutre" Runat="Server">
<!DOCTYPE html >


 
    <div id="StartWizard_Step1" class="wizardbox popup container" style="position: absolute; visibility:hidden; left: 0px; top:0px"> 
        <div class="header"> </div> 
        <div class="content">  
            <div class="box logo_box">  <h1>New to Pageflakes?</h1>  
                <p>Your personalized startpage: News, photos, music, bookmarks, blogs, weather and much more. All on one page that you can customize as you like! Click "Next" to get started – it\'s free and it takes just a few seconds!</p>  
                <div> 
                    <input class="button" type="button" value="Next" onclick="StartWizard.step2()" />
                </div>
            </div>
            <div class="box">  
                <h1>Already a Pageflakes user?</h1>  
                <p>Log in to your account to load your personalized page.</p>  
                <div> <input class="button" type="button" value="Login" onclick="StartWizard.loginStep()" /></div>  
            </div>
        </div>
    </div> 
    <div class="popup container wizardbox" id="StartWizard_Step2" style="position: absolute; visibility:hidden; left: 0px; top:0px"> 
        <div class="header">  
            <a class="Start_Wizard_Back" href="javascript:void(0)" onclick="StartWizard.step1()" >Back</a> 
        </div> 
        <div class="content">  
        <div class="box">  
            <h1>Customize your page</h1>  
            <p>Here\'s a small sampling of content to get you started. Later on, you can add much more and modify everything as you like at any time.</p>  
            <fieldset> <legend>Flakes to get you started</legend> 
                <table cellpadding="0" cellspacing="0" id="WelcomeWizard_ContentItems" class="fieldset_inside"> 
                <tr>  
                    <td>  
                        <input name="WelcomeWizard" title="Address Book" col="1" type="checkbox" id="__ADDRESSBOOK__"   value="__ADDRESSBOOK__" />
                        <label for="__ADDRESSBOOK__">Address Book</label>
                    </td>
                    <td>  
                        <input name="WelcomeWizard" title="Bookmarks" col="0" type="checkbox" id="__BOOKMARKS__"   value="__BOOKMARKS__" />
                        <label for="__BOOKMARKS__">Bookmarks</label>
                    </td>
                    <td>  
                        <input name="WelcomeWizard" title="CBS SportsLine.com" col="0" type="checkbox" id="__RSSFEED__2"   checked="checked" value="https://web.archive.org/web/20061102162037/http://cbs.sportsline.com/partners/feeds/rss/home_news" />
                        <label   for="__RSSFEED__2">CBS SportsLine.com</label>
                    </td> 
                </tr>
                <tr>  
                    <td>  
                        <input name="WelcomeWizard" title="Clock" col="1" type="checkbox" id="__WORLDTIMECLOCK__"   value="__WORLDTIMECLOCK__" />
                        <label for="__WORLDTIMECLOCK__">Clock</label>
                    </td>  
                    <td>  
                        <input name="WelcomeWizard" title="CNN Top Stories" col="0" type="checkbox" id="__RSSFEED__3"   checked="checked" value="https://web.archive.org/web/20061102162037/http://rss.cnn.com/rss/cnn_topstories.rss" />
                        <label   for="__RSSFEED__3">CNN Top Stories</label>
                    </td>  
                    <td>  
                        <input name="WelcomeWizard" title="Flickr Photos" col="1" type="checkbox" id="__FLICKR__"   value="__FLICKR__" />
                        <label for="__FLICKR__">Flickr Photos</label>
                    </td> 
                </tr> 
                <tr>
                    <td>  
                        <input name="WelcomeWizard" title="Google Search" col="0" type="checkbox" id="__SEARCH__"   value="__SEARCH__" checked="checked" />
                        <label for="__SEARCH__">Google Search</label>
                    </td>  
                    <td>  
                        <input name="WelcomeWizard" title="To-Do-List" col="1" type="checkbox" id="__TODOLIST__"   checked="checked" value="__TODOLIST__" />
                        <label for="__TODOLIST__">To-Do-List</label>
                    </td>  
                    <td>  
                        <input name="WelcomeWizard" title="YouTube Videos" col="1" type="checkbox" id="__YOUTUBE__"   checked="checked" value="__YOUTUBE__" />
                        <label for="__YOUTUBE__">YouTube Videos</label>
                    </td>
                </tr> 
                <tr>  
                    <td>  
                        <input name="WelcomeWizard" title="Weather" col="1" type="checkbox" id="__WEATHER__"   value="__WEATHER__" />
                        <label for="__WEATHER__">Weather</label>
                    </td> 
                </tr> 
            </table>  
        </fieldset>  
        <fieldset> 
            <legend>Your favorite color</legend> 
            <div class="padding15"> 
                <div class="radio_color r_yellow"> <input type="radio" name="StartWizard_Theme" value="Yellow_Unified" />
                </div> 
                <div class="radio_color r_green"> <input type="radio" name="StartWizard_Theme" value="Green_Unified" /></div> 
                <div class="radio_color r_blue"> <input type="radio" name="StartWizard_Theme" value="Blue_Unified" /></div> 
                <div class="radio_color r_purple"> <input type="radio" name="StartWizard_Theme" checked="checked" value="Purple_Unified" /></div> 
                <div class="radio_color r_pink"> <input type="radio" name="StartWizard_Theme" value="Pink_Unified" /></div> 
                <div class="radio_color r_orange"> <input type="radio" name="StartWizard_Theme" value="Brown_Unified" /></div> 
            </div> 
            <br />  
        </fieldset>  
        <div> 
            <input id="SetupPageButton" class="button" type="button" value="Next" onclick="StartWizard.step3()" />
            <span id="Step2Progress" style="visibility:hidden; margin-left: 20px">
                <img src="/Pageflakes/images/indicator.gif"  style="vertical-align: middle; padding-right: 5px" /> Preparing your page...
            </span>
        </div>  
    </div> 
</div> 
</div> 
<div id="StartWizard_Step3" class="popup container wizardbox" style="position: absolute; visibility:hidden; left: 0px; top:0px"> <div class="header"> </div> <div class="content">  <div class="box">  <h1> Congratulations!</h1>  <p>Here\'s your new personal startpage. Once you\'ve signed up, you can also share your page with friends or publish it for anyone to see!</p>  <table style="margin-top: 30px; margin-bottom: 15px">  <tr style="padding-bottom: 5px"><td align="center"><img src="/Pageflakes/images/StartWizard/PrivatePages.png" width="69" height="78" /></td><td align="center" ><img src="/Pageflakes/images/StartWizard/Sharedpages.PNG" width="77" height="78" /></td><td align="center" ><img src="/Pageflakes/images/StartWizard/PublicPages.PNG" width="68" height="78" /></td></tr>  <tr style="font-weight:bold"><td align="center">Private Pages</td><td align="center">Shared Pages</td><td align="center">Public Pages</td></tr>  <tr><td align="center" valign="top" style="padding-right: 5px">Complete privacy. Only you can view and edit it.</td><td align="center" valign="top" style="padding-right: 5px">A team page for you and users that you invite.</td><td align="center" valign="top" style="padding-right: 5px">Your homepage on the web. Can be viewed by anyone.</td></tr>  </table>  <div style="margin-top: 30px"> <input class="button" type="button" style="width: 180px" value="Finished - Take me to my page!" onclick="StartWizard.finish()" /></div>  </div> </div> </div> <div class="popup container wizardbox" id="StartWizard_Login" style="position: absolute; visibility:hidden; left: 0px; top:0px"> <div class="header">  <a class="Start_Wizard_Back" href="javascript:void(0)" onclick="StartWizard.step1()" >Back</a> </div> <div class="content">  <div class="box logo_box" style="height: 160px">  <h1>Log in</h1>  <p>Please enter your email address and password:</p>  <div> <label>Email:</label> <div class="loginfield" id="StartWizard_Email"><input onkeypress="if( event.keyCode == 13 ) StartWizard.login();" id="Start_Wizard_EmailField" class="textfield" type="text" /> <div id="StartWizard_Email_Msg" class="nodisplay">Incorrect user name or</div><br /> </div> <br /> <label>Password:</label> <div class="loginfield" id="StartWizard_Password"><input onkeypress="if( event.keyCode == 13 ) StartWizard.login();" id="Start_Wizard_PasswordField" class="textfield" type="password" /> <div class="nodisplay" id="StartWizard_Password_Msg">Incorrect password</div><br /> </div> <br /> <label></label> <label style="width:auto"><input type="checkbox" checked="true" id="StartWizard_RememberMe"/>Remember Me</label> <br /> <div><input class="button2" type="button" value="Login" onclick="StartWizard.login()" /><span  id="LoginProgress" style="visibility:hidden; margin-left: 20px"><img src="/Pageflakes/images/indicator.gif"   style="vertical-align: middle; padding-right: 5px" />Authenticating...</span></div>  </div>  </div>  <div class="box" >  <h1>Lost password?</h1>  <p>Enter your email address to receive lost password:</p>  <div> <label>Email:</label> <div class="loginfield" id="StartWizard_GetPassword_Email"><input id="StartWizard_GetPassword_Email_Field" class="textfield" type="text" /> <div class="nodisplay" id="StartWizard_GetPass_Email_Msg">Incorrect Email address<br /></div> </div> <div id="StartWizard_GetPasswordMessage"></div> <br /> <div><input class="button2" type="button" value="Get Password" onclick="StartWizard.getPassword()" /><span  id="GetPasswordProgress" style="visibility:hidden; margin-left: 20px"><img src="/Pageflakes/images/indicator.gif"   style="vertical-align: middle; padding-right: 5px" />err:Emailing password...</span></div>   </div>  </div> </div>  </div>

</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceFooter" Runat="Server">
</asp:Content>

