import axios from 'axios';

const baseURL = `https://identitytoolkit.googleapis.com/v1/accounts:`;
const apiKey = 'AIzaSyAY8A_SrPKbDVsTOHgUaQ1AuYElm4qPwoU';

export const authApi = {
  authenticate(mode, email, password) {
    return axios.post(`${baseURL}${mode}?key=${apiKey}`, {
      email: email,
      password: password,
      returnSecureToken: true,
    });
  },
  createUser(email, password) {
    return this.authenticate('signUp', email, password);
  },
  login(email, password) {
    return this.authenticate(`signInWithPassword`, email, password);
  },
};
