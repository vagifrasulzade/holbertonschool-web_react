import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { logout } from '../auth/authSlice';

const API_BASE_URL = import.meta.env.BASE_URL;

const initialState = {
  courses: []
};

const ENDPOINTS = {
  courses: `${API_BASE_URL}/courses.json`
};

const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (_, thunkAPI) => {
    try {
      const response = await (await fetch(ENDPOINTS.courses)).json();

      const data = Array.isArray(response) ? response : [];
      return data;
    }
    catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCourses.fulfilled, function (state, action) {
      state.courses = action.payload;
    });
    builder.addCase(logout, function (state, action) {
      state.courses = initialState.courses;
    });
  }
})

export default coursesSlice.reducer;
export { fetchCourses };
