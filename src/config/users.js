import CryptoJS from 'crypto-js';

const SECRET_KEY = 'your-secret-key-2024'; // You can change this key

export const users = {
    boyfriend: {
        username: "boyfriend",
        password: CryptoJS.AES.encrypt("love123", SECRET_KEY).toString(),
        role: "fulfiller"
    },
    girlfriend: {
        username: "girlfriend",
        password: CryptoJS.AES.encrypt("wish123", SECRET_KEY).toString(),
        role: "wisher"
    }
};

export const decryptPassword = (encryptedPassword) => {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
};
