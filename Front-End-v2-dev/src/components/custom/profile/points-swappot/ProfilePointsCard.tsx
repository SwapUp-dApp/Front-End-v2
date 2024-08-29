import { Card, CardContent } from "@/components/ui/card";



interface IProp {
  image: string;
  title: string;
  description: string;
  points: string;
}

const ProfilePointsCard = ({ image, title, description, points }: IProp) => {

  return (
    <Card className="h-[90px] p-3 bg-card dark:bg-su_secondary_bg " >

      <div className=" flex items-center gap-4  w-full" >
        <img className="w-12 h-12 rounded-full object-cover" src={image} alt="" />

        <div className="w-full" >
          <h2 className="text-text dark:text-su_primary font-semibold text-lg lg:text-xl" >{title}</h2>

          <div className="text-secondary dark:text-su_secondary text-xs flex items-center justify-between  w-full" >
            <p className="w-[70%] line-clamp-2 " >{description}</p>
            <p className="w-[20%] flex items-center gap-2" >
              <span className="text-text lg:text-su_primary text-base font-semibold" >{points}</span>
              <span>Points</span>
            </p>
          </div>
        </div>

      </div>
    </Card>
  );
};

export default ProfilePointsCard;