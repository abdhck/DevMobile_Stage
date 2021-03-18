// Store/configureStore.js

import { createStore } from "redux";
import toggleLogin from "./Reducers/loginReducer";

export default createStore(toggleLogin);
