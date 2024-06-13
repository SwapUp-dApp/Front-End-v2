
import { ReactNode } from "react";
import EmptyDataset from "@/components/custom/shared/EmptyDataset";
import MainLayout from "@/layouts/MainLayout";
import PrivateRoom from "@/pages/PrivateRoom";
import SwapMarketPage from "@/pages/SwapMarketPage";
import MySwapsPage from "@/pages/MySwapsPage";
import OpenMarket from "@/pages/OpenMarket";
import UserProfile from "@/pages/UserProfile";


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
    <EmptyDataset navigateTo="/swap-up/swap-market" showBackgroundPicture={false} />
  </div >
);

export const defaultFallbackRoute = "/swap-up/swap-market";

export const clientSideRoutes: IRoutesType[] = [
  {
    id: 'swapup-main-layout',
    title: "SwapUp Main layout",
    path: "/swap-up",
    element: <SwapMarketPage />,
    layout: <MainLayout />,
    child_routes: [
      {
        id: 'swap-market-page',
        title: "Swap Market Page",
        path: "swap-market",
        element: <SwapMarketPage />,
      },
      {
        id: 'my-swaps',
        title: "My Swaps Page",
        path: "my-swaps",
        element: <MySwapsPage />,
      },
      {
        id: 'private-room',
        title: "Private Room Page",
        path: "swap-market/private-room/:counterPartyWallet",
        element: <PrivateRoom />,
      },
      {
        id: 'open-market',
        title: "Create open market swap",
        path: "swap-market/open-market",
        element: <OpenMarket />,
      },
      {
        id: 'user-profile',
        title: "Profile",
        path: "profile",
        element: <UserProfile />,
      },
      {
        id: 'not-found-page',
        title: "Not found Page",
        path: "*",
        element: <NotFoundPage />,
      }
    ]
  },
  {
    id: 'not-found-page',
    title: "Not found Page",
    path: "*",
    element: <NotFoundPage />,
  }
];



