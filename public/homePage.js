"use strict";
const exit = new LogoutButton();

exit.action = () => {
    ApiConnector.logout((callback) => {
        if (callback.success) {
            location.reload();
        }
    });
};

ApiConnector.current(coll => {
    if (coll.success) {
        ProfileWidget.showProfile(coll.data);
    }
});

const tab = new RatesBoard;

function exchangeRate() {
    ApiConnector.getStocks((callback) => {
        if (callback.success) {
            tab.clearTable();
            tab.fillTable(callback.data)
        }
    });
}

const id = setInterval(exchangeRate(), 3600);
let money = new MoneyManager;

money.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (callback) => {
        if (callback.success) {
            ProfileWidget.showProfile(callback.data);
            money.setMessage(true, "все ок");
        } else money.setMessage(false, "ошибка");
    })
};

money.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (callback) => {
        if (callback.success) {
            ProfileWidget.showProfile(callback.data);
            money.setMessage(true, "все ок");
        } else money.setMessage(false, "ошибка");
    })
};

money.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (callback) => {
        if (callback.success) {
            ProfileWidget.showProfile(callback.data);
            money.setMessage(true, "все ок");
        } else money.setMessage(false, "ошибка");
    });
};

const avorit = new FavoritesWidget;

ApiConnector.getFavorites((callback) => {
    if (callback.success) {
        avorit.clearTable();
        avorit.fillTable(callback.data);
        money.updateUsersList(callback.data);
    }
});

avorit.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (callback) => {
        if (callback.success) {
            avorit.clearTable();
            avorit.fillTable(callback.data);
            money.updateUsersList(callback.data);
            avorit.setMessage(true, "все ок");
        } else avorit.setMessage(false, "ошибка");
    });
};

avorit.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (callback) => {
        if (callback.success) {
            avorit.clearTable();
            avorit.fillTable(callback.data);
            money.updateUsersList(callback.data);
            avorit.setMessage(true, "все ок");
        } else avorit.setMessage(false, "ошибка");
    });
};