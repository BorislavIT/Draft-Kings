import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { render } from "@testing-library/react";

export const customRender = (children: ReactNode) => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
