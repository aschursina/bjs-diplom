'use strict'

const userForm = new UserForm();

userForm.loginFormCallback = function(data) {
    ApiConnector.login(data, (response) => {
        if(response.succes) {
            location.reload();
        }
        this.setLoginErrorMessageBox(response.error);
    })
}

userForm.registerFormCallback = function(data) {
    ApiConnector.register(data, (response) => {
        if(response.succes) {
            location.reload();
        }
        this.setRegisterErrorMessageBox(response,error);
    })
}


