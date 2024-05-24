import EmptyDataset from "@/components/custom/shared/EmptyDataset";
import MainLayout from "@/layouts/MainLayout";
import SwapMarketPage from "@/pages/SwapMarketPage";
import { ReactNode } from "react";

interface IRoutesType {
  id: string;
  title: string;
  path: string;
  element: ReactNode;
  layout?: ReactNode;
  child_routes?: IRoutesType[];
}

const NotFoundPage = () => (
  <div className="min-h-[420px] flex items-center">
    <EmptyDataset navigateTo="/"></EmptyDataset>
  </div >
);

export const clientSideRoutes: IRoutesType[] = [
  {
    id: 'swapup-main-layout',
    title: "SwapUp Main layout",
    path: "/",
    element: <SwapMarketPage />,
    layout: <MainLayout />,
    child_routes: [
      {
        id: 'swap-market-page',
        title: "Swap Market Page",
        path: "",
        element: <SwapMarketPage />,
      },
      {
        id: 'not-found-page',
        title: "Not found Page",
        path: "*",
        element: <NotFoundPage />,
      }
    ]
  },
];
