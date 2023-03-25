import BookInfo from "@c/BookInfo/BookInfo.jsx";
import { screen } from "@testing-library/react";
import { fetchHelper, renderWithProviders } from "../testHelpers.jsx";
import { act } from "react-dom/test-utils";

const book = {
  id: "3YsFAQAAQBAJ",
  smallThumbnail: "/small/thumbnail",
  thumbnail: "/thumbnail",
  title: "testTitle",
  description: "description",
  categories: ["category1", "category2"],
  authors: "author1, author2"
};

vi.mock("react-router-dom", () => ({
  useParams: vi.fn().mockReturnValue({id: "3YsFAQAAQBAJ"}),
}));

describe("BookInfo", () => {
  let wrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  test("верное отображение", () => {
    wrapper = renderWithProviders(<BookInfo/>,
      {
        preloadedState: {
          books: [book], selected: {}
        }
      });

    const {
      title,
      authors,
      thumbnail,
      description
    } = book;

    const titleField = screen.queryAllByText(title);
    expect(titleField.length).toBe(1);

    const authorsField = screen.queryAllByText(authors);
    expect(authorsField.length).toBe(1);

    const img = screen.queryAllByAltText(title);
    expect(img.length).toBe(1);
    expect(img[0].src).toContain(thumbnail);

    const descriptionField = screen.queryAllByText(description);
    expect(descriptionField.length).toBe(1);

  });

  test("вывод всего списка категорий", () => {
    wrapper = renderWithProviders(<BookInfo/>,
      {
        preloadedState: {
          books: [book], selected: {}
        }
      });

    const categories = book.categories.join(", ");
    const categoryField = screen.queryAllByText(categories);
    expect(categoryField.length).toBe(1);

  });

  test("Если книга не найдена, отправляет запрос в Google Book API ", () => {
    global.fetch = vi.fn(() => new Promise(() => 1));
    const spy = vi.spyOn(window, "fetch");
    wrapper = renderWithProviders(<BookInfo/>,
      {
        preloadedState: {
          books: [], selected: {}
        }
      });

    expect(spy).toBeCalled();
  });

  test("запрос завершается с ошибкой", async () => {
    global.fetch = vi.fn().mockReturnValue({result: false});

    await act(() => {
      wrapper = renderWithProviders(<BookInfo/>,
        {
          preloadedState: {
            books: [], selected: {}
          }
        });
    });
    const {loading, totalItems} = wrapper.store.getState();

    expect(loading).toBe(false);
    expect(totalItems).toBe(0);
  });

  test("запрос завершается успешно", async () => {
    global.fetch = fetchHelper('getBook');
    await act(() => {

      wrapper = renderWithProviders(<BookInfo/>,
        {
          preloadedState: {
            books: [], selected: {}
          }
        });
    });
    const {loading, books} = wrapper.store.getState();

    expect(loading).toBe(false);
    expect(books.length).toBe(1);
    expect(books[0].id).toBe(book.id);
  });
});