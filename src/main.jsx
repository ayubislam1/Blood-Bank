import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./router/router.jsx";
import ContextProvider from "./context/ContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ContextProvider>
    <QueryClientProvider client={queryClient}>
			<RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
		</ContextProvider>
	</StrictMode>
);
