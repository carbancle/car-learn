import { createSlice } from "@reduxjs/toolkit";
import { authUser, loginUser, registerUser } from "./thunkFunction";

const initialState = {
  userData: {
    id: "",
    email: "",
  },
  isAuth: false,
  isLoading: false,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action: any) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      // login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isAuth = true;
        localStorage.setItem("accessToken", action.payload.accessToken);
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      //auth
      .addCase(authUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(authUser.rejected, (state, action: any) => {
        localStorage.removeItem("accessToken");
        state.isAuth = false;
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
