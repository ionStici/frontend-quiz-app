import { Layout } from "@/ui/layout/layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { basePath } from "./data/paths";
import { HomePage } from "./pages/home";
import { NotFound } from "./pages/not-found";
import { SubjectPage } from "./pages/subject";
import { ScorePage } from "./pages/score";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: basePath, element: <HomePage /> },
      { path: basePath + "/:subject", element: <SubjectPage /> },
      { path: basePath + "/score", element: <ScorePage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
