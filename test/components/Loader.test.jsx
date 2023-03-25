import { renderWithProviders } from "../testHelpers.jsx";
import Loader from "@c/Loader/Loader.jsx";

describe("Loader", () => {
  let wrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  test("отображается пока идет загрузка", () => {
    wrapper = renderWithProviders(<Loader/>, {preloadedState: {loading: true}});
    const {container} = wrapper;
    expect(container.firstChild).not.toBeNull()

  });

  test("не отображается, если ничего не подгружается", () => {
    wrapper = renderWithProviders(<Loader/>, {preloadedState: {loading: false}});
    const {container} = wrapper
    expect(container.firstChild).toBeNull()
  });

});