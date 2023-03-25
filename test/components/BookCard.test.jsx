import BookCard from "@c/BookCard/BookCard.jsx";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../testHelpers.jsx";
import userEvent from "@testing-library/user-event";

const book = {
  id: "testID",
  smallThumbnail: "/small/thumbnail",
  title: "testTitle",
  categories: ["category1", "category2"],
  authors: "author1, author2"
};

const mockedUsedNavigate = vi.fn();

vi.mock("react-router-dom",async ()=>({
  useNavigate: () => mockedUsedNavigate
}))

describe("BookCard", () => {
  let wrapper;

  // const spy = vi.spyOn(reactRouter, "useNavigate");

  beforeEach(() => {
    wrapper = renderWithProviders(<BookCard key={book.id} id={book.id}/>,
      {
        preloadedState: {
          books: [book], selected: {}
        }
      });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  test("верное отображение", () => {
    const {
      categories,
      title,
      authors,
      smallThumbnail,
    } = book;

    const category = categories[0];
    const categoryField = screen.queryAllByText(category);
    expect(categoryField.length).toBe(1);

    const titleField = screen.queryAllByText(title);
    expect(titleField.length).toBe(1);

    const authorsField = screen.queryAllByText(authors);
    expect(authorsField.length).toBe(1);

    const img = screen.queryAllByAltText(title);
    expect(img.length).toBe(1);
    expect(img[0].src).toContain(smallThumbnail);

  });

  test("вывод только первой категории", () => {
    const notDisplayedCategory = book.categories[1];
    const categoryField = screen.queryAllByAltText(notDisplayedCategory);
    expect(categoryField.length).toBe(0);
  });

  test("при клике осуществляется переход по адресу /:id", async () => {
    const card = screen.queryAllByText(book.title)[0]
    await userEvent.click(card);
    expect(mockedUsedNavigate).toBeCalledWith(`/${book.id}`)
  });

});