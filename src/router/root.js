import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";

const Loading = <div>Loading...</div>;
const MainPage = lazy(() => import("../pages/MainPage"));
const MapPage = lazy(() => import("../pages/MapPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const JoinPage = lazy(() => import("../pages/JoinPage"));
const BoardPage = lazy(() => import("../pages/BoardPage"));
const SellingPage = lazy(() => import("../pages/SellingPage"));

export default createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={Loading}>
        <MainPage />
      </Suspense>
    ),
  },
  {
    path: "/map",
    element: (
      <Suspense fallback={Loading}>
        <MapPage />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={Loading}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/join",
    element: (
      <Suspense fallback={Loading}>
        <JoinPage />
      </Suspense>
    ),
  },
  {
    path: "/board",
    element: (
      <Suspense fallback={Loading}>
        <BoardPage />
      </Suspense>
    ),
  },
  {
    path: "/selling",
    element: (
      <Suspense fallback={Loading}>
        <SellingPage />
      </Suspense>
    ),
  },
]);
