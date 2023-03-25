import { fetchHelper, renderWithProviders } from "../testHelpers.jsx";
import { screen } from "@testing-library/react";
import Header from "@c/Header/Header.jsx";
import imgURL from "@a/glass.svg";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

const mockedUsedNavigate = vi.fn();

vi.mock("react-router-dom", async () => ({
  useNavigate: () => mockedUsedNavigate
}));

function createWrapper(injects = {}) {
  const preloadedState = Object.assign({selected: {}}, injects);
  return renderWithProviders(<Header/>,
    {preloadedState});
}

describe("Header", () => {
  let wrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  test("верное отображение", () => {
    wrapper = createWrapper();
    const title = screen.queryAllByText(/Поиск/);
    expect(title.length).toBe(1);

    const input = screen.queryAllByDisplayValue("");
    expect(input.length).toBe(1);

    const img = screen.queryAllByRole("img");
    expect(img[0].src).toContain(imgURL);

    const labels = screen.queryAllByText(/Категория|Сортировать/);
    expect(labels.length).toBe(2);
  });

  test("запрос в Google Book API не отправляется, по клику на лупу, если строка поиска пуста", async () => {
    wrapper = createWrapper();
    const spy = vi.spyOn(window, "fetch");
    const img = screen.queryAllByRole("img")[0];

    await userEvent.click(img);
    expect(spy).not.toBeCalled();
  });

  test("запрос в Google Book API отправляется, по клику на лупу, если строка поиска не пуста", async () => {
    wrapper = createWrapper();
    const spy = vi.spyOn(window, "fetch");
    const img = screen.queryAllByRole("img")[0];
    const input = screen.queryAllByDisplayValue("");

    await userEvent.type(input[0], "test string");
    await userEvent.click(img);
    expect(spy).toBeCalled();
  });

  test("если запрос в Google Book API отправлен, строка поиска становиться неактивной", async () => {
    wrapper = createWrapper({loading: true});
    const input = screen.queryAllByDisplayValue("");

    expect(input[0]).toBeDisabled();
  });

  test("нажатие Enter отправляет запрос в Google Book API, если строка поиска не пуста", async () => {
    wrapper = createWrapper();
    const spy = vi.spyOn(window, "fetch");
    const input = screen.queryAllByDisplayValue("");

    await userEvent.type(input[0], "test string{enter}");

    expect(spy).toBeCalled();
  });

  test("перед отправкой запроса в Google Book API, обновляет данные в хранилище Redux", async () => {
    wrapper = createWrapper({
      selected: {
        startIndex: 0,
        bookID: null,
        category: null,
        sortBy: null,
        searchString: "",
        pagination: 30
      }
    });

    const {store} = wrapper;
    const input = screen.queryAllByDisplayValue("");
    expect(store.getState().selected?.searchString).toBe("");
    await userEvent.type(input[0], "test string{enter}");
    expect(store.getState().selected?.searchString).toBe("test string");
  });

  test("запрос завершается с ошибкой", async () => {
    global.fetch = vi.fn().mockReturnValue({result: false});
    await act(async () => {
      wrapper = renderWithProviders(<Header/>,
        {
          preloadedState: {
            books: [], selected: {}
          }
        });
    });
    const input = screen.queryAllByDisplayValue("");
    await userEvent.type(input[0], "test string{enter}");

    const {loading, totalItems} = wrapper.store.getState();

    expect(loading).toBe(false);
    expect(totalItems).toBe(0);
  });

  test("запрос завершается успешно", async () => {
    global.fetch = fetchHelper();
    await act(() => {
      wrapper = renderWithProviders(<Header/>,
        {
          preloadedState: {
            books: [], selected: {}
          }
        });
    });

    const input = screen.queryAllByDisplayValue("");
    await userEvent.type(input[0], "test string{enter}");

    const {loading, books, totalItems} = wrapper.store.getState();

    expect(loading).toBe(false);
    expect(books.length).toBe(2);
    expect(totalItems).toBe(430);
  });

  test("если в ответе есть повторы - удаляет", async () => {
    global.fetch = fetchHelper("repeats");
    await act(() => {
      wrapper = renderWithProviders(<Header/>,
        {
          preloadedState: {
            books: [], selected: {}
          }
        });
    });
    const input = screen.queryAllByDisplayValue("");
    await userEvent.type(input[0], "test string{enter}");

    const {loading, books, totalItems} = wrapper.store.getState();

    expect(loading).toBe(false);
    expect(books.length).toBe(2);
    expect(totalItems).toBe(120);
  });

});