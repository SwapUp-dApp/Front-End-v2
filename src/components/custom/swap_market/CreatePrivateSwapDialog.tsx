import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import CustomOutlineButton from "../shared/CustomOutlineButton";
import { Dialog, DialogTrigger, DialogContent, DialogClose } from "@/components/ui/dialog";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  walletAddress: z.string().min(1, {
    message: "Required field missed",
  }),
});

interface IProp {
  children?: any;
  className?: string;
}


const CreatePrivateSwapDialog = ({ children, className }: IProp) => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      walletAddress: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    navigate("/swap-up/swap-market/private-room");
  }

  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          "",
          className
        )}
      >
        {children}
      </DialogTrigger>

      <DialogContent className="w-[400px] p-4 px-6" >
        <div className="space-y-3" >
          {/* header */}
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <h2 className="font-bold text-xl pt-3" >Private party trade</h2>

              <DialogClose className="p-1 rounded-xs hover:bg-su_active_bg" >
                <svg className="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
              </DialogClose>
            </div>

            <p className="text-base font-medium text-secondary dark:text-su_secondary">Input counterparty wallet to create a private swap room.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="walletAddress"
                render={({ field }) => (
                  <FormItem className="space-y-2" >
                    <FormLabel className="text-su_secondary text-sm font-semibold" >Counterparty wallet address</FormLabel>
                    <FormControl>
                      <Input
                        icon={
                          <svg className="w-4" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.6667 8.5C11.0478 8.5 10.4543 8.74583 10.0168 9.18342C9.57917 9.621 9.33333 10.2145 9.33333 10.8333C9.33333 11.4522 9.57917 12.0457 10.0168 12.4832C10.4543 12.9208 11.0478 13.1667 11.6667 13.1667H16V16.5H0V5.16667H16V8.5H11.6667ZM12.3333 11.8333H11.6667C11.4015 11.8333 11.1471 11.728 10.9596 11.5404C10.772 11.3529 10.6667 11.0985 10.6667 10.8333C10.6667 10.5681 10.772 10.3138 10.9596 10.1262C11.1471 9.93869 11.4015 9.83333 11.6667 9.83333H12.3333C12.5985 9.83333 12.8529 9.93869 13.0404 10.1262C13.228 10.3138 13.3333 10.5681 13.3333 10.8333C13.3333 11.0985 13.228 11.3529 13.0404 11.5404C12.8529 11.728 12.5985 11.8333 12.3333 11.8333ZM10.6667 0.5L13.3333 3.83333H5.33333L10.6667 0.5Z" fill="#868691" />
                          </svg>
                        }
                        className="!bg-su_enable_bg py-3.5 px-4"
                        placeholder="Enter counterparty wallet address"
                        error={!!form.formState.errors.walletAddress}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />


              <div className="w-full grid grid-cols-2 gap-4 py-2" >
                <DialogClose >
                  <CustomOutlineButton containerClasses="w-full h-full" >Cancel</CustomOutlineButton>
                </DialogClose>

                <Button variant={"default"} type="submit" >Create room</Button>
              </div>
            </form>
          </Form>



          {/* <div className="custom-border-card flex items-start gap-3" >
            <div className="pt-1" >
              <svg className="w-3" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.75 10.5433V15.6298C9.75001 15.6953 9.73242 15.7596 9.69902 15.8162C9.66563 15.8728 9.61761 15.9196 9.55989 15.9519C9.50217 15.9842 9.43679 16.0008 9.37045 16C9.30411 15.9992 9.23916 15.981 9.18225 15.9474L6 14.0628L2.81775 15.9474C2.76078 15.9811 2.69577 15.9992 2.62936 16C2.56295 16.0007 2.49753 15.9841 2.43978 15.9517C2.38204 15.9193 2.33404 15.8724 2.30069 15.8157C2.26735 15.759 2.24985 15.6946 2.25 15.6291V10.544C1.27961 9.77722 0.574494 8.73192 0.232094 7.55254C-0.110306 6.37317 -0.0730831 5.11795 0.338618 3.96036C0.75032 2.80277 1.51617 1.79995 2.53034 1.0905C3.5445 0.381054 4.75691 0 6 0C7.24309 0 8.4555 0.381054 9.46966 1.0905C10.4838 1.79995 11.2497 2.80277 11.6614 3.96036C12.0731 5.11795 12.1103 6.37317 11.7679 7.55254C11.4255 8.73192 10.7204 9.77722 9.75 10.544M6 10.3619C7.19347 10.3619 8.33807 9.894 9.18198 9.06113C10.0259 8.22825 10.5 7.09863 10.5 5.92077C10.5 4.74291 10.0259 3.61329 9.18198 2.78041C8.33807 1.94754 7.19347 1.47964 6 1.47964C4.80653 1.47964 3.66193 1.94754 2.81802 2.78041C1.97411 3.61329 1.5 4.74291 1.5 5.92077C1.5 7.09863 1.97411 8.22825 2.81802 9.06113C3.66193 9.894 4.80653 10.3619 6 10.3619ZM6 8.88153C5.20435 8.88153 4.44129 8.56959 3.87868 8.01434C3.31607 7.45909 3 6.70601 3 5.92077C3 5.13553 3.31607 4.38245 3.87868 3.8272C4.44129 3.27195 5.20435 2.96001 6 2.96001C6.79565 2.96001 7.55871 3.27195 8.12132 3.8272C8.68393 4.38245 9 5.13553 9 5.92077C9 6.70601 8.68393 7.45909 8.12132 8.01434C7.55871 8.56959 6.79565 8.88153 6 8.88153Z" fill="#868691" />
              </svg>
            </div>

            <div>
              <h2 className="text-sm text-primary font-bold text-text dark:text-su_primary" >Earn More</h2>
              <p className="text-xs dark:text-su_secondary" >
                Connect multiple wallets to earn points across all our supported networks for your SwapUp trading activity.
              </p>
            </div>
          </div> */}
        </div>
      </DialogContent>
    </Dialog >
  );
};

export default CreatePrivateSwapDialog;