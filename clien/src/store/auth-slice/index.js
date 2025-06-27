import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  token: null
};

// export const registerUser=createAsyncThunk('auth/register',async (FormData)=>{
//     const response=await axios.post('https://fully-functional-e-commerce-website.onrender.com/api/auth/register',FormData,{
//         withCredentials : true
//     })
//     return response.data
// })


export const registerUser = createAsyncThunk(
  'auth/register',
  async (FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://fully-functional-e-commerce-website.onrender.com/api/auth/register', FormData, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      // Agar backend ne response diya (status 400/500), usme se data extract karo
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        // Agar backend response nahi mila (network error)
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://fully-functional-e-commerce-website.onrender.com/api/auth/login', FormData, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      // Agar backend ne response diya (status 400/500), usme se data extract karo
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        // Agar backend response nahi mila (network error)
        return rejectWithValue({ message: error.message });
      }
    }
  }
);


export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://fully-functional-e-commerce-website.onrender.com/api/auth/logout',{}, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      // Agar backend ne response diya (status 400/500), usme se data extract karo
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        // Agar backend response nahi mila (network error)
        return rejectWithValue({ message: error.message });
      }
    }
  }
);



export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, {rejectWithValue }) => {
    try {
      const response = await axios.get('https://fully-functional-e-commerce-website.onrender.com/api/auth/check-auth', {
        withCredentials: true,
        headers :{
          'Catch-Control' : 'no-store , no-catch, must-revalidate , proxy-revalidate',
          // Expires : '0'
          

        }
      });
      return response.data;
    } catch (error) {
      // Agar backend ne response diya (status 400/500), usme se data extract karo
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        // Agar backend response nahi mila (network error)
        return rejectWithValue({ message: error.message });
      }
    }
  }
);



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
extraReducers: (builder) => {
  builder
    .addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.user = null;
      state.isLoading = false;
      state.isAuthenticated = false;
    }).addCase(registerUser.rejected, (state, action) => {
      state.user = null;
      state.isLoading = false;
      state.isAuthenticated = false;
    }).addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action)
      state.user = action.payload.user;
      state.isLoading = false;
      state.isAuthenticated = true;
    }).addCase(loginUser.rejected, (state, action) => {
      state.user = null;
      state.isLoading = false;
      state.isAuthenticated = false;
    }).addCase(checkAuth.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(checkAuth.fulfilled, (state, action) => {
        console.log(action)
      state.user = action.payload.user;
      state.isLoading = false;
      state.isAuthenticated = true;
    }).addCase(checkAuth.rejected, (state, action) => {
      state.user = null;
      state.isLoading = false;
      state.isAuthenticated = false;
    }).addCase(logoutUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(logoutUser.fulfilled, (state, action) => {
        console.log(action)
      state.user = null;
      state.isLoading = false;
      state.isAuthenticated = false;
    }).addCase(logoutUser.rejected, (state, action) => {
      state.user = null;
      state.isLoading = false;
      state.isAuthenticated = false;
    });
}
});

export const { login, logout  } = authSlice.actions;
export default authSlice.reducer;