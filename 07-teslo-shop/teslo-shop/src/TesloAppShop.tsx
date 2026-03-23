import { RouterProvider } from "react-router";
import { appRouter } from "./app.router";

export const TesloAppShop = () => {
    return <RouterProvider router={appRouter} />;
};
