import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import EmptyDataset from "@/components/custom/shared/EmptyDataset";
import { toast } from "sonner";
import FilterButton from "@/components/custom/shared/FilterButton";



export interface IPendingSwapTableItem {
  assets: {
    from: string[];
    to: string[];
  };
  unique_trade_id: string;
  status: 'sent' | 'received';
  swap_mode: 'open market' | 'private';
  offer_type: 'primary offer' | 'counter offer';
  counter_party_wallet: string,
  trading_chain: {
    title: string;
    icon: React.ReactNode;
  },
  request_date: string,
}

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


const pendingSwapTableData: IPendingSwapTableItem[] = [
  {
    assets: {
      from: ['/src/assets/nfts/from1.png', '/src/assets/nfts/from2.png', '/src/assets/nfts/from3.png', '/src/assets/nfts/from4.png', '/src/assets/nfts/from4.png'],
      to: ['/src/assets/nfts/to1.png', '/src/assets/nfts/to2.png', '/src/assets/nfts/to3.png', '/src/assets/nfts/from4.png']
    },
    unique_trade_id: '#46Aic2o',
    status: 'sent',
    swap_mode: 'open market',
    offer_type: 'primary offer',
    counter_party_wallet: '0x6723F...7B3E5',
    request_date: 'Apr 08, 2024',
    trading_chain: {
      icon: <svg className="w-4" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 6.00002C12 9.31374 9.31374 12 6.00002 12C2.6863 12 0 9.31374 0 6.00002C0 2.6863 2.6863 0 6.00002 0C9.31374 0 12 2.6863 12 6.00002ZM3.87761 7.3189C3.81937 7.31884 3.76345 7.34175 3.72199 7.38265L2.65773 8.43828C2.64228 8.45355 2.63174 8.47307 2.62745 8.49436C2.62316 8.51566 2.62533 8.53774 2.63366 8.5578C2.642 8.57785 2.65613 8.59496 2.67425 8.60694C2.69236 8.61892 2.71364 8.62522 2.73536 8.62503H8.12263C8.18093 8.625 8.23685 8.60195 8.27826 8.56091L9.34251 7.50528C9.35802 7.49007 9.36861 7.47056 9.37293 7.44927C9.37725 7.42798 9.3751 7.40588 9.36675 7.38583C9.35839 7.36578 9.34423 7.34868 9.32607 7.33676C9.30792 7.32483 9.28661 7.31861 9.26488 7.3189H3.87761ZM3.87761 3.37501C3.81937 3.37495 3.76345 3.39786 3.72199 3.43876L2.65773 4.49477C2.64241 4.51005 2.63198 4.52955 2.62777 4.55077C2.62356 4.572 2.62575 4.594 2.63407 4.61398C2.64239 4.63395 2.65646 4.65101 2.6745 4.66297C2.69253 4.67492 2.71372 4.68125 2.73536 4.68114H8.12263C8.18087 4.68121 8.23679 4.6583 8.27826 4.61739L9.34251 3.56176C9.41189 3.49276 9.36276 3.37501 9.26488 3.37501H3.87761ZM8.12263 5.3344C8.18087 5.33433 8.23679 5.35724 8.27826 5.39815L9.34251 6.45377C9.35796 6.46904 9.3685 6.48857 9.37279 6.50986C9.37708 6.53115 9.37492 6.55323 9.36658 6.57329C9.35825 6.59334 9.34412 6.61046 9.326 6.62243C9.30788 6.63441 9.2866 6.64071 9.26488 6.64053H3.87761C3.81949 6.64053 3.76324 6.61765 3.72199 6.57678L2.65773 5.52115C2.64228 5.50588 2.63174 5.48636 2.62745 5.46506C2.62316 5.44377 2.62533 5.42169 2.63366 5.40163C2.642 5.38158 2.65613 5.36447 2.67425 5.35249C2.69236 5.34051 2.71364 5.33421 2.73536 5.3344H8.12263Z" fill="#66F9A1" />
      </svg>,
      title: 'Solana'
    }
  },
  {
    assets: {
      from: ['/src/assets/nfts/from1.png', '/src/assets/nfts/from2.png', '/src/assets/nfts/from3.png', '/src/assets/nfts/from4.png'],
      to: ['/src/assets/nfts/to1.png', '/src/assets/nfts/to2.png', '/src/assets/nfts/to3.png']
    },
    unique_trade_id: '#32Bic1o',
    status: 'sent',
    swap_mode: 'open market',
    offer_type: 'primary offer',
    counter_party_wallet: '0x6723F...4E1A2',
    request_date: 'Apr 03, 2024',
    trading_chain: {
      icon: <svg className="w-4" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 6.00002C12 9.31374 9.31374 12 6.00002 12C2.6863 12 0 9.31374 0 6.00002C0 2.6863 2.6863 0 6.00002 0C9.31374 0 12 2.6863 12 6.00002ZM3.87761 7.3189C3.81937 7.31884 3.76345 7.34175 3.72199 7.38265L2.65773 8.43828C2.64228 8.45355 2.63174 8.47307 2.62745 8.49436C2.62316 8.51566 2.62533 8.53774 2.63366 8.5578C2.642 8.57785 2.65613 8.59496 2.67425 8.60694C2.69236 8.61892 2.71364 8.62522 2.73536 8.62503H8.12263C8.18093 8.625 8.23685 8.60195 8.27826 8.56091L9.34251 7.50528C9.35802 7.49007 9.36861 7.47056 9.37293 7.44927C9.37725 7.42798 9.3751 7.40588 9.36675 7.38583C9.35839 7.36578 9.34423 7.34868 9.32607 7.33676C9.30792 7.32483 9.28661 7.31861 9.26488 7.3189H3.87761ZM3.87761 3.37501C3.81937 3.37495 3.76345 3.39786 3.72199 3.43876L2.65773 4.49477C2.64241 4.51005 2.63198 4.52955 2.62777 4.55077C2.62356 4.572 2.62575 4.594 2.63407 4.61398C2.64239 4.63395 2.65646 4.65101 2.6745 4.66297C2.69253 4.67492 2.71372 4.68125 2.73536 4.68114H8.12263C8.18087 4.68121 8.23679 4.6583 8.27826 4.61739L9.34251 3.56176C9.41189 3.49276 9.36276 3.37501 9.26488 3.37501H3.87761ZM8.12263 5.3344C8.18087 5.33433 8.23679 5.35724 8.27826 5.39815L9.34251 6.45377C9.35796 6.46904 9.3685 6.48857 9.37279 6.50986C9.37708 6.53115 9.37492 6.55323 9.36658 6.57329C9.35825 6.59334 9.34412 6.61046 9.326 6.62243C9.30788 6.63441 9.2866 6.64071 9.26488 6.64053H3.87761C3.81949 6.64053 3.76324 6.61765 3.72199 6.57678L2.65773 5.52115C2.64228 5.50588 2.63174 5.48636 2.62745 5.46506C2.62316 5.44377 2.62533 5.42169 2.63366 5.40163C2.642 5.38158 2.65613 5.36447 2.67425 5.35249C2.69236 5.34051 2.71364 5.33421 2.73536 5.3344H8.12263Z" fill="#66F9A1" />
      </svg>,
      title: 'Solana'
    }
  },
  {
    assets: {
      from: ['/src/assets/nfts/from1.png',],
      to: ['/src/assets/nfts/to3.png']
    },
    unique_trade_id: '#12Bic1o',
    status: 'received',
    swap_mode: 'private',
    offer_type: 'counter offer',
    counter_party_wallet: '0x6723F...4E1A2',
    request_date: 'Apr 03, 2024',
    trading_chain: {
      icon: <svg className="w-4" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 6.00002C12 9.31374 9.31374 12 6.00002 12C2.6863 12 0 9.31374 0 6.00002C0 2.6863 2.6863 0 6.00002 0C9.31374 0 12 2.6863 12 6.00002ZM3.87761 7.3189C3.81937 7.31884 3.76345 7.34175 3.72199 7.38265L2.65773 8.43828C2.64228 8.45355 2.63174 8.47307 2.62745 8.49436C2.62316 8.51566 2.62533 8.53774 2.63366 8.5578C2.642 8.57785 2.65613 8.59496 2.67425 8.60694C2.69236 8.61892 2.71364 8.62522 2.73536 8.62503H8.12263C8.18093 8.625 8.23685 8.60195 8.27826 8.56091L9.34251 7.50528C9.35802 7.49007 9.36861 7.47056 9.37293 7.44927C9.37725 7.42798 9.3751 7.40588 9.36675 7.38583C9.35839 7.36578 9.34423 7.34868 9.32607 7.33676C9.30792 7.32483 9.28661 7.31861 9.26488 7.3189H3.87761ZM3.87761 3.37501C3.81937 3.37495 3.76345 3.39786 3.72199 3.43876L2.65773 4.49477C2.64241 4.51005 2.63198 4.52955 2.62777 4.55077C2.62356 4.572 2.62575 4.594 2.63407 4.61398C2.64239 4.63395 2.65646 4.65101 2.6745 4.66297C2.69253 4.67492 2.71372 4.68125 2.73536 4.68114H8.12263C8.18087 4.68121 8.23679 4.6583 8.27826 4.61739L9.34251 3.56176C9.41189 3.49276 9.36276 3.37501 9.26488 3.37501H3.87761ZM8.12263 5.3344C8.18087 5.33433 8.23679 5.35724 8.27826 5.39815L9.34251 6.45377C9.35796 6.46904 9.3685 6.48857 9.37279 6.50986C9.37708 6.53115 9.37492 6.55323 9.36658 6.57329C9.35825 6.59334 9.34412 6.61046 9.326 6.62243C9.30788 6.63441 9.2866 6.64071 9.26488 6.64053H3.87761C3.81949 6.64053 3.76324 6.61765 3.72199 6.57678L2.65773 5.52115C2.64228 5.50588 2.63174 5.48636 2.62745 5.46506C2.62316 5.44377 2.62533 5.42169 2.63366 5.40163C2.642 5.38158 2.65613 5.36447 2.67425 5.35249C2.69236 5.34051 2.71364 5.33421 2.73536 5.3344H8.12263Z" fill="#66F9A1" />
      </svg>,
      title: 'Solana'
    }
  },
  {
    assets: {
      from: ['/src/assets/nfts/from1.png', '/src/assets/nfts/from2.png', '/src/assets/nfts/from3.png', '/src/assets/nfts/from4.png', '/src/assets/nfts/from4.png', '/src/assets/nfts/from4.png'],
      to: ['/src/assets/nfts/to1.png', '/src/assets/nfts/to2.png', '/src/assets/nfts/to3.png']
    },
    unique_trade_id: '#46Aic2o',
    status: 'received',
    swap_mode: 'open market',
    offer_type: 'primary offer',
    counter_party_wallet: '0x6723F...4E1A2',
    request_date: 'May 08, 2024',
    trading_chain: {
      icon: <svg className="w-4" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 6.00002C12 9.31374 9.31374 12 6.00002 12C2.6863 12 0 9.31374 0 6.00002C0 2.6863 2.6863 0 6.00002 0C9.31374 0 12 2.6863 12 6.00002ZM3.87761 7.3189C3.81937 7.31884 3.76345 7.34175 3.72199 7.38265L2.65773 8.43828C2.64228 8.45355 2.63174 8.47307 2.62745 8.49436C2.62316 8.51566 2.62533 8.53774 2.63366 8.5578C2.642 8.57785 2.65613 8.59496 2.67425 8.60694C2.69236 8.61892 2.71364 8.62522 2.73536 8.62503H8.12263C8.18093 8.625 8.23685 8.60195 8.27826 8.56091L9.34251 7.50528C9.35802 7.49007 9.36861 7.47056 9.37293 7.44927C9.37725 7.42798 9.3751 7.40588 9.36675 7.38583C9.35839 7.36578 9.34423 7.34868 9.32607 7.33676C9.30792 7.32483 9.28661 7.31861 9.26488 7.3189H3.87761ZM3.87761 3.37501C3.81937 3.37495 3.76345 3.39786 3.72199 3.43876L2.65773 4.49477C2.64241 4.51005 2.63198 4.52955 2.62777 4.55077C2.62356 4.572 2.62575 4.594 2.63407 4.61398C2.64239 4.63395 2.65646 4.65101 2.6745 4.66297C2.69253 4.67492 2.71372 4.68125 2.73536 4.68114H8.12263C8.18087 4.68121 8.23679 4.6583 8.27826 4.61739L9.34251 3.56176C9.41189 3.49276 9.36276 3.37501 9.26488 3.37501H3.87761ZM8.12263 5.3344C8.18087 5.33433 8.23679 5.35724 8.27826 5.39815L9.34251 6.45377C9.35796 6.46904 9.3685 6.48857 9.37279 6.50986C9.37708 6.53115 9.37492 6.55323 9.36658 6.57329C9.35825 6.59334 9.34412 6.61046 9.326 6.62243C9.30788 6.63441 9.2866 6.64071 9.26488 6.64053H3.87761C3.81949 6.64053 3.76324 6.61765 3.72199 6.57678L2.65773 5.52115C2.64228 5.50588 2.63174 5.48636 2.62745 5.46506C2.62316 5.44377 2.62533 5.42169 2.63366 5.40163C2.642 5.38158 2.65613 5.36447 2.67425 5.35249C2.69236 5.34051 2.71364 5.33421 2.73536 5.3344H8.12263Z" fill="#66F9A1" />
      </svg>,
      title: 'Solana'
    }
  },
  {
    assets: {
      from: ['/src/assets/nfts/from1.png', '/src/assets/nfts/from2.png', '/src/assets/nfts/from3.png', '/src/assets/nfts/from4.png', '/src/assets/nfts/from4.png', '/src/assets/nfts/from4.png'],
      to: ['/src/assets/nfts/to1.png', '/src/assets/nfts/to2.png', '/src/assets/nfts/to3.png']
    },
    unique_trade_id: '#46Aic2o',
    status: 'sent',
    swap_mode: 'private',
    offer_type: 'primary offer',
    counter_party_wallet: '0x6723F...4E1A2',
    request_date: 'Jun 08, 2024',
    trading_chain: {
      icon: <svg className="w-4" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 6.00002C12 9.31374 9.31374 12 6.00002 12C2.6863 12 0 9.31374 0 6.00002C0 2.6863 2.6863 0 6.00002 0C9.31374 0 12 2.6863 12 6.00002ZM3.87761 7.3189C3.81937 7.31884 3.76345 7.34175 3.72199 7.38265L2.65773 8.43828C2.64228 8.45355 2.63174 8.47307 2.62745 8.49436C2.62316 8.51566 2.62533 8.53774 2.63366 8.5578C2.642 8.57785 2.65613 8.59496 2.67425 8.60694C2.69236 8.61892 2.71364 8.62522 2.73536 8.62503H8.12263C8.18093 8.625 8.23685 8.60195 8.27826 8.56091L9.34251 7.50528C9.35802 7.49007 9.36861 7.47056 9.37293 7.44927C9.37725 7.42798 9.3751 7.40588 9.36675 7.38583C9.35839 7.36578 9.34423 7.34868 9.32607 7.33676C9.30792 7.32483 9.28661 7.31861 9.26488 7.3189H3.87761ZM3.87761 3.37501C3.81937 3.37495 3.76345 3.39786 3.72199 3.43876L2.65773 4.49477C2.64241 4.51005 2.63198 4.52955 2.62777 4.55077C2.62356 4.572 2.62575 4.594 2.63407 4.61398C2.64239 4.63395 2.65646 4.65101 2.6745 4.66297C2.69253 4.67492 2.71372 4.68125 2.73536 4.68114H8.12263C8.18087 4.68121 8.23679 4.6583 8.27826 4.61739L9.34251 3.56176C9.41189 3.49276 9.36276 3.37501 9.26488 3.37501H3.87761ZM8.12263 5.3344C8.18087 5.33433 8.23679 5.35724 8.27826 5.39815L9.34251 6.45377C9.35796 6.46904 9.3685 6.48857 9.37279 6.50986C9.37708 6.53115 9.37492 6.55323 9.36658 6.57329C9.35825 6.59334 9.34412 6.61046 9.326 6.62243C9.30788 6.63441 9.2866 6.64071 9.26488 6.64053H3.87761C3.81949 6.64053 3.76324 6.61765 3.72199 6.57678L2.65773 5.52115C2.64228 5.50588 2.63174 5.48636 2.62745 5.46506C2.62316 5.44377 2.62533 5.42169 2.63366 5.40163C2.642 5.38158 2.65613 5.36447 2.67425 5.35249C2.69236 5.34051 2.71364 5.33421 2.73536 5.3344H8.12263Z" fill="#66F9A1" />
      </svg>,
      title: 'Solana'
    }
  },
  {
    assets: {
      from: ['/src/assets/nfts/from2.png', '/src/assets/nfts/from3.png'],
      to: ['/src/assets/nfts/to1.png', '/src/assets/nfts/to3.png']
    },
    unique_trade_id: '#46Aic2o',
    status: 'sent',
    swap_mode: 'private',
    offer_type: 'primary offer',
    counter_party_wallet: '0x6723F...4E1A2',
    request_date: 'Mar 08, 2023',
    trading_chain: {
      icon: <svg className="w-4" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 6.00002C12 9.31374 9.31374 12 6.00002 12C2.6863 12 0 9.31374 0 6.00002C0 2.6863 2.6863 0 6.00002 0C9.31374 0 12 2.6863 12 6.00002ZM3.87761 7.3189C3.81937 7.31884 3.76345 7.34175 3.72199 7.38265L2.65773 8.43828C2.64228 8.45355 2.63174 8.47307 2.62745 8.49436C2.62316 8.51566 2.62533 8.53774 2.63366 8.5578C2.642 8.57785 2.65613 8.59496 2.67425 8.60694C2.69236 8.61892 2.71364 8.62522 2.73536 8.62503H8.12263C8.18093 8.625 8.23685 8.60195 8.27826 8.56091L9.34251 7.50528C9.35802 7.49007 9.36861 7.47056 9.37293 7.44927C9.37725 7.42798 9.3751 7.40588 9.36675 7.38583C9.35839 7.36578 9.34423 7.34868 9.32607 7.33676C9.30792 7.32483 9.28661 7.31861 9.26488 7.3189H3.87761ZM3.87761 3.37501C3.81937 3.37495 3.76345 3.39786 3.72199 3.43876L2.65773 4.49477C2.64241 4.51005 2.63198 4.52955 2.62777 4.55077C2.62356 4.572 2.62575 4.594 2.63407 4.61398C2.64239 4.63395 2.65646 4.65101 2.6745 4.66297C2.69253 4.67492 2.71372 4.68125 2.73536 4.68114H8.12263C8.18087 4.68121 8.23679 4.6583 8.27826 4.61739L9.34251 3.56176C9.41189 3.49276 9.36276 3.37501 9.26488 3.37501H3.87761ZM8.12263 5.3344C8.18087 5.33433 8.23679 5.35724 8.27826 5.39815L9.34251 6.45377C9.35796 6.46904 9.3685 6.48857 9.37279 6.50986C9.37708 6.53115 9.37492 6.55323 9.36658 6.57329C9.35825 6.59334 9.34412 6.61046 9.326 6.62243C9.30788 6.63441 9.2866 6.64071 9.26488 6.64053H3.87761C3.81949 6.64053 3.76324 6.61765 3.72199 6.57678L2.65773 5.52115C2.64228 5.50588 2.63174 5.48636 2.62745 5.46506C2.62316 5.44377 2.62533 5.42169 2.63366 5.40163C2.642 5.38158 2.65613 5.36447 2.67425 5.35249C2.69236 5.34051 2.71364 5.33421 2.73536 5.3344H8.12263Z" fill="#66F9A1" />
      </svg>,
      title: 'Solana'
    }
  },
  {
    assets: {
      from: ['/src/assets/nfts/from2.png', '/src/assets/nfts/from3.png'],
      to: ['/src/assets/nfts/to1.png', '/src/assets/nfts/to3.png']
    },
    unique_trade_id: '#46Aic2o',
    status: 'sent',
    swap_mode: 'private',
    offer_type: 'primary offer',
    counter_party_wallet: '0x6723F...4E1A2',
    request_date: 'Dec 08, 2023',
    trading_chain: {
      icon: <svg className="w-4" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 6.00002C12 9.31374 9.31374 12 6.00002 12C2.6863 12 0 9.31374 0 6.00002C0 2.6863 2.6863 0 6.00002 0C9.31374 0 12 2.6863 12 6.00002ZM3.87761 7.3189C3.81937 7.31884 3.76345 7.34175 3.72199 7.38265L2.65773 8.43828C2.64228 8.45355 2.63174 8.47307 2.62745 8.49436C2.62316 8.51566 2.62533 8.53774 2.63366 8.5578C2.642 8.57785 2.65613 8.59496 2.67425 8.60694C2.69236 8.61892 2.71364 8.62522 2.73536 8.62503H8.12263C8.18093 8.625 8.23685 8.60195 8.27826 8.56091L9.34251 7.50528C9.35802 7.49007 9.36861 7.47056 9.37293 7.44927C9.37725 7.42798 9.3751 7.40588 9.36675 7.38583C9.35839 7.36578 9.34423 7.34868 9.32607 7.33676C9.30792 7.32483 9.28661 7.31861 9.26488 7.3189H3.87761ZM3.87761 3.37501C3.81937 3.37495 3.76345 3.39786 3.72199 3.43876L2.65773 4.49477C2.64241 4.51005 2.63198 4.52955 2.62777 4.55077C2.62356 4.572 2.62575 4.594 2.63407 4.61398C2.64239 4.63395 2.65646 4.65101 2.6745 4.66297C2.69253 4.67492 2.71372 4.68125 2.73536 4.68114H8.12263C8.18087 4.68121 8.23679 4.6583 8.27826 4.61739L9.34251 3.56176C9.41189 3.49276 9.36276 3.37501 9.26488 3.37501H3.87761ZM8.12263 5.3344C8.18087 5.33433 8.23679 5.35724 8.27826 5.39815L9.34251 6.45377C9.35796 6.46904 9.3685 6.48857 9.37279 6.50986C9.37708 6.53115 9.37492 6.55323 9.36658 6.57329C9.35825 6.59334 9.34412 6.61046 9.326 6.62243C9.30788 6.63441 9.2866 6.64071 9.26488 6.64053H3.87761C3.81949 6.64053 3.76324 6.61765 3.72199 6.57678L2.65773 5.52115C2.64228 5.50588 2.63174 5.48636 2.62745 5.46506C2.62316 5.44377 2.62533 5.42169 2.63366 5.40163C2.642 5.38158 2.65613 5.36447 2.67425 5.35249C2.69236 5.34051 2.71364 5.33421 2.73536 5.3344H8.12263Z" fill="#66F9A1" />
      </svg>,
      title: 'Solana'
    }
  },
];

