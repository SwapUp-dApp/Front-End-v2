import LeaderboardCard from "@/components/custom/swap_market/LeaderboardCard";
import NewMembersCard from "@/components/custom/swap_market/NewMembersCard";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import EmptyDataset from "@/components/custom/shared/EmptyDataset";
import { toast } from "sonner";

export interface IMember {
  id: string;
  image?: string;
  title: string;
  topRated?: boolean;
}

export interface IPrivatePartyTableItem {
  assets: {
    from: string[];
    to: string[];
  };
  unique_trade_id: string;
  status: 'sent' | 'received';
  counter_party_wallet: string,
  trending_chain: {
    title: string;
    icon: React.ReactNode;
  },
  creation_data: string,
}

const privatePartyTableData: IPrivatePartyTableItem[] = [
  {
    assets: {
      from: ['/src/assets/nfts/from1.png', '/src/assets/nfts/from2.png', '/src/assets/nfts/from3.png', '/src/assets/nfts/from4.png', '/src/assets/nfts/from4.png'],
      to: ['/src/assets/nfts/to1.png', '/src/assets/nfts/to2.png', '/src/assets/nfts/to3.png', '/src/assets/nfts/from4.png']
    },
    unique_trade_id: '#46Aic2o',
    status: 'sent',
    counter_party_wallet: '0x6723F...4E1A2',
    creation_data: 'Apr 08, 2024',
    trending_chain: {
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
    status: 'received',
    counter_party_wallet: '0x6723F...4E1A2',
    creation_data: 'Jan 08, 2024',
    trending_chain: {
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
    status: 'sent',
    counter_party_wallet: '0x6723F...4E1A2',
    creation_data: 'Feb 08, 2024',
    trending_chain: {
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
    counter_party_wallet: '0x6723F...4E1A2',
    creation_data: 'May 08, 2024',
    trending_chain: {
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
    counter_party_wallet: '0x6723F...4E1A2',
    creation_data: 'Jun 08, 2024',
    trending_chain: {
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
    status: 'received',
    counter_party_wallet: '0x6723F...4E1A2',
    creation_data: 'Mar 08, 2023',
    trending_chain: {
      icon: <svg className="w-4" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 6.00002C12 9.31374 9.31374 12 6.00002 12C2.6863 12 0 9.31374 0 6.00002C0 2.6863 2.6863 0 6.00002 0C9.31374 0 12 2.6863 12 6.00002ZM3.87761 7.3189C3.81937 7.31884 3.76345 7.34175 3.72199 7.38265L2.65773 8.43828C2.64228 8.45355 2.63174 8.47307 2.62745 8.49436C2.62316 8.51566 2.62533 8.53774 2.63366 8.5578C2.642 8.57785 2.65613 8.59496 2.67425 8.60694C2.69236 8.61892 2.71364 8.62522 2.73536 8.62503H8.12263C8.18093 8.625 8.23685 8.60195 8.27826 8.56091L9.34251 7.50528C9.35802 7.49007 9.36861 7.47056 9.37293 7.44927C9.37725 7.42798 9.3751 7.40588 9.36675 7.38583C9.35839 7.36578 9.34423 7.34868 9.32607 7.33676C9.30792 7.32483 9.28661 7.31861 9.26488 7.3189H3.87761ZM3.87761 3.37501C3.81937 3.37495 3.76345 3.39786 3.72199 3.43876L2.65773 4.49477C2.64241 4.51005 2.63198 4.52955 2.62777 4.55077C2.62356 4.572 2.62575 4.594 2.63407 4.61398C2.64239 4.63395 2.65646 4.65101 2.6745 4.66297C2.69253 4.67492 2.71372 4.68125 2.73536 4.68114H8.12263C8.18087 4.68121 8.23679 4.6583 8.27826 4.61739L9.34251 3.56176C9.41189 3.49276 9.36276 3.37501 9.26488 3.37501H3.87761ZM8.12263 5.3344C8.18087 5.33433 8.23679 5.35724 8.27826 5.39815L9.34251 6.45377C9.35796 6.46904 9.3685 6.48857 9.37279 6.50986C9.37708 6.53115 9.37492 6.55323 9.36658 6.57329C9.35825 6.59334 9.34412 6.61046 9.326 6.62243C9.30788 6.63441 9.2866 6.64071 9.26488 6.64053H3.87761C3.81949 6.64053 3.76324 6.61765 3.72199 6.57678L2.65773 5.52115C2.64228 5.50588 2.63174 5.48636 2.62745 5.46506C2.62316 5.44377 2.62533 5.42169 2.63366 5.40163C2.642 5.38158 2.65613 5.36447 2.67425 5.35249C2.69236 5.34051 2.71364 5.33421 2.73536 5.3344H8.12263Z" fill="#66F9A1" />
      </svg>,
      title: 'Solana'
    }
  },
];

const SwapMarketPage = () => {
  const [activeTab, setActiveTab] = useState<"open-market" | "private-party">("private-party");
  const [filteredPrivatePartyData, setFilteredPrivatePartyData] = useState<IPrivatePartyTableItem[] | []>(privatePartyTableData);

  const membersData: IMember[] = [
    {
      id: '1',
      image: '/src/assets/images/avatar.png',
      title: 'John D'
    },
    {
      id: '2',
      image: '/src/assets/images/avatar.png',
      title: 'John D'
    },
    {
      id: '3',
      image: '/src/assets/images/avatar.png',
      title: 'John D'
    },
    {
      id: '4',
      image: '',
      title: 'John D'
    },
    {
      id: '5',
      image: '',
      title: 'John D'
    },
    {
      id: '6',
      image: '/src/assets/images/avatar.png',
      title: 'John D'
    },
    {
      id: '7',
      image: '',
      title: 'John D'
    },
    {
      id: '8',
      image: '',
      title: 'John D'
    },
    {
      id: '9',
      image: '/src/assets/images/avatar.png',
      title: 'John D'
    },
    {
      id: '10',
      image: '/src/assets/images/avatar.png',
      title: 'John D'
    },
    {
      id: '11',
      image: '/src/assets/images/avatar.png',
      title: 'John D'
    },
    {
      id: '12',
      image: '/src/assets/images/avatar.png',
      title: 'John D'
    },
    {
      id: '13',
      image: '/src/assets/images/avatar.png',
      title: 'John D'
    },
  ];

  const tradersData: IMember[] = [
    {
      id: '1',
      image: '/src/assets/images/avatar.png',
      title: 'John D',
      topRated: true
    },
    {
      id: '2',
      image: '/src/assets/images/avatar.png',
      title: 'John D',
      topRated: true
    },
    {
      id: '3',
      image: '/src/assets/images/avatar.png',
      title: 'John D',
      topRated: true
    },
    {
      id: '4',
      image: '/src/assets/images/avatar.png',
      title: 'John D'
    },
    {
      id: '5',
      image: '/src/assets/images/avatar.png',
      title: 'John D'
    },
    {
      id: '6',
      image: '/src/assets/images/avatar.png',
      title: 'John D'
    },
    {
      id: '7',
      image: '/src/assets/images/avatar.png',
      title: 'John D'
    },
    {
      id: '8',
      image: '/src/assets/images/avatar.png',
      title: 'John D'
    },
    {
      id: '9',
      image: '/src/assets/images/avatar.png',
      title: 'John D'
    },
    {
      id: '10',
      image: '/src/assets/images/avatar.png',
      title: 'John D'
    },
    {
      id: '11',
      image: '/src/assets/images/avatar.png',
      title: 'John D'
    },
    {
      id: '12',
      image: '/src/assets/images/avatar.png',
      title: 'John D'
    },
    {
      id: '13',
      image: '/src/assets/images/avatar.png',
      title: 'John D'
    },
  ];

  const nftsImageMapper = (nfts: string[]) => {
    return (
      nfts.map((image, index) => {
        if (index < 3)
          return (
            <div className="relative w-8 h-8" key={image}>
              <img className="w-full h-full object-cover rounded-sm border-[1.5px] border-white/20" src={image} alt="nft" />
              {
                (index === 2) &&
                  nfts.length > 3 ?
                  <div className="absolute w-full h-full rounded-sm bg-black/50 top-0 flex justify-center items-center font-semibold" >
                    +{nfts.length - 3}
                  </div> : ''
              }
            </div>
          );
      })
    );
  };

  const handleSwitchTab = (value: "open-market" | "private-party") => {
    setActiveTab(value);
  };

  const handleFilterData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();

    const newFilteredData = privatePartyTableData.filter((item) => (
      item.status.toLocaleLowerCase().includes(value) ||
      item.counter_party_wallet.toLowerCase().includes(value) ||
      item.creation_data.toLowerCase().includes(value) ||
      item.unique_trade_id.toLowerCase().includes(value)
    ));
    setFilteredPrivatePartyData(newFilteredData);
  };
  return (
    <>
      <section className="flex flex-col gap-4" >
        {/* Title */}
        <div className="flex items-center justify-between" >
          <h2 className="text-2xl font-semibold" >Swap Market</h2>

          <DropdownMenu>
            <DropdownMenuTrigger className="gradient-button gap-4">
              Create Swap

              <svg className={`w-4 rotate-180`} viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 6L6 2L2 6" stroke="white" strokeWidth="1.5" strokeLinecap="square" />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dark:bg-su_least_bg rounded-md min-w-full px-6 py-4 mt-1 flex flex-col gap-2 z-50">
              <DropdownMenuItem
                className="text-sm flex items-center gap-4 cursor-pointer hover:bg-su_enable_bg py-2 px-4 rounded-md"
                onClick={() =>
                  toast.info("Open market swap", {
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
              >
                <svg className="w-5" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 0C8.61884 0 9.21233 0.25431 9.64992 0.706984C10.0875 1.15966 10.3333 1.77362 10.3333 2.41379C10.3333 3.05397 10.0875 3.66793 9.64992 4.1206C9.21233 4.57328 8.61884 4.82759 8 4.82759C7.38116 4.82759 6.78767 4.57328 6.35008 4.1206C5.9125 3.66793 5.66667 3.05397 5.66667 2.41379C5.66667 1.77362 5.9125 1.15966 6.35008 0.706984C6.78767 0.25431 7.38116 0 8 0ZM3.33333 1.72414C3.70667 1.72414 4.05333 1.82759 4.35333 2.01379C4.25333 3 4.53333 3.97931 5.10667 4.74483C4.77333 5.4069 4.10667 5.86207 3.33333 5.86207C2.8029 5.86207 2.29419 5.64409 1.91912 5.25608C1.54405 4.86808 1.33333 4.34183 1.33333 3.7931C1.33333 3.24438 1.54405 2.71813 1.91912 2.33012C2.29419 1.94212 2.8029 1.72414 3.33333 1.72414ZM12.6667 1.72414C13.1971 1.72414 13.7058 1.94212 14.0809 2.33012C14.456 2.71813 14.6667 3.24438 14.6667 3.7931C14.6667 4.34183 14.456 4.86808 14.0809 5.25608C13.7058 5.64409 13.1971 5.86207 12.6667 5.86207C11.8933 5.86207 11.2267 5.4069 10.8933 4.74483C11.4743 3.96843 11.7441 2.99046 11.6467 2.01379C11.9467 1.82759 12.2933 1.72414 12.6667 1.72414ZM3.66667 8.7931C3.66667 7.36552 5.60667 6.2069 8 6.2069C10.3933 6.2069 12.3333 7.36552 12.3333 8.7931V10H3.66667V8.7931ZM0 10V8.96552C0 8.0069 1.26 7.2 2.96667 6.96552C2.57333 7.43448 2.33333 8.08276 2.33333 8.7931V10H0ZM16 10H13.6667V8.7931C13.6667 8.08276 13.4267 7.43448 13.0333 6.96552C14.74 7.2 16 8.0069 16 8.96552V10Z" fill="#B6B6BD" />
                </svg>

                Open Market
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-sm flex items-center gap-4 cursor-pointer hover:bg-su_enable_bg py-2 px-4 rounded-md"
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
              >
                <svg className="w-5" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5.05556L5.45455 2.52778L8 0L10.5455 2.52778L8 5.05556ZM0 13V10.1111C0 9.70185 0.142545 9.3588 0.427636 9.08194C0.712727 8.80509 1.05503 8.66667 1.45455 8.66667H3.83636C4.07879 8.66667 4.30909 8.72685 4.52727 8.84722C4.74545 8.96759 4.92121 9.13009 5.05454 9.33472C5.40606 9.80417 5.83951 10.1713 6.35491 10.4361C6.8703 10.7009 7.41867 10.8333 8 10.8333C8.59394 10.8333 9.14861 10.7009 9.664 10.4361C10.1794 10.1713 10.6065 9.80417 10.9455 9.33472C11.103 9.13009 11.288 8.96759 11.5004 8.84722C11.7127 8.72685 11.9338 8.66667 12.1636 8.66667H14.5455C14.9576 8.66667 15.303 8.80509 15.5818 9.08194C15.8606 9.3588 16 9.70185 16 10.1111V13H10.9091V11.3569C10.4848 11.6579 10.0272 11.8866 9.536 12.0431C9.04485 12.1995 8.53285 12.2778 8 12.2778C7.47879 12.2778 6.9697 12.1966 6.47273 12.0344C5.97576 11.8721 5.51515 11.6403 5.09091 11.3389V13H0ZM2.18182 7.94444C1.57576 7.94444 1.06061 7.7338 0.636364 7.3125C0.212121 6.8912 0 6.37963 0 5.77778C0 5.16389 0.212121 4.64943 0.636364 4.23439C1.06061 3.81935 1.57576 3.61159 2.18182 3.61111C2.8 3.61111 3.3183 3.81887 3.73673 4.23439C4.15515 4.64991 4.36412 5.16437 4.36364 5.77778C4.36364 6.37963 4.15467 6.8912 3.73673 7.3125C3.31879 7.7338 2.80048 7.94444 2.18182 7.94444ZM13.8182 7.94444C13.2121 7.94444 12.697 7.7338 12.2727 7.3125C11.8485 6.8912 11.6364 6.37963 11.6364 5.77778C11.6364 5.16389 11.8485 4.64943 12.2727 4.23439C12.697 3.81935 13.2121 3.61159 13.8182 3.61111C14.4364 3.61111 14.9547 3.81887 15.3731 4.23439C15.7915 4.64991 16.0005 5.16437 16 5.77778C16 6.37963 15.791 6.8912 15.3731 7.3125C14.9552 7.7338 14.4368 7.94444 13.8182 7.94444Z" fill="#B6B6BD" />
                </svg>

                Private Party
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>

        {/* leaderboard */}
        <div className="flex flex-col lg:flex-row items-center gap-3" >
          <NewMembersCard users={membersData} />
          <NewMembersCard cardType="trader" users={tradersData} />
          <LeaderboardCard users={membersData} />
        </div>

        <div className="overflow-x-scroll lg:overflow-hidden" >
          <Tabs defaultValue="private-party" className="w-full">
            <TabsList className="border-b-2 border-su_enable_bg w-full justify-start rounded-none bg-transparent">
              <TabsTrigger value="open-market" onClick={() => handleSwitchTab("open-market")} >
                Open market
                <span className={`bg-text font-semibold rounded-full py-0.5 px-3 text-xs ${activeTab === 'open-market' ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground'}`}>0</span>
              </TabsTrigger>
              <TabsTrigger value="private-party" onClick={() => handleSwitchTab("private-party")}>
                Private party
                <span className={`bg-text font-semibold rounded-full py-0.5 px-3 text-xs ${activeTab === 'private-party' ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground'}`}>
                  {filteredPrivatePartyData.length}
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="open-market" className="w-full flex justify-center">
              <EmptyDataset
                title="No Open Swaps Available"
                description="Check back later or create your own swap!"
              >
                <Button
                  className="gradient-button"
                  onClick={() =>
                    toast.info("Open market swap", {
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
                >Create open swap</Button>
              </EmptyDataset>
            </TabsContent>

            <TabsContent value="private-party" className="w-full flex flex-col gap-4">

              {/* Title */}
              <div className="flex items-center justify-between" >
                <h2 className="text-2xl font-medium" >Available rooms</h2>
                <Input
                  className="w-1/3 bg-su_enable_bg text-su_secondary !p-3.5 mr-1"
                  placeholder="Search by NFT, trade ID, wallet, etc..."
                  onChange={handleFilterData}
                  icon={
                    <svg className="w-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 14.6154L11.2277 9.84231C11.9968 8.78544 12.4105 7.5117 12.4092 6.20462C12.4092 2.78346 9.62577 0 6.20462 0C2.78346 0 0 2.78346 0 6.20462C0 9.62577 2.78346 12.4092 6.20462 12.4092C7.5117 12.4105 8.78544 11.9968 9.84231 11.2277L14.6154 16L16 14.6154ZM6.20462 10.4496C5.36493 10.4497 4.54407 10.2008 3.84586 9.7343C3.14765 9.26784 2.60345 8.60481 2.28208 7.82905C1.96071 7.05329 1.8766 6.19965 2.0404 5.37609C2.2042 4.55253 2.60854 3.79604 3.20229 3.20229C3.79604 2.60854 4.55253 2.2042 5.37609 2.0404C6.19965 1.8766 7.05329 1.96071 7.82905 2.28208C8.60481 2.60345 9.26784 3.14765 9.7343 3.84586C10.2008 4.54407 10.4497 5.36493 10.4496 6.20462C10.4483 7.33005 10.0006 8.40902 9.20482 9.20482C8.40902 10.0006 7.33005 10.4483 6.20462 10.4496Z" fill="#868691" />
                    </svg>
                  }
                />
              </div>

              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold min-w-[288px]">Assets</TableHead>
                    <TableHead className="font-semibold min-w-[150px] pl-8" >Unique trade ID</TableHead>
                    <TableHead className="font-semibold px-4" >Status</TableHead>
                    <TableHead className="font-semibold px-4" >Counter party wallet</TableHead>
                    <TableHead className="font-semibold px-4" >Trending chain</TableHead>
                    <TableHead className="font-semibold px-4" >Creation date</TableHead>
                    <TableHead className="w-[130px] pr-2" >
                      <div
                        className="flex items-center justify-end gap-2 text-text cursor-pointer"
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
                      >
                        <svg className="w-4" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.74997 14V7.48276L13.7681 1.93103C13.8427 1.84874 13.9016 1.75083 13.9414 1.64306C13.9812 1.53529 14.0011 1.41982 14 1.30345V0.482759C14 0.354723 13.9539 0.231932 13.8718 0.141397C13.7898 0.050862 13.6785 0 13.5625 0H0.437498C0.321467 0 0.210187 0.050862 0.12814 0.141397C0.0460934 0.231932 0 0.354723 0 0.482759V1.28897C8.18042e-05 1.40299 0.0206123 1.51586 0.0604084 1.62109C0.100204 1.72631 0.158479 1.82181 0.231874 1.90207L5.24998 7.52138V12.4455L8.74997 14Z" fill="white" />
                        </svg>
                        Filter
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y">
                  {
                    filteredPrivatePartyData?.map((data, index) => (
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
                        <TableCell className="font-medium px-4">{data.counter_party_wallet}</TableCell>
                        <TableCell className="font-medium px-4 flex justify-start">
                          <span className="w-auto flex items-center justify-center gap-2 py-2 px-3 rounded-full bg-su_enable_bg capitalize" >
                            {data.trending_chain.icon} {data.trending_chain.title}
                          </span>
                        </TableCell>
                        <TableCell className="font-medium px-4">{data.creation_data}</TableCell>
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
                !filteredPrivatePartyData.length &&
                <EmptyDataset
                  title="No Private Party Swaps Available"
                  description="Check back later or create your own swap!"
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
          </Tabs>
        </div>
      </section >
    </>
  );
};

export default SwapMarketPage;