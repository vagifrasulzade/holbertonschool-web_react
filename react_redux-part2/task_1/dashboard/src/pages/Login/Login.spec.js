import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { userEvent } from '@testing-library/user-event';
import authReducer from '../../features/auth/authSlice';
import Login from './Login';

function renderLogin(isLoggedIn = false) {
  const store = configureStore({
    reducer: {
      auth: authReducer
    },
    preloadedState: {
      auth: { isLoggedIn, user: { email: '', password: '' } },
    }
  });
  render(<Provider store={store}><Login /></Provider>);
  return store;
}

describe('App component', () => {
  test('Vérification des différents éléments du composant Login', () => {
    renderLogin();
    const loginText = screen.getByText(/login to access the full dashboard/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const formButton = screen.getByRole('button', { name: /OK/i });
    expect(loginText).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(formButton).toBeInTheDocument();
  });

  test("Vérification du focus sur l'imput associé au label sélectionné", async () => {
    renderLogin();
    const user = userEvent.setup();

    const emailLabel = screen.getByText(/email/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordLabel = screen.getByText(/password/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.click(emailLabel);
    expect(emailInput).toHaveFocus();

    await user.click(passwordLabel);
    expect(passwordInput).toHaveFocus();
  });

  test('Vérification que le bouton soit désactivé par défaut', async () => {
    const store = renderLogin();
    const user = userEvent.setup();
    const formButton = screen.getByRole('button', { name: /OK/i });
    expect(formButton).toBeDisabled();
    await user.click(formButton);
    const state = store.getState().auth;
    expect(state.isLoggedIn).toBe(false);
  });

  test("Vérification que le bouton soit désactivé quand l'email est invalide", async () => {
      const store = renderLogin();
      let state;
      const user = userEvent.setup();
      // Déclaration des différentes valeurs invalides
      const invalidEmails = [
        'Raidraptors',
        'fallen@',
        'fallen@albaz',
        'hakuyoku.Ciel@.c',
        '@gmail.com'
      ]
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const formButton = screen.getByRole('button', { name: /OK/i });

      await user.type(passwordInput, 'Azertyuiop');

      for (const invalidEmail of invalidEmails) {
        await user.clear(emailInput);
        await user.type(emailInput, invalidEmail);
        expect(formButton).toBeDisabled();
        await user.click(formButton);
        state = store.getState().auth;
        expect(state.isLoggedIn).toBe(false);
      }

      await user.clear(emailInput);
      await user.type(emailInput, 'fallen.albaz@gmail.com');
      expect(formButton).toBeEnabled();
      await user.click(formButton);
      state = store.getState().auth;
      expect(state.isLoggedIn).toBe(true);
    });

    test("Vérification que le bouton soit désactivé quand le password fait moins de 8 caractères", async () => {
      const store = renderLogin();
      let state;
      const user = userEvent.setup();

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const formButton = screen.getByRole('button', { name: /OK/i });

      await user.type(emailInput, 'fallen.albaz@gmail.com');
      // Test avec 7 caractères
      await user.type(passwordInput, 'Azertyu');
      expect(formButton).toBeDisabled();
      await user.click(formButton);
      state = store.getState().auth;
      expect(state.isLoggedIn).toBe(false);

      // On rajoute 3 caractères, ce qui fait un total de 10 caractères.
      await user.type(passwordInput, 'iop');
      expect(formButton).toBeEnabled();
      await user.click(formButton);
      state = store.getState().auth;
      expect(state.isLoggedIn).toBe(true);
    });

  test('Vérification que le bouton soit activé quand les champs sont correctement remplis et que isLoggedIn passe à true', async () => {
    const store = renderLogin();
    const user = userEvent.setup();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'fallen.albaz@gmail.com');
    await user.type(passwordInput, 'Azertyuiop');

    const formButton = screen.getByRole('button', { name: /OK/i });
    expect(formButton).toBeEnabled();
    await user.click(formButton);

    let state = store.getState().auth;
    expect(state.isLoggedIn).toBe(true);
  });

});