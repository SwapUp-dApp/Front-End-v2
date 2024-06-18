import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  isLoading?: boolean;
}

const ConnectWalletButton = ({ className, isLoading = false, ...props }: IProps) => {
  return (
    <Button
      className={cn(
        className
      )}
      isLoading={isLoading}
      {...props}
    >
      Connect Wallet
    </Button>
  );
};

export default ConnectWalletButton;