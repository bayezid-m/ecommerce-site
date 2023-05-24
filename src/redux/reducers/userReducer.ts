import { act } from "react-dom/test-utils";

import { User } from "../../types/User";
import productsReducer from "./productReducer";
import axios, { AxiosError } from "axios";
import { UserCredential } from "../../types/UserCredential";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: {
  user: User,
  users: User[],
  checkemail: boolean,
  loading: boolean,
  error: string
} = {
  user: {
    id: 0,
    email: '',
    password: '',
    name: '',
    role: "customer",
    avatar: ''
  },
  users: [],
  checkemail: false,
  loading: false,
  error: ""
}
export const fetchAllUser = createAsyncThunk(
  'fetchAllUser',
  async () => {
    try {
      const result = await axios.get<User[]>('https://api.escuelajs.co/api/v1/users');
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
)
export const createSingleUser = createAsyncThunk(
  'createAUser',
  async ({ userData }: { userData: User }) => {
    try {
      const result = await axios.post<User>('https://api.escuelajs.co/api/v1/users/', userData);
      return result.data; // The returned result will be inside action.payload
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);
export const login = createAsyncThunk(
  "login",
  async ({ email, password }: UserCredential, { dispatch }) => {
    try {
      const result = await axios.post<{ access_token: string }>("https://api.escuelajs.co/api/v1/auth/login", { email, password })
      localStorage.setItem("token", result.data.access_token)
      const authentication = await dispatch(authenticate(result.data.access_token))
      return authentication.payload as User
    }
    catch (e) {
      const error = e as AxiosError
      return error
    }
  }
)
export const authenticate = createAsyncThunk(
  "authenticate",
  async (access_token: string) => {
    try {
      const authentication = await axios.get<User>("https://api.escuelajs.co/api/v1/auth/profile", {
        headers: {
          "Authorization": `Bearer ${access_token}`
        }
      })
      return authentication.data
    }
    catch (e) {
      const error = e as AxiosError
      return error
    }
  }
)
export const updateUser = createAsyncThunk(
  'updateUser',
  async ({ userData, userId }: { userData: User, userId: number }) => {
    try {
      const result = await axios.put<User>(`https://api.escuelajs.co/api/v1/users/${userId}`, userData);
      return result.data; // The returned result will be inside action.payload
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchAllUser.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          state.users = action.payload;
        }
        state.loading = false
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          state.user = action.payload
        }
        state.loading = false
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          state.user = action.payload
        }
        state.loading = false
      })
      .addCase(createSingleUser.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          state.user = action.payload;
        }
        state.loading = false
      })
      .addCase(createSingleUser.pending, (state, action) => {
        state.loading = true
      })
      .addCase(createSingleUser.rejected, (state, action) => {
        state.error = "Cannot fetch data"
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          state.user = action.payload;
        }
        state.loading = false
      })
      .addCase(updateUser.pending, (state, action) => {
        state.loading = true
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = "Cannot fetch data"
      })
  }
})

const userReducer = usersSlice.reducer
export default userReducer
