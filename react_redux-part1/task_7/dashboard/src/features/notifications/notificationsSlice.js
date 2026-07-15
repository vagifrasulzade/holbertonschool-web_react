import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLatestNotification } from '../../utils/utils';

const API_BASE_URL = 'http://localhost:5173';

const initialState = {
  notifications: [],
  displayDrawer: true
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
    showDrawer: function(state) {
      state.displayDrawer = true;
    },
    hideDrawer: function(state) {
      state.displayDrawer = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, function (state, action) {
      state.notifications = action.payload
    });
  }
})

export default notificationsSlice.reducer;
export const { markNotificationAsRead, showDrawer, hideDrawer } = notificationsSlice.actions;
export { fetchNotifications };
