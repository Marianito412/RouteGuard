import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppShellBase from "./pages/AppShellBase.tsx";

const router = createBrowserRouter([
  {
    path: '',
    element: <AppShellBase/>
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}
