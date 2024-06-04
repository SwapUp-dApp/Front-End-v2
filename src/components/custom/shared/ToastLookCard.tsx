import { cn } from "@/lib/utils";

interface IProp {
  variant?: "default" | "success" | "error" | "info";
  icon?: React.ReactNode;
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

const ToastLookCard = ({ variant = "default", title, description, icon, subtitle, className, ...props }: IProp) => {
  return (
    <div
      className={cn(
        "custom-border-card flex items-start gap-3",
        variant === 'default' && "",
        variant === 'success' && "border-su_positive bg-su_positive_week",

        className
      )}
      {...props}
    >
      <div className="pt-1" >
        {
          icon ? icon :
            <svg
              className="w-3"
              viewBox="0 0 12 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.75 10.5433V15.6298C9.75001 15.6953 9.73242 15.7596 9.69902 15.8162C9.66563 15.8728 9.61761 15.9196 9.55989 15.9519C9.50217 15.9842 9.43679 16.0008 9.37045 16C9.30411 15.9992 9.23916 15.981 9.18225 15.9474L6 14.0628L2.81775 15.9474C2.76078 15.9811 2.69577 15.9992 2.62936 16C2.56295 16.0007 2.49753 15.9841 2.43978 15.9517C2.38204 15.9193 2.33404 15.8724 2.30069 15.8157C2.26735 15.759 2.24985 15.6946 2.25 15.6291V10.544C1.27961 9.77722 0.574494 8.73192 0.232094 7.55254C-0.110306 6.37317 -0.0730831 5.11795 0.338618 3.96036C0.75032 2.80277 1.51617 1.79995 2.53034 1.0905C3.5445 0.381054 4.75691 0 6 0C7.24309 0 8.4555 0.381054 9.46966 1.0905C10.4838 1.79995 11.2497 2.80277 11.6614 3.96036C12.0731 5.11795 12.1103 6.37317 11.7679 7.55254C11.4255 8.73192 10.7204 9.77722 9.75 10.544M6 10.3619C7.19347 10.3619 8.33807 9.894 9.18198 9.06113C10.0259 8.22825 10.5 7.09863 10.5 5.92077C10.5 4.74291 10.0259 3.61329 9.18198 2.78041C8.33807 1.94754 7.19347 1.47964 6 1.47964C4.80653 1.47964 3.66193 1.94754 2.81802 2.78041C1.97411 3.61329 1.5 4.74291 1.5 5.92077C1.5 7.09863 1.97411 8.22825 2.81802 9.06113C3.66193 9.894 4.80653 10.3619 6 10.3619ZM6 8.88153C5.20435 8.88153 4.44129 8.56959 3.87868 8.01434C3.31607 7.45909 3 6.70601 3 5.92077C3 5.13553 3.31607 4.38245 3.87868 3.8272C4.44129 3.27195 5.20435 2.96001 6 2.96001C6.79565 2.96001 7.55871 3.27195 8.12132 3.8272C8.68393 4.38245 9 5.13553 9 5.92077C9 6.70601 8.68393 7.45909 8.12132 8.01434C7.55871 8.56959 6.79565 8.88153 6 8.88153Z" fill="#868691" />
            </svg>
        }
      </div>

      <div>
        <h2 className="text-sm text-primary font-bold text-text dark:text-su_primary" >{title}</h2>
        <p className="text-xs lg:text-sm dark:text-su_secondary" >{subtitle}</p>
        <p className="text-xs lg:text-sm dark:text-su_secondary" >
          {description}
        </p>
      </div>
    </div>
  );
};

export default ToastLookCard;