import { get, post, put, instance } from './request';

const getVideoListPage = (paging) => {
  return get('/feed/admin/page', { params: paging });
};

const lock = (id) => {
  return put(`/feed/admin/lock/${id}`);
};

const remove = (id) => {
  return instance.delete(`/feed/admin/delete/${id}`, {});
};

const getLikeThePeopleList = (id) => {
  return get(`/like/feed/likeThePeopleListByFeedId/${id}`);
};

const search = (type, input) => {
  return get(`/feed/admin/search/${type}/${input}`);
};

const getCommentsByVideoId = (id) => {
  return get(`/comment/getCommentList/${id}`);
};

export default {
  getVideoListPage,
  lock,
  remove,
  getLikeThePeopleList,
  search,
  getCommentsByVideoId,
};