import { useDispatch, useSelector, useStore } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch, StoreType } from "./index";

const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const useAppStore: () => StoreType = useStore;

export { useAppDispatch, useAppSelector, useAppStore };
