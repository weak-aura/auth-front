import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {Layout} from "./pages/Layout";
import {Signup} from "./pages/Signup";
import {Login} from "./pages/Login";

function App() {

  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path={"/signup"} element={<Signup/>}/>
            <Route path={"/login"} element={<Login/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App
