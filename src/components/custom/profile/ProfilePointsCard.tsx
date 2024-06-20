import { Card, CardContent } from "@/components/ui/card";



interface IProp {
  cardType?: "tradescreated" | "tradescompleted" | "tradesshared";
  Title: string;
  TitleDesc: string;
  Points: string;

}

const ProfilePointsCard = ({ cardType, Title, TitleDesc, Points }: IProp) => {

  return (
    <Card className="h-[90px] w-[400px] border-none bg-card  dark:bg-su_secondary_bg " >
      <CardContent className={`p-2 flex flex-col gap-2`}>
        <div className="py-2 flex gap-1">
          {
            cardType === 'tradescreated'
              ?
              <img className="w-16 p-1" src={"/assets/images/badge.png"} alt="horse" />

              :
              <svg className="w-4" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.33268 12V10.6667H5.99935V8.6C5.4549 8.47778 4.9689 8.24733 4.54135 7.90867C4.11379 7.57 3.79979 7.14489 3.59935 6.63333C2.76602 6.53333 2.0689 6.16956 1.50802 5.542C0.947127 4.91444 0.66646 4.17822 0.666016 3.33333V2.66667C0.666016 2.3 0.796682 1.98622 1.05802 1.72533C1.31935 1.46444 1.63313 1.33378 1.99935 1.33333H3.33268V0H9.99935V1.33333H11.3327C11.6993 1.33333 12.0133 1.464 12.2747 1.72533C12.536 1.98667 12.6665 2.30044 12.666 2.66667V3.33333C12.666 4.17778 12.3853 4.914 11.824 5.542C11.2627 6.17 10.5656 6.53378 9.73268 6.63333C9.53268 7.14444 9.2189 7.56956 8.79135 7.90867C8.36379 8.24778 7.87757 8.47822 7.33268 8.6V10.6667H9.99935V12H3.33268ZM3.33268 5.2V2.66667H1.99935V3.33333C1.99935 3.75556 2.12157 4.13622 2.36602 4.47533C2.61046 4.81445 2.93268 5.056 3.33268 5.2ZM9.99935 5.2C10.3993 5.05556 10.7216 4.81378 10.966 4.47467C11.2105 4.13556 11.3327 3.75511 11.3327 3.33333V2.66667H9.99935V5.2Z" fill="#868691" />
              </svg>
          }





          <h2 className="px-2 h-[45px] ">{Title}</h2>
        </div>



        <div className="px-12 flex gap-2">

          <h2 className="dark:text-su_ternary text-xs flex " >{TitleDesc}</h2>
          <h2  > {Points} </h2>
          <h2 className="dark:text-su_ternary text-xs flex  " >  Points </h2>

        </div>

      </CardContent>
    </Card>
  );
};

export default ProfilePointsCard;