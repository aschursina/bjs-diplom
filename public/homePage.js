'use strict'

//выход из ЛК
const logoutButton = new LogoutButton();

logoutButton.action= () => {
    ApiConnector.logout((response) => {
        if(response.success) {
            location.reload();
        }
    })
}

//получение информации о пользователе
ApiConnector.current((response) => {
    if(response.success) {
        ProfileWidget.showProfile(response.data);
    }
})

//получение курс валюты
const ratesBoard = new RatesBoard();

ratesBoard.getStocks = function () {
    ApiConnector.getStocks((response) => {
        if(response.success) {
            this.clearTable();
            this.fillTable(response.data);
        }
    })
}

ratesBoard.getStocks();
setInterval(ratesBoard.getStocks.bind(ratesBoard), 60000);

//операции с деньгами
const moneyManager = new MoneyManager();

//пополнение баланса
moneyManager.addMoneyCallback = function (data) {
    ApiConnector.addMoney(data, (response) => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
        }
        this.setMessage(response.success, response.success ? "Success" : response.error);
    })
}

//конвертирование валюты
moneyManager.conversionMoneyCallback = function (data) {
    ApiConnector.convertMoney(data, (response) => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
        }
        this.setMessage(response.success, response.success ? "Success" : response.error);
    })
}

//перевод валюты
moneyManager.sendMoneyCallback = function (data) {
    ApiConnector.transferMoney(data, (response) => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
        }
        this.setMessage(response.success, response.success ? "Success" : response.error);
    })
}

//работа с избранным
const favoritesWidget = new FavoritesWidget();

//получение избранного
ApiConnector.getFavorites((response) => {
    if(response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
})


//добавление в избранное
favoritesWidget.addUserCallback = function (data) {
    ApiConnector.addUserToFavorites(data, (response) => {
        if(response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }
    })
    this.setMessage(response.success, response.success ? "Success" : response.error);
}

//удаление из ибранного
favoritesWidget.removeUserCallback = function (data) {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if(response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }
    })
    this.setMessage(response.success, response.success ? "Success" : response.error);
}