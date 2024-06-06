import CopyTile from "../tiles/CopyTile";
import { defaultFallbackRoute } from "@/routes";
import ExitPageDialog from "../shared/ExitPageDialog";

interface IProp {
  backClickNavigateTo?: string;
  tradeId: string;
}

const OpenMarketHeader = ({ backClickNavigateTo, tradeId }: IProp) => {
  return (
    <div className="flex justify-between lg:justify-start lg:gap-6" >
      <ExitPageDialog
        title="Are you sure you want to cancel the this open trade?"
        description="By closing the open market swap, your changes would not be saved"
        redirectPath={backClickNavigateTo ? backClickNavigateTo : defaultFallbackRoute}
      >
        <span
          className="text-sm dark:text-su_secondary flex items-center gap-2 cursor-pointer py-2 px-3 hover:rounded-sm hover:bg-su_secondary_bg">
          <svg className="w-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 0L7.0575 1.0575L2.8725 5.25H12V6.75H2.8725L7.0575 10.9425L6 12L0 6L6 0Z" fill="#B6B6BD" />
          </svg>

          Back
        </span>
      </ExitPageDialog>

      <h2 className="font-semibold text-1.5xl" >Create open market swap</h2>

      <CopyTile textToCopy={tradeId} className="hidden lg:flex" >
        Unique trade ID: <span className="dark:text-su_primary font-semibold">#{tradeId}</span>
      </CopyTile>

      <button className="lg:hidden" >Details</button>
    </div>
  );
};

export default OpenMarketHeader;