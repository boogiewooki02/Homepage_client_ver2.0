import { authInstance } from '@/api/auth/axios';

export const getPresignedUrl = async (imageName: string) => {
  const res = await authInstance.post('/image/presigned-url', { imageName });

  const presignedUrl = res.data;
  return {
    presignedUrl,
    imageUrl: presignedUrl.split('?')[0],
  };
};
