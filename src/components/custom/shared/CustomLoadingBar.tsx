import { useState, useEffect } from 'react';

const CustomLoadingBar = () => {
  const [progress, setProgress] = useState(20);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-su_enable_bg h-9 overflow-hidden rounded-full">
      <span
        className="bg-gradient-primary h-full transition-all duration-300 ease-in-out flex items-center justify-between px-4 rounded-full text-xs lg:text-sm text-su_primary font-semibold"
        style={{ width: `${progress}%` }}
      >
        Sent

        <svg className="w-3" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.30169e-07 7.26756L3.08296 6.00028L4.30169e-07 4.7334L4.30169e-07 0.282089C-8.13349e-05 0.233112 0.0114944 0.184958 0.0335847 0.142384C0.055675 0.0998093 0.0875158 0.0642862 0.125963 0.0393223C0.16441 0.0143584 0.208133 0.000817141 0.252815 3.58382e-05C0.297496 -0.000745465 0.341591 0.0112601 0.380745 0.0348671L9.867 5.75362C9.90728 5.77793 9.94087 5.81364 9.96426 5.85703C9.98766 5.90041 10 5.94989 10 6.00028C10 6.05068 9.98766 6.10015 9.96426 6.14354C9.94087 6.18692 9.90728 6.22263 9.867 6.24694L0.380745 11.9651C0.34163 11.9887 0.297582 12.0007 0.252943 12C0.208304 11.9992 0.164616 11.9857 0.126184 11.9608C0.087752 11.9359 0.0559029 11.9005 0.033776 11.858C0.011649 11.8155 8.07357e-06 11.7674 4.30169e-07 11.7185L4.30169e-07 7.26756Z" fill="white" />
        </svg>
      </span>
    </div>
  );
};

export default CustomLoadingBar;
