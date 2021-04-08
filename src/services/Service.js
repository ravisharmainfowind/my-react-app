import { API_BASE_URL,ACCESS_TOKEN_NAME } from '../constants/apiConstants';
 const BASE_URL = 'http://localhost:8000/';


const Service = {
    get: (param) => {

        let header = {
            "content-type": "application/json",
            "accept": "application/json"
        };

        let token_base64 = localStorage.getItem(ACCESS_TOKEN_NAME);
        if(token_base64.length > 5 || token_base64!=null || token_base64!=undefined ) {
        let token = atob(token_base64);
          if(token) {
            header["x-access-token"] = token;
            header['Authorization'] = `Bearer ${token}`;
         }
        }

        return fetch(BASE_URL + param.url, {
            method: "GET",
            headers: header
        })
        .then(
            response => response.json(),
            error => {
                throw new Error(error)
            }
        );
    },
    post: (param) => {
            let header = {
                "content-type": "application/json",
                "accept": "application/json"
            };
    
            let token_base64= localStorage.getItem(ACCESS_TOKEN_NAME);
            if(token_base64.length > 5 || token_base64!=null || token_base64!=undefined ) {
            let token = atob(token_base64);
              if(token) {
                header["x-access-token"] = token;
                header['Authorization'] = `Bearer ${token}`;
             }
           }
        
        return fetch(BASE_URL + param.url, {
            method: "POST",
            headers: header,
            //headers:param.header,
            body: param.body
        })
        .then(response => response.json())
    },

    put: (param) => {
        let header = {
            "content-type": "application/json",
            "accept": "application/json"
        };

        let token_base64= localStorage.getItem(ACCESS_TOKEN_NAME);
        if(token_base64.length > 5 || token_base64!=null || token_base64!=undefined ) {
        let token = atob(token_base64);
          if(token) {
            header["x-access-token"] = token;
            header['Authorization'] = `Bearer ${token}`;
         }
        }

        return fetch(BASE_URL + param.url, {
            method: "PUT",
            headers: header,
            //headers:param.header,
            body: param.body
        })
        .then(response => response.json())
    },

    delete: (param) => {

        let header = {
            "content-type": "application/json",
            "accept": "application/json"
        };
        
        let token_base64= localStorage.getItem(ACCESS_TOKEN_NAME);
        if(token_base64.length > 5 || token_base64!=null || token_base64!=undefined ) {
        let token = atob(token_base64);
          if(token) {
            header["x-access-token"] = token;
            header['Authorization'] = `Bearer ${token}`;
         }
        }

        return fetch(BASE_URL + param.url, {
            method: "DELETE",
            headers: header
        })
        .then(
            response => response.json(),
            error => {
                throw new Error(error)
            }
        );
    },

    getImage(image) {
        return BASE_URL + '/' + image;
    }
};

const Storage = {
    isLogedin: (param) => {  
        return localStorage.getItem('token') !== null;
    },
    set: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    get: (key, value) => {
        return JSON.parse(localStorage.getItem(key));
    },
    setString: (key, value) => {
        localStorage.setItem(key, value);
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('auth');
    }
};

export {Service, Storage};
