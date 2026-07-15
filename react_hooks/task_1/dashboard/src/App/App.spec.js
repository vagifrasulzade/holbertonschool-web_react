import { render, screen, fireEvent } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import App from './App';

describe('App component', () => {
  test('Vérification texte h1 App-header', () => {
    render(<App />);
    const headerh1 = screen.getByRole('heading', { level: 1, name: /School dashboard/i });
    expect(headerh1).toBeInTheDocument();
  });

  test('Vérification texte App-body', () => {
    render(<App />);
    const bodyp = screen.getByText(/Login to access the full dashboard/i);
    expect(bodyp).toBeInTheDocument();
  });

  test('Vérification texte App-footer', () => {
    render(<App />);
    const footerp = screen.getByText(/Copyright \d{4} - holberton School/i);
    expect(footerp).toBeInTheDocument();
  });

  test('Vérification alt image App-header', () => {
    render(<App />);
    const headerImgAlt = screen.getByAltText(/holberton logo/i);
    expect(headerImgAlt).toBeInTheDocument();
  });

  // Tests Composant Login
  test('Vérification de la présence du composant Login quand LoggedIn est false (Comportement par défaut)', () => {
    render(<App />);
    const loginText = screen.getByText(/login to access the full dashboard/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const formButton = screen.getByRole('button', { name: /OK/i });
    expect(loginText).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(formButton).toBeInTheDocument();
  });

  // Tests CourseList
  test('Vérification de la présence du composant CourseList quand isLoggedIn est true', async () => {
    render(<App />);
    const user = userEvent.setup();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'fallen.albaz@gmail.com');
    await user.type(passwordInput, 'Azertyuiop');

    const formButton = screen.getByRole('button', { name: /OK/i });
    await user.click(formButton);

    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
  });

  // Tests logOut
  test("Vérification de l'appel à la fonction logOut quand 'Ctrl + h' sont pressés", async () => {
    const logOutAlertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<App />);
    // Simumation de la connexion
    const user = userEvent.setup();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'fallen.albaz@gmail.com');
    await user.type(passwordInput, 'Azertyuiop');

    const formButton = screen.getByRole('button', { name: /OK/i });
    await user.click(formButton);

    // Déclenchement du logOut
    fireEvent.keyDown(document, { key: 'h', ctrlKey: true });

    const loginText = screen.getByText(/login to access the full dashboard/i);
    expect(loginText).toBeInTheDocument();

    logOutAlertSpy.mockRestore();
  });

  test("Vérification de l'appel window.alert avec 'Logging you out' quand 'Ctrl + h' sont pressés", async () => {
    const logOutAlertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<App />);
    // Simumation de la connexion
    const user = userEvent.setup();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'fallen.albaz@gmail.com');
    await user.type(passwordInput, 'Azertyuiop');

    const formButton = screen.getByRole('button', { name: /OK/i });
    await user.click(formButton);

    // Déclenchement du logOut
    fireEvent.keyDown(document, { key: 'h', ctrlKey: true });

    expect(logOutAlertSpy).toHaveBeenCalledWith('Logging you out');
    logOutAlertSpy.mockRestore();
  });

  // Tests BodySection
  test('Vérification de la présence des éléments du composant BodySection (h2 & paragraph)', () => {
    render(<App />);
    const BodySectionh2 = screen.getByRole('heading', { level: 2, name: /News from the School/i });
    // const BodySectionp = screen.getByText(/Holberton School News goes here/i);
    const BodySectionp = screen.getByText(/ipsum Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, asperiores architecto blanditiis fuga doloribus sit illum aliquid ea distinctio minus accusantium, impedit quo voluptatibus ut magni dicta. Recusandae, quia dicta?/i);
    expect(BodySectionh2).toBeInTheDocument();
    expect(BodySectionp).toBeInTheDocument();
  });

  // Test intégration avec le composant Header (Gestion Logout)
  test('Vérification de la présence des bons éléments quand on est connecté ou déconnecté', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Simulation de la connexion
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'fallen.albaz@gmail.com');
    await user.type(passwordInput, 'Azertyuiop');
    const formButton = screen.getByRole('button', { name: /OK/i });
    await user.click(formButton);

    // Vérification de la présence des bons éléments une fois connecté
    const section = document.querySelector('#logoutSection');
    expect(section).toBeInTheDocument();

    // Simulation de la déconnexion
    const logoutLink = screen.getByRole('link', { name: /logout/i });
    await user.click(logoutLink);

    // Vérification de la présence des bons éléments une fois déconnecté.
    expect(section).not.toBeInTheDocument();
    const loginText = screen.getByText(/login to access the full dashboard/i);
    expect(loginText).toBeInTheDocument();
  });

  test("Vérification que la notification cliquée soit bien retirée avec un message le confirmant dans la console", async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<App />);
    // Simumation du clic pour ouvrir le panel
    const user = userEvent.setup();
    const yourNotifElem = screen.getByText(/Your notifications/i);
    await user.click(yourNotifElem);

    const panelTitle = screen.getByText(/Here is the list of notifications/i);
    expect(panelTitle).toBeInTheDocument();

    // Simulation du clic sur une notification pour vérifier qu'elle disparaîsse et que le message est bien log dans la console
    const panelElement = screen.getByText(/New resume available/i);
    await user.click(panelElement);
    expect(panelElement).not.toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalledWith('Notification 2 has been marked as read');

    consoleSpy.mockRestore();
  });
});
