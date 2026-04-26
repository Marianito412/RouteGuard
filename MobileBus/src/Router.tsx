import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import EmployeePage from "./pages/EmployeePage.tsx";
import ParentPage from "./pages/ParentPage.tsx";

const router = createBrowserRouter([
  {
    path: '/Employee',
    element: <EmployeePage/>
  },
  {
    path: '/Parent',
    element: <ParentPage/>
  }
]);

export function Router() {
  return <RouterProvider router={router}/>;
}
