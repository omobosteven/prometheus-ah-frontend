import axios from 'axios';
import toastr from 'toastr';
import {
  CREATE_FOLLOW_RELATIONSHIP,
  DELETE_FOLLOW_RELATIONSHIP,
  GET_ALL_FOLLOWERS,
  GET_ALL_FOLLOWING,
  FOLLOW_ERRORS,

} from './types';
import config from '../config';

export const followUser = message => ({
  type: CREATE_FOLLOW_RELATIONSHIP,
  message
});

export const unfollowUser = message => ({
  type: DELETE_FOLLOW_RELATIONSHIP,
  message
});

export const myFollowers = data => ({
  type: GET_ALL_FOLLOWERS,
  data
});

export const myFollowing = data => ({
  type: GET_ALL_FOLLOWING,
  data
});

export const followErrors = error => ({
  type: FOLLOW_ERRORS,
  error
});

export const getMyFollowersActions = username => dispatch => axios.get(
  `${config.apiUrl}/profiles/${username}/followers`
)
  .then((response) => {
    console.log(response, 'meeeee!!!!!');
    dispatch(myFollowers(response.data));
  }).catch((error) => {
    dispatch(followErrors(error.response.data));
    const { message } = error.response.data;
    toastr.error(message);
  });

export const getMyFollowingActions = username => dispatch => axios.get(
  `${config.apiUrl}/profiles/${username}/following`
)
  .then((response) => {
    console.log(response, 'meeeee!!!!!');
    dispatch(myFollowing(response.data));
  }).catch((error) => {
    dispatch(followErrors(error.response.data));
    const { message } = error.response.data;
    toastr.error(message);
  });


export const followUserAction = (username, user) => dispatch => axios.post(
  `${config.apiUrl}/profiles/${username}/follow`
).then((response) => {
  console.log(response.data.message, 'meeeee!!!!!');
  const { message } = response.data;
  if (response.status === 200) {
    dispatch(followUser(response.data.message));
    dispatch(getMyFollowersActions(user));
    dispatch(getMyFollowingActions(user));
    toastr.success(message);
  }
}).catch((error) => {
  dispatch(followErrors(error.response.data));
  const { message } = error.response.data;
  toastr.error(message);
});

export const unfollowUserAction = (username, user) => dispatch => axios.delete(
  `${config.apiUrl}/profiles/${username}/unfollow`
).then((response) => {
  const { message } = response.data;
  if (response.status === 200) {
    dispatch(unfollowUser(response.data.message));
    dispatch(getMyFollowersActions(user));
    dispatch(getMyFollowingActions(user));
    toastr.success(message);
  }
}).catch((error) => {
  dispatch(followErrors(error.response.data));
  const { message } = error.response.data;
  toastr.error(message);
});