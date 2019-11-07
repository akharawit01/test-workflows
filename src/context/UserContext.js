import { createContext } from "react";

export const defaultUserContext = {
  username: "",
  email: ""
};
export default createContext(defaultUserContext);
