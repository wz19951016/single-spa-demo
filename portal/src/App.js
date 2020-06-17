/*
 * @Author: wangzhong
 * @Date: 2020-06-16 14:43:59
 * @LastEditors: wangzhong
 * @LastEditTime: 2020-06-17 16:49:49
 * @FilePath: /single-spa-portal-example/portal/src/App.js
 */ 
import React from "react";
import ReactDom from "react-dom"
import { Link, BrowserRouter } from "react-router-dom"
// import "./portal.js"

const App = () => {
  return (
    <div>
      <ul>
        <li key="key1">
          <Link to="/app1">app1</Link>
        </li>
        <li key="key2">
          <Link to="/app2">app2</Link>
        </li>
        <li key="key3">
          <Link to="/app3">app3</Link>
        </li>
        <li key="key4">
          <Link to="/app4">app4</Link>
        </li>
        <li key="key5">
          <Link to="/app5">app5</Link>
        </li>
        <li key="key6">
          <Link to="/app6">app6</Link>
        </li>
      </ul>
    </div>
  )
}

ReactDom.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
  document.getElementById("root")
)