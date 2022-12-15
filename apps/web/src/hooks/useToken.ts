import { useContext } from "react";
import { TokenContext, type TokenState } from "@/components";

const useToken = (): TokenState => {
  const { state } = useContext(TokenContext);
  return state;
};

export default useToken;
