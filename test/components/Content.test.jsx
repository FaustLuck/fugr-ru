import Content from "@c/Content/Content.jsx";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../testHelpers.jsx";

const counter = 7;
const books = createBooksList(counter);

function createBooksList(length) {
  const book = {
    id: "testID",
    smallThumbnail: "/small/thumbnail",
    thumbnail: "/thumbnail",
    title: "testTitle",
    categories: ["category1", "category2"],
    authors: "author1, author2"
  };
  const output = [];

  for (let i = 0; i < length; i++) {
    output.push(
      Object.assign({}, {...book, id: `bookID${i}`})
    );
  }
  return output;
}

vi.mock("react-router-dom", async () => ({
  useNavigate: () => vi.fn()
}));

describe("BookInfo", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = renderWithProviders(<Content/>,
      {
        preloadedState: {books}
      });
  });


  afterEach(() => {
    wrapper.unmount();
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  test(`отображение ${counter} карточек`, () => {
    const cards = screen.queryAllByText(/author/);
    expect(cards.length).toBe(counter)
  });

});