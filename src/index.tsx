import store                          from "_redux";
import React                          from "react";
import ReactDOM                       from "react-dom/client";
import {Provider}                     from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {PersistGate}                  from "redux-persist/integration/react";
import "./index.scss";
import Home                           from "./pages/Home";
import reportWebVitals                from "./reportWebVitals";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={store.__PERSISTOR} loading={null}>
                <BrowserRouter>
                    <Routes>
                        <Route path={"/"} element={<Home />} />
                        <Route path={"/letsmakeamovie"} element={<Home />} />
                    </Routes>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export default root;