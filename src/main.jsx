import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./router/router.jsx";
import ContextProvider from "./context/ContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ContextProvider>
      <HelmetProvider>
    <QueryClientProvider client={queryClient}>
			<RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
      </HelmetProvider>
		</ContextProvider>
	</StrictMode>
);
