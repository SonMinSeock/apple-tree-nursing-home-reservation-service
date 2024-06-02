import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import NameInputPage from "../pages/VisitingReservation/NameInput";
import ReservationListNameInput from "../pages/ReservationList/NameInput";
import RelationshipInputPage from "../pages/VisitingReservation/RelationshipInput";
import DateSelectPage from "../pages/VisitingReservation/DateSelect";
import ReservationResultPage from "../pages/ReservationResult";
import WheterToEatPage from "../pages/OutingReservation/WheterToEat";
import ReservationListPage from "../pages/ReservationList";
import VisitingReservationViewerPage from "../pages/admin/VisitingReservationViewerPage";

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
        element: <VisitingReservationViewerPage />,
      },
    ],
  },
]);
