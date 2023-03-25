import Footer from "@c/Footer/Footer.jsx";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../testHelpers.jsx";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("Footer", () => {
  let wrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  test("кнопка отключена, если отправлен запрос в Google Book API", () => {
    wrapper = renderWithProviders(<Footer/>,
      {
        preloadedState: {
          fullLoad: false, loading: true
        }
      });

    const button = screen.queryAllByDisplayValue(/Загрузить/, {selector: "input"})[0];
    expect(button).toBeDisabled();

  });

  test("кнопка не отключена, если нет запроса в Google Book API", () => {
    wrapper = renderWithProviders(<Footer/>,
      {
        preloadedState: {
          fullLoad: false, loading: false
        }
      });

    const button = screen.queryAllByDisplayValue(/Загрузить/, {selector: "input"})[0];
    expect(button).not.toBeDisabled();
  });

  test("кнопка отключена, не было запроса в Google Book API", () => {
    wrapper = renderWithProviders(<Footer/>,
      {
        preloadedState: {
          fullLoad: null, loading: false
        }
      });

    const button = screen.queryAllByDisplayValue(/Загрузить/, {selector: "input"})[0];
    expect(button).toBeDisabled();
  });

  test("кнопка отключена, если по запросу в Google Book API перестали приходить книги", () => {
    wrapper = renderWithProviders(<Footer/>,
      {
        preloadedState: {
          fullLoad: true, loading: false
        }
      });

    const button = screen.queryAllByDisplayValue(/Загрузить/, {selector: "input"})[0];
    expect(button).toBeDisabled();
  });

  test("кнопка не отключена, если был хотя бы один запрос в Google Book API", () => {
    wrapper = renderWithProviders(<Footer/>,
      {
        preloadedState: {
          fullLoad: false, loading: false
        }
      });

    const button = screen.queryAllByDisplayValue(/Загрузить/, {selector: "input"})[0];
    expect(button).not.toBeDisabled();
  });

  test("по клике на кнопке отправляется запрос в Google Book API и кнопка отключается", async () => {
    const spy = vi.spyOn(window, "fetch");
    wrapper = renderWithProviders(<Footer/>,
      {
        preloadedState: {
          fullLoad: false,
          loading: false,
          selected: {
            startIndex: 0,
            category: "all",
            sortBy: "relevance",
            searchString: "123",
          }
        }
      });

    const button = screen.queryAllByDisplayValue(/Загрузить/, {selector: "input"})[0];
    expect(button).not.toBeDisabled();
    await userEvent.click(button);
    expect(button).toBeDisabled();
    expect(spy).toBeCalled();
  });

  test("обновляет значение начально индекса и пагинации", async () => {
    global.fetch = vi.fn();
    const preloadedState = {
      totalItems: 50,
      fullLoad: false,
      loading: false,
      selected: {
        startIndex: 0,
        category: "all",
        sortBy: "relevance",
        searchString: "123",
        pagination: 30
      }
    };

    await act(() => {
      wrapper = renderWithProviders(<Footer/>, {preloadedState});
    });

    const button = screen.queryAllByDisplayValue(/Загрузить/, {selector: "input"})[0];
    await userEvent.click(button);
    const state = wrapper.store.getState();

    expect(state.loading).toBe(false);
    const {selected} = state;
    expect(selected.startIndex).toBe(preloadedState.selected.startIndex + preloadedState.selected.pagination);
    expect(selected.pagination).toBe(preloadedState.totalItems - preloadedState.selected.pagination);
  });

  test('если сумма стартового индекса и пагинации больше количества найденных книг',async ()=>{
    global.fetch = vi.fn();
    const preloadedState = {
      totalItems: 50,
      fullLoad: false,
      loading: false,
      selected: {
        startIndex: 30,
        category: "all",
        sortBy: "relevance",
        searchString: "123",
        pagination: 30
      }
    };

    await act(() => {
      wrapper = renderWithProviders(<Footer/>, {preloadedState});
    });

    const button = screen.queryAllByDisplayValue(/Загрузить/, {selector: "input"})[0];
    await userEvent.click(button);
    const state = wrapper.store.getState();

    const {selected} = state;
    expect(selected.startIndex).toBe(preloadedState.totalItems)
    expect(selected.pagination).toBe(preloadedState.totalItems-selected.startIndex)
  })




});