import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import PrivateMarketSwapFilterDrawer from '../../swap-market/private-party/PrivateMarketSwapFilterDrawer';
import FilterButton from '../../shared/FilterButton';
import EmptyDataset from '../../shared/EmptyDataset';
import LoadingDataset from '../../shared/LoadingDataset';
import { getDefaultNftImageOnError } from '@/lib/utils';
import YesNoTile from '../../tiles/YesNoTile';
import CollectionOwnedCard from './CollectionOwnedCard';
import { SUI_CollectionOwnedItem } from '@/types/profile.types';


const collectionsDataset: SUI_CollectionOwnedItem[] = [
  {
    id: '1',
    cover: '/assets/nfts/card-nft-1.png',
    collectionName: "Whispering Winds",
    assets: 10,
    floorPrice: 1.005,
    highestRankNft: 10,
    openApproval: true,
    volume: 150
  },
  {
    id: '2',
    cover: '/assets/nfts/cool-lion.jpg',
    collectionName: "Cool loins",
    assets: 10,
    floorPrice: 1.005,
    highestRankNft: 10,
    openApproval: false,
    volume: 150
  },
  {
    id: '3',
    cover: '/assets/nfts/cool-cat.jpg',
    collectionName: "cool cats",
    assets: 10,
    floorPrice: 1.005,
    highestRankNft: 10,
    openApproval: true,
    volume: 150
  },
  {
    id: '4',
    cover: '/assets/nfts/cool-dog.jpg',
    collectionName: "cool dogs",
    assets: 10,
    floorPrice: 1.005,
    highestRankNft: 10,
    openApproval: false,
    volume: 150
  },
  {
    id: '5',
    cover: '/assets/nfts/cool-elephant.jpg',
    collectionName: "cool elephants",
    assets: 10,
    floorPrice: 1.005,
    highestRankNft: 10,
    openApproval: true,
    volume: 150
  },
];

const CollectionDetailsSection = () => {

  return (
    <div className="space-y-4">
      {/* Filter Data and Title */}
      <div className="flex flex-col gap-3 lg:gap-0 lg:flex-row lg:items-center lg:justify-between" >
        <div className="flex items-center lg:justify-between gap-4" >
          <h2 className="text-1.5xl font-medium" >Collections owned</h2>
          <span className={`bg-text font-semibold rounded-full py-0.5 px-3 text-xs ${(collectionsDataset || []).length > 0 ? 'bg-white text-su_primary_bg' : 'bg-muted'}`}>
            {(collectionsDataset || []).length}
          </span>
        </div>

        <div className='w-full lg:w-1/3 flex items-center gap-2' >
          <Input
            className="w-full bg-su_enable_bg text-su_secondary !p-3.5 mr-1"
            placeholder="Search by collection name"
            icon={
              <svg className="w-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 14.6154L11.2277 9.84231C11.9968 8.78544 12.4105 7.5117 12.4092 6.20462C12.4092 2.78346 9.62577 0 6.20462 0C2.78346 0 0 2.78346 0 6.20462C0 9.62577 2.78346 12.4092 6.20462 12.4092C7.5117 12.4105 8.78544 11.9968 9.84231 11.2277L14.6154 16L16 14.6154ZM6.20462 10.4496C5.36493 10.4497 4.54407 10.2008 3.84586 9.7343C3.14765 9.26784 2.60345 8.60481 2.28208 7.82905C1.96071 7.05329 1.8766 6.19965 2.0404 5.37609C2.2042 4.55253 2.60854 3.79604 3.20229 3.20229C3.79604 2.60854 4.55253 2.2042 5.37609 2.0404C6.19965 1.8766 7.05329 1.96071 7.82905 2.28208C8.60481 2.60345 9.26784 3.14765 9.7343 3.84586C10.2008 4.54407 10.4497 5.36493 10.4496 6.20462C10.4483 7.33005 10.0006 8.40902 9.20482 9.20482C8.40902 10.0006 7.33005 10.4483 6.20462 10.4496Z" fill="#868691" />
              </svg>
            }
          />

          <FilterButton className='lg:hidden' />
        </div>
      </div>

      <ScrollArea className='hidden lg:block min-w-full' >
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="align-top font-semibold min-w-[50px]">#</TableHead>
              <TableHead className="align-top font-semibold min-w-[100px]">Cover</TableHead>
              <TableHead className="align-top font-semibold min-w-[200px]">Collection name</TableHead>
              <TableHead className="align-top font-semibold min-w-[150px]" >Assets #</TableHead>
              <TableHead className="align-top font-semibold min-w-[130px]" >Floor price</TableHead>
              <TableHead className="align-top font-semibold min-w-[150px]" >Highest rank NFT</TableHead>
              <TableHead className="align-top font-semibold min-w-[100px]" >Volume</TableHead>
              <TableHead className="align-top font-semibold min-w-[130px]" >Open approval</TableHead>
              <TableHead className="min-w-[100px] pr-2 relative" >
                <PrivateMarketSwapFilterDrawer>
                  <div className="absolute top-2 left-2">
                    <FilterButton showTitleOnMobile />
                  </div>
                </PrivateMarketSwapFilterDrawer>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y">
            {
              collectionsDataset.map(collection => (
                <TableRow key={collection.id} >
                  <TableCell className="text-xs font-semibold">
                    {collection.id}
                  </TableCell>
                  <TableCell className="text-xs font-semibold">
                    <img
                      className="w-8 h-8 object-cover rounded-xs border-[1.5px] border-white/20"
                      src={collection.cover}
                      alt="nft"
                      onError={getDefaultNftImageOnError}
                    />
                  </TableCell>
                  <TableCell className="text-xs font-semibold">
                    <span className='capitalize' >{collection.collectionName}</span>
                  </TableCell>
                  <TableCell className="text-xs font-semibold">
                    {collection.assets}
                  </TableCell>
                  <TableCell className="text-xs font-semibold">
                    {collection.floorPrice} SOL
                  </TableCell>
                  <TableCell className="text-xs font-semibold">
                    {collection.highestRankNft}
                  </TableCell>
                  <TableCell className="text-xs font-semibold">
                    {collection.volume} SOL
                  </TableCell>
                  <TableCell className="text-xs font-semibold">
                    <YesNoTile yes={collection.openApproval} />
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))
            }

          </TableBody>
        </Table>

        {
          (false) &&
          <EmptyDataset
            title="No Results Found"
            description="We couldn't find any results matching your search query. <br/>  Please try again with a different keyword or refine your search criteria."
            showBackgroundPicture={false}
          />
        }
        <ScrollBar orientation='horizontal' className='h-2' />
      </ScrollArea>

      <div className='flex flex-col gap-3 lg:hidden'>
        {
          collectionsDataset.map(collection => (
            <CollectionOwnedCard key={collection.id} collection={collection} />
          ))
        }
      </div>
      <LoadingDataset
        isLoading={false}
        title="Loading open swaps"
        description='Open swaps data is being loaded...'
      />
    </div >
  );
};

export default CollectionDetailsSection;