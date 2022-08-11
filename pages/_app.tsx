import { ReactElement, ReactNode, useEffect, useState } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { useInitializeUser } from "features/authentications/hooks/useInitializeUser";
import { useSSR } from "hooks/useSWR";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import BasicLayout from "Layout/BasicLayout";
import GlobalLoading from "components/GlobalLoading";
import UserProfileProviderWrapper from "../features/user/components/UserProfileProviderWrapper";
export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
  isClient?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const SSR = useSSR();
  const { user, isLoading } = useInitializeUser();

  const getLayout = Component.getLayout ?? ((page) => <BasicLayout>{page}</BasicLayout>);

  // if page has to be rendered server side the isClient should be set to false for the page
  if (Component.isClient === false) return getLayout(<Component {...pageProps} />);

  return SSR ? (
    <GlobalLoading />
  ) : (
    <QueryClientProvider client={queryClient}>
      <UserProfileProviderWrapper user={user} isLoading={isLoading}>
        {getLayout(<Component {...pageProps} />)}
      </UserProfileProviderWrapper>
      <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"} />
    </QueryClientProvider>
  );
}

export default MyApp;
