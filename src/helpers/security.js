import * as SeculeLs from "secure-ls"



// export const LS = new SeculeLs();

export class LS {
    ls = localStorage;
    static get(key) {
        // const ls = new SeculeLs();
        let data = localStorage.getItem(key);
        try {
            return   JSON.parse(data || '');
        }catch (e) {
            return data;
        }

    }
    static set(key, value) {
        // const ls = new SeculeLs();
        localStorage.setItem(key, JSON.stringify(value));
    }
    static remove(key) {
        // const ls = new SeculeLs();
        localStorage.removeItem(key);
    }
    static clear() {
        // const ls = new SeculeLs();
        localStorage.clear();
    }
}