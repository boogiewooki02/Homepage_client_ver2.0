import { authInstance } from '@/api/auth/axios';

export const getUserInfo = async () => {
  const res = await authInstance.get('/user');
  return res.data.result;
};

export const getProfileImage = async () => {
  const res = await authInstance.get('/user/profile');
  return res.data.result.userProfileImageUrl;
};

export const deleteProfileImage = async () => {
  const res = await authInstance.delete('/user/profile');
  return res.data.result.userProfileImageUrl;
};

export const patchProfileImage = async (profileImageUrl: string) => {
  const res = await authInstance.patch('/user/profile', {
    profileImageUrl,
  });
  return res.data.result.userProfileImageUrl;
};
