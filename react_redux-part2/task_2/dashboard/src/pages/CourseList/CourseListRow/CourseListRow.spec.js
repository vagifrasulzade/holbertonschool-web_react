import userEvent from '@testing-library/user-event';
import CourseListRow from './CourseListRow';
import { render, screen, within } from '@testing-library/react';

describe('CourseListRow component', () => {
  test("Vérification de la présence des td dans le tr quand isHeader est false (Default case)", () => {
    render(<CourseListRow />);
    const trElement = screen.getByRole('row');
    expect(trElement).toBeInTheDocument();
    const tdElements = within(trElement).getAllByRole('cell');
    expect(tdElements).toHaveLength(2);
  });

  test("Vérification de la présence de 2 th dans le tr quand isHeader est true et textSecondCell n'est pas null", () => {
    render(<CourseListRow isHeader={ true } textFirstCell='Fallen of Albaz' textSecondCell='Dragon / Effect'/>);
    const trElement = screen.getByRole('row');
    expect(trElement).toBeInTheDocument();
    const tdElements = within(trElement).getAllByRole('columnheader');
    expect(tdElements).toHaveLength(2);
  });

  test("Vérification que le th a bien un colspan de 2 quand isHeader est true et textSecondCell est null", () => {
    render(<CourseListRow isHeader={ true } textFirstCell='Fallen of Albaz' textSecondCell={ null }/>);
    const trElement = screen.getByRole('row');
    expect(trElement).toBeInTheDocument();
    const tdElements = within(trElement).getByRole('columnheader');
    expect(tdElements).toHaveAttribute('colspan', '2');
  });

  test("Vérification que la checkbox appelle changeRow avec le bon id et checked", async () => {
    const mockChangeRow = jest.fn();
    render(<CourseListRow isHeader={false} id={1} isSelected={false} changeRow={mockChangeRow} />);
    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);
    expect(mockChangeRow).toHaveBeenCalledWith(1, true);
  });
});
