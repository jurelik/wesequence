import { createStore, applyMiddleware, AnyAction } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import rootReducer, { RootState } from "./rootReducer";

//Thanks to: https://stackoverflow.com/a/57102280
type DispatchFunctionType = ThunkDispatch<RootState, undefined, AnyAction>

export default createStore(rootReducer, applyMiddleware<DispatchFunctionType, RootState>(thunk));

