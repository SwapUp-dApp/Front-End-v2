import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Pie, PieChart } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { SUI_TokenBreakdownChartItem } from '@/types/profile.types';

const TokenBreakdownChart = () => {
  const dataset: SUI_TokenBreakdownChartItem[] = [
    {
      key: 'ethereum',
      network: { iconUrl: '/assets/svgs/ethereum.svg', name: 'Ethereum', symbol: "ETH" },
      totalPercentage: 50.1,
      usdAmount: 184.50
    },
    {
      key: 'Serum',
      network: { iconUrl: '/assets/svgs/serum.svg', name: 'Serum', symbol: "SRM" },
      totalPercentage: 9,
      usdAmount: 84.50
    },
    {
      key: 'usdc',
      network: { iconUrl: '/assets/svgs/usdc.svg', name: 'USD Coin', symbol: "USDC" },
      totalPercentage: 34.5,
      usdAmount: 34.50
    },
    {
      key: 'tether',
      network: { iconUrl: '/assets/svgs/tether.svg', name: 'Tether', symbol: "USDT" },
      totalPercentage: 6.4,
      usdAmount: 14.50
    },
  ];

  const pieChartData = dataset.map(item => ({
    cryptoToken: item.key.toLowerCase(),
    tokens: item.totalPercentage,
    fill: `var(--color-${item.key.toLowerCase()})`
  }));

  const chartConfig = dataset.reduce((config, item, index) => {
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
      <div className='grid grid-cols-1 lg:grid-cols-5' >

        <div className='col-span-1 lg:col-span-3 pt-6' >
          <Table className='min-w-full' >
            <TableBody>
              {
                dataset.map((item, index) => (
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
                      {item.totalPercentage}%
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
    </div>
  );
};

export default TokenBreakdownChart;