import { render, screen } from "@testing-library/react";
import Post from "../../pages/posts/preview/[slug]";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const post = {
  slug: "my-new-post",
  title: "My New Post",
  content: "<p>Post excerpt</p>",
  updatedAt: "10 de Abril",
};

jest.mock("next-auth/react");
jest.mock("next/router");
jest.mock("../../services/prismic");

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

describe("Post preview page", () => {
  it("renders correctly", () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false] as any);

    render(<Post post={post} />);

    expect(screen.getByText("My New Post")).toBeInTheDocument();
    expect(screen.getByText("Post excerpt")).toBeInTheDocument();
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument();
  });

  it("redirects user to full post when user is subscribed", async () => {
    const useSessionMocked = jest.mocked(useSession);
    const useRouterMocked = jest.mocked(useRouter);
    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce([
      { activeSubscription: "fake-active-subscription" },
      false,
    ] as any);

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<Post post={post} />);

    expect(pushMock).toHaveBeenCalledWith("/posts/my-new-post");
  });

  //   it("loads initial data", async () => {
  //     const getSessionMocked = jest.mocked(getSession);
  //     const getPrismicClientMocked = jest.mocked(getPrismicClient);

  //     getPrismicClientMocked.mockReturnValueOnce({
  //       getByUID: jest.fn().mockResolvedValueOnce({
  //         data: {
  //           title: [{ type: "heading1", text: "My new post" }],
  //           content: [{ type: "paragraph", text: "Post content" }],
  //         },
  //         last_publication_date: "04-01-2023",
  //       }),
  //     } as any);

  //     getSessionMocked.mockResolvedValueOnce({
  //       activeSubscription: "fake-active-subscription",
  //     } as any);

  //     const response = await getServerSideProps({
  //       params: { slug: "my-new-post" },
  //     } as any);

  //     expect(response).toEqual(
  //       expect.objectContaining({
  //         props: {
  //           post: {
  //             slug: "my-new-post",
  //             title: "My new post",
  //             content: "<p>Post content</p>",
  //             updatedAt: "April 01, 2023",
  //           },
  //         },
  //       })
  //     );
  //   });
});
