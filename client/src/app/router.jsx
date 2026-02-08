import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./layout/AppLayout";

import HomePage from "../pages/HomePage";
import MapPage from "../pages/MapPage";
import MarkersPage from "../pages/MarkersPage";
import PosterPage from "../pages/PosterPage";
import MuseumsPage from "../pages/MuseumsPage";
import ArticlesPage from "../pages/ArticlesPage";
import PhotosPage from "../pages/PhotosPage";
import PlannerPage from "../pages/PlannerPage";
import ClubsPage from "../pages/ClubsPage";
import ProfilePage from "../pages/ProfilePage";
import AdminPage from "../pages/AdminPage";
import AuthLoginPage from "../pages/AuthLoginPage";
import AuthRegisterPage from "../pages/AuthRegisterPage";
import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/map", element: <MapPage /> },
      { path: "/markers", element: <MarkersPage /> },

      { path: "/poster", element: <PosterPage /> },
      { path: "/museums", element: <MuseumsPage /> },
      { path: "/articles", element: <ArticlesPage /> },
      { path: "/photos", element: <PhotosPage /> },

      { path: "/planner", element: <PlannerPage /> },
      { path: "/clubs", element: <ClubsPage /> },

      { path: "/profile", element: <ProfilePage /> },
      { path: "/admin", element: <AdminPage /> },

      { path: "/auth/login", element: <AuthLoginPage /> },
      { path: "/auth/register", element: <AuthRegisterPage /> },
    ],
  },
]);

export default router;
