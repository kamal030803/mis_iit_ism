import { AES } from 'crypto-js';
import CryptoJS from 'crypto-js';

function isBase64(encodedString) {
    var regexBase64 = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    return regexBase64.test(encodedString);   // return TRUE if its base64 string.
}
export function base64Encode(text) {
    const base64data = Buffer.from(text).toString('base64');
    return base64data;
};

export function encodeFormData(str) {
    var encoded = "";
    str = btoa(str);
    str = btoa(str);
    for (let i = 0; i < str.length; i++) {
        var a = str.charCodeAt(i);
        var b = a ^ 10; // bitwise XOR with any number, e.g. 123
        encoded = encoded + String.fromCharCode(b);
    }
    encoded = btoa(encoded);
    return encoded;
}

export function base64Decode(text) {
    const base64data = Buffer.from(text, 'base64').toString();
    return base64data;
};

export function encrypt(text) {
    // console.log(text)
    const Secret = "abhi@mis";
    const res = CryptoJS.AES.encrypt(text, Secret).toString()
    //  console.log(res)
    return res;
};

export function decrypt(text) {
    const Secret = "abhi@mis";
    //   console.log(text)
    const finalText = text.trim().replace(/ /g, "+");
    // console.log(finalText)
    const res = CryptoJS.AES.decrypt(finalText, Secret).toString(CryptoJS.enc.Utf8);
    return res;
};


export default isBase64;