import NotificationItem from './NotificationItem';
import { render, screen, fireEvent } from '@testing-library/react';

describe('NotificationItem component', () => {
  test("Vérification que le texte en data-notification-type: default soit bleu", () => {
    render(<NotificationItem type="default" value="New course available"/>);
    const liElement = screen.getByRole('listitem');
    expect(liElement).toHaveAttribute('data-notification-type', 'default');
  });

  test("Vérification que le texte en data-notification-type: urgent soit rouge", () => {
    render(<NotificationItem type="urgent" value="New resume available"/>);
    const liElement = screen.getByRole('listitem');
    expect(liElement).toHaveAttribute('data-notification-type', 'urgent');
  });
});
