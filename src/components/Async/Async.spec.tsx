import { render, screen, waitFor } from "@testing-library/react";
import { Async } from ".";

test("it renders correctly", async () => {
  render(<Async />);

  //screen.logTestingPlaygroundURL();

  expect(screen.getByText("Hello")).toBeInTheDocument();
  expect(await screen.findByText("Button")).toBeInTheDocument();
  //   await waitFor(() => {
  //     return expect(screen.findAllByText("Button")).toBeInTheDocument();
  //   });
});
