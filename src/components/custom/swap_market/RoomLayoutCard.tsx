import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import WalletAddressTile from "../tiles/WalletAddressTile";
import CustomAvatar from "../shared/CustomAvatar";
import ChainTile from "../tiles/ChainTile";
import FilterButton from "../shared/FilterButton";
import GridToggleButton from "../shared/GridToggleButton";
import { Input } from "@/components/ui/input";
import NftCard from "../shared/NftCard";
import { usePrivateRoomStore } from "@/store/private-room-store";
import { Separator } from "@/components/ui/separator";

const RoomLayoutCard = () => {

  const { activeGridView, toggleGridView } = usePrivateRoomStore((state) => state);

  return (
    <Card className="border-none flex flex-col gap-4 dark:bg-su_secondary_bg p-2 lg:p-6" >
      <CardHeader className="flex flex-col p-0 gap-3" >
        <div className={`flex justify-between items-center`} >
          <div className="flex items-center gap-2 lg:gap-3">
            <CustomAvatar imageSrc="/src/assets/images/avatar.png" fallbackName="Jane Doe" isPremium />
            <h2 className="font-semibold text-sm lg:text-lg line-clamp-1 truncate ">mariia.swapup.eth</h2>
          </div>

          <div className="flex items-center gap-2">
            <WalletAddressTile walletAddress="0x1431F...23f83" />
            <ChainTile imageSrc="/src/assets/svgs/ethereum.svg" title="ethereum" />
          </div>
        </div>

        <Separator className="border-t-[1px] border-su_enable_bg" />

        <div className={`flex gap-4 items-center`} >
          <Input
            className="w-3/4 bg-su_enable_bg text-su_secondary !p-3.5 mr-1"
            placeholder="Search by asset name or ID"
            // onChange={handleFilterData}
            icon={
              <svg className="w-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 14.6154L11.2277 9.84231C11.9968 8.78544 12.4105 7.5117 12.4092 6.20462C12.4092 2.78346 9.62577 0 6.20462 0C2.78346 0 0 2.78346 0 6.20462C0 9.62577 2.78346 12.4092 6.20462 12.4092C7.5117 12.4105 8.78544 11.9968 9.84231 11.2277L14.6154 16L16 14.6154ZM6.20462 10.4496C5.36493 10.4497 4.54407 10.2008 3.84586 9.7343C3.14765 9.26784 2.60345 8.60481 2.28208 7.82905C1.96071 7.05329 1.8766 6.19965 2.0404 5.37609C2.2042 4.55253 2.60854 3.79604 3.20229 3.20229C3.79604 2.60854 4.55253 2.2042 5.37609 2.0404C6.19965 1.8766 7.05329 1.96071 7.82905 2.28208C8.60481 2.60345 9.26784 3.14765 9.7343 3.84586C10.2008 4.54407 10.4497 5.36493 10.4496 6.20462C10.4483 7.33005 10.0006 8.40902 9.20482 9.20482C8.40902 10.0006 7.33005 10.4483 6.20462 10.4496Z" fill="#868691" />
              </svg>
            }
          />

          <div className="flex items-center gap-2" >
            <GridToggleButton activeGridView={activeGridView} toggleView={toggleGridView} />
            <FilterButton />
          </div>
        </div>
      </CardHeader>

      <CardContent
        className={`grid gap-3 lg:gap-4 ${activeGridView === "detailed" ?
          "grid-cols-2 md:grid-cols-3 lg:grid-cols-3 5xl:grid-cols-5 3xl:grid-cols-4" :
          "grid-cols-3 md:grid-cols-4 lg:grid-cols-5 3xl:grid-cols-6 5xl:grid-cols-8"} p-0`}
      >
        <NftCard className="col-span-1" />
        <NftCard className="col-span-1" />
        <NftCard className="col-span-1" />
        <NftCard className="col-span-1" />
        <NftCard className="col-span-1" />
        <NftCard className="col-span-1" />
        <NftCard className="col-span-1" />
      </CardContent>
    </Card>
  );
};

export default RoomLayoutCard;