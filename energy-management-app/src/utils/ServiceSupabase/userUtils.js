// utils/userUtils.js
export const getDisplayName = (user) => {
  return (
    user.user_metadata?.full_name || // Untuk OAuth
    user.user_metadata?.displayName || // Untuk Email/Password
    user.email // Fallback
  );
};
