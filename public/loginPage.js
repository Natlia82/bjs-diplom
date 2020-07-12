"use strict";

const lF = new UserForm();
lF.loginFormCallback = (data) => ApiConnector.login(data, response => (response.success) ? location.reload() : lF.loginErrorMessageBox("не верно"));

lF.registerFormCallback = (data) => ApiConnector.register(data, response => (response.success) ? location.reload() : lF.registerErrorMessageBox("не верно"));