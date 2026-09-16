import axios from "axios";
import Cookies from "js-cookie";

export default {
    namespaced: true,
    state() {
        return {
            token: null,
            tokenExpirationDate: null,
            userLogin: {},
            isLogin: false,
        }
    },
    getters:{
         userLogin: (state) => state.userLogin,
    },
    mutations: {
        setToken(state, { idToken, expiresIn }) {
            state.token = idToken;
            state.tokenExpirationDate = expiresIn;
            Cookies.set("tokenExpirationDate", expiresIn);
            Cookies.set("jwt", idToken);
        },
        setUserLogin(state, { userData, loginStatus }) {
            state.userLogin = userData;
            state.isLogin = loginStatus;
        },
        setUserLogout(state) {
            state.token = null;
            state.userLogin = {};
            state.isLogin = false;
            state.tokenExpirationDate = null;
            Cookies.remove("jwt");
            Cookies.remove("tokenExpirationDate");
            Cookies.remove("UID");
        }
    },
    actions: {
        async getRegisterData({ commit, dispatch }, payload) {
            const APIkey = "AIzaSyAW5lEI9H1sFI--yztA58nDVl0asKjRLq8";
            const authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
            try {
                const { data } = await axios.post(authUrl + APIkey, {
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true,
                });

                commit("setToken", {
                    idToken: data.idToken,
                    expiresIn: new Date().getTime() + Number.parseInt(data.expiresIn) * 1000
                })

                const newUserData = {
                    userId: data.localId, 
                    fullname: payload.fullname,
                    username: payload.username,
                    email: payload.email, 
                    imageLink: payload.imageLink,
                };

                Cookies.set("UID", newUserData.userId);
                await dispatch("addNewUser", newUserData);
            } catch (err) {
                console.log(err);
            }
        },

        async addNewUser({ commit, state }, payload) {
            try {
                const { data } = await axios.post(
                    `https://finale-55d48-default-rtdb.firebaseio.com/user.json?auth=${state.token}`, 
                    payload
                );
                commit("setUserLogin", { 
                    userData: { ...payload, firebaseKey: data.name }, 
                    loginStatus: true
                });
            } catch (err) {
                console.log(err);
            }
        },

        async getLoginData({ commit, dispatch }, payload) {
            const APIkey = "AIzaSyAW5lEI9H1sFI--yztA58nDVl0asKjRLq8";
            const authURL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
            try {
                const { data } = await axios.post(authURL + APIkey, {
                    email: payload.email, 
                    password: payload.password, 
                    returnSecureToken: true,
                });

                commit("setToken", {
                    idToken: data.idToken,
                    expiresIn: new Date().getTime() + Number.parseInt(data.expiresIn) * 1000
                });

                await dispatch("getUser", data.localId);
            } catch (err) {
                console.log(err);
            }
        },

        async getUser({ commit }, payload) {
            try {
                const { data } = await axios.get(
                    `https://finale-55d48-default-rtdb.firebaseio.com/user.json`
                );
                
                for (let key in data) {
                    if (data[key].userId === payload) { 
                        Cookies.set("UID", data[key].userId);
                        commit("setUserLogin", {
                            userData: { ...data[key], firebaseKey: key }, 
                            loginStatus: true
                        });
                    }
                }
            } catch (err) {
                console.log(err);
            }
        },

        async updateUser({ dispatch, rootState, state }, payload) {
            try {
                const authToken = state.token || rootState.auth?.token || Cookies.get("jwt");
                const userId = payload.userId || Cookies.get("UID");

                let keyToUpdate = payload.firebaseKey;
                if (!keyToUpdate) {
                    const { data } = await axios.get(
                        `https://finale-55d48-default-rtdb.firebaseio.com/user.json`
                    );
                    for (let key in data) {
                        if (data[key].userId === userId || (payload.email && data[key].email === payload.email)) {
                            keyToUpdate = key;
                            break;
                        }
                    }
                }

                const dataUpdate = {
                    userId: userId,
                    fullname: payload.fullname || "",
                    username: payload.username || "",
                    email: payload.email || "",
                    imageLink: payload.imageLink || ""
                };

                const url = keyToUpdate 
                    ? `https://finale-55d48-default-rtdb.firebaseio.com/user/${keyToUpdate}.json?auth=${authToken}`
                    : `https://finale-55d48-default-rtdb.firebaseio.com/user/${userId}.json?auth=${authToken}`;

                const { data } = await axios.put(url, dataUpdate);
                console.log("Updated user in Firebase:", data);

                await dispatch("getUser", userId);
                return data;
            } catch (error) {
                console.error("Error updating user:", error);
                throw error;
            }
        },
    }
}