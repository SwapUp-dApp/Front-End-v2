import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CustomIconButton from "./CustomIconButton";
import { showUnderConstructionToast } from "@/lib/helpers";
import { useGlobalStore } from "@/store/global-store";
import { SUE_SWAP_MODE } from "@/constants/enums";
import html2canvas from 'html2canvas';
import { Environment } from "@/config";
import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { getTwitterClientAccessTokenFromCodeApi, postSwapOnTwitterOnBehalfOfCurrentUserApi } from "@/service/api";
import { SUI_CreateTweetOnBehalfOfUserReqParams, SUI_TwitterAuthCodeToAccessTokenReqParams, SUI_TwitterAuthCodeToAccessTokenResponse } from "@/types/third-party.types";

interface IProp {
  setOpen: (isOpen: boolean) => void;
  open: boolean;
  title?: string;
  description?: string;
}

const SharingSwapCompletionOnSocialDialog = ({ open, setOpen, title, description }: IProp) => {

  const swap = useGlobalStore(state => state.recentAcceptedSwap);
  const [URLSearchParams] = useSearchParams();

  const fallbackUrl = "http://localhost:5173/swap-up/swap-market/open";

  const twitterAuthCode = URLSearchParams.get('code');

  const shareSwapPostOnSocialPlatform = async (platformActionType: "TWITTER_AUTH_CODE" | "TWITTER_POST" | "WARPCAST_POST") => {

    const postTitle: string = `Check out my recent ${swap?.swap_mode === SUE_SWAP_MODE.OPEN ? "open" : "private"} Swap `;

    switch (platformActionType) {
      case 'TWITTER_AUTH_CODE':
        const twitterOAuthUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${Environment.TWITTER_CLIENT_ID}&redirect_uri=${fallbackUrl}&scope=tweet.read%20users.read%20follows.read%20offline.access%20tweet.write&state=state&code_challenge=challenge&code_challenge_method=plain`;
        window.location.href = twitterOAuthUrl;
        break;
      case 'TWITTER_POST':
        try {
          const authCodeToTokenPayload: SUI_TwitterAuthCodeToAccessTokenReqParams = {
            code: twitterAuthCode!,
            redirectUri: fallbackUrl
          };

          const accessTokenRes = await getTwitterClientAccessTokenFromCodeApi(authCodeToTokenPayload);
          const elementForImage = document.getElementById("capture");

          if (elementForImage) {
            const canvas = await html2canvas(elementForImage);
            const base64Image = canvas.toDataURL();

            const tokenData = (accessTokenRes.data as SUI_TwitterAuthCodeToAccessTokenResponse);
            const twitterPostPayload: SUI_CreateTweetOnBehalfOfUserReqParams = {
              accessToken: tokenData.accessToken,
              refreshToken: tokenData.refreshToken,
              createdAt: tokenData.createdAt,
              expiresIn: tokenData.expiresIn,
              image: base64Image,
              appLink: "https://white-dune-0fb9b1810.5.azurestaticapps.net",
              postTitle,
              hashtags: ["SWAPUP"],
              mentions: ["Khalil111Ahmad"],
              postDescription: 'some description'
            };

            const postCreated = await postSwapOnTwitterOnBehalfOfCurrentUserApi(twitterPostPayload);
            console.log("post created: ", postCreated);
          }

        } catch (error) {
          throw error;
        }
        return;
        break;
      case 'WARPCAST_POST':
        const warpcastPostUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(postTitle)}&embeds[]=https://mint.farcaster.xyz/`;
        window.open(warpcastPostUrl, "_blank");
        break;
    }

  };

  useEffect(() => {
    if (twitterAuthCode) {
      console.log("twitterAuthCode: ", twitterAuthCode);
    }

  }, [twitterAuthCode]);

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogContent className="w-[400px] p-4 space-y-3" id="capture" >

        {/* header */}
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h2 className="font-bold text-xl pt-3" >{title ? title : "Congratulations! Your swap has been successfully completed 🎉"}</h2>

            <DialogClose className="p-1 rounded-xs hover:bg-su_active_bg" >
              <svg className="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </DialogClose>
          </div>

          <p className="text-base font-medium text-secondary dark:text-su_secondary">{description ? description : "Your swap is finished. Look forward to your new assets!"}</p>
        </div>

        <Button className="w-full" onClick={() => { setOpen(false); }}  >Done</Button>

        <div className="bg-su_least_bg p-4 rounded-md flex items-center justify-between" >
          <p className="w-[65%]" >Share your swap results on social media:</p>

          <span className="flex items-center gap-2" >
            <CustomIconButton
              onClick={() => { shareSwapPostOnSocialPlatform('TWITTER_AUTH_CODE'); }}
            >
              <svg className="w-4" viewBox="0 0 17 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5546 0L10.192 6.77714L16.5 16H11.561L7.69664 10.4057L3.26913 16H0.815144L6.54973 8.74857L0.5 0H5.56296L9.06054 5.11429L13.1006 0H15.5546ZM13.6017 14.3771L4.82418 1.53714H3.36212L12.2378 14.3771H13.5965H13.6017Z" fill="currentColor" />
              </svg>
            </CustomIconButton>

            <CustomIconButton onClick={() => { shareSwapPostOnSocialPlatform("WARPCAST_POST"); }} >
              <svg className="w-4" viewBox="0 0 17 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.24557 0H13.5651V16H12.0503V8.67097H12.0354C11.868 6.6454 10.3067 5.05805 8.40532 5.05805C6.50397 5.05805 4.94264 6.6454 4.7752 8.67097H4.76036V16H3.24557V0Z" fill="currentColor" />
                <path d="M0.5 2.27095L1.11539 4.54193H1.63609V13.729C1.37465 13.729 1.16272 13.9601 1.16272 14.2452V14.8645H1.06805C0.806618 14.8645 0.594665 15.0956 0.594665 15.3807V16H5.89644V15.3807C5.89644 15.0956 5.68451 14.8645 5.42308 14.8645H5.32841V14.2452C5.32841 13.9601 5.11646 13.729 4.85502 13.729H4.28699V2.27095H0.5Z" fill="currentColor" />
                <path d="M12.145 13.729C11.8835 13.729 11.6716 13.9601 11.6716 14.2452V14.8645H11.5769C11.3155 14.8645 11.1036 15.0956 11.1036 15.3807V16H16.4053V15.3807C16.4053 15.0956 16.1934 14.8645 15.9319 14.8645H15.8373V14.2452C15.8373 13.9601 15.6253 13.729 15.3639 13.729V4.54193H15.8846L16.5 2.27095H12.713V13.729H12.145Z" fill="currentColor" />
              </svg>
            </CustomIconButton>
          </span>
        </div>

        {
          twitterAuthCode &&
          <Button
            className="w-full"
            disabled={!twitterAuthCode}
            onClick={async () => await shareSwapPostOnSocialPlatform('TWITTER_POST')}
          >
            Tweet
          </Button>
        }
      </DialogContent>
    </Dialog >
  );
};

export default SharingSwapCompletionOnSocialDialog;