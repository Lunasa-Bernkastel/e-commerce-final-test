import HomePage from "./components/pages/HomePage.vue"
import LoginPage from "./components/pages/LoginPage.vue"
import SignupPage from "./components/pages/SignupPage.vue"
import DetailPage from './components/pages/DetailPage.vue';
import CartPage from "./components/pages/CartPage.vue";
import FavoritePage from "./components/pages/FavoritePage.vue";
import UserPage from "./components/pages/UserPage.vue";
import OrderConfirmationPage from "./components/pages/OrderConfirmationPage.vue";
import Cookies from "js-cookie"
import { store } from "./store/index"

const checkAuth = () => {
    const jwtCookie = Cookies.get("jwt");
    const expirationDate = Cookies.get("tokenExpirationDate");
    const userId = Cookies.get("UID");
    

    if (jwtCookie) {
        if (new Date().getTime() < +expirationDate) {
            store.commit("auth/setToken", {
                idToken: jwtCookie,
                expiresIn: expirationDate,
            });
            store.dispatch("auth/getUser", userId);
            return true;
        } else {
            store.commit("auth/setUserLogout");
            return false;
        }
    } else {
        return false;
    }
}




export const routes = [
  { path: "/signup", name: "signup", component: SignupPage },
  { path: "/login", name: "login", component: LoginPage },
  { path: '/product/:id', name: 'ProductDetail', component: DetailPage },
  { 
    path: "/", 
    name: "homePage", 
    component: HomePage, 
    beforeEnter: () => {
      checkAuth();
    }
  },

{ path: "/cart", name: "CartPage", component: CartPage,

beforeEnter: (to, from, next) => {
checkAuth() ? next() : next({ name: "login" });
    },
},

{ path: "/wishlist", name: "FavoritePage", component: FavoritePage,

beforeEnter: (to, from, next) => {
checkAuth() ? next() : next({ name: "login" });
    },
},

{ path: "/order-confirmation", name: "OrderConfirmationPage", component: OrderConfirmationPage,

beforeEnter: (to, from, next) => {
checkAuth() ? next() : next({ name: "login" });
    },
},

{ path: "/user/:component", name: "userPage", component: UserPage, beforeEnter: (to, from, next) => {
    checkAuth() ? next() : next({ name: "login" });
}},
]