const swapHistoryTableData: ISwapHistoryTableItem[] = [
  {
    assets: {
      from: ['/src/assets/nfts/from1.png', '/src/assets/nfts/from2.png', '/src/assets/nfts/from3.png', '/src/assets/nfts/from4.png', '/src/assets/nfts/from4.png'],
      to: ['/src/assets/nfts/to1.png', '/src/assets/nfts/to2.png', '/src/assets/nfts/to3.png', '/src/assets/nfts/from4.png']
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
      from: ['/src/assets/nfts/from1.png', '/src/assets/nfts/from2.png', '/src/assets/nfts/from3.png', '/src/assets/nfts/from4.png'],
      to: ['/src/assets/nfts/to1.png', '/src/assets/nfts/to2.png', '/src/assets/nfts/to3.png']
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
      from: ['/src/assets/nfts/from1.png',],
      to: ['/src/assets/nfts/to3.png']
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
      from: ['/src/assets/nfts/from1.png', '/src/assets/nfts/from2.png', '/src/assets/nfts/from3.png', '/src/assets/nfts/from4.png', '/src/assets/nfts/from4.png', '/src/assets/nfts/from4.png'],
      to: ['/src/assets/nfts/to1.png', '/src/assets/nfts/to2.png', '/src/assets/nfts/to3.png']
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
      from: ['/src/assets/nfts/from1.png', '/src/assets/nfts/from2.png', '/src/assets/nfts/from3.png', '/src/assets/nfts/from4.png', '/src/assets/nfts/from4.png', '/src/assets/nfts/from4.png'],
      to: ['/src/assets/nfts/to1.png', '/src/assets/nfts/to2.png', '/src/assets/nfts/to3.png']
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
      from: ['/src/assets/nfts/from2.png', '/src/assets/nfts/from3.png'],
      to: ['/src/assets/nfts/to1.png', '/src/assets/nfts/to3.png']
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
  const [activeTab, setActiveTab] = useState<"pending-swaps" | "swap-history">("swap-history");
  const [filteredSwapHistoryData, setFilteredSwapHistoryData] = useState<ISwapHistoryTableItem[] | []>(swapHistoryTableData);
  const [filteredPendingSwapData, setFilteredPendingSwapData] = useState<IPendingSwapTableItem[] | []>(pendingSwapTableData);



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

  const handleFilterData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();

    const newFilteredDataOne = swapHistoryTableData.filter((item) => (
      item.status.toLocaleLowerCase().includes(value) ||
      item.counter_party_wallet.toLowerCase().includes(value) ||
      item.offerreview_date.toLowerCase().includes(value) ||
      item.unique_trade_id.toLowerCase().includes(value)
    ));
    setFilteredSwapHistoryData(newFilteredDataOne);

    const newFilteredDataTwo = pendingSwapTableData.filter((item) => (
      item.status.toLocaleLowerCase().includes(value) ||
      item.counter_party_wallet.toLowerCase().includes(value) ||
      item.request_date.toLowerCase().includes(value) ||
      item.unique_trade_id.toLowerCase().includes(value)
    ));
    setFilteredPendingSwapData(newFilteredDataTwo);

  };
  return (
    <>
      <section className="flex flex-col gap-4" >
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

        {/* leaderboard */}


        <div className="overflow-x-scroll lg:overflow-hidden" >
          <Tabs defaultValue="swap-history" className="w-full">
            <TabsList className="border-b-2 border-su_enable_bg w-full justify-start rounded-none bg-transparent">
              <TabsTrigger value="pending-swaps" onClick={() => handleSwitchTab("pending-swaps")} >
                Pending
                <span className={`bg-text font-semibold rounded-full py-0.5 px-3 text-xs ${activeTab === 'pending-swaps' ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground'}`}>
                  {filteredPendingSwapData.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="swap-history" onClick={() => handleSwitchTab("swap-history")}>
                History
                <span className={`bg-text font-semibold rounded-full py-0.5 px-3 text-xs ${activeTab === 'swap-history' ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground'}`}>
                  {filteredSwapHistoryData.length}
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending-swaps" className="w-full flex justify-center">
              {/* Title */}
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold min-w-[288px]">Assets</TableHead>
                    <TableHead className="font-semibold min-w-[150px] pl-8" >Unique trade ID</TableHead>
                    <TableHead className="font-semibold px-4" >Status</TableHead>
                    <TableHead className="font-semibold px-4" >Swap mode</TableHead>
                    <TableHead className="font-semibold px-4" >Counterparty wallet address</TableHead>
                    <TableHead className="font-semibold px-4" >Trading chain</TableHead>
                    <TableHead className="font-semibold px-4" >Request date</TableHead>
                    <TableHead className="font-semibold px-4" >Type</TableHead>
                    <TableHead className="w-[130px] pr-2" >
                      <FilterButton
                        className="text-white !text-sm"
                        iconClasses="text-white"
                        onClick={() =>
                          toast.info("Filter", {
                            duration: 2000,
                            description: "This feature is under construction!",
                            action: {
                              label: "Close",
                              onClick: () => console.log("Close"),
                            },
                            className: '!bg-gradient-primary border-none',
                            descriptionClassName: '!text-white',
                          })
                        }

                      />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y">
                  {
                    filteredPendingSwapData?.map((data, index) => (
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
                        <TableCell className="font-medium px-4">
                          <div className="w-auto flex justify-start" >{
                            data.status === "sent" ?
                              <span className="flex items-center justify-center gap-2 py-2 px-3  rounded-full bg-su_enable_bg capitalize" >
                                <svg className="w-4" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12 3.17647V7.94118C12 8.52353 11.46 9 10.8 9H1.2C0.54 9 -2.88495e-08 8.52353 0 7.94118L2.36042e-07 3.17647C2.64891e-07 2.59412 0.54 2.11765 1.2 2.11765H2.4V3.17647L1.2 3.17647L1.2 7.94118H10.8V3.17647H9.6V2.11765H10.8C11.46 2.11765 12 2.59412 12 3.17647Z" fill="white" />
                                  <path d="M3.846 3.39353L3 2.64706L6 0L9 2.64706L8.154 3.39353L6.6 2.02765L6.6 7.14706H5.4L5.4 2.02765L3.846 3.39353Z" fill="white" />
                                </svg>

                                {data.status}
                              </span>
                              :
                              <span className="flex items-center justify-center gap-2 p-2 rounded-full bg-su_enable_bg capitalize" >
                                <svg className="w-4" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12 3.17647V7.94118C12 8.52353 11.46 9 10.8 9H1.2C0.54 9 -2.88495e-08 8.52353 0 7.94118L2.36042e-07 3.17647C2.64891e-07 2.59412 0.54 2.11765 1.2 2.11765H2.4V3.17647L1.2 3.17647L1.2 7.94118H10.8V3.17647H9.6V2.11765H10.8C11.46 2.11765 12 2.59412 12 3.17647Z" fill="white" />
                                  <path d="M3.846 3.75353L3 4.5L6 7.14706L9 4.5L8.154 3.75353L6.6 5.11941L6.6 4.62827e-08L5.4 0L5.4 5.11941L3.846 3.75353Z" fill="white" />
                                </svg>

                                {data.status}
                              </span>

                          }</div>
                        </TableCell>

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
                        <TableCell className="font-medium px-4">{data.counter_party_wallet}</TableCell>
                        <TableCell className="font-medium px-4 flex justify-start">
                          <span className="w-auto flex items-center justify-center gap-2 py-2 px-3 rounded-full bg-su_enable_bg capitalize" >
                            {data.trading_chain.icon} {data.trading_chain.title}
                          </span>
                        </TableCell>
                        <TableCell className="font-medium px-4">{data.request_date}</TableCell>
                        <TableCell className="font-medium px-4 capitalize">{data.offer_type}</TableCell>

                        <TableCell className="font-medium flex pr-8 justify-end">
                          <svg
                            onClick={() =>
                              toast.info("Options", {
                                duration: 2000,
                                description: "This feature is under construction!",
                                action: {
                                  label: "Close",
                                  onClick: () => console.log("Close"),
                                },
                                className: '!bg-gradient-primary border-none',
                                descriptionClassName: '!text-white',
                              })
                            }
                            className="w-1 cursor-pointer" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.00039 12.8C2.42474 12.8 2.8317 12.9686 3.13176 13.2686C3.43182 13.5687 3.60039 13.9757 3.60039 14.4C3.60039 14.8243 3.43182 15.2313 3.13176 15.5314C2.8317 15.8314 2.42474 16 2.00039 16C1.57604 16 1.16908 15.8314 0.86902 15.5314C0.568961 15.2313 0.400391 14.8243 0.400391 14.4C0.400391 13.9757 0.568961 13.5687 0.86902 13.2686C1.16908 12.9686 1.57604 12.8 2.00039 12.8ZM2.00039 6.4C2.42474 6.4 2.8317 6.56857 3.13176 6.86863C3.43182 7.16869 3.60039 7.57565 3.60039 8C3.60039 8.42435 3.43182 8.83131 3.13176 9.13137C2.8317 9.43143 2.42474 9.6 2.00039 9.6C1.57604 9.6 1.16908 9.43143 0.86902 9.13137C0.568961 8.83131 0.400391 8.42435 0.400391 8C0.400391 7.57565 0.568961 7.16869 0.86902 6.86863C1.16908 6.56857 1.57604 6.4 2.00039 6.4ZM2.00039 0C2.42474 0 2.8317 0.168571 3.13176 0.468629C3.43182 0.768687 3.60039 1.17565 3.60039 1.6C3.60039 2.02435 3.43182 2.43131 3.13176 2.73137C2.8317 3.03143 2.42474 3.2 2.00039 3.2C1.57604 3.2 1.16908 3.03143 0.86902 2.73137C0.568961 2.43131 0.400391 2.02435 0.400391 1.6C0.400391 1.17565 0.568961 0.768687 0.86902 0.468629C1.16908 0.168571 1.57604 0 2.00039 0Z" fill="#B6B6BD" />
                          </svg>
                        </TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>

              {
                !filteredPendingSwapData.length &&
                <EmptyDataset
                  title="No Pending Swaps Offers Yet"
                  description="Your pending swap inbox is empty create your own swap!"
                >
                  <Button
                    className="gradient-button"
                    onClick={() =>
                      toast.info("Private party swap", {
                        duration: 2000,
                        description: "This feature is under construction!",
                        action: {
                          label: "Close",
                          onClick: () => console.log("Close"),
                        },
                        className: '!bg-gradient-primary border-none',
                        descriptionClassName: '!text-white',
                      })
                    }
                  >Create private swaps</Button>
                </EmptyDataset>

              }

            </TabsContent>

            <TabsContent value="swap-history" className="w-full flex flex-col gap-4">

              {/* Title */}

              <Table className="min-w-full">
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
                      <FilterButton
                        className="text-white !text-sm"
                        iconClasses="text-white"
                        onClick={() =>
                          toast.info("Filter", {
                            duration: 2000,
                            description: "This feature is under construction!",
                            action: {
                              label: "Close",
                              onClick: () => console.log("Close"),
                            },
                            className: '!bg-gradient-primary border-none',
                            descriptionClassName: '!text-white',
                          })
                        }

                      />
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
                                description: "This feature is under construction!",
                                action: {
                                  label: "Close",
                                  onClick: () => console.log("Close"),
                                },
                                className: '!bg-gradient-primary border-none',
                                descriptionClassName: '!text-white',
                              })
                            }
                            className="w-1 cursor-pointer" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.00039 12.8C2.42474 12.8 2.8317 12.9686 3.13176 13.2686C3.43182 13.5687 3.60039 13.9757 3.60039 14.4C3.60039 14.8243 3.43182 15.2313 3.13176 15.5314C2.8317 15.8314 2.42474 16 2.00039 16C1.57604 16 1.16908 15.8314 0.86902 15.5314C0.568961 15.2313 0.400391 14.8243 0.400391 14.4C0.400391 13.9757 0.568961 13.5687 0.86902 13.2686C1.16908 12.9686 1.57604 12.8 2.00039 12.8ZM2.00039 6.4C2.42474 6.4 2.8317 6.56857 3.13176 6.86863C3.43182 7.16869 3.60039 7.57565 3.60039 8C3.60039 8.42435 3.43182 8.83131 3.13176 9.13137C2.8317 9.43143 2.42474 9.6 2.00039 9.6C1.57604 9.6 1.16908 9.43143 0.86902 9.13137C0.568961 8.83131 0.400391 8.42435 0.400391 8C0.400391 7.57565 0.568961 7.16869 0.86902 6.86863C1.16908 6.56857 1.57604 6.4 2.00039 6.4ZM2.00039 0C2.42474 0 2.8317 0.168571 3.13176 0.468629C3.43182 0.768687 3.60039 1.17565 3.60039 1.6C3.60039 2.02435 3.43182 2.43131 3.13176 2.73137C2.8317 3.03143 2.42474 3.2 2.00039 3.2C1.57604 3.2 1.16908 3.03143 0.86902 2.73137C0.568961 2.43131 0.400391 2.02435 0.400391 1.6C0.400391 1.17565 0.568961 0.768687 0.86902 0.468629C1.16908 0.168571 1.57604 0 2.00039 0Z" fill="#B6B6BD" />
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
              }

            </TabsContent>
          </Tabs>
        </div>
      </section >
    </>
  );
};

export default MySwapsPage;