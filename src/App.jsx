import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import { DarkModeProvider } from "./features/context/DarkModeContext";
import { NewBookingProvider } from "./features/context/NewBookingContext";

import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import SpinnerFullPage from "./ui/SpinnerFullPage";

// LAZY LOADING PAGES
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Checkin = lazy(() => import("./pages/Checkin"));
const Account = lazy(() => import("./pages/Account"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const NewBooking = lazy(() => import("./pages/NewBooking"));

// LAZY LOADING & PRE LOADING PAGES
const BookingsPromise = import("./pages/Bookings");
const Bookings = lazy(() => BookingsPromise);
const BookingPromise = import("./pages/Booking");
const Booking = lazy(() => BookingPromise);
const CabinsPromise = import("./pages/Cabins");
const Cabins = lazy(() => CabinsPromise);
const UsersPromise = import("./pages/Users");
const Users = lazy(() => UsersPromise);
const SettingsPromise = import("./pages/Settings");
const Settings = lazy(() => SettingsPromise);

const queryClient = new QueryClient({
  defaultOptions: {
    staleTime: 0 * 1000,
  },
});

function App() {
  return (
    <>
      <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <GlobalStyles />
          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                <Route
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate replace to="dashboard" />} />
                  <Route index path="dashboard" element={<Dashboard />} />
                  <Route path="bookings" element={<Bookings />} />
                  <Route path="bookings/:bookingId" element={<Booking />} />
                  <Route path="checkin/:bookingId" element={<Checkin />} />

                  <Route
                    path="new-booking"
                    element={
                      <NewBookingProvider>
                        <NewBooking />
                      </NewBookingProvider>
                    }
                  />

                  <Route path="cabins" element={<Cabins />} />
                  <Route path="users" element={<Users />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="account" element={<Account />} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>

          <Toaster
            position="top-right"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "var(--color-grey-0",
                color: "var(--color-grey-700",
              },
            }}
            reverseOrder={false}
          />
        </QueryClientProvider>
      </DarkModeProvider>
    </>
  );
}

export default App;
