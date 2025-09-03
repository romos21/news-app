import { createSlice } from '@reduxjs/toolkit';
import { postsApi } from '../../api';
import { POSTS_REDUCER_PATH, initialPostState } from './constants';
import { PostUpdateAction } from '@/entities/post';
import { setDislike, setLike, setStarred } from './lib';

export const postsSlice = createSlice({
  name: POSTS_REDUCER_PATH,
  initialState: initialPostState,
  reducers: {
    setLike: (state, action) => ({
      ...state,
      disliked: state.disliked.filter((id) => id !== action.payload),
      liked: [...state.liked, action.payload],
    }),
    unsetLike: (state, action) => ({
      ...state,
      liked: state.liked.filter((id) => id !== action.payload),
    }),
    setDislike: (state, action) => ({
      ...state,
      liked: state.liked.filter((id) => id !== action.payload),
      disliked: [...state.disliked, action.payload],
    }),
    unsetDislike: (state, action) => ({
      ...state,
      disliked: state.disliked.filter((id) => id !== action.payload),
    }),
    setStarred: (state, action) => ({
      ...state,
      starred: [...state.starred, action.payload],
    }),
    unsetStarred: (state, action) => ({
      ...state,
      starred: state.starred.filter((id) => id !== action.payload),
    }),
  },
  extraReducers: (builder) => {
    builder.addMatcher(postsApi.endpoints.updatePost.matchFulfilled, (state, action) => {
      const updateActionType = action.meta.arg.originalArgs.action;
      switch (updateActionType) {
        case PostUpdateAction.LIKE:
          return setLike(state, action.payload.id);
        case PostUpdateAction.DISLIKE:
          return setDislike(state, action.payload.id);
        case PostUpdateAction.STARRED:
          return setStarred(state, action.payload.id);
        default:
          return state;
      }
    });
  },
});

export const {
  setLike: setPostLikeAction,
  setDislike: setPostDislikeAction,
  setStarred: setPostStarredAction,
  unsetLike: unsetPostLikeAction,
  unsetDislike: unsetPostDislikeAction,
  unsetStarred: unsetPostStarredAction,
} = postsSlice.actions;
