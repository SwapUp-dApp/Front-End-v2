import { toast } from "sonner";
import ToastLookCard from "@/components/custom/shared/ToastLookCard";

export const showWalletConnectionToast = (title?: string, description?: string) => {
  toast.custom(
    (id) => (
      <ToastLookCard
        variant="error"
        title={title ? title : "Connect to wallet!"}
        description={description ? description : "Please connect to wallet for this feature!"}
        onClose={() => toast.dismiss(id)}
      />
    ),
    {
      duration: 3000,
      className: 'w-full !bg-transparent',
      position: "bottom-left",
    }
  );
};