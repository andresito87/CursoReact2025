import type { PropsWithChildren } from "react";
import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';
import { appRouter } from "./app.router";
import { CustomFullScreenLoading } from "./components/custom/CustomFullScreenLoading";
import { useAuthStore } from "./auth/store/auth.store";

const queryClient = new QueryClient();

const CheckAuthProvider = ({ children }: PropsWithChildren) => {

    const { checkAuthStatus } = useAuthStore();

    const { isLoading } = useQuery({
        queryKey: ['auth'],
        queryFn: checkAuthStatus,
        retry: false,
        refetchInterval: 1000 * 60 * 60 * 1.5, // Tiempo para auto refrescar el token
        refetchOnWindowFocus: true, // Auto refresca el token cuando la ventana vuelva a estar activa
    });

    if (isLoading) {
        return <CustomFullScreenLoading />;
    }

    return children;
};

export const TesloAppShop = () => {

    return (
        <QueryClientProvider client={queryClient}>

            <Toaster />

            {/* Custom Provider */}
            <CheckAuthProvider>
                <RouterProvider router={appRouter} />
            </CheckAuthProvider>

            <ReactQueryDevtools initialIsOpen={false} />

        </QueryClientProvider>
    );
};
