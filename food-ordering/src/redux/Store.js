import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./slices/CartSlice";
import CategorySlice from "./slices/CategorySlice";
import AuthReducer from "./slices/AuthSlice";
import AdminReducer from "./slices/AdminSlice";
import ContentReducer from "./slices/ContentSilce";

const Store = configureStore({
  reducer: {
    cart: CartSlice,
    category: CategorySlice,
    auth: AuthReducer,
    admin: AdminReducer,
    content: ContentReducer,
  },
});
export default Store;
