import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SUI_RarityRankItem } from "@/types/swapup.types";
import { Button } from "@/components/ui/button";
import ToastLookCard from "../../shared/ToastLookCard";

const availableRarityRanking: SUI_RarityRankItem[] = [
  { from: 1, to: 10 },
  { from: 11, to: 20 },
  { from: 21, to: 50 },
  { from: 51, to: 100 },
  { from: 101, to: 1000 },
  { from: 1001, to: 10000 },
];

const collections: string[] = ["one", "two", "three"];

const preferredAssetsData: string[] = ["any", "NFT", "currency"];

const FormSchema = z.object({
  preferredAsset: z.string().min(1, { message: "Please select a preferred asset." }),
  collection: z.string().min(1, { message: "Please select a preferred collection." }),
  rarityRank: z.string().min(1, { message: "Please select a preferred rarity rank." }),
  expirationDate: z.object({
    from: z.date({ required_error: "Start date is required" }),
    to: z.date({ required_error: "End date is required" }),
  }).required(),
});

const SwapParametersCard = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      collection: '',
      rarityRank: '',
      preferredAsset: 'any',
      expirationDate: undefined
    }
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log("form data:", values);
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm border-none flex flex-col gap-4 dark:bg-su_secondary_bg p-2 lg:p-6">
      <h2 className="font-semibold text-sm lg:text-xl w-2/3 lg:w-auto">
        Swap parameters
      </h2>

      <ToastLookCard
        variant="info"
        title="Escrow swap ahead"
        description="The initial proposer escrows assets in the smart contract, signaling a serious offer with limited negotiations. Changing assets later incurs extra gas fees."
        hideCloseButton
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          {/* Expiration date */}
          <FormField
            control={form.control}
            name="expirationDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-su_secondary text-sm font-normal">Expiration date:</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-full flex justify-between items-center text-left font-normal bg-su_enable_bg rounded-sm text-su_secondary text-s"
                      )}
                    >
                      {field.value?.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.from, "LLL dd, y")} - {format(field.value.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(field.value.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Set expiration date</span>
                      )}
                      <CalendarIcon className="w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 dark:bg-su_least_bg" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={field.value?.from || undefined}
                      selected={field.value}
                      onSelect={(selectedRange) => {
                        field.onChange(selectedRange);
                      }}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferredAsset"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-su_secondary text-sm font-normal">Preferred asset:</FormLabel>
                <ToggleGroup
                  type="single"
                  className="w-[200px]"
                  onValueChange={field.onChange} defaultValue={field.value}
                >
                  {preferredAssetsData.map(asset => (
                    <ToggleGroupItem
                      key={asset}
                      value={asset}
                      aria-label="Toggle bold"
                      className="capitalize"
                    >
                      {asset}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="collection"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-su_secondary text-sm font-normal">Preferred collection:</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-su_enable_bg py-3 px-4 rounded-sm">
                      <SelectValue className="capitalize" placeholder="Select collection" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {collections.map(collection => (
                      <SelectItem className="capitalize" key={collection} value={collection}>{collection}</SelectItem>
                    ))}
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
                <FormLabel className="text-su_secondary text-sm font-normal">Preferred rarity rank:</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-su_enable_bg py-3 px-4 rounded-sm">
                      <SelectValue placeholder={
                        <span className="flex items-center gap-2">
                          <svg className="w-3" viewBox="0 0 16 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.29 4L8 0L5.71 4H10.29ZM2.29 10L0 14H16L13.71 10H2.29ZM13.14 9L10.86 5H5.14L2.86 9H13.14Z" fill="#868691" />
                          </svg>
                          Any
                        </span>
                      } />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableRarityRanking.map((rarityRank, index) => (
                      <SelectItem key={index + rarityRank.from} value={JSON.stringify(rarityRank)}>
                        <span className="flex items-center gap-2">
                          <svg className="w-3" viewBox="0 0 16 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.29 4L8 0L5.71 4H10.29ZM2.29 10L0 14H16L13.71 10H2.29ZM13.14 9L10.86 5H5.14L2.86 9H13.14Z" fill="#868691" />
                          </svg>
                          {rarityRank.from} - {rarityRank.to}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default SwapParametersCard;
