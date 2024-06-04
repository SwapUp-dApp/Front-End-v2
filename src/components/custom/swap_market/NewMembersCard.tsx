import { Card, CardContent } from "@/components/ui/card";
import { getNameInitials } from "@/lib/utils";
import { IMember } from "@/pages/SwapMarketPage";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

interface IProp {
  cardType?: "member" | "trader";
  users: IMember[];
}

const NewMembersCard = ({ cardType = 'member', users }: IProp) => {

  return (
    <Card className="h-[100px] border-none bg-card dark:bg-su_secondary_bg p-3" >
      <CardContent className={`p-0 flex flex-col ${cardType === 'member' ? 'gap-2' : 'gap-6'}`}>
        <div className="flex items-start justify-between">
          <div className="flex gap-2 items-center">
            {
              cardType === 'member'
                ?
                <svg className="w-4" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 10V0H14V10H0ZM1.59091 6.875H2.38636V4.6875L4.00909 6.875H4.77273V3.125H3.97727V5.3125L2.38636 3.125H1.59091V6.875ZM5.40909 6.875H7.95455V6.09375H6.36364V5.40625H7.95455V4.625H6.36364V3.90625H7.95455V3.125H5.40909V6.875ZM8.59091 6.875H12.4091V3.125H11.6136V5.9375H10.9136V3.75H10.1182V5.9375H9.38636V3.125H8.59091V6.875Z" fill="#868691" />
                </svg>
                :
                <svg className="w-4" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.33268 12V10.6667H5.99935V8.6C5.4549 8.47778 4.9689 8.24733 4.54135 7.90867C4.11379 7.57 3.79979 7.14489 3.59935 6.63333C2.76602 6.53333 2.0689 6.16956 1.50802 5.542C0.947127 4.91444 0.66646 4.17822 0.666016 3.33333V2.66667C0.666016 2.3 0.796682 1.98622 1.05802 1.72533C1.31935 1.46444 1.63313 1.33378 1.99935 1.33333H3.33268V0H9.99935V1.33333H11.3327C11.6993 1.33333 12.0133 1.464 12.2747 1.72533C12.536 1.98667 12.6665 2.30044 12.666 2.66667V3.33333C12.666 4.17778 12.3853 4.914 11.824 5.542C11.2627 6.17 10.5656 6.53378 9.73268 6.63333C9.53268 7.14444 9.2189 7.56956 8.79135 7.90867C8.36379 8.24778 7.87757 8.47822 7.33268 8.6V10.6667H9.99935V12H3.33268ZM3.33268 5.2V2.66667H1.99935V3.33333C1.99935 3.75556 2.12157 4.13622 2.36602 4.47533C2.61046 4.81445 2.93268 5.056 3.33268 5.2ZM9.99935 5.2C10.3993 5.05556 10.7216 4.81378 10.966 4.47467C11.2105 4.13556 11.3327 3.75511 11.3327 3.33333V2.66667H9.99935V5.2Z" fill="#868691" />
                </svg>

            }

            <p className="text-sm font-semibold">
              {cardType === 'member' ? 'New members' : 'Top traders'}
              {cardType === 'member' && <span className="text-su_positive ml-2" >12 +</span>}
            </p>
          </div>

          {cardType === 'member' && <span className="font-semibold bg-su_enable_bg rounded-xs text-sm px-4 py-2">Last 24h</span>}
        </div>

        <div className="flex gap-3 items-center">
          {
            users.map((user, index) => {
              if (index < 9)
                return (

                  <Avatar className="relative lg:w-[30px] lg:h-[30px] 2xl:w-8 2xl:h-8" key={user.id}>
                    <AvatarImage src={user.image} alt="@shadcn" />
                    <AvatarFallback className="text-sm font-semibold rounded-full dark:bg-su_enable_bg lg:w-[30px] lg:h-[30px] 2xl:w-8 2xl:h-8 flex justify-center items-center">
                      {getNameInitials(user.title)}
                    </AvatarFallback>

                    {
                      (index === 8 && cardType === 'member') &&
                      <div className="absolute w-full h-full bg-black/50 top-0 left-0 rounded-full flex justify-center items-center text-sm font-semibold" >+{users.length - 9}</div>
                    }

                    {
                      user.topRated &&
                      <div className="absolute h-4 w-4 bg-black rounded-full -right-1 -bottom-1 flex justify-center items-center" >
                        <svg className="w-2" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0.666016 5.2H6.66602V6H0.666016L0.666016 5.2ZM0.666016 0.947368L2.16602 1.89474L3.66602 0L5.16602 1.89474L6.66602 0.947368V4.8H0.666016V0.947368Z" fill="#FFC175" />
                        </svg>

                      </div>
                    }
                  </Avatar>
                );

            })
          }
        </div>
      </CardContent>
    </Card>
  );
};

export default NewMembersCard;