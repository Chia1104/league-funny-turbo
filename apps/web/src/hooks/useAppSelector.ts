import { type TypedUseSelectorHook, useSelector } from "react-redux";
import { type AppState } from "@/store/type";

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
