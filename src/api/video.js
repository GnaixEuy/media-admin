import { get, post, put, instance } from './request';

const getVideoListPage = (paging) => {
  return get('vlog', { params: paging });
};

const privat = (id) => {
  return put(`/vlog/privat/${id}`);
};

const remove = (id) => {
  return instance.delete(`/vlog/${id}`, {});
};

const getLikeThePeopleList = (id) => {
  return get(`/like/${id}`);
};

const search = (type, input) => {
  return get(`/vlog/search/${input}`);
};

const getCommentsByVideoId = (id) => {
  return get(`/comment/${id}`);
};

const recommend = (id, statut) => {
  return put(`/feed/admin/recommend/${id}/${statut}`);
};

const deleteComment = (id) => {
  return instance.delete(`/comment/${id}`);
};

const updateVlogRecommendNumber = (id, recommendNumber) => {
  return put(`/vlog/recommend/${id}/${recommendNumber}`);
};

export default {
  getVideoListPage,
  privat,
  remove,
  getLikeThePeopleList,
  search,
  getCommentsByVideoId,
  recommend,
  deleteComment,
  updateVlogRecommendNumber,
};
