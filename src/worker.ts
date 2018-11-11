import "@babel/polyfill";
import * as Comlink from "comlinkjs";
import { createStore } from "redux";
import reducer from "./reducer";
import { createWorkerizedStore } from "redux-workerized/worker";

const store = createStore(reducer);
const proxy = createWorkerizedStore(store, s => s);

// Merge with your complink api
Comlink.expose({ ...proxy }, self);
