import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { login, logout } from '../../features/auth/authSlice';
import Header from './Header';

function renderHeader(isLoggedIn = false) {
  const store = configureStore({
    reducer: {
      auth: authReducer
    },
    preloadedState: {
      auth: { isLoggedIn, user: { email: '', password: '' } },
    }
  });
  render(<Provider store={store}><Header /></Provider>);
  return store;
}

describe('Header component', () => {
  test("Vérification de la présence du texte h1 et du alt de l'image de App-header", () => {
    renderHeader();
    const headerh1 = screen.getByRole('heading', { level: 1, name: /School dashboard/i });
    expect(headerh1).toBeInTheDocument();
    const headerImgAlt = screen.getByAltText(/holberton logo/i);
    expect(headerImgAlt).toBeInTheDocument();
  });

  test("Vérification de l'absence de la section #logoutSection par défaut", () => {
    renderHeader();
    const section = document.querySelector('#logoutSection');
    expect(section).not.toBeInTheDocument();
  });

  test("Vérification de la présence du link 'logout' quand le state isLoggedIn est true.", () => {
    renderHeader(true);
    const logoutLink = screen.getByRole('link', { name: /logout/i });
    expect(logoutLink).toBeInTheDocument();
  });

  test("Vérification du message de bienvenue avec l'email quand le state isLoggedIn est true.", async () => {
    const store = renderHeader();
    store.dispatch(login({ email: 'fallen.albaz@gmail.com', password: 'azertyuiop' }));

    const welcomeMessage = await screen.findByText(/fallen\.albaz@gmail\.com/i);
    expect(welcomeMessage).toBeInTheDocument();
  });

  test("Vérification que le logout remette bien le state isLoggedIn à false", async () => {
    const store = renderHeader(true);
    store.dispatch(logout());

    const state = store.getState().auth;
    expect(state.isLoggedIn).toBe(false);

    const section = document.querySelector('#logoutSection');
    await waitFor(() => {
      expect(section).not.toBeInTheDocument();
    })
  });
});
