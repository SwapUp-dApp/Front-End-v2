import CopyTile from "../tiles/CopyTile";
import { defaultFallbackRoute } from "@/routes";
import ExitPageDialog from "../shared/ExitPageDialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { getShortenWalletAddress } from "@/lib/utils";
import CustomAvatar from "../shared/CustomAvatar";
import SwapParameterTile from "../tiles/SwapParameterTile";


interface IProp {
  backClickNavigateTo?: string;
  walletAddress: string;
  resetData: () => void;
  existTitle: string;
  existDescription: string;
  ensAddress: string;
  joinData: string;
  profileImage: string;
  avatarFallbackI: string;
}

const ProfileHeader = ({ backClickNavigateTo, walletAddress, resetData, existDescription, existTitle, ensAddress, joinData, profileImage }: IProp) => {
  return (


    <div className="w-full space-y-3" >

      <div className="flex flex-col lg:flex-row gap-3" >
        <ExitPageDialog
          title={existTitle}
          description={existDescription}
          redirectPath={backClickNavigateTo ? backClickNavigateTo : defaultFallbackRoute}
          resetData={resetData}
        >
          <span
            className="text-sm dark:text-su_secondary flex items-center gap-2 cursor-pointer py-2 px-3 hover:rounded-sm hover:bg-su_secondary_bg">
            <svg className="w-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 0L7.0575 1.0575L2.8725 5.25H12V6.75H2.8725L7.0575 10.9425L6 12L0 6L6 0Z" fill="#B6B6BD" />
            </svg>

            Back
          </span>
        </ExitPageDialog>

        <div className="w-full flex items-center justify-between">
          <h2 className="font-semibold text-1.5xl " >Profile</h2>
          <div className="flex items-center gap-4">
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">Private mode</Label>
          </div>
        </div>
      </div>

      <div className="w-full space-y-4">
        {/* 👇️ local image */}
        <div className="w-full relative" >
          <img src={"/assets/images/container.png"} alt="horse" className="w-full h-40 object-cover rounded-sm" />

          <div className="absolute -bottom-8 lg:-bottom-12 p-1 rounded-full bg-su_primary_bg" >
            <CustomAvatar
              className=""
              imageSrc={profileImage}
              fallbackName="Swap up"
              sizeClasses="w-16 h-16 lg:w-20 lg:h-20"
              textSizeClasses="text-1.5xl lg:text-2.5xl"
            />
          </div>
        </div>

        <div className="flex justify-between items-center ml-20 lg:ml-24" >

          <div className="flex items-center gap-2 lg:gap-3">
            <h2 className="font-semibold text-xl lg:text-1.5xl" >{ensAddress}</h2>

            <CopyTile textToCopy={walletAddress} className="hidden lg:flex" >
              <span className="dark:text-su_primary font-semibold">{getShortenWalletAddress(walletAddress)}</span>
            </CopyTile>

            <p className="text-sm hidden lg:inline-block" >{joinData}</p>
          </div>

          {/* social icons */}
          <span className="flex items-center gap-4">
            <svg className="w-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 9.64016V11.6668C0 11.8535 0.146667 12.0002 0.333333 12.0002H2.36C2.44667 12.0002 2.53333 11.9668 2.59333 11.9002L9.87333 4.62683L7.37333 2.12683L0.1 9.40017C0.0333334 9.46683 0 9.54683 0 9.64016ZM11.8067 1.7535L10.2467 0.193498C10.185 0.131695 10.1117 0.0826637 10.0311 0.0492094C9.95043 0.0157551 9.86398 -0.00146484 9.77667 -0.00146484C9.68935 -0.00146484 9.6029 0.0157551 9.52225 0.0492094C9.4416 0.0826637 9.36834 0.131695 9.30667 0.193498L8.08667 1.4135L10.5867 3.9135L11.8067 2.6935C11.8685 2.63182 11.9175 2.55856 11.951 2.47791C11.9844 2.39727 12.0016 2.31081 12.0016 2.2235C12.0016 2.13619 11.9844 2.04973 11.951 1.96908C11.9175 1.88843 11.8685 1.81517 11.8067 1.7535Z" fill="white" />
            </svg>

            <svg className="w-3" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.2498 11.4999C12.2498 11.8284 12.178 12.1528 12.0393 12.4505C11.9006 12.7481 11.6984 13.0119 11.447 13.2231C11.1955 13.4343 10.9009 13.5879 10.5837 13.6732C10.2666 13.7584 9.9346 13.7731 9.61114 13.7164C9.28767 13.6597 8.98054 13.5328 8.71132 13.3448C8.4421 13.1567 8.21731 12.912 8.05273 12.6278C7.88815 12.3436 7.78778 12.0269 7.75866 11.6997C7.72954 11.3726 7.77239 11.0431 7.88418 10.7343L4.57168 8.6062C4.25531 8.91653 3.85434 9.12652 3.41908 9.20983C2.98382 9.29314 2.53365 9.24607 2.12505 9.0745C1.71644 8.90294 1.3676 8.61454 1.12228 8.24547C0.876962 7.8764 0.746094 7.44311 0.746094 6.99995C0.746094 6.55679 0.876962 6.12349 1.12228 5.75443C1.3676 5.38536 1.71644 5.09696 2.12505 4.92539C2.53365 4.75383 2.98382 4.70675 3.41908 4.79007C3.85434 4.87338 4.25531 5.08337 4.57168 5.3937L7.88418 3.2687C7.69449 2.74748 7.70351 2.17464 7.9095 1.65964C8.11548 1.14465 8.504 0.723607 9.00081 0.476968C9.49762 0.23033 10.0679 0.17539 10.6026 0.322647C11.1374 0.469904 11.5992 0.809032 11.8997 1.27523C12.2002 1.74143 12.3184 2.30201 12.2317 2.84986C12.145 3.3977 11.8595 3.8944 11.4298 4.24505C11 4.59569 10.4561 4.77569 9.90199 4.75065C9.34789 4.72562 8.82245 4.4973 8.42605 4.10932L5.11355 6.23745C5.29258 6.73217 5.29258 7.27398 5.11355 7.7687L8.42605 9.89682C8.74232 9.5873 9.14283 9.37791 9.57749 9.29485C10.0122 9.21179 10.4617 9.25875 10.8698 9.42985C11.2779 9.60095 11.6265 9.8886 11.8719 10.2568C12.1174 10.625 12.2488 11.0574 12.2498 11.4999Z" fill="white" />
            </svg>
          </span>
        </div>

        <div className="lg:hidden flex justify-between items-center" >
          <CopyTile textToCopy={walletAddress} >
            <span className="dark:text-su_primary font-semibold">{getShortenWalletAddress(walletAddress)}</span>
          </CopyTile>

          <p className="text-sm" >{joinData}</p>
        </div>

        {/* Tiles */}
        <div className="flex items-center flex-wrap gap-2 ">

          <div className="tile-design text-su_primary">
            <svg className="w-5" viewBox="0 0 16 13" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5.05556L5.45455 2.52778L8 0L10.5455 2.52778L8 5.05556ZM0 13V10.1111C0 9.70185 0.142545 9.3588 0.427636 9.08194C0.712727 8.80509 1.05503 8.66667 1.45455 8.66667H3.83636C4.07879 8.66667 4.30909 8.72685 4.52727 8.84722C4.74545 8.96759 4.92121 9.13009 5.05454 9.33472C5.40606 9.80417 5.83951 10.1713 6.35491 10.4361C6.8703 10.7009 7.41867 10.8333 8 10.8333C8.59394 10.8333 9.14861 10.7009 9.664 10.4361C10.1794 10.1713 10.6065 9.80417 10.9455 9.33472C11.103 9.13009 11.288 8.96759 11.5004 8.84722C11.7127 8.72685 11.9338 8.66667 12.1636 8.66667H14.5455C14.9576 8.66667 15.303 8.80509 15.5818 9.08194C15.8606 9.3588 16 9.70185 16 10.1111V13H10.9091V11.3569C10.4848 11.6579 10.0272 11.8866 9.536 12.0431C9.04485 12.1995 8.53285 12.2778 8 12.2778C7.47879 12.2778 6.9697 12.1966 6.47273 12.0344C5.97576 11.8721 5.51515 11.6403 5.09091 11.3389V13H0ZM2.18182 7.94444C1.57576 7.94444 1.06061 7.7338 0.636364 7.3125C0.212121 6.8912 0 6.37963 0 5.77778C0 5.16389 0.212121 4.64943 0.636364 4.23439C1.06061 3.81935 1.57576 3.61159 2.18182 3.61111C2.8 3.61111 3.3183 3.81887 3.73673 4.23439C4.15515 4.64991 4.36412 5.16437 4.36364 5.77778C4.36364 6.37963 4.15467 6.8912 3.73673 7.3125C3.31879 7.7338 2.80048 7.94444 2.18182 7.94444ZM13.8182 7.94444C13.2121 7.94444 12.697 7.7338 12.2727 7.3125C11.8485 6.8912 11.6364 6.37963 11.6364 5.77778C11.6364 5.16389 11.8485 4.64943 12.2727 4.23439C12.697 3.81935 13.2121 3.61159 13.8182 3.61111C14.4364 3.61111 14.9547 3.81887 15.3731 4.23439C15.7915 4.64991 16.0005 5.16437 16 5.77778C16 6.37963 15.791 6.8912 15.3731 7.3125C14.9552 7.7338 14.4368 7.94444 13.8182 7.94444Z" fill="currentColorB6B6BD" />
            </svg>
            <p className="flex justify-between items-center text-sm" >  Premium</p>
          </div>

          <div className="tile-design text-su_primary">
            <svg className="w-5" viewBox="0 0 16 13" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5.05556L5.45455 2.52778L8 0L10.5455 2.52778L8 5.05556ZM0 13V10.1111C0 9.70185 0.142545 9.3588 0.427636 9.08194C0.712727 8.80509 1.05503 8.66667 1.45455 8.66667H3.83636C4.07879 8.66667 4.30909 8.72685 4.52727 8.84722C4.74545 8.96759 4.92121 9.13009 5.05454 9.33472C5.40606 9.80417 5.83951 10.1713 6.35491 10.4361C6.8703 10.7009 7.41867 10.8333 8 10.8333C8.59394 10.8333 9.14861 10.7009 9.664 10.4361C10.1794 10.1713 10.6065 9.80417 10.9455 9.33472C11.103 9.13009 11.288 8.96759 11.5004 8.84722C11.7127 8.72685 11.9338 8.66667 12.1636 8.66667H14.5455C14.9576 8.66667 15.303 8.80509 15.5818 9.08194C15.8606 9.3588 16 9.70185 16 10.1111V13H10.9091V11.3569C10.4848 11.6579 10.0272 11.8866 9.536 12.0431C9.04485 12.1995 8.53285 12.2778 8 12.2778C7.47879 12.2778 6.9697 12.1966 6.47273 12.0344C5.97576 11.8721 5.51515 11.6403 5.09091 11.3389V13H0ZM2.18182 7.94444C1.57576 7.94444 1.06061 7.7338 0.636364 7.3125C0.212121 6.8912 0 6.37963 0 5.77778C0 5.16389 0.212121 4.64943 0.636364 4.23439C1.06061 3.81935 1.57576 3.61159 2.18182 3.61111C2.8 3.61111 3.3183 3.81887 3.73673 4.23439C4.15515 4.64991 4.36412 5.16437 4.36364 5.77778C4.36364 6.37963 4.15467 6.8912 3.73673 7.3125C3.31879 7.7338 2.80048 7.94444 2.18182 7.94444ZM13.8182 7.94444C13.2121 7.94444 12.697 7.7338 12.2727 7.3125C11.8485 6.8912 11.6364 6.37963 11.6364 5.77778C11.6364 5.16389 11.8485 4.64943 12.2727 4.23439C12.697 3.81935 13.2121 3.61159 13.8182 3.61111C14.4364 3.61111 14.9547 3.81887 15.3731 4.23439C15.7915 4.64991 16.0005 5.16437 16 5.77778C16 6.37963 15.791 6.8912 15.3731 7.3125C14.9552 7.7338 14.4368 7.94444 13.8182 7.94444Z" fill="currentColorB6B6BD" />
            </svg>
            <p className="flex justify-between items-center text-sm" >  Community Member</p>
          </div>

          <SwapParameterTile
            title="Total Points Earned: "
            value={'150'}
          />
        </div>

        {/* Description */}
        <p className="dark:text-su_ternary flex items-center gap-2 ">
          Passionate about blockchain technology and decentralized finance. Enthusiastic trader with a keen interest in exploring the vast world of digital assets. Constantly seeking new opportunities and insights in the ever-evolving crypto space. Let's swap ideas and assets!
        </p>

        <div className="flex items-center gap-3">
          <svg className="w-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.2909 0L7.26897 5.08286L12 12H8.29577L5.39748 7.80429L2.07685 12H0.236358L4.53729 6.56143L0 0H3.79722L6.42041 3.83571L9.45044 0H11.2909ZM9.82628 10.7829L3.24314 1.15286H2.14659L8.80336 10.7829H9.82241H9.82628Z" fill="white" />
          </svg>

          <svg className="w-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.05917 0H9.79881V12H8.66272V6.50323H8.65158C8.52601 4.98405 7.35501 3.79354 5.92899 3.79354C4.50298 3.79354 3.33198 4.98405 3.2064 6.50323H3.19527V12H2.05917V0Z" fill="white" />
            <path d="M0 1.70321L0.46154 3.40645H0.852066V10.2968C0.655988 10.2968 0.49704 10.4701 0.49704 10.6839V11.1484H0.426041C0.229963 11.1484 0.0709986 11.3217 0.0709986 11.5355V12H4.04733V11.5355C4.04733 11.3217 3.88838 11.1484 3.69231 11.1484H3.62131V10.6839C3.62131 10.4701 3.46234 10.2968 3.26627 10.2968H2.84024V1.70321H0Z" fill="white" />
            <path d="M8.73373 10.2968C8.53766 10.2968 8.37869 10.4701 8.37869 10.6839V11.1484H8.30769C8.11162 11.1484 7.95267 11.3217 7.95267 11.5355V12H11.929V11.5355C11.929 11.3217 11.77 11.1484 11.574 11.1484H11.503V10.6839C11.503 10.4701 11.344 10.2968 11.1479 10.2968V3.40645H11.5385L12 1.70321H9.15976V10.2968H8.73373Z" fill="white" />
          </svg>

        </div>

      </div>
    </div>



  );
};

export default ProfileHeader;