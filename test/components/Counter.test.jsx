import Counter from "@c/Counter/Counter.jsx";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../testHelpers.jsx";

describe("BookInfo", () => {
  let wrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  test("отображение найденного количества книг", () => {
    wrapper = renderWithProviders(<Counter/>,
      {preloadedState: {totalItems: 254}});

    const elements = screen.queryAllByText(/Найдено/);

    expect(elements[0].innerHTML).toBe("Найдено 254.");
    expect(elements.length).toBe(1);
  });

  test("отображение, что книг не найдено", () => {
    wrapper = renderWithProviders(<Counter/>,
      {preloadedState: {totalItems: 0}});

    const elements = screen.queryAllByText(/найдено/);

    expect(elements.length).toBe(1);
    expect(elements[0].innerHTML).toBe("Не найдено по запросу.");
  });

  test("не отображает компонент, если не было запросов", () => {
    wrapper = renderWithProviders(<Counter/>,
      {preloadedState: {totalItems: null}});

    const elements = screen.queryAllByText(/./);

    expect(elements.length).toBe(0);

  });


});