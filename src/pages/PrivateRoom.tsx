import RoomHeader from "@/components/custom/swap_market/RoomHeader";
import RoomLayoutCard from "@/components/custom/swap_market/RoomLayoutCard";
import { usePrivateRoomStore } from "@/store/private-room-store";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const PrivateRoom = () => {
  const { } = usePrivateRoomStore(state => state);
  return (
    <div className="flex flex-col gap-4" >
      <RoomHeader backClickNavigateTo="/" tardeId="#46Aic2o" />
      <div className="grid lg:grid-cols-2 gap-4 mb-12" >
        <RoomLayoutCard />
        <RoomLayoutCard />
      </div>

      <footer className="bg-su_primary_bg fixed bottom-0 left-0 w-full h-[104px] border-t-2 border-su_disabled flex justify-between" >
        <aside className="w-1/2 p-4"  >
          <h2 className="text-xs">You offer:</h2>

          <div className="flex items-center justify-between" >
            <p className="text-xs text-su_secondary" >Awaiting asset selection. You can choose up to 20 assets.</p>

            <div className="flex items-center justify-between py-2 px-3 rounded-md bg-su_enable_bg" >

              <div className="flex items-center gap-2" >
                <svg className="w-4" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9294 5.71425C11.9294 8.87042 9.37083 11.429 6.21469 11.429C3.05856 11.429 0.5 8.87042 0.5 5.71425C0.5 2.55809 3.05856 -0.000488281 6.21469 -0.000488281C9.37083 -0.000488281 11.9294 2.55809 11.9294 5.71425ZM8.99618 11.9817C8.12045 12.3703 7.17301 12.5711 6.21493 12.5711C5.98634 12.5711 5.75775 12.5597 5.53259 12.5379C5.90083 13.3962 6.47376 14.1512 7.20127 14.7368C7.92877 15.3224 8.78869 15.7208 9.70581 15.8972C10.6229 16.0736 11.5693 16.0226 12.4621 15.7486C13.3549 15.4747 14.167 14.9861 14.8274 14.3256C15.4877 13.6652 15.9762 12.853 16.25 11.9601C16.5238 11.0673 16.5747 10.1209 16.3982 9.2038C16.2216 8.28671 15.8231 7.42684 15.2374 6.69942C14.6516 5.97199 13.8966 5.39917 13.0383 5.03106C13.1336 5.98439 13.0281 6.94712 12.7286 7.85719C12.4291 8.76726 11.9422 9.60448 11.2994 10.3149C10.6565 11.0252 9.87191 11.593 8.99618 11.9817Z" fill="#868691" />
                </svg>
                <input type="text" className="bg-transparent ring-0 w-[100px] text-sm" placeholder="Enter amount" />
              </div>

              <Select >
                <SelectTrigger className="bg-transparent border-none flex items-center gap-2">
                  <SelectValue className="uppercase" placeholder="eth" />
                </SelectTrigger>
                <SelectContent className="bg-su_primary_bg border-none" >
                  <SelectItem className="hover:bg-su_active_bg" value="eth">
                    <span className=" flex items-center gap-2" >
                      <img className="w-4 h-4 rounded-full" src={'src/assets/svgs/ethereum.svg'} alt="" />

                      Ethereum
                    </span>
                  </SelectItem>
                  <SelectItem className="hover:bg-su_active_bg" value="sol">
                    <span className=" flex items-center gap-2" >
                      <img className="w-4 h-4 rounded-full" src={'src/assets/svgs/solana.svg'} alt="" />

                      Solana
                    </span>
                  </SelectItem>

                </SelectContent>
              </Select>
            </div>
          </div>
        </aside>

        <Separator className="border-r-2 border-su_disabled" orientation="vertical" />

        <aside className="w-1/2 p-4"  >
          <h2 className="text-xs">You receive:</h2>

          <div className="flex items-center justify-between" >
            <p className="text-xs text-su_secondary" >Awaiting asset selection. You can choose up to 20 assets.</p>

            <div className="flex items-center justify-between py-2 px-3 rounded-md bg-su_enable_bg" >

              <div className="flex items-center gap-2" >
                <svg className="w-4" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9294 5.71425C11.9294 8.87042 9.37083 11.429 6.21469 11.429C3.05856 11.429 0.5 8.87042 0.5 5.71425C0.5 2.55809 3.05856 -0.000488281 6.21469 -0.000488281C9.37083 -0.000488281 11.9294 2.55809 11.9294 5.71425ZM8.99618 11.9817C8.12045 12.3703 7.17301 12.5711 6.21493 12.5711C5.98634 12.5711 5.75775 12.5597 5.53259 12.5379C5.90083 13.3962 6.47376 14.1512 7.20127 14.7368C7.92877 15.3224 8.78869 15.7208 9.70581 15.8972C10.6229 16.0736 11.5693 16.0226 12.4621 15.7486C13.3549 15.4747 14.167 14.9861 14.8274 14.3256C15.4877 13.6652 15.9762 12.853 16.25 11.9601C16.5238 11.0673 16.5747 10.1209 16.3982 9.2038C16.2216 8.28671 15.8231 7.42684 15.2374 6.69942C14.6516 5.97199 13.8966 5.39917 13.0383 5.03106C13.1336 5.98439 13.0281 6.94712 12.7286 7.85719C12.4291 8.76726 11.9422 9.60448 11.2994 10.3149C10.6565 11.0252 9.87191 11.593 8.99618 11.9817Z" fill="#868691" />
                </svg>
                <input type="text" className="bg-transparent ring-0 w-[100px] text-sm" placeholder="Enter amount" />
              </div>

              <Select >
                <SelectTrigger className="bg-transparent border-none flex items-center gap-2">
                  <SelectValue className="uppercase" placeholder="eth" />
                </SelectTrigger>
                <SelectContent className="bg-su_primary_bg border-none" >
                  <SelectItem className="hover:bg-su_active_bg" value="eth">
                    <span className=" flex items-center gap-2" >
                      <img className="w-4 h-4 rounded-full" src={'src/assets/svgs/ethereum.svg'} alt="" />

                      Ethereum
                    </span>
                  </SelectItem>
                  <SelectItem className="hover:bg-su_active_bg" value="sol">
                    <span className=" flex items-center gap-2" >
                      <img className="w-4 h-4 rounded-full" src={'src/assets/svgs/solana.svg'} alt="" />

                      Solana
                    </span>
                  </SelectItem>

                </SelectContent>
              </Select>
            </div>
          </div>
        </aside>

      </footer>
    </div >
  );
};

export default PrivateRoom;