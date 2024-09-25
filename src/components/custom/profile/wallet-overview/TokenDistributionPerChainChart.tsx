import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { getTokenBreakdownByWalletIdApi } from '@/service/api';
import { useGlobalStore } from '@/store/global-store';
import { useProfileStore } from '@/store/profile';
import { SUI_TokenBreakdownChartItem, SUI_TokenDistributionPerChainChartItem } from '@/types/profile.types';
import { useQuery } from '@tanstack/react-query';
import LoadingDataset from '../../shared/LoadingDataset';
import { handleShowNotificationToast } from '@/lib/helpers';

const TokenDistributionPerChainChart = () => {

  const [availableCurrencies] = useGlobalStore(state => [state.availableCurrencies]);
  const [wallet, distributionOfTokensPerChain, setDistributionOfTokensPerChain] = useProfileStore(state => [
    state.profile.wallet,
    state.overviewTab.distributionOfTokensPerChain,
    state.overviewTab.setDistributionOfTokensPerChain,
  ]);

  const { isLoading } = useQuery({
    queryKey: [`getDistributionOfTokenPerChain`],
    queryFn: async () => {
      try {
        if (wallet.address && wallet.isConnected) {
          const response = await getTokenBreakdownByWalletIdApi(wallet.address);
          const responseTokens: SUI_TokenBreakdownChartItem[] = response.data;

          let computedRes: SUI_TokenDistributionPerChainChartItem[] = [];
          let totalUsdAmount = 0;

          responseTokens.forEach(token => {
            const foundToken = availableCurrencies.find(currency => currency.symbol === token.network.symbol);
            const usdAmount = Number(foundToken?.price) * (token.balance || 0);
            totalUsdAmount = totalUsdAmount + usdAmount;

            const computedTokenObject: SUI_TokenDistributionPerChainChartItem = {
              key: token.key,
              network: token.network,
              totalPercentage: 0,
              tradePercentage: { available: 0, openTrade: 0 },
              usdAmount: Number(usdAmount.toFixed(2)),
            };

            computedRes.push(computedTokenObject);
          });

          computedRes = computedRes.map(token => {

            if (token.usdAmount && totalUsdAmount) {
              const totalPercentage = Number(((token.usdAmount / totalUsdAmount) * 100).toFixed(0));

              return ({
                ...token,
                totalPercentage: totalPercentage ? totalPercentage : 0,
                tradePercentage: { available: totalPercentage, openTrade: 0 }
              });
            }

            return ({ ...token });
          });

          setDistributionOfTokensPerChain(computedRes);
          return response.data;
        }

        return null;
      } catch (error: any) {
        handleShowNotificationToast(
          "error",
          `Request failed!`,
          `${error.message}`
        );

        throw error;
      }
    },
    retry: false,
  });


  return (
    <>
      {distributionOfTokensPerChain.length > 0 &&
        <section className='space-y-4' >
          <h2 className='text-sm font-semibold' >Distribution of tokens per chain</h2>

          <div className='flex flex-col gap-4' >
            {
              distributionOfTokensPerChain.map(item => {

                const emptyWidth = 100 - (item.tradePercentage.available + item.tradePercentage.openTrade);

                return (
                  <div key={item.key} className='w-full flex items-center gap-2' >
                    <span className='w-1/4 flex items-center gap-2 text-su_secondary text-sm' >
                      <img src={item.network.iconUrl} className='w-4 h-4' alt="" />

                      <span className='hidden lg:inline-block line-clamp-1'>{item.network.name}</span>
                      <span className='lg:hidden' >{item.network.symbol}</span>
                    </span>

                    <div className={`w-3/4 flex gap-2 items-center`} >

                      <div className='w-4/5 lg:w-5/6 flex items-start gap-1' >
                        {
                          item.tradePercentage.available > 0 &&
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
                        }

                        {
                          item.tradePercentage.openTrade > 0 &&
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
                        }

                        <Progress style={{ width: `${emptyWidth}%` }} />
                      </div>

                      <span className='text-primary font-semibold text-sm' >{item.totalPercentage} %</span>
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
      }

      {isLoading &&
        <div className='flex items-center justify-center w-full h-full' >
          <LoadingDataset
            isLoading={isLoading}
            title="Loading distribution of tokens per chain."
          />
        </div>
      }
    </>
  );
};

export default TokenDistributionPerChainChart;