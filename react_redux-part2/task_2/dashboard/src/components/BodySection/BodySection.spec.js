import BodySection from "./BodySection";
import { render, screen } from '@testing-library/react';

describe('BodySection component', () => {
  test("Vérification le composant BodySelection génère le bon h2 avec le title et les bons childs en props", () => {
    render(
      <BodySection title={'Fallen of Albaz'}>
        <p>Dragon</p>
        <p>Branded</p>
      </BodySection>
    );
    const titleh2 = screen.getByRole('heading', { level: 2, name: /Fallen of Albaz/i });
    expect(titleh2).toBeInTheDocument();

    const firstChildren = screen.getByText(/Dragon/i);
    const secondChildren = screen.getByText(/Branded/i);

    expect(firstChildren).toBeInTheDocument();
    expect(secondChildren).toBeInTheDocument();
  });
});
