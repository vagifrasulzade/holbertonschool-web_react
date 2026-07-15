import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLatestNotification } from '../../utils/utils';

const API_BASE_URL = import.meta.env.BASE_URL;

const initialState = {
  notifications: []
};

const ENDPOINTS = {
  notifications: `${API_BASE_URL}/notifications.json`
};

const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, thunkAPI) => {
    try {
      const response = await (await fetch(ENDPOINTS.notifications)).json();

      const data = Array.isArray(response) ? response : [];
      const transformedResponse = data.map((element) => {
        if (element.id === 3) {
          return { ...element, html: getLatestNotification() };
        } else {
          return element;
        }
      })
      return transformedResponse;
    }
    catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markNotificationAsRead: function(state, action) {
      state.notifications = state.notifications.filter(item => item.id !== action.payload);
      console.log(`Notification ${action.payload} has been marked as read`);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, function (state, action) {
      state.notifications = action.payload
    });
  }
})

export default notificationsSlice.reducer;
export const { markNotificationAsRead } = notificationsSlice.actions;
export { fetchNotifications };
