import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getQuiz = createAsyncThunk("quiz/getQuiz", async () => {
  try {
    const response = await axios.get(
      "https://hasquiz-api.herokuapp.com/api/quiz"
    );
    console.log(response);
    const { data } = response.data;
    return data[0];
  } catch (e) {
    console.log({ ...e });
  }
});

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    quizInfo: {},
    loading: true,
    errors: false,
  },
  reducers: {},
  extraReducers: {
    [getQuiz.pending]: (state) => {
      state.loading = true;
    },
    [getQuiz.fulfilled]: (state, { payload: quizInfo }) => {
      state.quizInfo = quizInfo;
      state.loading = false;
      state.errors = false;
    },
  },
});

export default quizSlice.reducer;
