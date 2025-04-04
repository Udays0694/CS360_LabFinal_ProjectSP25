import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Your backend server URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch products from the backend
export const fetchProducts = async () => {
  try {
    const response = await axiosInstance.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/auth/register', userData); // ✅ Fixed Endpoint
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Login user and return token (from backend route)
export const loginUser = async (loginData) => {
  try {
    const response = await axiosInstance.post('/auth/login', loginData); // Correct backend login route

    // Store the token in localStorage if login is successful
    const token = response.data.token; // Assuming the token is returned as part of the response data
    if (token) {
      localStorage.setItem('token', token); // Store token in localStorage
    }

    return response.data; // You can return any additional data, like user info if included
  } catch (error) {
    console.error('Error logging in:', error);
    throw error; // Re-throw the error to be handled by the calling component
  }
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem('authToken'); // Remove token from localStorage
};

// ✅ Fetch User Profile (GET /users/profile)
export const getUserProfile = async (token) => {
  try {
    const response = await axiosInstance.get('/users/profile', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// ✅ Update User Profile (PUT /users/profile)
export const updateUserProfile = async (token, updatedProfile) => {
  try {
    const response = await axiosInstance.put('/users/profile', updatedProfile, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export default axiosInstance;
