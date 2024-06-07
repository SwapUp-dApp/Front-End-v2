import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface IProps {
  className?: string;

}

const ConnectWalletButton = ({ className, ...props }: IProps) => {
  return (
    <Button
      className={cn(
        className
      )}
      {...props}
    >
      Connect Wallet
    </Button>
  );
};

export default ConnectWalletButton;