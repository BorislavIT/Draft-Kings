import "@testing-library/jest-dom";
import { screen, waitFor } from "@testing-library/react";
import { customRender } from "./test.utils";
import ResultsContainer from "@/components/Results/ResultsContainer";

jest.mock("@/components/Results/utilts", () => {
  const usePaginatedPeopleMock = jest.fn().mockImplementation(() => {
    return {
      people: [],
      peopleError: "Big ERROR",
      peopleLoading: false,
    };
  });
  return {
    ...jest.requireActual("@/components/Results/utilts"),
    usePaginatedPeople: usePaginatedPeopleMock,
  };
});

jest.mock("next/navigation", () => {
  return {
    __esModule: true,
    useRouter: () => ({
      push: jest.fn(),
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    }),
    useSearchParams: () => ({
      get: jest.fn(),
    }),
  };
});

describe("ResultsContainer", () => {
  describe("in case api returns an error", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      customRender(<ResultsContainer />);
    });

    test("should display a message", async () => {
      await waitFor(() => {
        expect(
          screen.queryByText("BIG ERROR, BUT NO DETAILS ;)")
        ).toBeInTheDocument();
      });
    });
  });
});
