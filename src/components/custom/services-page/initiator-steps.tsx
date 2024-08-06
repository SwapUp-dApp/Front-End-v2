import React from 'react';

interface ClosedSwapListItem {
  step: string;
  instruction: string;
}

interface ClosedSwapListProps {
  list: ClosedSwapListItem[];
}

const InitiatorSteps: React.FC<ClosedSwapListProps> = ({ list }) => {
  return (
    <>
      {list.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === list.length - 1;

        return (
          <div key={index} className="p-1 rounded-md">
            <div className="flex items-center">
              <div
                className={`flex justify-center items-center h-6 w-6 relative rounded-xs border border-1 border-solid border-su_disabled mr-4 ${
                  isFirst || isLast ? 'bg-su_tea_green' : ''
                }`}
              >
                {!isLast && (
                    <div className=''>
                        <p className='text-su_ternary absolute -bottom-4'>.</p>
                        <p className='text-su_ternary absolute -bottom-8 '>.</p>
                    </div>
                )}
                
                {(isFirst || isLast) && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.89571 13L1 8.25988L2.22393 7.07484L5.89571 10.6299L13.7761 3L15 4.18503L5.89571 13Z"
                      fill="#0D0D23"
                    />
                  </svg>
                )}
              </div>
              <div className="w-full flex flex-col md:flex-row items-start md:items-center border border-1 border-su_disabled p-3 rounded-md">
                <div className='flex items-center'>
                <p className="mr-1">{index + 1}.</p>
                <p className="text-sm font-bold mr-1">{item.step}</p>
                </div>
                
                <p className='text-sm text-su_ternary'>{item.instruction}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default InitiatorSteps;
