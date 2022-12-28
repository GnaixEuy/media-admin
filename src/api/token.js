import { get, post } from './request.js';

export const createToken = (username, password) => {
  var form = new FormData();
  form.append('username', username);
  form.append('password', password);
  form.append('client_id', 'c1');
  form.append('client_secret', 'secret');
  form.append('grant_type', 'password');
  return post('/uaa/oauth/token', form);
};
