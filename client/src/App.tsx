import { Routes, Route } from "react-router-dom";

import { LoginPage } from "./pages/LoginPage";
import { Dashboard } from "./pages/Dashboard";

import { Navbar } from "./components/Navbar";
import { RegisterPage } from "./pages/RegisterPage";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./providers/AuthProvider";
import { RequireAuth } from "./components/RequireAuth";
import { HomePage } from "./pages/HomePage";
import { ErrorPage } from "./pages/ErrorPage";
import { AddNotePage } from "./pages/AddNotePage";
import { EditNotePage } from "./pages/EditNotePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="h-screen">
          <Toaster />
          <Routes>
            <Route element={<Navbar />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/add"
                element={
                  <RequireAuth>
                    <AddNotePage />
                  </RequireAuth>
                }
              />
              <Route
                path="/edit/:noteId"
                element={
                  <RequireAuth>
                    <EditNotePage />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
