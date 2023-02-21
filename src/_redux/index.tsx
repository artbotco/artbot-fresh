import {applyMiddleware, createStore} from "redux";
import logger                         from "redux-logger";
import {persistReducer, persistStore} from "redux-persist";
import createSagaMiddleware           from "redux-saga";
import rootReducer, {rootSaga}        from "./reducers";

let store: any;
let initialState = {};
const middleware = [];
const sagaMiddleware = createSagaMiddleware();
middleware.push(sagaMiddleware);

if (process.env.NODE_ENV === "development") {
    middleware.push(logger);
}
const isClient = typeof window !== "undefined";
if (isClient) {
    const storage = require("redux-persist/lib/storage").default;
    // const storage = require('../storage');
    const persistConfig = {
        key: "root",
        storage,
        whitelist: ["auth"]
    };
    let str = persistReducer(persistConfig, rootReducer);

    store = createStore(
        str,
        initialState,
        applyMiddleware(...middleware)
    );
    store.__PERSISTOR = persistStore(store);
} else {
    store = createStore(rootReducer, initialState, applyMiddleware(...middleware));
}
sagaMiddleware.run(rootSaga);
export default store as any;
