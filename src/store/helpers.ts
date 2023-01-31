import globalStore from "./global";

export const StoreContext = React.createContext({ globalStore });
export const useStore = () => React.useContext(StoreContext);