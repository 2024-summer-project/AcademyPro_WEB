import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';

export const useCheckDuplicate = () =>
  useMutation({
    mutationFn: async (userId) => {
      const response = await axiosInstance.get(`${PATH_API.CHECK_DUP}/${userId}`);
      return response.data;
    },
  });

export const useSignup = () =>
  useMutation({
    mutationFn: async (payload) => {
      const response = await axiosInstance.post(PATH_API.SIGN_UP, payload);
      return response.data;
    },
  });
