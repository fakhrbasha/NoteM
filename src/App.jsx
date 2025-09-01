import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Navbar from "./pages/Navbar"
import AuthLayout from "./layouts/AuthLayout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import MainLayout from "./layouts/MainLayout"
import Feed from "./pages/Feed"
import ProfileNote from "./pages/ProfileNote"
import NotFound from "./pages/NotFound"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import ProtectedAuthRoute from "./protectedRoute/protectedAuthRoute"
import ProtectedRoute from "./protectedRoute/ProtectedRoute"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Bounce, ToastContainer } from "react-toastify"

export const queryClient = new QueryClient();
const router = createBrowserRouter([
  {

    path: "", element: <AuthLayout />, children: [
      { path: 'login', element: <ProtectedAuthRoute><Login /></ProtectedAuthRoute> },
      { path: 'register', element: <ProtectedAuthRoute><Register /></ProtectedAuthRoute> }
    ],
  },
  {
    path: '', element: <MainLayout />, children: [
      { index: true, element: <ProtectedRoute><Feed /></ProtectedRoute> },
      { path: "profile", element: <ProtectedRoute><ProfileNote /></ProtectedRoute> },
      { path: "*", element: <NotFound /> }

    ]

  }

])

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />

      </QueryClientProvider>
    </>
  )
}

export default App
