import { configureStore } from "@reduxjs/toolkit";
import coursesReducer, { fetchCourses, selectCourse, unSelectCourse } from '../courses/coursesSlice';
import { logout } from "../auth/authSlice";

const mockCourses = [
  {
    "id": 1,
    "name": "ES6",
    "credit": "60"
  },
  {
    "id": 2,
    "name": "Webpack",
    "credit": "20"
  },
  {
    "id": 3,
    "name": "React",
    "credit": "40"
  }
]

describe('coursesSlice', () => {
  let store;

  beforeEach (() => {
    store = configureStore({
      reducer: {
        courses: coursesReducer
      }
    });
    global.fetch = jest.fn();
  });

  afterEach (() => {
    jest.restoreAllMocks();
  });

  test('Vérification de la valeur par défaut du state', () => {
    const state = coursesReducer(undefined, {});
    expect(state.courses).toEqual([]);
  });


  test('Vérification de le fetch fonctionne correctement', async () => {
    // Simulation du fetch
    const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockCourses)
    });
    // Dispatch du thunk
    await store.dispatch(fetchCourses());

    // Récupération de l'état et du tableau attendu
    const state = store.getState().courses;

    expect(state.courses).toEqual(mockCourses.map(c => ({ ...c, isSelected: false })));
  });

  test('Vérification que quand logout est appelé le tableau est reset', async () => {
    // Simulation du fetch
    const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockCourses)
    });
    // Dispatch du thunk
    await store.dispatch(fetchCourses());

    // Récupération de l'état et du tableau attendu
    let state = store.getState().courses;

    expect(state.courses).toEqual(mockCourses.map(c => ({ ...c, isSelected: false })));

    // Appel à logout
    store.dispatch(logout());

    state = store.getState().courses;
    expect(state.courses).toEqual([]);
  });

  test('Vérification que selectCourse met isSelected à true', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockCourses)
    });
    await store.dispatch(fetchCourses());

    store.dispatch(selectCourse(1));
    const course = store.getState().courses.courses.find(c => c.id === 1);
    expect(course.isSelected).toBe(true);
  });

  test('Vérification que unSelectCourse met isSelected à false', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockCourses)
    });
    await store.dispatch(fetchCourses());

    store.dispatch(selectCourse(1));
    store.dispatch(unSelectCourse(1));
    const course = store.getState().courses.courses.find(c => c.id === 1);
    expect(course.isSelected).toBe(false);
  });
})
