const ErrorMessage = {
  SERVER_HEALTH: 'Server is Up Ready to Rock!',
  SOMETHING_WENT_WRONG: 'Something Went wrong!',
  INVALID_TOKEN: 'Invalid token. Please log in again!',
  TOKEN_EXPIRED: 'Your token has expired! Please log in again.',
  PERMISSION_DENIED: 'You do not have permission to perform this action',
  NOT_LOGGED_IN: 'You are not logged in! Please log in to get access.',
  USER_WITH_TOKEN_NOT_EXIST:
    'The user belonging to this token does no longer exist.',
  UNCAUGHT_EXCEPTION: 'UNCAUGHT EXCEPTION! 💥 Shutting down...',
  UNCAUGHT_REJECTION: 'UNCAUGHT REJECTION! 💥 Shutting down...',
  ALREADY_EXIST: 'Already exist',
};

module.exports = { ErrorMessage };
