'use strict'

const userForm = new UserForm();

//авторизация
userForm.loginFormCallback = function(data) {
    ApiConnector.login(data, (response) => {
        if(response.success) {
            location.reload();
        }
        this.setLoginErrorMessageBox(response.error);
    })
}

//регистрация
userForm.registerFormCallback = function(data) {
    ApiConnector.register(data, (response) => {
        if(response.success) {
            location.reload();
        }
        this.setRegisterErrorMessageBox(response,error);
    })
}


