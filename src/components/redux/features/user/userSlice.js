import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const registerUser = createAsyncThunk('users/registerUser',  (user) => {
    axios.post('https://hasquiz-api.herokuapp.com/api/auth/register', user)
      .then(function (response) {
        console.log(response.data.message);
        alert ('Registration Successful!')
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        authSuccessful: false,
        role: ''
    },
    reducers: {
        setCurrentUser(state, action){
            if (action.payload) {
                state.authSuccessful = true;
            }   else{
                state.authSuccessful = false;
            }
            state.role = action.payload
        }
    },   extraReducers: {   
           [registerUser.fulfilled]: (state, action) => {          
                state.authSuccessful = true;    
            }
          }
})

export const register = (user) => async () => {
    try {
        const respns = await axios.post(
            'https://hasquiz-api.herokuapp.com/api/auth/register', user
        );
        if (respns.data.message === 'User successfully registered')
        return {message: respns.data.message};
    }   catch (error){
        if (error.response.data.email.length > 0){
            return {error: error.response.data.email[0]};
        }
    }
};



export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;