// data/endpoints.ts
export const ENDPOINTS = {
    POSTS: {
      BASE: '/posts',
      BY_ID: (id: number) => `/posts/${id}`,
      BY_USER_ID: (userId: number) => `/posts?userId=${userId}`,
      COMMENTS: (postId: number) => `/posts/${postId}/comments`,
    },
    USERS: {
      BASE: '/users',
      BY_ID: (id: number) => `/users/${id}`,
      POSTS: (userId: number) => `/users/${userId}/posts`,
      TODOS: (userId: number) => `/users/${userId}/todos`,
      ALBUMS: (userId: number) => `/users/${userId}/albums`,
    },
    COMMENTS: {
      BASE: '/comments',
      BY_ID: (id: number) => `/comments/${id}`,
      BY_POST_ID: (postId: number) => `/comments?postId=${postId}`,
    },
    TODOS: {
      BASE: '/todos',
      BY_ID: (id: number) => `/todos/${id}`,
      BY_USER_ID: (userId: number) => `/todos?userId=${userId}`,
    },
    ALBUMS: {
      BASE: '/albums',
      BY_ID: (id: number) => `/albums/${id}`,
      BY_USER_ID: (userId: number) => `/albums?userId=${userId}`,
      PHOTOS: (albumId: number) => `/albums/${albumId}/photos`,
    },
    PHOTOS: {
      BASE: '/photos',
      BY_ID: (id: number) => `/photos/${id}`,
      BY_ALBUM_ID: (albumId: number) => `/photos?albumId=${albumId}`,
    }
  } as const;