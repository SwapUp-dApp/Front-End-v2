import React from 'react';
import WalletOverviewCard from '../../swap-market/WalletOverviewCard';
import Chart from "react-apexcharts";
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import TokenDistributionPerChainChart from './TokenDistributionPerChainChart';

const ProfileWalletOverviewTabContent = () => {

  const barChartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      height: 600,
      stacked: true,
      stackType: '100%',
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: 20
      },
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    title: {
      text: '100% Stacked Bar'
    },
    xaxis: {
      categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + "K";
        }
      }
    },
    fill: {
      opacity: 1,
      type: 'gradient',
      gradient: {
        type: 'horizontal', // Use 'horizontal' for a horizontal gradient or 'vertical' for vertical
        shade: 'light',
        shadeIntensity: 0.4, // Adjust shade intensity
        gradientToColors: ['#00A4BD', '#FF7F00', '#FF9F7F', '#FF6361', '#FFA600'], // End colors for gradient
        inverseColors: true,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [20, 60, 100], // Adjust stops for color transition
        colorStops: [], // Allows custom stops for finer control
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 40
    }
  };

  const barChartSeries: ApexAxisChartSeries = [
    {
      name: 'Marine Sprite',
      data: [44, 55, 41, 37, 22, 43, 21],
    },
    {
      name: 'Striking Calf',
      data: [53, 32, 33, 52, 13, 43, 32]
    },
    {
      name: 'Tank Picture',
      data: [12, 17, 11, 9, 15, 11, 20]
    },
    {
      name: 'Bucket Slope',
      data: [9, 7, 5, 8, 6, 9, 4]
    },
    {
      name: 'Reborn Kid',
      data: [25, 12, 19, 32, 25, 24, 10]
    }
  ];

  return (
    <section className='space-y-3' >
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4' >
        <WalletOverviewCard cardType="totalwalletvalue" Value="1685.69" description="Total Wallet Value" />
        <WalletOverviewCard cardType="cryptostored" Value="235.12" description="Crypto stored in the smart contract" />
        <WalletOverviewCard cardType="NFTs" Value="7" description="NFTs located in the smart contract" />
      </div>

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2' >
        <Card className='border-none bg-card  dark:bg-su_secondary_bg p-4 lg:p-6 rounded-md space-y-4'>
          <h2 className='text-sm font-semibold' >Distribution of tokens per chain</h2>

          {/* Custom bar chart */}
          <TokenDistributionPerChainChart />

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
        </Card>
        <Card className='border-none bg-card  dark:bg-su_secondary_bg p-4 lg:p-6 rounded-md'>Right</Card>
      </div>
    </section>
  );
};

export default ProfileWalletOverviewTabContent;