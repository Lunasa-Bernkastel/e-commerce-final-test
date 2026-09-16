import { createStore } from "vuex";
import product from "./product";
import auth from "./auth";
import cart from "./cart";
import wishlist from "./wishlist";
import transaction from "./transaction";

export const store = createStore ({
    modules: {
        product,
        auth,
        cart,
        wishlist,
        transaction
    },
})
