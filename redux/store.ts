import { createStore, applyMiddleware, AnyAction, combineReducers } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import rootReducer, { RootState } from "./rootReducer";
import trackReducer from './trackReducer';
import sceneReducer from './sceneReducer';

//Thanks to: https://stackoverflow.com/a/57102280
type DispatchFunctionType = ThunkDispatch<RootState, undefined, AnyAction>

const combinedReducer = combineReducers({
  root: rootReducer,
  scenes: sceneReducer,
  tracks: trackReducer
})

export type CombinedState = ReturnType<typeof combinedReducer>;

export default createStore(combinedReducer, applyMiddleware<DispatchFunctionType, RootState>(thunk));

