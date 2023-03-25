import { render, screen } from "@testing-library/react";
import List from "@c/List/List.jsx";
import userEvent from "@testing-library/user-event";

const categoriesList = [
  {all: "Все категории"},
  {art: "Искусство"},
  {biography: "Биография"},
  {computers: "Компьютер"},
  {history: "История"},
  {medical: "Медицина"},
  {poetry: "Поэзия"}
];

describe("List", () => {
  let wrapper;

  const mockFn = vi.fn();

  beforeEach(() => {
    wrapper = render(<List key={"categories"} handleChange={mockFn} list={categoriesList}/>);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  test("верное отображение", () => {
    const options = screen.queryAllByRole("option");
    const categories = Object.values(categoriesList);

    expect(options.length).toBe(categories.length);


    categoriesList.forEach(el => {
      const [key, title] = Object.entries(el)[0];
      const optionArray = screen.queryAllByText(title);
      expect(optionArray.length).toBe(1);

      const {value} = optionArray[0];
      expect(key).toBe(value);
    });
  });

  test("передает родительскому компоненту значение выбранного эл-та", async () => {
    const [value, title] = Object.entries(categoriesList[4])[0];

    const option = screen.queryAllByText(title)[0];
    const select = option.parentElement;

    await userEvent.selectOptions(select, option);
    expect(mockFn).toBeCalledWith(value);
  });

});