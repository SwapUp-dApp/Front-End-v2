import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import EmptyDataset from "@/components/custom/shared/EmptyDataset";
import { toast } from "sonner";
import FilterButton from "@/components/custom/shared/FilterButton";
import { DrawerTrigger, Drawer, DrawerContent, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import CustomOutlineButton from "@/components/custom/shared/CustomOutlineButton";
//import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";



//import { useNavigate } from "react-router-dom";
//import { useSwapMarketStore } from "@/store/swap-market";

// import { useNavigate } from "react-router-dom";
// import { useSwapMarketStore } from "@/store/swap-market";
import ToastLookCard from "@/components/custom/shared/ToastLookCard";
import { useSwapMarketStore } from "@/store/swap-market";
import PendingSwapsTabContent from "@/components/custom/swap_market/my-swaps/PendingSwapsTabContent";
import SwapHistoryTabContent from "@/components/custom/swap_market/my-swaps/SwapHistoryTabContent";

// export interface IPendingSwapTableItem {
//   assets: {
//     from: string[];
//     to: string[];
//   };
//   unique_trade_id: string;
//   status: 'sent' | 'received';
//   swap_mode: 'open market' | 'private';
//   offer_type: 'primary offer' | 'counter offer';
//   counter_party_wallet: string,
//   trading_chain: {
//     title: string;
//     icon: React.ReactNode;
//   },
//   request_date: string,
// }

export interface ISwapHistoryTableItem {
  assets: {
    from: string[];
    to: string[];
  };
  unique_trade_id: string;
  swap_mode: 'open market' | 'private';
  status: 'completed' | 'declined';
  counter_party_wallet: string,
  trading_chain: {
    title: string;
    icon: React.ReactNode;
  },
  offerreview_date: string,
}



const swapHistoryTableData: ISwapHistoryTableItem[] = [
  {
    assets: {
      from: ['/assets/nfts/from1.png', '/assets/nfts/from2.png', '/assets/nfts/from3.png', '/assets/nfts/from4.png', '/assets/nfts/from4.png'],
      to: ['/assets/nfts/to1.png', '/assets/nfts/to2.png', '/assets/nfts/to3.png', '/assets/nfts/from4.png']
    },
    unique_trade_id: '#46Aic2o',
    swap_mode: 'open market',
    status: 'completed',
    counter_party_wallet: '0x6723F...7B3E5',
    offerreview_date: 'Apr 08, 2024',
    trading_chain: {
      icon: <svg className="w-4" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 6.00002C12 9.31374 9.31374 12 6.00002 12C2.6863 12 0 9.31374 0 6.00002C0 2.6863 2.6863 0 6.00002 0C9.31374 0 12 2.6863 12 6.00002ZM3.87761 7.3189C3.81937 7.31884 3.76345 7.34175 3.72199 7.38265L2.65773 8.43828C2.64228 8.45355 2.63174 8.47307 2.62745 8.49436C2.62316 8.51566 2.62533 8.53774 2.63366 8.5578C2.642 8.57785 2.65613 8.59496 2.67425 8.60694C2.69236 8.61892 2.71364 8.62522 2.73536 8.62503H8.12263C8.18093 8.625 8.23685 8.60195 8.27826 8.56091L9.34251 7.50528C9.35802 7.49007 9.36861 7.47056 9.37293 7.44927C9.37725 7.42798 9.3751 7.40588 9.36675 7.38583C9.35839 7.36578 9.34423 7.34868 9.32607 7.33676C9.30792 7.32483 9.28661 7.31861 9.26488 7.3189H3.87761ZM3.87761 3.37501C3.81937 3.37495 3.76345 3.39786 3.72199 3.43876L2.65773 4.49477C2.64241 4.51005 2.63198 4.52955 2.62777 4.55077C2.62356 4.572 2.62575 4.594 2.63407 4.61398C2.64239 4.63395 2.65646 4.65101 2.6745 4.66297C2.69253 4.67492 2.71372 4.68125 2.73536 4.68114H8.12263C8.18087 4.68121 8.23679 4.6583 8.27826 4.61739L9.34251 3.56176C9.41189 3.49276 9.36276 3.37501 9.26488 3.37501H3.87761ZM8.12263 5.3344C8.18087 5.33433 8.23679 5.35724 8.27826 5.39815L9.34251 6.45377C9.35796 6.46904 9.3685 6.48857 9.37279 6.50986C9.37708 6.53115 9.37492 6.55323 9.36658 6.57329C9.35825 6.59334 9.34412 6.61046 9.326 6.62243C9.30788 6.63441 9.2866 6.64071 9.26488 6.64053H3.87761C3.81949 6.64053 3.76324 6.61765 3.72199 6.57678L2.65773 5.52115C2.64228 5.50588 2.63174 5.48636 2.62745 5.46506C2.62316 5.44377 2.62533 5.42169 2.63366 5.40163C2.642 5.38158 2.65613 5.36447 2.67425 5.35249C2.69236 5.34051 2.71364 5.33421 2.73536 5.3344H8.12263Z" fill="#66F9A1" />
      </svg>,
      title: 'Solana'
    }
  },
  {
    assets: {
      from: ['/assets/nfts/from1.png', '/assets/nfts/from2.png', '/assets/nfts/from3.png', '/assets/nfts/from4.png'],
      to: ['/assets/nfts/to1.png', '/assets/nfts/to2.png', '/assets/nfts/to3.png']
    },
    unique_trade_id: '#32Bic1o',
    swap_mode: 'private',
    status: 'declined',
    counter_party_wallet: '0x6723F...4E1A2',
    offerreview_date: 'Apr 03, 2024',
    trading_chain: {
      icon: <svg className="w-4" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 6.00002C12 9.31374 9.31374 12 6.00002 12C2.6863 12 0 9.31374 0 6.00002C0 2.6863 2.6863 0 6.00002 0C9.31374 0 12 2.6863 12 6.00002ZM3.87761 7.3189C3.81937 7.31884 3.76345 7.34175 3.72199 7.38265L2.65773 8.43828C2.64228 8.45355 2.63174 8.47307 2.62745 8.49436C2.62316 8.51566 2.62533 8.53774 2.63366 8.5578C2.642 8.57785 2.65613 8.59496 2.67425 8.60694C2.69236 8.61892 2.71364 8.62522 2.73536 8.62503H8.12263C8.18093 8.625 8.23685 8.60195 8.27826 8.56091L9.34251 7.50528C9.35802 7.49007 9.36861 7.47056 9.37293 7.44927C9.37725 7.42798 9.3751 7.40588 9.36675 7.38583C9.35839 7.36578 9.34423 7.34868 9.32607 7.33676C9.30792 7.32483 9.28661 7.31861 9.26488 7.3189H3.87761ZM3.87761 3.37501C3.81937 3.37495 3.76345 3.39786 3.72199 3.43876L2.65773 4.49477C2.64241 4.51005 2.63198 4.52955 2.62777 4.55077C2.62356 4.572 2.62575 4.594 2.63407 4.61398C2.64239 4.63395 2.65646 4.65101 2.6745 4.66297C2.69253 4.67492 2.71372 4.68125 2.73536 4.68114H8.12263C8.18087 4.68121 8.23679 4.6583 8.27826 4.61739L9.34251 3.56176C9.41189 3.49276 9.36276 3.37501 9.26488 3.37501H3.87761ZM8.12263 5.3344C8.18087 5.33433 8.23679 5.35724 8.27826 5.39815L9.34251 6.45377C9.35796 6.46904 9.3685 6.48857 9.37279 6.50986C9.37708 6.53115 9.37492 6.55323 9.36658 6.57329C9.35825 6.59334 9.34412 6.61046 9.326 6.62243C9.30788 6.63441 9.2866 6.64071 9.26488 6.64053H3.87761C3.81949 6.64053 3.76324 6.61765 3.72199 6.57678L2.65773 5.52115C2.64228 5.50588 2.63174 5.48636 2.62745 5.46506C2.62316 5.44377 2.62533 5.42169 2.63366 5.40163C2.642 5.38158 2.65613 5.36447 2.67425 5.35249C2.69236 5.34051 2.71364 5.33421 2.73536 5.3344H8.12263Z" fill="#66F9A1" />
      </svg>,
      title: 'Solana'
    }
  },
  {
    assets: {
      from: ['/assets/nfts/from1.png',],
      to: ['/assets/nfts/to3.png']
    },
    unique_trade_id: '#12Bic1o',
    swap_mode: 'open market',
    status: 'completed',
    counter_party_wallet: '0x6723F...4E1A2',
    offerreview_date: 'Apr 03, 2024',
    trading_chain: {
      icon: <svg className="w-4" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 6.00002C12 9.31374 9.31374 12 6.00002 12C2.6863 12 0 9.31374 0 6.00002C0 2.6863 2.6863 0 6.00002 0C9.31374 0 12 2.6863 12 6.00002ZM3.87761 7.3189C3.81937 7.31884 3.76345 7.34175 3.72199 7.38265L2.65773 8.43828C2.64228 8.45355 2.63174 8.47307 2.62745 8.49436C2.62316 8.51566 2.62533 8.53774 2.63366 8.5578C2.642 8.57785 2.65613 8.59496 2.67425 8.60694C2.69236 8.61892 2.71364 8.62522 2.73536 8.62503H8.12263C8.18093 8.625 8.23685 8.60195 8.27826 8.56091L9.34251 7.50528C9.35802 7.49007 9.36861 7.47056 9.37293 7.44927C9.37725 7.42798 9.3751 7.40588 9.36675 7.38583C9.35839 7.36578 9.34423 7.34868 9.32607 7.33676C9.30792 7.32483 9.28661 7.31861 9.26488 7.3189H3.87761ZM3.87761 3.37501C3.81937 3.37495 3.76345 3.39786 3.72199 3.43876L2.65773 4.49477C2.64241 4.51005 2.63198 4.52955 2.62777 4.55077C2.62356 4.572 2.62575 4.594 2.63407 4.61398C2.64239 4.63395 2.65646 4.65101 2.6745 4.66297C2.69253 4.67492 2.71372 4.68125 2.73536 4.68114H8.12263C8.18087 4.68121 8.23679 4.6583 8.27826 4.61739L9.34251 3.56176C9.41189 3.49276 9.36276 3.37501 9.26488 3.37501H3.87761ZM8.12263 5.3344C8.18087 5.33433 8.23679 5.35724 8.27826 5.39815L9.34251 6.45377C9.35796 6.46904 9.3685 6.48857 9.37279 6.50986C9.37708 6.53115 9.37492 6.55323 9.36658 6.57329C9.35825 6.59334 9.34412 6.61046 9.326 6.62243C9.30788 6.63441 9.2866 6.64071 9.26488 6.64053H3.87761C3.81949 6.64053 3.76324 6.61765 3.72199 6.57678L2.65773 5.52115C2.64228 5.50588 2.63174 5.48636 2.62745 5.46506C2.62316 5.44377 2.62533 5.42169 2.63366 5.40163C2.642 5.38158 2.65613 5.36447 2.67425 5.35249C2.69236 5.34051 2.71364 5.33421 2.73536 5.3344H8.12263Z" fill="#66F9A1" />
      </svg>,
      title: 'Solana'
    }
  },
  {
    assets: {
      from: ['/assets/nfts/from1.png', '/assets/nfts/from2.png', '/assets/nfts/from3.png', '/assets/nfts/from4.png', '/assets/nfts/from4.png', '/assets/nfts/from4.png'],
      to: ['/assets/nfts/to1.png', '/assets/nfts/to2.png', '/assets/nfts/to3.png']
    },
    unique_trade_id: '#46Aic2o',
    swap_mode: 'private',
    status: 'declined',
    counter_party_wallet: '0x6723F...4E1A2',
    offerreview_date: 'May 08, 2024',
    trading_chain: {
      icon: <svg className="w-4" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 6.00002C12 9.31374 9.31374 12 6.00002 12C2.6863 12 0 9.31374 0 6.00002C0 2.6863 2.6863 0 6.00002 0C9.31374 0 12 2.6863 12 6.00002ZM3.87761 7.3189C3.81937 7.31884 3.76345 7.34175 3.72199 7.38265L2.65773 8.43828C2.64228 8.45355 2.63174 8.47307 2.62745 8.49436C2.62316 8.51566 2.62533 8.53774 2.63366 8.5578C2.642 8.57785 2.65613 8.59496 2.67425 8.60694C2.69236 8.61892 2.71364 8.62522 2.73536 8.62503H8.12263C8.18093 8.625 8.23685 8.60195 8.27826 8.56091L9.34251 7.50528C9.35802 7.49007 9.36861 7.47056 9.37293 7.44927C9.37725 7.42798 9.3751 7.40588 9.36675 7.38583C9.35839 7.36578 9.34423 7.34868 9.32607 7.33676C9.30792 7.32483 9.28661 7.31861 9.26488 7.3189H3.87761ZM3.87761 3.37501C3.81937 3.37495 3.76345 3.39786 3.72199 3.43876L2.65773 4.49477C2.64241 4.51005 2.63198 4.52955 2.62777 4.55077C2.62356 4.572 2.62575 4.594 2.63407 4.61398C2.64239 4.63395 2.65646 4.65101 2.6745 4.66297C2.69253 4.67492 2.71372 4.68125 2.73536 4.68114H8.12263C8.18087 4.68121 8.23679 4.6583 8.27826 4.61739L9.34251 3.56176C9.41189 3.49276 9.36276 3.37501 9.26488 3.37501H3.87761ZM8.12263 5.3344C8.18087 5.33433 8.23679 5.35724 8.27826 5.39815L9.34251 6.45377C9.35796 6.46904 9.3685 6.48857 9.37279 6.50986C9.37708 6.53115 9.37492 6.55323 9.36658 6.57329C9.35825 6.59334 9.34412 6.61046 9.326 6.62243C9.30788 6.63441 9.2866 6.64071 9.26488 6.64053H3.87761C3.81949 6.64053 3.76324 6.61765 3.72199 6.57678L2.65773 5.52115C2.64228 5.50588 2.63174 5.48636 2.62745 5.46506C2.62316 5.44377 2.62533 5.42169 2.63366 5.40163C2.642 5.38158 2.65613 5.36447 2.67425 5.35249C2.69236 5.34051 2.71364 5.33421 2.73536 5.3344H8.12263Z" fill="#66F9A1" />
      </svg>,
      title: 'Solana'
    }
  },
  {
    assets: {
      from: ['/assets/nfts/from1.png', '/assets/nfts/from2.png', '/assets/nfts/from3.png', '/assets/nfts/from4.png', '/assets/nfts/from4.png', '/assets/nfts/from4.png'],
      to: ['/assets/nfts/to1.png', '/assets/nfts/to2.png', '/assets/nfts/to3.png']
    },
    unique_trade_id: '#46Aic2o',
    swap_mode: 'private',
    status: 'declined',
    counter_party_wallet: '0x6723F...4E1A2',
    offerreview_date: 'Jun 08, 2024',
    trading_chain: {
      icon: <svg className="w-4" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 6.00002C12 9.31374 9.31374 12 6.00002 12C2.6863 12 0 9.31374 0 6.00002C0 2.6863 2.6863 0 6.00002 0C9.31374 0 12 2.6863 12 6.00002ZM3.87761 7.3189C3.81937 7.31884 3.76345 7.34175 3.72199 7.38265L2.65773 8.43828C2.64228 8.45355 2.63174 8.47307 2.62745 8.49436C2.62316 8.51566 2.62533 8.53774 2.63366 8.5578C2.642 8.57785 2.65613 8.59496 2.67425 8.60694C2.69236 8.61892 2.71364 8.62522 2.73536 8.62503H8.12263C8.18093 8.625 8.23685 8.60195 8.27826 8.56091L9.34251 7.50528C9.35802 7.49007 9.36861 7.47056 9.37293 7.44927C9.37725 7.42798 9.3751 7.40588 9.36675 7.38583C9.35839 7.36578 9.34423 7.34868 9.32607 7.33676C9.30792 7.32483 9.28661 7.31861 9.26488 7.3189H3.87761ZM3.87761 3.37501C3.81937 3.37495 3.76345 3.39786 3.72199 3.43876L2.65773 4.49477C2.64241 4.51005 2.63198 4.52955 2.62777 4.55077C2.62356 4.572 2.62575 4.594 2.63407 4.61398C2.64239 4.63395 2.65646 4.65101 2.6745 4.66297C2.69253 4.67492 2.71372 4.68125 2.73536 4.68114H8.12263C8.18087 4.68121 8.23679 4.6583 8.27826 4.61739L9.34251 3.56176C9.41189 3.49276 9.36276 3.37501 9.26488 3.37501H3.87761ZM8.12263 5.3344C8.18087 5.33433 8.23679 5.35724 8.27826 5.39815L9.34251 6.45377C9.35796 6.46904 9.3685 6.48857 9.37279 6.50986C9.37708 6.53115 9.37492 6.55323 9.36658 6.57329C9.35825 6.59334 9.34412 6.61046 9.326 6.62243C9.30788 6.63441 9.2866 6.64071 9.26488 6.64053H3.87761C3.81949 6.64053 3.76324 6.61765 3.72199 6.57678L2.65773 5.52115C2.64228 5.50588 2.63174 5.48636 2.62745 5.46506C2.62316 5.44377 2.62533 5.42169 2.63366 5.40163C2.642 5.38158 2.65613 5.36447 2.67425 5.35249C2.69236 5.34051 2.71364 5.33421 2.73536 5.3344H8.12263Z" fill="#66F9A1" />
      </svg>,
      title: 'Solana'
    }
  },
  {
    assets: {
      from: ['/assets/nfts/from2.png', '/assets/nfts/from3.png'],
      to: ['/assets/nfts/to1.png', '/assets/nfts/to3.png']
    },
    unique_trade_id: '#46Aic2o',
    swap_mode: 'private',
    status: 'completed',
    counter_party_wallet: '0x6723F...4E1A2',
    offerreview_date: 'Mar 08, 2023',
    trading_chain: {
      icon: <svg className="w-4" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 6.00002C12 9.31374 9.31374 12 6.00002 12C2.6863 12 0 9.31374 0 6.00002C0 2.6863 2.6863 0 6.00002 0C9.31374 0 12 2.6863 12 6.00002ZM3.87761 7.3189C3.81937 7.31884 3.76345 7.34175 3.72199 7.38265L2.65773 8.43828C2.64228 8.45355 2.63174 8.47307 2.62745 8.49436C2.62316 8.51566 2.62533 8.53774 2.63366 8.5578C2.642 8.57785 2.65613 8.59496 2.67425 8.60694C2.69236 8.61892 2.71364 8.62522 2.73536 8.62503H8.12263C8.18093 8.625 8.23685 8.60195 8.27826 8.56091L9.34251 7.50528C9.35802 7.49007 9.36861 7.47056 9.37293 7.44927C9.37725 7.42798 9.3751 7.40588 9.36675 7.38583C9.35839 7.36578 9.34423 7.34868 9.32607 7.33676C9.30792 7.32483 9.28661 7.31861 9.26488 7.3189H3.87761ZM3.87761 3.37501C3.81937 3.37495 3.76345 3.39786 3.72199 3.43876L2.65773 4.49477C2.64241 4.51005 2.63198 4.52955 2.62777 4.55077C2.62356 4.572 2.62575 4.594 2.63407 4.61398C2.64239 4.63395 2.65646 4.65101 2.6745 4.66297C2.69253 4.67492 2.71372 4.68125 2.73536 4.68114H8.12263C8.18087 4.68121 8.23679 4.6583 8.27826 4.61739L9.34251 3.56176C9.41189 3.49276 9.36276 3.37501 9.26488 3.37501H3.87761ZM8.12263 5.3344C8.18087 5.33433 8.23679 5.35724 8.27826 5.39815L9.34251 6.45377C9.35796 6.46904 9.3685 6.48857 9.37279 6.50986C9.37708 6.53115 9.37492 6.55323 9.36658 6.57329C9.35825 6.59334 9.34412 6.61046 9.326 6.62243C9.30788 6.63441 9.2866 6.64071 9.26488 6.64053H3.87761C3.81949 6.64053 3.76324 6.61765 3.72199 6.57678L2.65773 5.52115C2.64228 5.50588 2.63174 5.48636 2.62745 5.46506C2.62316 5.44377 2.62533 5.42169 2.63366 5.40163C2.642 5.38158 2.65613 5.36447 2.67425 5.35249C2.69236 5.34051 2.71364 5.33421 2.73536 5.3344H8.12263Z" fill="#66F9A1" />
      </svg>,
      title: 'Solana'
    }
  },
];


const MySwapsPage = () => {

  const [filteredSwapHistoryData, setFilteredSwapHistoryData] = useState<ISwapHistoryTableItem[] | []>(swapHistoryTableData);
  // const [filteredPendingSwapData, setFilteredPendingSwapData] = useState<IPendingSwapTableItem[] | []>(pendingSwapTableData);


  // const navigate = useNavigate();
  //const wallet = useSwapMarketStore(state => state.wallet);

  const [activeTab, setActiveTab] = useState<"pending-swaps" | "swap-history">("swap-history");

  const pendingSwapsLength = useSwapMarketStore(state => (state.privateMarket.pendingSwaps || []).length);
  const swapHistoryLength = useSwapMarketStore(state => (state.privateMarket.swapHistory || []).length);



  const [isOpen, setIsOpen] = useState(false);

   



  const nftsImageMapper = (nfts: string[]) => {
    return (
      nfts.map((image, index) => {
        if (index < 3)
          return (
            <div className="relative w-8 h-8" key={image}>
              <img className="w-full h-full object-cover rounded-xs border-[1.5px] border-white/20" src={image} alt="nft" />
              {
                (index === 2) &&
                  nfts.length > 3 ?
                  <div className="absolute w-full h-full rounded-xs bg-black/50 top-0 flex justify-center items-center font-semibold" >
                    +{nfts.length - 3}
                  </div> : ''
              }
            </div>
          );
      })
    );
  };

  const handleSwitchTab = (value: "pending-swaps" | "swap-history") => {
    setActiveTab(value);
  };

  const handleShowWalletConnectionToast = () => {
    toast.custom(
      (id) => (
        <ToastLookCard
          variant="error"
          title="Connect to wallet!"
          description={"Please connect to wallet for this feature!"}
          onClose={() => toast.dismiss(id)}
        />
      ),
      {
        duration: 3000,
        className: 'w-full !bg-transparent',
        position: "bottom-left",
      }
    );
  };

  const handleFilterData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();

    const newFilteredDataOne = swapHistoryTableData.filter((item) => (
      item.status.toLocaleLowerCase().includes(value) ||
      item.counter_party_wallet.toLowerCase().includes(value) ||
      item.offerreview_date.toLowerCase().includes(value) ||
      item.unique_trade_id.toLowerCase().includes(value)
    ));
    setFilteredSwapHistoryData(newFilteredDataOne);

    // const newFilteredDataTwo = pendingSwapTableData.filter((item) => (
    //   item.status.toLocaleLowerCase().includes(value) ||
    //   item.counter_party_wallet.toLowerCase().includes(value) ||
    //   item.request_date.toLowerCase().includes(value) ||
    //   item.unique_trade_id.toLowerCase().includes(value)
    // ));
    // setFilteredPendingSwapData(newFilteredDataTwo);

  };

  const handleResetFilters = () => { };
  return (
    <>
      <section className="space-y-4" >
        {/* Title */}
        <div className="flex items-center justify-between" >
          <h2 className="text-2xl font-semibold" >My Swaps</h2>
          <Input
            className="w-1/3 bg-su_enable_bg text-su_secondary !p-3.5 mr-1"
            placeholder="Search by asset name or wallet address..."
            onChange={handleFilterData}
            icon={
              <svg className="w-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 14.6154L11.2277 9.84231C11.9968 8.78544 12.4105 7.5117 12.4092 6.20462C12.4092 2.78346 9.62577 0 6.20462 0C2.78346 0 0 2.78346 0 6.20462C0 9.62577 2.78346 12.4092 6.20462 12.4092C7.5117 12.4105 8.78544 11.9968 9.84231 11.2277L14.6154 16L16 14.6154ZM6.20462 10.4496C5.36493 10.4497 4.54407 10.2008 3.84586 9.7343C3.14765 9.26784 2.60345 8.60481 2.28208 7.82905C1.96071 7.05329 1.8766 6.19965 2.0404 5.37609C2.2042 4.55253 2.60854 3.79604 3.20229 3.20229C3.79604 2.60854 4.55253 2.2042 5.37609 2.0404C6.19965 1.8766 7.05329 1.96071 7.82905 2.28208C8.60481 2.60345 9.26784 3.14765 9.7343 3.84586C10.2008 4.54407 10.4497 5.36493 10.4496 6.20462C10.4483 7.33005 10.0006 8.40902 9.20482 9.20482C8.40902 10.0006 7.33005 10.4483 6.20462 10.4496Z" fill="#868691" />
              </svg>
            }
          />
        </div>


        <div className="overflow-x-scroll lg:overflow-hidden" >
          <Tabs defaultValue="swap-history" className="w-full">
            <TabsList className="border-b-2 border-su_enable_bg w-full justify-start rounded-none bg-transparent">
              <TabsTrigger value="pending-swaps" onClick={() => handleSwitchTab("pending-swaps")} >
                Pending
                <span className={`bg-text font-semibold rounded-full py-0.5 px-3 text-xs ${activeTab === 'pending-swaps' ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground'}`}>
                  {pendingSwapsLength}
                </span>
              </TabsTrigger>
              <TabsTrigger value="swap-history" onClick={() => handleSwitchTab("swap-history")}>
                History
                <span className={`bg-text font-semibold rounded-full py-0.5 px-3 text-xs ${activeTab === 'swap-history' ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground'}`}>
                  {swapHistoryLength}
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending-swaps" className="w-full flex justify-center">
              {/* Title */}

              <PendingSwapsTabContent handleShowWalletConnectionToast={handleShowWalletConnectionToast} />

            </TabsContent>

            <TabsContent value="swap-history" className="w-full flex flex-col gap-4">

              {/* Title */}

              {/* <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold min-w-[288px]">Assets</TableHead>
                    <TableHead className="font-semibold min-w-[150px] pl-8" >Unique trade ID</TableHead>
                    <TableHead className="font-semibold px-4" >Counterparty wallet address</TableHead>
                    <TableHead className="font-semibold px-4" >Swap mode</TableHead>
                    <TableHead className="font-semibold px-4" >Trading chain</TableHead>
                    <TableHead className="font-semibold px-4" >Offer review date</TableHead>
                    <TableHead className="font-semibold px-4" >Status</TableHead>
                    <TableHead className="w-[130px] pr-2" >
                      <div className="flex items-center gap-2" >
                        <Drawer direction="right" open={isOpen} onClose={() => setIsOpen(false)} >

                          <DrawerTrigger onClick={() => setIsOpen(true)} >
                            <FilterButton />
                          </DrawerTrigger>

                          <DrawerContent className="p-3 h-screen w-1/3 right-0 bg-transparent" >
                            <div className="rounded-sm h-full w-full bg-su_secondary_bg flex flex-col gap-4 p-4" >
                              <DrawerTitle className="text-su_primary" >
                                <div className="flex justify-between items-start">
                                  <h2 className="font-semibold text-xl pt-2" >Filter options</h2>
                                  <DrawerClose
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 rounded-xs hover:bg-su_active_bg" >
                                    <svg className="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                      <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                    </svg>
                                  </DrawerClose>
                                </div>

                                <p className="text-su_secondary text-base font-medium" >Refine your search with custom filters:</p>
                              </DrawerTitle>

                              <div className="space-y-3" >


                                <div className="flex items-center space-x-2">
                                  <Switch id="airplane-mode" />
                                  <Label htmlFor="airplane-mode">Show offers from only current chain</Label>
                                </div>


                                <div className="h-full space-y-2">
                                  <div className="flex justify-between items-center text-sm" >
                                    <p>Status</p>
                                    <button onClick={handleResetFilters} type="reset" className="flex items-center gap-2 py-1 px-2 rounded-sm hover:bg-su_active_bg" >
                                      <svg className="w-3" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 12C4.46667 12 3.13067 11.4918 1.992 10.4753C0.853333 9.45889 0.200444 8.18933 0.0333333 6.66667H1.4C1.55556 7.82222 2.06956 8.77778 2.942 9.53333C3.81444 10.2889 4.83378 10.6667 6 10.6667C7.3 10.6667 8.40289 10.214 9.30867 9.30867C10.2144 8.40333 10.6671 7.30045 10.6667 6C10.6662 4.69956 10.2136 3.59689 9.30867 2.692C8.40378 1.78711 7.30089 1.33422 6 1.33333C5.23333 1.33333 4.51667 1.51111 3.85 1.86667C3.18333 2.22222 2.62222 2.71111 2.16667 3.33333H4V4.66667H0V0.666667H1.33333V2.23333C1.9 1.52222 2.59178 0.972222 3.40867 0.583333C4.22556 0.194444 5.08933 0 6 0C6.83333 0 7.614 0.158445 8.342 0.475333C9.07 0.792222 9.70333 1.21978 10.242 1.758C10.7807 2.29622 11.2084 2.92956 11.5253 3.658C11.8422 4.38645 12.0004 5.16711 12 6C11.9996 6.83289 11.8413 7.61356 11.5253 8.342C11.2093 9.07045 10.7816 9.70378 10.242 10.242C9.70244 10.7802 9.06911 11.208 8.342 11.5253C7.61489 11.8427 6.83422 12.0009 6 12Z" fill="#B6B6BD" />
                                      </svg>

                                      Reset
                                    </button>

                                  </div>

                                  <div className="flex justify-between items-center text-sm" >
                                    <ToggleGroup type="single">
                                      <ToggleGroupItem value="all" aria-label="Toggle bold">All</ToggleGroupItem>
                                      <ToggleGroupItem value="completed" aria-label="Toggle bold" >Completed</ToggleGroupItem>
                                      <ToggleGroupItem value="declined" aria-label="Toggle bold">Declined</ToggleGroupItem>
                                      <ToggleGroupItem value="cancelled" aria-label="Toggle bold">Cancelled</ToggleGroupItem>
                                    </ToggleGroup>
                                  </div>


                                  <div className="flex justify-between items-center text-sm" >
                                    <p>Swap mode</p>
                                    <button onClick={handleResetFilters} type="reset" className="flex items-center gap-2 py-1 px-2 rounded-sm hover:bg-su_active_bg" >
                                      <svg className="w-3" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 12C4.46667 12 3.13067 11.4918 1.992 10.4753C0.853333 9.45889 0.200444 8.18933 0.0333333 6.66667H1.4C1.55556 7.82222 2.06956 8.77778 2.942 9.53333C3.81444 10.2889 4.83378 10.6667 6 10.6667C7.3 10.6667 8.40289 10.214 9.30867 9.30867C10.2144 8.40333 10.6671 7.30045 10.6667 6C10.6662 4.69956 10.2136 3.59689 9.30867 2.692C8.40378 1.78711 7.30089 1.33422 6 1.33333C5.23333 1.33333 4.51667 1.51111 3.85 1.86667C3.18333 2.22222 2.62222 2.71111 2.16667 3.33333H4V4.66667H0V0.666667H1.33333V2.23333C1.9 1.52222 2.59178 0.972222 3.40867 0.583333C4.22556 0.194444 5.08933 0 6 0C6.83333 0 7.614 0.158445 8.342 0.475333C9.07 0.792222 9.70333 1.21978 10.242 1.758C10.7807 2.29622 11.2084 2.92956 11.5253 3.658C11.8422 4.38645 12.0004 5.16711 12 6C11.9996 6.83289 11.8413 7.61356 11.5253 8.342C11.2093 9.07045 10.7816 9.70378 10.242 10.242C9.70244 10.7802 9.06911 11.208 8.342 11.5253C7.61489 11.8427 6.83422 12.0009 6 12Z" fill="#B6B6BD" />
                                      </svg>

                                      Reset
                                    </button>
                                  </div>
                                  <div className="flex justify-between items-center text-sm" >
                                    <ToggleGroup type="single">
                                      <ToggleGroupItem value="all" aria-label="Toggle bold">All</ToggleGroupItem>
                                      <ToggleGroupItem value="openmarket" aria-label="Toggle bold" >Open Market</ToggleGroupItem>
                                      <ToggleGroupItem value="privateparty" aria-label="Toggle bold">Private Party</ToggleGroupItem>
                                    </ToggleGroup>
                                  </div>

                                </div>
                                <div className="w-full grid grid-cols-2 gap-4" >
                                  <CustomOutlineButton onClick={handleResetFilters} >
                                    Clear filters
                                  </CustomOutlineButton>

                                  <Button variant={"default"} type="submit" >Apply filters</Button>

                                </div>
                              </div>
                            </div>
                          </DrawerContent>
                        </Drawer>
                      </div>



                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y">
                  {
                    filteredSwapHistoryData?.map((data, index) => (
                      <TableRow key={data.unique_trade_id + index}>
                        <TableCell className="font-medium flex items-center gap-2">
                          <div className="flex items-center gap-1" >
                            {nftsImageMapper(data.assets.from)}
                          </div>

                          <svg className="w-4" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.72844 0L12 4.15863H0.238525V3.0368H9.21836L6.91377 0.793135L7.72844 0ZM11.7615 5.84137V6.9632H2.78164L5.08623 9.20687L4.27156 10L0 5.84137H11.7615Z" fill="#868691" />
                          </svg>

                          <div className="flex items-center gap-1" >
                            {nftsImageMapper(data.assets.to)}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium pl-8">{data.unique_trade_id}</TableCell>
                        <TableCell className="font-medium px-4">{data.counter_party_wallet}</TableCell>
                        <TableCell className="font-medium px-4">
                          <div className="w-auto flex justify-start" >{
                            data.swap_mode === "private" ?
                              <span className="flex items-center justify-center gap-2 py-2 px-3  rounded-full bg-su_enable_bg capitalize" >

                                {data.swap_mode}
                              </span>
                              :
                              <span className="flex items-center justify-center gap-2 p-2 rounded-full bg-su_enable_bg capitalize" >

                                {data.swap_mode}
                              </span>

                          }</div>
                        </TableCell>

                        <TableCell className="font-medium px-4 flex justify-start">
                          <span className="w-auto flex items-center justify-center gap-2 py-2 px-3 rounded-full bg-su_enable_bg capitalize" >
                            {data.trading_chain.icon} {data.trading_chain.title}
                          </span>
                        </TableCell>
                        <TableCell className="font-medium px-4">{data.offerreview_date}</TableCell>
                        <TableCell className="font-medium px-4 capitalize">{data.status}</TableCell>
                        <TableCell className="font-medium flex pr-8 justify-end">
                          <svg
                            onClick={() =>
                              toast.info("Options", {
                                duration: 2000,
                                description: "History View Feature is under construction!",
                                action: {
                                  label: "Close",
                                  onClick: () => console.log("Close"),
                                },
                                className: '!bg-gradient-primary border-none',
                                descriptionClassName: '!text-white',
                              })
                            }
                            className="w-12 h-6 cursor-pointer" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 8.3C9.42135 8.3 8.86639 8.53178 8.45722 8.94436C8.04805 9.35695 7.81818 9.91652 7.81818 10.5C7.81818 11.0835 8.04805 11.6431 8.45722 12.0556C8.86639 12.4682 9.42135 12.7 10 12.7C10.5787 12.7 11.1336 12.4682 11.5428 12.0556C11.9519 11.6431 12.1818 11.0835 12.1818 10.5C12.1818 9.91652 11.9519 9.35695 11.5428 8.94436C11.1336 8.53178 10.5787 8.3 10 8.3ZM10 14.1667C9.03558 14.1667 8.11065 13.7804 7.4287 13.0927C6.74675 12.4051 6.36364 11.4725 6.36364 10.5C6.36364 9.52754 6.74675 8.59491 7.4287 7.90728C8.11065 7.21964 9.03558 6.83333 10 6.83333C10.9644 6.83333 11.8893 7.21964 12.5713 7.90728C13.2532 8.59491 13.6364 9.52754 13.6364 10.5C13.6364 11.4725 13.2532 12.4051 12.5713 13.0927C11.8893 13.7804 10.9644 14.1667 10 14.1667ZM10 5C6.36364 5 3.25818 7.28067 2 10.5C3.25818 13.7193 6.36364 16 10 16C13.6364 16 16.7418 13.7193 18 10.5C16.7418 7.28067 13.6364 5 10 5Z" fill="#B6B6BD" />
                          </svg>
                        </TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
              {
                !filteredSwapHistoryData.length &&
                <EmptyDataset
                  title="Waiting for Swap Activity"
                  description="Your swap history is currently empty"
                >

                </EmptyDataset>
              } */}

              <SwapHistoryTabContent handleShowWalletConnectionToast={handleShowWalletConnectionToast} />

            </TabsContent>
          </Tabs>
        </div>

      </section >
    </>
  );
};

export default MySwapsPage;