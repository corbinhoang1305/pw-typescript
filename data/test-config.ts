// data/test-config.ts
export const TEST_CONFIG = {
    DEFAULT_TIMEOUT: 30000,
    RETRY_COUNT: 2,
    PARALLEL_WORKERS: 4,
    
    // Test data limits
    MAX_POSTS_COUNT: 100,
    MAX_USERS_COUNT: 10,
    MAX_COMMENTS_PER_POST: 5,
    
    // Validation rules
    VALIDATION: {
      EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      MIN_POST_TITLE_LENGTH: 1,
      MAX_POST_TITLE_LENGTH: 255,
      MIN_POST_BODY_LENGTH: 1,
      MAX_POST_BODY_LENGTH: 1000,
    },
    
    // HTTP Status codes
    STATUS_CODES: {
      OK: 200,
      CREATED: 201,
      NO_CONTENT: 204,
      BAD_REQUEST: 400,
      UNAUTHORIZED: 401,
      FORBIDDEN: 403,
      NOT_FOUND: 404,
      INTERNAL_SERVER_ERROR: 500,
    }
  } as const;