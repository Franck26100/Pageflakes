

var StartWizard=
{
BOX_HEIGHT:"400px",
STEP1:"StartWizard_Step1",
STEP2:"StartWizard_Step2",
STEP3:"StartWizard_Step3",
LOGIN_STEP:"StartWizard_Login",
STEP2_WORKING:"Step2Progress",
LOGIN_STEP_WORKING:"LoginProgress",
GET_PASSWORD_WORKING:"GetPasswordProgress",
EMAIL_FIELD:"Start_Wizard_EmailField",
PASSWORD_FIELD:"Start_Wizard_PasswordField",
SETUP_PAGE_BUTTON:"SetupPageButton",
GETPASS_EMAIL:"StartWizard_GetPassword_Email",
GETPASS_EMAIL_FIELD:"StartWizard_GetPassword_Email_Field",
GETPASS_EMAIL_MSG:"StartWizard_GetPass_Email_Msg",
EMAIL:"StartWizard_Email",
EMAIL_MSG:"StartWizard_Email_Msg",
PASSWORD:"StartWizard_Password",
PASSWORD_MSG:"StartWizard_Password_Msg",
GETPASS_MSG:"StartWizard_GetPasswordMessage",
REMEMBER_ME:"StartWizard_RememberMe",
init:function()
    {
        PU.blockUI();
        StartWizard.step1();
    },step1:function()
        {
            PU.centerDiv($(StartWizard.STEP1));
            $visible(StartWizard.STEP1);
            $hide(StartWizard.STEP2);
            $hide(StartWizard.STEP3);
            $hide(StartWizard.LOGIN_STEP);
    },step2:function() 
            {
                PU.centerDiv($(StartWizard.STEP2));
                $hide(StartWizard.STEP1);
                $visible(StartWizard.STEP2);
                $hide(StartWizard.STEP3);
                $hide(StartWizard.LOGIN_STEP);
                $enabled(StartWizard.SETUP_PAGE_BUTTON);
    },step3:function()
            {
                $visible(StartWizard.STEP2_WORKING);
                $disabled(StartWizard.SETUP_PAGE_BUTTON);
                if(typeof PrimaryFramework!="undefined")
                    {
                        var flakeNames=StartWizard.getFlakeNames();
                        var themeName=StartWizard.getThemeName();
                        CoreServices.SetupPage(flakeNames,themeName,VERSION_SUFFIX,{onMethodComplete:function(result)
                            {
                                if(result==null){alert(Lang.COMMON_ERROR_ALERT);
                                return;
                            }
                        window.startupInfo=result;
                        CURRENT_PAGE_ID=window.startupInfo.CurrentPageID;
                        loadFirstPage(function()
                            {
                                $hide(StartWizard.STEP2_WORKING);
                                PU.centerDiv($(StartWizard.STEP3));
                                $hide(StartWizard.STEP1);
                                $hide(StartWizard.STEP2);
                                $visible(StartWizard.STEP3);
                                $hide(StartWizard.LOGIN_STEP);
                                MethodQueue.add('StartWizard.showTooltip',3000,false,StartWizard.showTooltip);});
                        },onMethodTimeout:function(request,userContext)
                            {
                                alert(Lang.COMMON_ERROR_ALERT);
                                $enabled(StartWizard.SETUP_PAGE_BUTTON);
                        },onMethodError:function(exception,response,userContext)
                            {
                                alert(Lang.COMMON_ERROR_ALERT);
                                $enabled(StartWizard.SETUP_PAGE_BUTTON);
                        },onMethodAborted:function(request,userContext)
                            {
                                alert(Lang.COMMON_ERROR_ALERT);
                                $enabled(StartWizard.SETUP_PAGE_BUTTON);
                        },timeoutInterval:30000});
                    }
                    else{
                        window.setTimeout(StartWizard.step3,1000);
                    }
                }, finish:function()
                    {
                        $remove(StartWizard.STEP1);
                        $remove(StartWizard.STEP2);
                        $remove(StartWizard.STEP3);
                        $remove(StartWizard.LOGIN_STEP);
                        PU.unblockUI();
                        $visible('footer');
                },loginStep:function()
                    {
                        $hide(StartWizard.STEP1);
                        $hide(StartWizard.STEP2);
                        $hide(StartWizard.STEP3);
                        $visible(StartWizard.LOGIN_STEP);
                        PU.centerDiv($(StartWizard.LOGIN_STEP));
                        $(StartWizard.EMAIL_FIELD).focus();
                },login:function(redirectToReturn)
                    {
                        $visible(StartWizard.LOGIN_STEP_WORKING);
                        if(typeof PrimaryFramework!="undefined")
                            {
                                Sys.Services.AuthenticationService.login($(StartWizard.EMAIL_FIELD).value,$(StartWizard.PASSWORD_FIELD).value,$(StartWizard.REMEMBER_ME).checked,function(result)
                                    {
                                        if(result)
                                            {
                                                if(redirectToReturn)
                                                    {
                                                        var returnUrl=$urlParam("ReturnUrl");
                                                        if(returnUrl!="")
                                                            document.location.href=unescape(returnUrl);
                                                        else
                                                            document.location.href="Default.aspx";
                                                    }
                                                else 
                                                    document.location.href="Default.aspx";
                                             }
                                        else
                                            {
                                                $(StartWizard.EMAIL).className=$(StartWizard.PASSWORD).className="wrong";
                                                $(StartWizard.EMAIL_MSG).className=$(StartWizard.PASSWORD_MSG).className="wrong_msg";
                                                $hide(StartWizard.LOGIN_STEP_WORKING);
                                            }
                        });
                    }
                    else
                        {
                            window.setTimeout(StartWizard.login,1000);
                        }
                },getPassword:function()
                    {
$visible(StartWizard.GET_PASSWORD_WORKING);
if(typeof PrimaryFramework!="undefined")
{
CoreServices.GetPassword($(StartWizard.GETPASS_EMAIL_FIELD).value,{onMethodComplete:function(result)
{
$hide(StartWizard.GET_PASSWORD_WORKING);
$(StartWizard.GETPASS_MSG).innerHTML=Lang.EMAIL_SUCCESS;},onMethodTimeout:function(request,userContext)
{
alert(Lang.COMMON_ERROR_ALERT);
$hide(StartWizard.GET_PASSWORD_WORKING);},onMethodError:function(exception,response,userContext)
{
$(StartWizard.GETPASS_EMAIL).className="wrong";
$(StartWizard.GETPASS_EMAIL_MSG).className="wrong_msg";
$hide(StartWizard.GET_PASSWORD_WORKING);},onMethodAborted:function(request,userContext)
{
alert(Lang.COMMON_ERROR_ALERT);
$hide(StartWizard.GET_PASSWORD_WORKING);},timeoutInterval:60000});}
else
{
window.setTimeout(StartWizard.getPassword,1000);}},
getFlakeNames:function()
{
var inputs=document.getElementsByTagName("INPUT");
var itemsToAdd=[];
for(var i=0;i<inputs.length;i++)
{
var input=inputs[i];
if(input.name=="WelcomeWizard")
{
if(input.checked)
{
if(input.id.indexOf("__RSSFEED__")==0)
itemsToAdd.add({url:RSS_FEED_FLAKE_URL+escape(input.value),col:parseInt(input.getAttribute("col")),title:input.title});
else
itemsToAdd.add({url:input.value,col:parseInt(input.getAttribute("col")),title:input.title});}}}
return itemsToAdd;},
getThemeName:function()
{
var inputs=document.getElementsByTagName("INPUT");
var itemsToAdd=[];
for(var i=0;i<inputs.length;i++)
{
var input=inputs[i];
if(input.name=="StartWizard_Theme")
{
if(input.checked)
{
return input.value;}}}},
showTooltip:function()
{
var tooltipParent=$(MODULE_CONTAINER);
var addContentHelpTooltip=new Image();
addContentHelpTooltip.src=IMAGE_PREFIX+"AddContentTooltip.gif";
addContentHelpTooltip.className="handCursor";
addContentHelpTooltip.style.position="absolute";
var addFlakeButtonPos=PU.getPosition($('AddFlakeButton'));
addContentHelpTooltip.style.left=addFlakeButtonPos[0]+20+"px";
addContentHelpTooltip.style.top=addFlakeButtonPos[1]+addFlakeButtonPos[3]-5+"px";
tooltipParent.appendChild(addContentHelpTooltip);
addContentHelpTooltip.onclick=function(event){tooltipParent.removeChild(this);}
var shareTooltip=new Image();
shareTooltip.src=IMAGE_PREFIX+"SharePageTooltip.gif";
shareTooltip.style.position="absolute";
shareTooltip.className="handCursor";
var pageSettingIconPos=PU.getPosition($('tabs').firstChild.lastChild);
shareTooltip.style.left=(pageSettingIconPos[0]-68)+"px";
shareTooltip.style.top=pageSettingIconPos[1]+pageSettingIconPos[3]+"px";
tooltipParent.appendChild(shareTooltip);
shareTooltip.onclick=function(event){tooltipParent.removeChild(this);}
var sampleModule=null;
for(var col=0;col<App.currentPage.columnCount;col++)
{
for(var row=(col>0?0:1);row<App.currentPage.columns[col].modules.length;row++)
{
var module=App.currentPage.columns[col].modules[row];
if(null!=module)
{
if($isVisible(module.editLink))
{
sampleModule=module;
break;}}}
if(null!=sampleModule)break;}
if(null!=sampleModule)
{
MethodQueue.add('ShowHelpTooltips',1000,false,function()
{
var dragHelpTooltip=new Image();
dragHelpTooltip.src=IMAGE_PREFIX+"DragFlakeTooltip.gif";
dragHelpTooltip.style.position="absolute";
dragHelpTooltip.className="handCursor";
var flakePos=PU.getPosition(sampleModule.div);
dragHelpTooltip.style.left=(flakePos[0]+(flakePos[2]/2)-56)+"px";
dragHelpTooltip.style.top=(flakePos[1]-46)+"px";
tooltipParent.appendChild(dragHelpTooltip);
dragHelpTooltip.onclick=function(event){tooltipParent.removeChild(this);}
var editLinkTooltip=new Image();
editLinkTooltip.src=IMAGE_PREFIX+"ChangeSettingsTooltip.gif";
editLinkTooltip.style.position="absolute";
editLinkTooltip.className="handCursor";
var flakePos=PU.getPosition(sampleModule.editLink);
editLinkTooltip.style.left=(flakePos[0]-15)+"px";
editLinkTooltip.style.top=(flakePos[1]-60)+"px";
tooltipParent.appendChild(editLinkTooltip);
editLinkTooltip.onclick=function(event){tooltipParent.removeChild(this);}
function removeTooltips(hideAll)
{
if(dragHelpTooltip.parentNode==tooltipParent)tooltipParent.removeChild(dragHelpTooltip);
if(editLinkTooltip.parentNode==tooltipParent)tooltipParent.removeChild(editLinkTooltip);
if(hideAll)
{
if(addContentHelpTooltip.parentNode==tooltipParent)tooltipParent.removeChild(addContentHelpTooltip);
if(shareTooltip.parentNode==tooltipParent)tooltipParent.removeChild(shareTooltip);}}
sampleModule._dragStart=sampleModule.dragStart;
sampleModule.dragStart=function(x,y){removeTooltips(false);sampleModule.dragStart=sampleModule._dragStart;};
document.onclick=function(event){document.onclick=null;removeTooltips(true);}});}}};
if(window.startupInfo&&window.startupInfo.IsFirstVisit)window.setTimeout(StartWizard.init,200);

