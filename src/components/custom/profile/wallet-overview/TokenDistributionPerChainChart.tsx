import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { SUI_TokenDistributionPerChainChartItem } from '@/types/profile.types';
import React from 'react';

const TokenDistributionPerChainChart = () => {
  const chartData: SUI_TokenDistributionPerChainChartItem[] = [
    {
      key: 'ethereum',
      network: { iconUrl: '/assets/svgs/ethereum.svg', name: 'Ethereum', symbol: "ETH" },
      totalPercentage: 50.1,
      tradePercentage: { available: 48, openTrade: 2.1 }
    },
    {
      key: 'Solana',
      network: { iconUrl: '/assets/svgs/solana-green.svg', name: 'Solana', symbol: "SOL" },
      totalPercentage: 9,
      tradePercentage: { available: 4, openTrade: 5 }
    },
    {
      key: 'Polygon',
      network: { iconUrl: '/assets/svgs/polygon.svg', name: 'Polygon', symbol: "POL" },
      totalPercentage: 34.5,
      tradePercentage: { available: 28.5, openTrade: 6 }
    },
    {
      key: 'Base',
      network: { iconUrl: '/assets/svgs/base.svg', name: 'Base', symbol: "ETH" },
      totalPercentage: 6.4,
      tradePercentage: { available: 4, openTrade: 2.6 }
    },
  ];

  return (
    <section className='space-y-4' >
      <h2 className='text-sm font-semibold' >Distribution of tokens per chain</h2>

      <div className='flex flex-col gap-4' >
        {
          chartData.map(item => {

            const emptyWidth = 100 - (item.tradePercentage.available + item.tradePercentage.openTrade);

            return (
              <div key={item.key} className='w-full flex items-center gap-2' >
                <span className='w-1/4 flex items-center gap-2 text-su_secondary text-sm' >
                  <img src={item.network.iconUrl} className='w-4 h-4' alt="" />

                  <span className='hidden lg:inline-block line-clamp-1'>{item.network.name}</span>
                  <span className='lg:hidden' >{item.network.symbol}</span>
                </span>

                <div className={`w-9/12 flex gap-2 items-center`} >
                  <div className='w-11/12 flex items-center gap-1' >

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger style={{ width: `${item.tradePercentage.available}%` }}>
                          <Progress className='w-full' value={100} indicatorClassName='bg-gradient-primary' />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className='text-xs flex items-center gap-4' >
                            <Progress className={'w-2 h-2'} value={100} indicatorClassName='bg-gradient-primary' />
                            Available
                            <span>
                              {item.tradePercentage.available}%
                            </span>
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger style={{ width: `${item.tradePercentage.openTrade}%` }} >
                          <Progress className='w-full' value={100} indicatorClassName='bg-su_info' />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className='text-xs flex items-center gap-4' >
                            <Progress className={'w-2 h-2'} value={100} indicatorClassName='bg-su_info' />
                            Open trades
                            <span>{item.tradePercentage.openTrade}%</span>
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <Progress style={{ width: `${emptyWidth}%` }} />
                  </div>

                  <span className='w-1/12 text-primary font-semibold text-sm' >{item.totalPercentage}%</span>
                </div>
              </div>
            );
          })
        }
      </div>

      {/* Info about chart */}
      <div className='flex items-center gap-3' >
        <span className='flex items-center gap-2 text-su_ternary text-sm'>
          <Progress className={'w-2 h-2'} value={100} indicatorClassName='bg-gradient-primary' />
          Available
        </span>

        <span className='flex items-center gap-2 text-su_ternary text-sm'>
          <Progress className={'w-2 h-2'} value={100} indicatorClassName='bg-su_info' />
          Open trades
        </span>
      </div>
    </section>
  );
};

export default TokenDistributionPerChainChart;