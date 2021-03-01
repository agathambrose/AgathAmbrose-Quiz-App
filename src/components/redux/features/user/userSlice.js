import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthKey from "../../../utils/setAuthKey";
import history from "../../../utils/history";
import toast from "react-hot-toast";

export const registerUser = createAsyncThunk("user/registerUser", (user) => {
  axios
    .post("https://hasquiz-api.herokuapp.com/api/auth/register", user)
    .then(function (response) {
      console.log({ ...response });
      console.log(response.data.message);
      if (response.status === 201) {
        toast.success("Registration Successful! Kindly Login");
        history.push("/login");
      }
    })
    .catch(function (error) {
      console.log({ ...error });
      console.log(error.response);
      if (error.response && error.response.status === 401) {
        toast.error("OOPs! Sure you don't have an account? Try again");
      }
    });
});

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://hasquiz-api.herokuapp.com/api/auth/login",
        data
      );
      //   .then(function (response) {
      console.log(response);
      const token = response.data.data.accessToken;
      localStorage.setItem("jwtToken", token);
      setAuthKey(token);
      const { role } = response.data.data.user;
      localStorage.setItem("role", role);
      console.log(response.data.message);
      if (role === "Admin") {
        history.push("/admin-landing-page");
      }
      if (role === "User") {
        history.push("/quiz-landing-page");
      }
    } catch (error) {
      console.log({ ...error });
      console.log(error);
      if (error.status === 401) {
        toast.error("OOPs! Sure you have an account? Try again");
      }
      if (!error.response) throw error;
      return rejectWithValue(error.response.data);
    }
    //   })
    //   .catch(function (error) {
    //       console.log({...error})
    //     console.log(error);
    //     if (error.status === 401){
    //         toast.error('OOPs! Sure you have an account? Try again')
    //     }
    //   });
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    authSuccessful: false,
    role: "",
    loading: false,
  },
  reducers: {
    setCurrentUser(state, action) {
      if (action.payload) {
        state.authSuccessful = true;
      } else {
        state.authSuccessful = false;
      }
      state.role = action.payload;
    },
    logoutCurrentUser(state) {
      state.authSuccessful = false;
      state.role = "";
    },
  },

  extraReducers: {
    [registerUser.pending]: (state) => {
      state.loading = true;
    },
    [registerUser.fulfilled]: (state) => {
      state.loading = false;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.authSuccessful = true;
    },
    [loginUser.rejected]: (state, action) => {
      state.authSuccessful = false;
    },
  },
});

export const logUserout = () => (dispatch) => {
  localStorage.clear();
  setAuthKey("");
  dispatch(logoutCurrentUser());
  history.push("/login");
};

export const { setCurrentUser, logoutCurrentUser } = userSlice.actions;
export default userSlice.reducer;
