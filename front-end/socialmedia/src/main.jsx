import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/userProvider.jsx";
const query = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={query}>
    <UserProvider>
      <Toaster />
      <App />
    </UserProvider>
  </QueryClientProvider>
);
