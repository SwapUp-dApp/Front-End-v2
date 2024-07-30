import CustomAvatar from '@/components/custom/shared/CustomAvatar';
import CustomOutlineButton from '@/components/custom/shared/CustomOutlineButton';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog';
import { useProfileStore } from '@/store/profile';

interface IProp {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  handleNavigationOfSteps: (navigationMode: "NEXT" | "PREVIOUS") => void;
}

const ConfirmSubnameDialog = ({ handleNavigationOfSteps, open, setOpen }: IProp) => {

  const [name, action, subname, avatar, isPremium, title] = useProfileStore(state => [
    state.overviewTab.subdomain.createNewSubdomain.name,
    state.overviewTab.subdomain.createNewSubdomain.action,
    state.overviewTab.subdomain.createNewSubdomain.subname,
    state.profile.avatar,
    state.profile.isPremium,
    state.profile.details?.title
  ]);


  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogContent className="w-[400px] p-4" >
        <div className="space-y-3" >
          {/* header */}
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <h2 className="font-bold text-xl pt-3" >Create subname </h2>

              <DialogClose className="p-1 rounded-xs hover:bg-su_active_bg" >
                <svg className="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
              </DialogClose>
            </div>

            <p className="text-base font-medium text-secondary dark:text-su_secondary">Enter the name for your subdomain</p>
          </div>

          <div className='space-y-3' >

            <div className='border-[1.5px] border-su_enable_bg rounded-sm py-3.5 px-4 flex items-center justify-between text-xs lg:text-sm' >
              <p className='text-su_ternary' >Name</p>

              <span className='flex items-center gap-2 text-su_primary font-semibold' >
                {name}

                <img
                  className='h-7 w-7 object-cover'
                  src={"/assets/images/swapip-logo-black.png"}
                  alt=""
                />
              </span>
            </div>

            <div className='border-[1.5px] border-su_enable_bg rounded-sm py-3.5 px-4 flex items-center justify-between text-xs lg:text-sm' >
              <p className='text-su_ternary' >Action</p>

              <span className='flex items-center gap-2 text-su_primary font-semibold' >
                {action}
              </span>
            </div>

            <div className='border-[1.5px] border-su_enable_bg rounded-sm py-3.5 px-4 flex items-center justify-between text-xs lg:text-sm' >
              <p className='text-su_ternary' >Subname</p>

              <span className='flex items-center gap-2 text-su_primary font-semibold' >
                {subname}.{name}

                <CustomAvatar
                  imageSrc={avatar}
                  fallbackName={title || ''}
                  isPremium={isPremium}
                  sizeClasses="!w-7 !h-7"
                />
              </span>
            </div>
          </div>

          <div className="w-full grid grid-cols-2 gap-4 py-2" >
            <CustomOutlineButton
              containerClasses="w-full h-full"
              onClick={() => { handleNavigationOfSteps('PREVIOUS'); }}
            >
              Back
            </CustomOutlineButton>

            <Button variant={"default"} onClick={() => { handleNavigationOfSteps('NEXT'); }}>
              Open wallet
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog >
  );
};

export default ConfirmSubnameDialog;