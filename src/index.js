import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { createStore } from "redux";
import finalReducer from "./reducers";
import { Provider } from "react-redux";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { pwaOn } from "./global/constants";

// Disable React DevTools for production
if (process.env.NODE_ENV === "production" && typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === "object") {
  for (let [key, value] of Object.entries(window.__REACT_DEVTOOLS_GLOBAL_HOOK__)) {
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] = typeof value == "function" ? () => {} : null;
  }
}

// Persist Redux store in LocalStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (!serializedState) return undefined;
    else return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {}
};
const persistedStore = loadState();

// Disable Redux DevTools for production
export const store =
  process.env.NODE_ENV === "production"
    ? createStore(finalReducer, persistedStore)
    : createStore(
        finalReducer,
        persistedStore,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      );

// Save Redux Store in LocalStorage when it changes
store.subscribe(() => {
  saveState(store.getState());
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
if (pwaOn) serviceWorkerRegistration.register();
else serviceWorkerRegistration.unregister();
