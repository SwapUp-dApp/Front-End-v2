import { Card, CardContent, CardHeader } from "@/components/ui/card";
import WalletAddressTile from "../tiles/WalletAddressTile";
import CustomAvatar from "../shared/CustomAvatar";
import ChainTile from "../tiles/ChainTile";
import FilterButton from "../shared/FilterButton";
import GridToggleButton from "../shared/GridToggleButton";
import { Input } from "@/components/ui/input";
import NftCard from "../shared/NftCard";
import { usePrivateRoomStore } from "@/store/private-room-store";
import { Separator } from "@/components/ui/separator";
import { DrawerTrigger, Drawer, DrawerContent, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectLabel } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  collection: z.string({
    required_error: "Please select an preferred collection.",
  }),
  rarityRank: z.string({
    required_error: "Please select an preferred rarity rank.",
  }),

});

const RoomLayoutCard = () => {

  const { activeGridView, toggleGridView } = usePrivateRoomStore((state) => state);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
  }

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

            <Drawer direction="right" >
              <DrawerTrigger>
                <FilterButton />
              </DrawerTrigger>

              <DrawerContent className="p-3 h-screen w-1/3 right-0 bg-transparent" >

                <div className="rounded-sm h-full w-full bg-su_secondary_bg flex flex-col gap-4 p-4" >
                  <DrawerTitle className="text-su_primary" >
                    <div className="flex justify-between items-start">
                      <h2 className="font-semibold text-xl pt-2" >Filter options</h2>
                      <DrawerClose className="p-1 rounded-xs hover:bg-su_active_bg" >
                        <svg className="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                      </DrawerClose>
                    </div>

                    <p className="text-su_secondary text-base font-medium" >Refine your search with custom filters:</p>
                  </DrawerTitle>

                  <section className="h-full flex flex-col justify-between" >
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center text-sm" >
                        <p>Attributes</p>
                        <button className="flex items-center gap-2 py-1 px-2 rounded-sm hover:bg-su_active_bg" >
                          <svg className="w-3" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12C4.46667 12 3.13067 11.4918 1.992 10.4753C0.853333 9.45889 0.200444 8.18933 0.0333333 6.66667H1.4C1.55556 7.82222 2.06956 8.77778 2.942 9.53333C3.81444 10.2889 4.83378 10.6667 6 10.6667C7.3 10.6667 8.40289 10.214 9.30867 9.30867C10.2144 8.40333 10.6671 7.30045 10.6667 6C10.6662 4.69956 10.2136 3.59689 9.30867 2.692C8.40378 1.78711 7.30089 1.33422 6 1.33333C5.23333 1.33333 4.51667 1.51111 3.85 1.86667C3.18333 2.22222 2.62222 2.71111 2.16667 3.33333H4V4.66667H0V0.666667H1.33333V2.23333C1.9 1.52222 2.59178 0.972222 3.40867 0.583333C4.22556 0.194444 5.08933 0 6 0C6.83333 0 7.614 0.158445 8.342 0.475333C9.07 0.792222 9.70333 1.21978 10.242 1.758C10.7807 2.29622 11.2084 2.92956 11.5253 3.658C11.8422 4.38645 12.0004 5.16711 12 6C11.9996 6.83289 11.8413 7.61356 11.5253 8.342C11.2093 9.07045 10.7816 9.70378 10.242 10.242C9.70244 10.7802 9.06911 11.208 8.342 11.5253C7.61489 11.8427 6.83422 12.0009 6 12Z" fill="#B6B6BD" />
                          </svg>

                          Reset
                        </button>
                      </div>

                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                          <FormField
                            control={form.control}
                            name="collection"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Preferred collection:</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="bg-su_enable_bg py-3 px-4 rounded-sm" >
                                      <SelectValue className="" placeholder="Select collection" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="normlady">normlady</SelectItem>
                                    <SelectItem value="example">example</SelectItem>
                                    <SelectItem value="example2">example2</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="rarityRank"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Preferred rarity rank:</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl >
                                    <SelectTrigger className="bg-su_enable_bg py-3 px-4 rounded-sm" >
                                      <SelectValue className="" placeholder={
                                        <span className="flex items-center gap-2" >
                                          <svg className="w-3" viewBox="0 0 16 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.29 4L8 0L5.71 4H10.29ZM2.29 10L0 14H16L13.71 10H2.29ZM13.14 9L10.86 5H5.14L2.86 9H13.14Z" fill="#868691" />
                                          </svg>

                                          Any
                                        </span>
                                      } />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="1" >
                                      <span className="flex items-center gap-2" >
                                        <svg className="w-3" viewBox="0 0 16 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M10.29 4L8 0L5.71 4H10.29ZM2.29 10L0 14H16L13.71 10H2.29ZM13.14 9L10.86 5H5.14L2.86 9H13.14Z" fill="#868691" />
                                        </svg>

                                        1
                                      </span>
                                    </SelectItem>
                                    <SelectItem value="10" >
                                      <span className="flex items-center gap-2" >
                                        <svg className="w-3" viewBox="0 0 16 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M10.29 4L8 0L5.71 4H10.29ZM2.29 10L0 14H16L13.71 10H2.29ZM13.14 9L10.86 5H5.14L2.86 9H13.14Z" fill="#868691" />
                                        </svg>

                                        10
                                      </span>
                                    </SelectItem>
                                    <SelectItem value="100" >
                                      <span className="flex items-center gap-2" >
                                        <svg className="w-3" viewBox="0 0 16 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M10.29 4L8 0L5.71 4H10.29ZM2.29 10L0 14H16L13.71 10H2.29ZM13.14 9L10.86 5H5.14L2.86 9H13.14Z" fill="#868691" />
                                        </svg>

                                        100
                                      </span>
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </form>
                      </Form>
                    </div>

                    <div className="flex items-center gap-3" >
                      <Button variant={"outline"}>Clear filters</Button>
                      <Button variant={"default"} type="submit" >Apply filters</Button>
                    </div>
                  </section>


                </div>
              </DrawerContent>
            </Drawer>

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
    </Card >
  );
};

export default RoomLayoutCard;