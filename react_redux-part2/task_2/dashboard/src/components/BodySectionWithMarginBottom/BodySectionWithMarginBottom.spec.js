import BodySectionWithMarginBottom from "./BodySectionWithMarginBottom";
import { render, screen } from '@testing-library/react';

describe('BodySectionWithMarginBottom component', () => {
  test("Vérification que le composant BodySectionWithMarginBottom affiche bien le titre et les children et génère les divs avec les bonnes classes", () => {
    const { container } = render(
      <BodySectionWithMarginBottom title={'Fallen of Albaz'}>
        <p>Dragon/Effect</p>
      </BodySectionWithMarginBottom>
    );
    const divElement = container.querySelector('.bodySectionWithMargin');
    expect(divElement).toBeInTheDocument();

    const divComponent = container.querySelector('.bodySection');
    expect(divComponent).toBeInTheDocument();

    const titleh2 = screen.getByRole('heading', { level: 2, name: /Fallen of Albaz/i });
    expect(titleh2).toBeInTheDocument();

    const firstChildren = screen.getByText(/Dragon/i);
    expect(firstChildren).toBeInTheDocument();
  });
});
