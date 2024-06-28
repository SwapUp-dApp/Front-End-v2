import { Card, CardContent } from "@/components/ui/card";



interface IProp {
  cardType?: "totalwalletvalue" | "cryptostored" | "NFTs";
  Value: string;
  description: string;
}

const WalletOverviewCard = ({ cardType, Value, description }: IProp) => {

  return (


    <Card className="h-[90px] w-[400px] border-none bg-card  dark:bg-su_secondary_bg p-3 " >
      <CardContent className={`p-2 flex flex-col gap-2`}>
        <div className="flex items-start justify-between">
          {
            cardType === 'NFTs'
              ?
              <h2 className="flex justify-between items-center text-sm" >{Value}</h2>
              :
              <h2 className="flex justify-between items-center text-sm">${Value}</h2>
          }
        </div>
        <div className="flex items-start justify-between">

          <h2 className="dark:text-su_ternary text-xs p-1">{description}</h2>
        </div>


      </CardContent>
    </Card>




  );
};

export default WalletOverviewCard;