import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import NameInputPage from "../pages/VisitingReservation/NameInput";
import ReservationListNameInput from "../pages/ReservationList/NameInput";
import RelationshipInputPage from "../pages/VisitingReservation/RelationshipInput";
import DateSelectPage from "../pages/VisitingReservation/DateSelect";
import ReservationResultPage from "../pages/ReservationResult";
import WheterToEatPage from "../pages/OutingReservation/WheterToEat";
import ReservationListPage from "../pages/ReservationList";
import ElderyListPage from "../pages/admin/elderyListPage";
import ReservationDetail from "../pages/admin/ReservationDetail";
import ReservationUpdatePage from "../pages/admin/ReservationUpdate";
import ElderyUpdatePage from "../pages/admin/ElderyUpdatePage/ElderyUpdatePage";
import ReservationViewerPage from "../pages/admin/ReservationViewerPage";
import ElderyCreatePage from "../pages/admin/ElderyCreatePage";
import ReservationCreatePage from "../pages/admin/ReservationCreatePage";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "visitingReservation",
        children: [
          {
            path: "name-input",
            element: <NameInputPage type="reservation" />,
          },
          {
            path: "relationship-input",
            element: <RelationshipInputPage />,
          },
          {
            path: "date-select",
            element: <DateSelectPage />,
          },
          {
            path: "result",
            element: <ReservationResultPage />,
          },
        ],
      },
      {
        path: "outingReservation",
        children: [
          {
            path: "name-input",
            element: <NameInputPage type="reservation" />,
          },
          {
            path: "relationship-input",
            element: <RelationshipInputPage />,
          },
          {
            path: "date-select",
            element: <DateSelectPage />,
          },
          {
            path: "whether-to-eat",
            element: <WheterToEatPage />,
          },
          {
            path: "result",
            element: <ReservationResultPage />,
          },
        ],
      },
      {
        path: "reservation-check",
        children: [
          {
            path: "name-input",
            element: <ReservationListNameInput />,
          },
          {
            path: "list",
            element: <ReservationListPage />,
          },
        ],
      },
      {
        path: "admin",
        children: [
          {
            index: true,
            element: <ReservationViewerPage />,
          },
          {
            path: "elderly-list",
            children: [
              {
                index: true,
                element: <ElderyListPage />,
              },
              {
                path: ":elderyId/update",
                element: <ElderyUpdatePage />,
              },
            ],
          },
          {
            path: "elderly-create",
            element: <ElderyCreatePage />,
          },
          {
            path: "reservation-create",
            element: <ReservationCreatePage />,
          },
          {
            path: "reservation-detail",
            element: <ReservationDetail />,
          },
          {
            path: "reservation-update",
            element: <ReservationUpdatePage />,
          },
        ],
      },
    ],
  },
]);
