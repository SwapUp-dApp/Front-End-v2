import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Pie, PieChart } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { SUI_TokenBreakdownChartItem } from '@/types/profile.types';
import { useQuery } from '@tanstack/react-query';
import { useProfileStore } from '@/store/profile';
import { getTokenBreakdownByWalletIdApi } from '@/service/api';

import { useGlobalStore } from '@/store/global-store';
import LoadingDataset from '../../shared/LoadingDataset';
import { handleShowNotificationToast } from '@/lib/helpers';

const TokenBreakdownChart = () => {
  const [availableCurrencies] = useGlobalStore(state => [state.availableCurrencies]);
  const [wallet, walletTokenBreakdownData, setWalletTokenBreakdownData] = useProfileStore(state => [
    state.profile.wallet,
    state.overviewTab.walletTokenBreakdownData,
    state.overviewTab.setWalletTokenBreakdownData,
  ]);

  const { isLoading } = useQuery({
    queryKey: [`getTokenBreakdownByWalletIdApi`],
    queryFn: async () => {
      try {
        if (wallet.address && wallet.isConnected) {
          const response = await getTokenBreakdownByWalletIdApi(wallet.address);
          const responseTokens: SUI_TokenBreakdownChartItem[] = response.data;

          let computedRes: SUI_TokenBreakdownChartItem[] = [];
          let totalUsdAmount = 0;

          responseTokens.forEach(token => {
            const foundToken = availableCurrencies.find(currency => currency.symbol === token.network.symbol);
            const usdAmount = Number(foundToken?.price) * (token.balance || 0);
            totalUsdAmount = totalUsdAmount + usdAmount;

            const computedTokenObject: SUI_TokenBreakdownChartItem = {
              ...token,
              usdAmount: Number(usdAmount.toFixed(2)),
            };

            computedRes.push(computedTokenObject);
          });

          computedRes = computedRes.map(token => {

            if (token.usdAmount && totalUsdAmount) {
              return ({ ...token, percentage: Number(((token.usdAmount / totalUsdAmount) * 100).toFixed(0)) });
            }

            return ({ ...token, percentage: 0 });
          });
          setWalletTokenBreakdownData(computedRes, totalUsdAmount);

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

  const pieChartData = walletTokenBreakdownData.map(item => ({
    cryptoToken: item.key.toLowerCase(),
    tokens: item.percentage,
    fill: `var(--color-${item.key.toLowerCase()})`

  }));

  const chartConfig = walletTokenBreakdownData.reduce((config, item, index) => {
    config[item.key.toLowerCase()] = {
      label: item.network.name,
      color: `var(--pie-chart-${index + 1})`
    };
    return config;
  }, {
    tokens: {
      label: "Token percentage",
    }
  } as ChartConfig);

  return (
    <div>
      <h2 className='text-sm font-semibold' >Token breakdown for connected account</h2>
      {walletTokenBreakdownData.length > 0 &&
        <div className='grid grid-cols-1 lg:grid-cols-5' >

          <div className='col-span-1 lg:col-span-3 pt-6' >
            <Table className='min-w-full' >
              <TableBody>
                {
                  walletTokenBreakdownData.map((item, index) => (
                    <TableRow className='group' key={item.key} >
                      <TableCell className='py-2 lg:py-2' >
                        <div className='flex items-center gap-2 text-su_secondary group-hover:text-su_primary font-normal text-sm' >
                          <span className='w-2 h-2 rounded-[2px]' style={{ background: `var(--pie-chart-${index + 1})` }} ></span>
                          <img src={item.network.iconUrl} className='w-4 h-4' alt="" />

                          {item.network.name} ({item.network.symbol})
                        </div>
                      </TableCell>
                      <TableCell className='py-2 lg:py-2 text-sm font-semibold text-su_primary'>
                        $ {item.usdAmount}
                      </TableCell>
                      <TableCell className='py-2 lg:py-2 text-sm font-semibold text-su_primary' >
                        {item.percentage}%
                      </TableCell>
                    </TableRow>
                  ))
                }

              </TableBody>
            </Table>
          </div>

          <ChartContainer
            config={chartConfig}
            className="aspect-square col-span-1 lg:col-span-2"
          >
            <PieChart height={160}>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent />}
              />
              <Pie
                data={pieChartData}
                dataKey="tokens"
                nameKey="cryptoToken"
                innerRadius={60}
                paddingAngle={2}
              />
              {/* <ChartLegend content={<ChartLegendContent nameKey="cryptoToken" />} /> */}
            </PieChart>
          </ChartContainer>
        </div>
      }

      {isLoading &&
        <div className='flex items-center justify-center w-full h-full' >
          <LoadingDataset
            isLoading={isLoading}
            title="Loading token beakdown data."
          />
        </div>
      }
    </div>
  );
};

export default TokenBreakdownChart;