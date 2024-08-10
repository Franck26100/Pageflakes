var LW = { 
    GETPASS_EMAIL: "LoginWizard_GetPassword_Email",
    GETPASS_EMAIL_FIELD: "LoginWizard_GetPassword_Email_Field",
    GETPASS_EMAIL_MSG: "LoginWizard_GetPass_Email_Msg",
    EMAIL: "LoginWizard_Email",
    EMAIL_MSG: "LoginWizard_Email_Msg",
    PASSWORD: "LoginWizard_Password",
    PASSWORD_MSG: "LoginWizard_Password_Msg",
    GETPASS_MSG: "LoginWizard_GetPasswordMessage",
    REMEMBER_ME: "LoginWizard_RememberMe",
    GET_PASSWORD_WORKING: "GetPasswordProgress",
    EMAIL_FIELD: "LoginWizard_EmailField",
    PASSWORD_FIELD: "LoginWizard_PasswordField",
    LOGIN_STEP_WORKING: "LoginWizard_StepWorking",
    login: function(A) {
        $visible(LW.LOGIN_STEP_WORKING);
        if (typeof PrimaryFramework != "undefined") {
            CoreServices.Login($(LW.EMAIL_FIELD).value, $(LW.PASSWORD_FIELD).value, $(LW.REMEMBER_ME).checked, function(B) {
                if (B) {
                    //$trackEventNoTimeOut("Login Dialog", "Login", "Success");
                    if (A) {
                        var C = $urlParam("ReturnUrl");
                        $("returnUrlFromLogin").value = C;
                        document.forms[0].submit()
                    }
                    else {
                        document.location.href = "default.aspx"
                    } 
                }
                else {
                    $trackEventNoTimeOut("Login Dialog", "Login", "Failure");
                    $(LW.EMAIL).className = $(LW.PASSWORD).className = "wrong";
                    $(LW.EMAIL_MSG).className = $(LW.PASSWORD_MSG).className = "wrong_msg";
                    $hide(LW.LOGIN_STEP_WORKING)
                } 
            })
        }
        else {
            window.setTimeout(LW.login, 1000)
        }
    }, logout: function() {
        document.location = "logout.aspx"
    }, getPassword: function() {
        $visible(LW.GET_PASSWORD_WORKING);
        $nodisplay(LW.GETPASS_MSG);
        if (typeof PrimaryFramework != "undefined") {
            CoreServices.GetPassword($(LW.GETPASS_EMAIL_FIELD).value, function(A) {
                $trackEventNoTimeOut("Login Dialog", "Forgot Password", "Success");
                $hide(LW.GET_PASSWORD_WORKING);
                $(LW.GETPASS_MSG).innerHTML = Lang.EMAIL_SUCCESS;
                $display(LW.GETPASS_MSG);
                if ($(LW.GETPASS_EMAIL)._className) {
                    $(LW.GETPASS_EMAIL).className = $(LW.GETPASS_EMAIL)._className
                }
                if ($(LW.GETPASS_EMAIL_MSG)._className) {
                    $(LW.GETPASS_EMAIL_MSG).className = $(LW.GETPASS_EMAIL_MSG)._className
                }
            }, function(B, A, D) {
                var C = B.get_timedOut();
                if (C) {
                    alert(Lang.COMMON_ERROR_ALERT);
                    $hide(LW.GET_PASSWORD_WORKING)
                }
                else {
                    $trackEventNoTimeOut("Login Dialog", "Forgot Password", "Failure (email does not exist)");
                    $(LW.GETPASS_EMAIL)._className = $(LW.GETPASS_EMAIL)._className;
                    $(LW.GETPASS_EMAIL_MSG)._className = $(LW.GETPASS_EMAIL_MSG).className;
                    $(LW.GETPASS_EMAIL).className = "wrong";
                    $(LW.GETPASS_EMAIL_MSG).className = "wrong_msg";
                    $hide(LW.GET_PASSWORD_WORKING)
                } 
            })
        }
        else {
            window.setTimeout(LW.getPassword, 1000) 
        } 
    } 
};
                