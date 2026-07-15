import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import coursesReducer from '../features/courses/coursesSlice';
import notificationsReducer from "../features/notifications/notificationsSlice";
import App from '../App';

const mockNotificationsList = [
  {"id": 1, "type": "default", "value": "New course available"},
  {"id": 2, "type": "urgent", "value": "New resume available"},
  {"id": 3, "type": "urgent", "html": "<strong>Urgent requirement</strong> - complete by EOD"}
];

const mockCoursesList = [
  { "id": 1, "name": "ES6", "credit": "60"},
  { "id": 2, "name": "Webpack", "credit": "20"},
  { "id": 3, "name": "React", "credit": "40"}
];

function renderApp(isLoggedIn = false) {
  const store = configureStore({
    reducer: {
      notifications: notificationsReducer,
      courses: coursesReducer,
      auth: authReducer
    },
    preloadedState: {
      auth: { isLoggedIn, user: { email: '', password: '' } },
      courses: { courses: [] },
      notifications: { notifications: [], displayDrawer: true }
    }
  });
  render(<Provider store={store}><App /></Provider>);
  return store;
}

describe('App component', () => {
  beforeEach (() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Tests Composant Login
  test('Vérification de la présence du composant Login quand LoggedIn est false (Comportement par défaut)', () => {
    renderApp()
    const loginText = screen.getByText(/login to access the full dashboard/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const formButton = screen.getByRole('button', { name: /OK/i });
    expect(loginText).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(formButton).toBeInTheDocument();
  });

  // Test Composant CourseList
  test('Vérification de la présence du composant CourseList quand isLoggedIn est true', async () => {
    // Simulation du fetch des données de courses
    const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockCoursesList)
    });

    renderApp(true);

    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();

    // Vérification d'une des cases du tableau de courses
    const courses = await screen.findByText(/Webpack/i);
    expect(courses).toBeInTheDocument();
  });

  // Test fetchNotifications
  test("Vérification que les données de notifications.json sont bien récupérées au chargement initial", async () => {
    // Simulation du fetch des données de courses
    const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockNotificationsList)
    });

    renderApp();

    // Vérification de la présence d'une des notifications du panel
    const panelNotification = await screen.findByText(/New course available/i);
    expect(panelNotification).toBeInTheDocument();
  });
});
