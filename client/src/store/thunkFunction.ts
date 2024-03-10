import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../utils/axios";

export interface IRegisterInfo {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ILoginInfo {
  email: string;
  password: string;
}

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData: IRegisterInfo, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/users/register`, userData);
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data || err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData: ILoginInfo, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/users/login`, userData);
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.resonse.data || err.message);
    }
  }
);

export const authUser = createAsyncThunk(
  "user/authUser",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/users/auth`);
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.resonse.data || err.message);
    }
  }
);
