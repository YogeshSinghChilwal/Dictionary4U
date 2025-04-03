import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "sonner";
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <Auth0ProviderWithNavigate>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <AppRoutes />
            <Toaster visibleToasts={1} position="top-right" richColors />
          </ThemeProvider>
        </Auth0ProviderWithNavigate>
      </QueryClientProvider>
    </Router>
  </StrictMode>
);
