import axiosInstance from './axiosInstance';

// Function to register a user
export const registerUser = async (data) => {
  try {
    const response = await axiosInstance.post('/api/register', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to send email verification code
export const sendEmailVerification = async (email) => {
  try {
    const response = await axiosInstance.post('/emailSend', { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to confirm email verification code
export const confirmEmailVerification = async (email, code) => {
  try {
    const response = await axiosInstance.post('/emailConfirm', { email, code });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to update user information
export const updateUserInfo = async (formData) => {
  try {
    const response = await axiosInstance.post('/api/update', formData);
    return response.data;
  } catch (error) {
    console.error('Error updating user info:', error);
    throw error;
  }
};

// Function to update user information
export const SocialupdateUserInfo = async (formData) => {
  try {
    const response = await axiosInstance.post('/api/socialupdate', formData);
    return response.data;
  } catch (error) {
    console.error('Error updating user info:', error);
    throw error;
  }
}