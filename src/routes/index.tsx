
import { ReactNode } from "react";
import EmptyDataset from "@/components/custom/shared/EmptyDataset";
import MainLayout from "@/layouts/MainLayout";
import PrivateRoom from "@/pages/PrivateRoom";
import SwapMarketPage from "@/pages/SwapMarketPage";
import MySwapsPage from "@/pages/MySwapsPage";
import UserProfile from "@/pages/UserProfile";
import ManageOpenMarketSwaps from "@/pages/ManageOpenMarketSwaps";
import OpenSwapCreationRoom from "@/pages/OpenSwapCreationRoom";
import OpenSwapProposeRoom from "@/pages/OpenSwapProposeRoom";
import ViewSwapRoom from "@/pages/ViewSwapRoom";
import SwapUpWebsite from "@/pages/SwapUpWebsite";


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
        id: 'create-private-swap',
        title: "Create private swap",
        path: "swap-market/private-swap/create/:counterPartyWallet/:privateTradeId",
        element: <PrivateRoom />,
      },
      {
        id: 'create-open-swap',
        title: "Create open market swap",
        path: "swap-market/open-swap/create/:openTradeId",
        element: <OpenSwapCreationRoom />,
      },
      {
        id: 'propose-open-swap',
        title: "Propose open swap room page",
        path: "swap-market/open-swap/propose/:openTradeId/:tradeId",
        element: <OpenSwapProposeRoom />,
      },
      {
        id: 'manage-open-market',
        title: "Manage Open Market Swaps",
        path: "swap-market/open-market/manage-open-market",
        element: <ManageOpenMarketSwaps />,
      },
      {
        id: 'view-swap',
        title: "View swap details",
        path: `swap-market/view-swap/:tradeId/?`,
        element: <ViewSwapRoom />,
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
        element: <SwapUpWebsite />,
      }
    ]
  },
  {
    id: 'not-found-page',
    title: "Not found Page",
    path: "*",
    element: <SwapUpWebsite />,
  }
];



