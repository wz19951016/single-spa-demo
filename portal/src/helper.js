/*
 * @Author: wangzhong
 * @Date: 2020-06-09 17:36:49
 * @LastEditors: wangzhong
 * @LastEditTime: 2020-06-17 17:04:26
 * @FilePath: /single-spa-portal-example/portal/src/helper.js
 */ 
import * as singleSpa from 'single-spa'; // waiting for this to be merged: https://github.com/CanopyTax/single-spa/pull/156
import createHistory from 'history/createBrowserHistory'
const history = createHistory()

export function hashPrefix(prefix) {
    return function (location) {
        console.log(location.pathname)
        console.log(prefix)
        console.log(location.pathname.startsWith(`${prefix}`))
        return location.pathname.startsWith(`${prefix}`);
    }
}

export async function loadApp(name, hash, appURL, storeURL, globalEventDistributor) {
    let storeModule = {}, customProps = {globalEventDistributor: globalEventDistributor};

    // try to import the store module
    try {
        storeModule = storeURL ? await SystemJS.import(storeURL) : {storeInstance: null};
    } catch (e) {
        console.log(`Could not load store of app ${name}.`, e);
    }

    if (storeModule.storeInstance && globalEventDistributor) {
        // add a reference of the store to the customProps
        customProps.store = storeModule.storeInstance;

        // register the store with the globalEventDistributor
        globalEventDistributor.registerStore(storeModule.storeInstance);
    }
    SystemJS.config({ transpiler: 'transpiler-module' })
    customProps.history = history
    // register the app with singleSPA and pass a reference to the store of the app as well as a reference to the globalEventDistributor
    singleSpa.registerApplication(name, () => SystemJS.import(appURL), hashPrefix(hash), customProps);
}