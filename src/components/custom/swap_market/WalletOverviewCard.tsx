import { Card, CardContent } from "@/components/ui/card";



interface IProp {
  cardType?: "totalwalletvalue" | "cryptostored" | "NFTs";
  Value: string;
  TitleDesc: string;  
}

const WalletOverviewCard = ({ cardType, Value, TitleDesc}: IProp) => {

  return (
    <Card className="h-[100px] w-[400px] border-none bg-card dark:bg-su_secondary_bg p-3" >
      <CardContent className={`p-0 flex flex-col ${cardType === 'totalwalletvalue' ? 'gap-2' : 'gap-6'}`}>
        <div className="flex items-start justify-between">
           
          <div className="flex gap-2 items-center">

          {
              cardType === 'NFTs'
                ?
                <h2 className="flex justify-between items-center text-sm" >{Value}</h2>
                :
                <h2 className="flex justify-between items-center text-sm" >${Value}</h2>

            }

          </div>
          <div className="flex gap-4 items-center">
          <h4 className="flex justify-between items-center text-sm" >{TitleDesc}</h4>
          
          </div>
          
          
        </div>

     
      </CardContent>
    </Card>
  );
};

export default WalletOverviewCard;