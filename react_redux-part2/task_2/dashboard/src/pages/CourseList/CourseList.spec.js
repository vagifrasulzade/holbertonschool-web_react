import { act } from 'react';
import { render, screen, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { logout } from '../../features/auth/authSlice';
import coursesReducer, { fetchCourses, selectCourse, unSelectCourse } from '../../features/courses/coursesSlice';
import userEvent from '@testing-library/user-event';
import CourseList from './CourseList';

function renderCourseList(isLoggedIn = true, courses = []) {
  const store = configureStore({
    reducer: { auth: authReducer, courses: coursesReducer },
    preloadedState: {
      auth: { isLoggedIn, user: { email: 'fallen.albaz@gmail.com', password: 'azertyuiop' } },
      courses: { courses }
    }
  });
  render(<Provider store={store}><CourseList /></Provider>);
  return store;
}

// Déclaration de coursesList
const mockCoursesList = [
  { "id": 1, "name": "ES6", "credit": "60"},
  { "id": 2, "name": "Webpack", "credit": "20"},
  { "id": 3, "name": "React", "credit": "40"}
];

describe('CourseList component', () => {
  beforeEach (() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Vérification que le fetch fonctionne bien et affiche bien les courses.", async () => {
    // Simulation du fetch des données de courses
    const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockCoursesList)
    });

    const store = renderCourseList();
    act(() => {
      store.dispatch(fetchCourses());
    });

    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();

    // Vérification d'une des cases du tableau de courses
    const courses = await screen.findByText(/Webpack/i);
    expect(courses).toBeInTheDocument();
  });

  test("Vérification que le tableau de courses est bien reset quand logout est appelé", () => {
    const store = renderCourseList();
    act(() => {
      store.dispatch(logout());
    });


    const state = store.getState().courses;
    expect(state.courses).toEqual([]);
  });

  test("Vérification que onChangeRow dispatche selectCourse et unSelectCourse", async () => {
    const store = renderCourseList(true, [{ id: 1, name: 'ES6', credit: '60', isSelected: false }]);

    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);
    expect(store.getState().courses.courses[0].isSelected).toBe(true);

    await userEvent.click(checkbox);
    expect(store.getState().courses.courses[0].isSelected).toBe(false);
  });
});
