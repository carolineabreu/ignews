import { render } from "@testing-library/react";
import { ActiveLink } from ".";

// o componente ActiveLink está sendo testado "sozinho", sem o resto da aplicação, então algumas funcionalidades na hora do teste vão dar erro. Podemos usar o jest.mock para imitar o funcionamento esperado. jest.mock("nome do import", () => {nome da função importada() {o que a função retorna}})
jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      };
    },
  };
});

describe("ActiveLink component", () => {
  // pode ser escrito com test("message") também
  it("renders correctly", () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );

    expect(getByText("Home")).toBeInTheDocument();
  });

  it("adds active class if the link as currently active", () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );

    expect(getByText("Home")).toHaveClass("active");
  });
});
