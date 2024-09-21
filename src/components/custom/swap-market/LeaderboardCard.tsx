import { Card, CardContent } from "@/components/ui/card";
import { cn, getNameInitials, getShortenWalletAddress } from "@/lib/utils";
import { IMember } from '@/constants/data';
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

interface IProp {
  users: IMember[];
  className?: string;
}

const LeaderboardCard = ({ users, className }: IProp) => {
  return (
    <Card className={cn(
      "min-h-[100px] border-none bg-card dark:bg-su_secondary_bg p-3",
      className
    )}
    >
      <CardContent className={`p-0 flex flex-col gap-3`}>
        <div className="flex items-start justify-between">
          <div className="flex gap-2 items-center">

            <svg className="w-4" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.39273 12C3.4069 12 2.56732 11.6631 1.87398 10.9894C1.18065 10.3158 0.833984 9.49996 0.833984 8.54207C0.833984 7.63681 1.14555 6.85513 1.76868 6.19703C2.39182 5.53893 3.169 5.17324 4.10023 5.09998L1.48398 0H6.03398L7.33398 2.52631L8.63398 0H13.184L10.584 5.0684C11.5048 5.15261 12.2768 5.52377 12.8999 6.18187C13.5231 6.83997 13.8344 7.62145 13.834 8.52628C13.834 9.4947 13.4873 10.3158 12.794 10.9894C12.1007 11.6631 11.2557 12 10.259 12C10.1615 12 10.0614 11.9974 9.95868 11.9924C9.85598 11.9873 9.75567 11.9741 9.65773 11.9526C10.2536 11.5736 10.7194 11.0816 11.0552 10.4766C11.3911 9.87154 11.559 9.22144 11.559 8.52628C11.559 7.37892 11.1499 6.40798 10.3318 5.61345C9.51365 4.81893 8.51438 4.42146 7.33398 4.42104C6.15358 4.42062 5.15432 4.81809 4.33618 5.61345C3.51805 6.40882 3.10898 7.37976 3.10898 8.52628C3.10898 9.24207 3.26065 9.91575 3.56398 10.5473C3.86732 11.1789 4.34398 11.6473 4.99398 11.9526C4.89648 11.9736 4.79638 11.9869 4.69368 11.9924C4.59098 11.9979 4.49067 12.0004 4.39273 12ZM7.33398 11.3684C6.52148 11.3684 5.83097 11.0922 5.26243 10.5398C4.6939 9.98733 4.40942 9.31618 4.40898 8.52628C4.40855 7.73639 4.69303 7.06545 5.26243 6.51345C5.83183 5.96145 6.52235 5.68503 7.33398 5.68419C8.14562 5.68335 8.83635 5.95977 9.40618 6.51345C9.97602 7.06713 10.2603 7.73808 10.259 8.52628C10.2577 9.31449 9.97342 9.98565 9.40618 10.5398C8.83895 11.0939 8.14822 11.3701 7.33398 11.3684ZM6.13148 10.2631L7.33398 9.37891L8.53648 10.2631L8.08148 8.82628L9.28398 7.98944H7.80523L7.33398 6.47366L6.86273 7.98944H5.38398L6.58648 8.82628L6.13148 10.2631Z" fill="#868691" />
            </svg>

            <p className="text-sm font-semibold">
              Points leaderboard
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 2xl:gap-4" >
          <div className="flex items-center gap-6 2xl:gap-8 mx-auto">
            <div className="flex items-center gap-2">
              <img className="w-6 h-6 2xl:w-8 2xl:h-8" src="/assets/svgs/goldBadge.svg" alt="1st" />
              <span className="text-xs 2xl:text-sm font-semibold" >1,600</span>
            </div>
            <div className="flex items-center gap-2">
              <img className="w-6 h-6 2xl:w-8 2xl:h-8" src="/assets/svgs/silverBadge.svg" alt="1st" />
              <span className="text-xs 2xl:text-sm font-semibold" >1,300</span>
            </div>
            <div className="flex items-center gap-2">
              <img className="w-6 h-6 2xl:w-8 2xl:h-8" src="/assets/svgs/bronzeBadge.svg" alt="1st" />
              <span className="text-xs 2xl:text-sm font-semibold" >1,100</span>
            </div>
            <div className="flex items-center gap-2">
              <img className="w-6 h-6 2xl:w-8 2xl:h-8" src="/assets/svgs/fourthPlaceBadge.svg" alt="1st" />
              <span className="text-xs 2xl:text-sm font-semibold" >800</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 2xl:gap-4 mx-auto">
            {
              users.map((user, index) => {
                if (index < 4)
                  return (
                    <div className="flex items-center gap-2 3xl:gap-3" key={user.id}>
                      <div className="">
                        <Avatar className="relative w-4 h-4 2xl:w-6 2xl:h-6 3xl:w-8 3xl:h-8 mx-auto">
                          <AvatarImage className="w-4 h-4 2xl:w-6 2xl:h-6 3xl:w-8 3xl:h-8 rounded-full" src={user.image} alt="@shadcn" />
                          <AvatarFallback className="text-[8px] rounded-full font-semibold dark:bg-su_enable_bg w-4 h-4 2xl:w-6 2xl:h-6 3xl:w-8 3xl:h-8 flex justify-center items-center">
                            {getNameInitials(user.title)}
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      <p className="text-2xs 2xl:text-xs 3xl:text-sm dark:text-su_secondary line-clamp-1" >{getShortenWalletAddress("0xaE30Cb8B6348e0aB7995F1E2d3E85718B75eF074")}</p>
                    </div>
                  );

              })
            }
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardCard;