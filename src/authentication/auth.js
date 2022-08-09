// @flow
 /* eslint-disable */
// #region imports
import cookies from 'react-cookies'

const TOKEN_KEY = 'Token';
const APP_PERSIST_STORES_TYPES = [
  'cacheStorage',
  'localStorage',
  'sessionStorage',
];

const {parse} = JSON;
const {stringify} = JSON;


export const auth = {
  // /////////////////////////////////////////////////////////////
  // TOKEN
  // /////////////////////////////////////////////////////////////

  /**
   * get token from localstorage
   *
   * @param {'localStorage' | 'sessionStorage'} [fromStorage='localStorage'] specify storage
   * @param {any} [tokenKey=TOKEN_KEY]  optionnal parameter to specify a token key
   * @returns {string} token value
   */
  getToken() {
    return getStorage(TOKEN_KEY, APP_PERSIST_STORES_TYPES[0])
  },
  setToken(token) {
    return setStorage(token,TOKEN_KEY, APP_PERSIST_STORES_TYPES[0])
  },
  
  /**
   * set the token value into localstorage (managed by localforage)
   *
   * @param {string} [value=''] token value
   * @param {'localStorage' | 'sessionStorage'} [toStorage='localStorage'] specify storage
   * @param {any} [tokenKey='token'] token key
   * @returns {boolean} success/failure flag
   */
  

  clearStorage(callback) {
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).indexOf(DASHBOARD_KEY) === -1 && localStorage.key(i).indexOf(AVATAR_KEY) === -1) {
        localStorage.removeItem(localStorage.key(i));
        i -= 1;
      }
    }
    cookies.remove(TOKEN_KEY, { path: '/' });
    cookies.remove(LOGIN_TRY_KEY, { path: '/' });
    if (callback) {
      callback(true)
    }
  },
  clearLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).indexOf(DASHBOARD_KEY) === -1 && localStorage.key(i).indexOf(AVATAR_KEY) === -1) {
        localStorage.removeItem(localStorage.key(i));
        i -= 1;
      }
    }
  },  
  clearAllAppStorage() {
    if (localStorage) {
      localStorage.clear();
    }
    if (sessionStorage) {
      sessionStorage.clear();
    }
    cookies.remove(TOKEN_KEY, { path: "/" })
 
  },
};

function setStorage(values, key, toStorage = APP_PERSIST_STORES_TYPES[1]) {
  if (toStorage === APP_PERSIST_STORES_TYPES[0]) {
    cookies.remove(key, { path: "/" })
    cookies.save(key, values, { path: "/" });
  }
 else if (toStorage === APP_PERSIST_STORES_TYPES[1]) {
    localStorage.setItem(key, values)
  }
 else {
    sessionStorage.setItem(key, values)
  }
}

function getStorage(key, toStorage = APP_PERSIST_STORES_TYPES[1]) {
  if (toStorage === APP_PERSIST_STORES_TYPES[0]) {
    if (cookies.load(key, { path: '/' })) {
      return cookies.load(key, { path: '/' });
    } 
      return null;
    
  } if (toStorage === APP_PERSIST_STORES_TYPES[1]) {
    return localStorage.getItem(key)
  } 
    return sessionStorage.getItem(key)
  
}

function clearStorage(key, toStorage = APP_PERSIST_STORES_TYPES[0]) {
  if (toStorage === APP_PERSIST_STORES_TYPES[0]) {
    return cookie.remove(key)
  } if (toStorage === APP_PERSIST_STORES_TYPES[1]) {
    return localStorage.removeItem(key);
  } 
    return sessionStorage.removeItem(key)
  
}

export default auth;