import "@babel/polyfill";
import { WorkerizedStore } from "redux-workerized";
import { createWorkerContext } from "redux-workerized/react";
import * as Comlink from "comlinkjs";

// This is counter example. Use your reducer.
import { RootState, increment, Increment } from "./reducer";

// Use webpack's worker-loader or parcel to build worker instance and cast
const store: WorkerizedStore<RootState> = Comlink.proxy(
  new Worker("./worker.ts")
) as any;

store.subscribe(
  Comlink.proxyValue((newState: RootState) => {
    console.log("changed", newState);
  })
);

(async () => {
  await store.dispatch(increment());
  const currentState = await store.getState();
  console.log("current state", currentState);
})();
