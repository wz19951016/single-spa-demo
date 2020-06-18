/*
 * @Author: wangzhong
 * @Date: 2020-06-09 17:36:49
 * @LastEditors: wangzhong
 * @LastEditTime: 2020-06-18 11:47:37
 * @FilePath: /single-spa-portal-example/portal/src/portal.js
 */ 
import 'zone.js';
import * as singleSpa from 'single-spa';
import { GlobalEventDistributor } from './globalEventDistributor'
import { loadApp } from './helper'

async function init() {
    const globalEventDistributor = new GlobalEventDistributor();
    const loadingPromises = [];

    // app1: The URL "/app1/..." is being redirected to "http://localhost:9001/..." this is done by the webpack proxy (webpack.config.js)
    loadingPromises.push(loadApp('app1', '/app1', 'http://localhost:9001/singleSpaEntry.js', 'http://localhost:9001/store.js', globalEventDistributor));

    // app2: The URL "/app2/..." is being redirected to "http://localhost:9002/..." this is done by the webpack proxy (webpack.config.js)
    loadingPromises.push(loadApp('app2', '/app2', 'http://localhost:9002/singleSpaEntry.js', 'http://localhost:9002/store.js', globalEventDistributor));

    // app3: The URL "/app3/..." is being redirected to "http://localhost:9003/..." this is done by the webpack proxy (webpack.config.js)
    loadingPromises.push(loadApp('app3', '/app3', 'http://localhost:9003/singleSpaEntry.js', null, null)); // does not have a store, so we pass null

    // app3: The URL "/app4/..." is being redirected to "http://localhost:9004/..." this is done by the webpack proxy (webpack.config.js)
    loadingPromises.push(loadApp('app4', '/app4', 'http://localhost:9004/singleSpaEntry.js', null, null)); // does not have a store, so we pass null

    // app5: The URL "/app5/..." is being redirected to "http://localhost:9005/..." this is done by the webpack proxy (webpack.config.js)
    loadingPromises.push(loadApp('app5', '/app5', 'http://localhost:9005/singleSpaEntry.js', 'http://localhost:9005/store.js', globalEventDistributor));

    loadingPromises.push(loadApp('app6', '/app6', 'http://localhost:8080/singleSpaEntry.js', null, null));

    // wait until all stores are loaded and all apps are registered with singleSpa
    await Promise.all(loadingPromises);

    singleSpa.start();
}

init();

