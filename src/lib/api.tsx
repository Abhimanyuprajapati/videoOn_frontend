import { axiosInstance } from "./axios";

interface SignUpPayload {
  fullName: string;
  email: string;
  password: string;
}

interface SignInPayload {
  email: string;
  password: string;
}

interface OnboardingPayload {
  fullName: string;
  bio: string;
  nativeLanguage: string;
  learningLanguage: string;
  location: string;
  profilePicture?: File | null;
}

export const SignUpAPI = async (data: SignUpPayload): Promise<any> => {
  const response = await axiosInstance.post("/auth/signup", data);
  return response;
};


export const SignInAPI = async (data: SignInPayload): Promise<any> => {
  const response = await axiosInstance.post("/auth/login", data);
  return response;
};

export const OnboardingAPI = async (data: OnboardingPayload): Promise<any> => {
  const response = await axiosInstance.post("/auth/onboarding", data);
  return response;
};

export const LogoutAPI = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response;
};

export const getAuthUser = async () => {
    try {
       const response = await axiosInstance.get('/auth/me');
    return response.data;
    } catch (error) {
      return null;
    }
}

export const getRecommendedUser = async () => {
       const response = await axiosInstance.get('/users');
    return response.data;
}

export const getUserFriends = async () => {
       const response = await axiosInstance.get('/users/friends');
    return response.data;
}

export const getOutGoingFriendRequests = async () => {
       const response = await axiosInstance.get('/users/outgoing-friend-requests');
    return response.data;
}

export const sendFriendRequest = async (userId: string) => {
  const response = await axiosInstance.post(`/users/friend-request/${userId}`);
  return response.data;
}

export const getFriendRequest = async () => {
  const response = await axiosInstance.get('/users/friend-requests');
  return response.data;
}

export const AcceptFriendRequest = async (requestId: string) => {
  const response = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
  return response.data;
}

export const getStreamToken = async () => {
  const response = await axiosInstance.get('/chat/token');
  return response.data;
}