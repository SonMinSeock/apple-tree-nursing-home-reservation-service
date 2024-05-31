import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import NameInputPage from "../pages/VisitingReservation/NameInput";
import RelationshipInputPage from "../pages/VisitingReservation/RelationshipInput";
import DateSelectPage from "../pages/VisitingReservation/DateSelect";
import ReservationResultPage from "../pages/ReservationResult";

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
            element: <NameInputPage />,
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
    ],
  },
]);
