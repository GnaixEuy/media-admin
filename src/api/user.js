import { get, post, put, instance } from './request';

const search = (paging) => {
  return get('/user', { params: paging });
};

const me = () => {
  return get('/user/me');
};

const create = (user) => {
  return post('/user', user);
};

const lock = (id) => {
  return put(`/user/lock/${id}`);
};

const remove = (id) => {
  return instance.delete(`/user/delete/${id}`, {});
};

const getUserInfoBySearch = (type, params) => {
  if (!type) {
    type = 'all';
  }
  return get(`/user/search/${type}/${params}`);
};

export default {
  create,
  me,
  search,
  lock,
  remove,
  getUserInfoBySearch,
};
