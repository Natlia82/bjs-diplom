"use strict";

const lF = new UserForm();
lF.loginFormCallback = (data) => {
    ApiConnector.login(data, response => {
        if (response.success) {
            location.reload();
        } else lF.loginErrorMessageBox("не верно");
    });
}


lF.registerFormCallback = (data) => {
    ApiConnector.register(data, response => {
        if (response.success) {
            location.reload();
        } else lF.registerErrorMessageBox("не верно");
    });
}