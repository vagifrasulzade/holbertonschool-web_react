import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../features/auth/authSlice';
import Footer from './Footer';

function renderFooter(isLoggedIn = false) {
  const store = configureStore({
    reducer: {
      auth: authReducer
    },
    preloadedState: {
      auth: { isLoggedIn, user: { email: '', password: '' } },
    }
  });
  render(<Provider store={store}><Footer /></Provider>);
  return store;
}

describe('Footer component', () => {
  test("Vérification que le texte de Copyright s'affiche.", () => {
    renderFooter();
    const footerp = screen.getByText(/Copyright \d{4} - holberton School/i);
    expect(footerp).toBeInTheDocument();
  });

  test("Vérification que le texte de Copyright s'affiche, mais pas le link quand isLoggedIn est false.", () => {
    renderFooter();
    const footerp = screen.getByText(/Copyright \d{4} - holberton School/i);
    expect(footerp).toBeInTheDocument();

    const footerLink = screen.queryByRole('link', { name: /Contact us/i });
    expect(footerLink).not.toBeInTheDocument();
  });

  test("Vérification que le texte de Copyright et le link s'affichent quand isLoggedIn est true.", () => {
    renderFooter(true);
    const footerp = screen.getByText(/Copyright \d{4} - holberton School/i);
    expect(footerp).toBeInTheDocument();

    const footerLink = screen.queryByRole('link', { name: /Contact us/i });
    expect(footerLink).toBeInTheDocument();
  });
});
