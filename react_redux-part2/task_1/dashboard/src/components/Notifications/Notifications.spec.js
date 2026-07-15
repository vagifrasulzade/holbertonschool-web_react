import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import notificationsReducer, { fetchNotifications, markNotificationAsRead } from "../../features/notifications/notificationsSlice";
import Notifications from './Notifications';

function renderNotifications(loading = false) {
  const store = configureStore({
    reducer: {
      notifications: notificationsReducer
    },
    preloadedState: {
      notifications: { notifications: [], loading },
    }
  });
  render(<Provider store={store}><Notifications /></Provider>);
  return store;
}

// Déclaration de notificaionsList
const mockNotificationsList = [
  {"id": 1, "type": "default", "value": "New course available"},
  {"id": 2, "type": "urgent", "value": "New resume available"},
  {"id": 3, "type": "urgent", "html": "<strong>Urgent requirement</strong> - complete by EOD"}
];

describe('Notifications component', () => {
  beforeEach (() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Vérification que le fetch fonctionne bien et affiche bien les notifications et les éléments du panel.", async () => {
    // Simulation du fetch des données de notifications
    const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockNotificationsList)
    });

    const store = renderNotifications();
    await store.dispatch(fetchNotifications());

    const notifTitle = screen.getByText(/Here is the list of notifications/i);
    expect(notifTitle).toBeInTheDocument();

    const closeButton = document.querySelector('button[aria-label="Close"]');
    expect(closeButton).toBeInTheDocument();

    const panelNotifications = document.querySelectorAll('li');
    expect(panelNotifications).toHaveLength(3);
    expect(panelNotifications[0]).toHaveTextContent(/New course available/i);
    expect(panelNotifications[1]).toHaveTextContent(/New resume available/i);
    expect(panelNotifications[2]).toHaveTextContent(/Urgent requirement - complete by EOD/i);
  });

  test("Vérification du fonctionnement de la méthode markNotificationAsRead.", async () => {
    // Simulation du fetch des données de notifications
    const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockNotificationsList)
    });

    const store = renderNotifications();
    await store.dispatch(fetchNotifications());

    await store.dispatch(markNotificationAsRead(2));
    const readNotification = screen.queryByText(/New resume available/i);
    expect(readNotification).not.toBeInTheDocument();
  });

  test("Vérification de l'affichage du message 'No new notification for now' quand le panel est visible et que notifications est vide", () => {
    renderNotifications();
    const notificationText = screen.getByText(/Your notifications/i);
    expect(notificationText).toBeInTheDocument();
    // Vérification des éléments qui doivent s'afficher ou non
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryByText(/Here is the list of notifications/i)).not.toBeInTheDocument();
    const noNotifMessage = screen.getByText(/No new notification for now/i);
    expect(noNotifMessage).toBeInTheDocument();
  });

  test("Vérification que les éléments de notificationsItem ne s'affichent pas quand le panel est caché", async () => {
    // Simulation du fetch des données de notifications
    const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockNotificationsList)
    });

    const store = renderNotifications();
    await store.dispatch(fetchNotifications());

    const notificationText = screen.getByText(/Your notifications/i);
    expect(notificationText).toBeInTheDocument();
    // Vérification des éléments qui ne doivent pas s'afficher
    const panelElement = document.querySelector('.notification-items');
    expect(panelElement.style.visibility).toBe("hidden");
  });

  test("Affiche 'Loading...' quand loading est true", () => {
    renderNotifications(true);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("N'affiche pas 'Loading...' quand loading est false", () => {
    renderNotifications();
    expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
  });
});
