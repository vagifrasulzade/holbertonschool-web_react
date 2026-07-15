import { configureStore } from "@reduxjs/toolkit";
import notificationsReducer, { fetchNotifications, markNotificationAsRead, showDrawer, hideDrawer } from "../notifications/notificationsSlice";
import * as utils from '../../utils/utils';

const mockNotifications = [
  {
    "id": 1,
    "type": "default",
    "value": "New course available"
  },
  {
    "id": 2,
    "type": "urgent",
    "value": "New resume available"
  },
  {
    "id": 3,
    "type": "urgent",
    "html": "<strong>Urgent requirement</strong> - complete by EOD"
  }
]

describe('notificationsSlice', () => {
  let store;

  beforeEach (() => {
    store = configureStore({
      reducer: {
        notifications: notificationsReducer
      }
    });
    global.fetch = jest.fn();
  });

  afterEach (() => {
    jest.restoreAllMocks();
  });

  test('Vérification de la valeur par défaut du state', () => {
    const state = notificationsReducer(undefined, {});
    expect(state.notifications).toEqual([]);
    expect(state.displayDrawer).toBe(true);
  });

  test('Vérification de le fetch fonctionne correctement', async () => {
    // Simulation du fetch
    const getNotificationSpy = jest.spyOn(utils, 'getLatestNotification').mockReturnValue(`<strong>Urgent requirement</strong> - complete by EOD`)
    const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockNotifications)
    });
    // Dispatch du thunk
    await store.dispatch(fetchNotifications());

    // Récupération de l'état et du tableau attendu
    const state = store.getState().notifications;
    const expectedNotifications = mockNotifications.map((element) => {
      if (element.id === 3) {
        return { ...element, html: `<strong>Urgent requirement</strong> - complete by EOD` };
      }
      return element;
    });

    expect(state.notifications).toEqual(expectedNotifications);
    expect(state.displayDrawer).toBe(true);
  });

  test("Vérification de l'appel à markNotificationAsRead fonctionne correctement", async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    // Simulation du fetch
    const getNotificationSpy = jest.spyOn(utils, 'getLatestNotification').mockReturnValue(`<strong>Urgent requirement</strong> - complete by EOD`)
    const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockNotifications)
    });
    // Dispatch du thunk
    await store.dispatch(fetchNotifications());

    const fetchedNotifications = mockNotifications.map((element) => {
      if (element.id === 3) {
        return { ...element, html: `<strong>Urgent requirement</strong> - complete by EOD` };
      }
      return element;
    });

    // Dispatch et appel à markNotificationAsRead pour supprimer la 3e notification
    store.dispatch(markNotificationAsRead(3));

    // Récupération de l'état
    const state = store.getState().notifications;
    const expectedNotifications = fetchedNotifications.filter(item => item.id !== 3);

    expect(state.notifications).toEqual(expectedNotifications);
    expect(state.displayDrawer).toBe(true);
    expect(consoleSpy).toHaveBeenCalledWith('Notification 3 has been marked as read')
  });

  test('Vérification du changement de state de displayDrawer quand showDrawer ou hideDrawer sont appelés', () => {
    let state = notificationsReducer(undefined, {});
    expect(state.displayDrawer).toBe(true);
    store.dispatch(hideDrawer());
    state = store.getState().notifications;
    expect(state.displayDrawer).toBe(false);
    store.dispatch(showDrawer());
    state = store.getState().notifications;
    expect(state.displayDrawer).toBe(true);
  });
})
