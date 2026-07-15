import mockAxios from 'jest-mock-axios';
import authReducer, { login, logout } from '../auth/authSlice';

describe('authSlice', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  test('Vérification de la valeur par défaut du state', () => {
    const state = authReducer(undefined, {});
    expect(state.user).toEqual({ email: '', password: '' });
    expect(state.isLoggedIn).toBe(false);
  });

  test("Vérification que l'action login met correctement à jour le state", () => {
    const state = authReducer(undefined, login({ email: 'fallen.albaz@gmail.com', password: 'azertyuiop' }));
    expect(state.user).toEqual({ email: 'fallen.albaz@gmail.com', password: 'azertyuiop' });
    expect(state.isLoggedIn).toBe(true);
  });

  test("Vérification que l'action logout remet bien le state à zéro", () => {
    // Appel à login
    const loggedState = authReducer(undefined, login({ email: 'fallen.albaz@gmail.com', password: 'azertyuiop' }));
    // Appel à logout
    const finalState = authReducer(loggedState, logout());
    expect(finalState.user).toEqual({ email: '', password: '' });
    expect(finalState.isLoggedIn).toBe(false);
  });
})
