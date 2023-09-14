import { useEffect } from 'react';
import { ConnectKitButton } from 'connectkit'
import { Flex } from '@radix-ui/themes';
import { Button } from '@/components/ui/button'
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

import { init } from 'klinecharts'

import '@radix-ui/themes/styles.css';
import './index.css';

export function Dash() {
  useEffect(() => {
    // initialize the chart
    const chart = init(`live-chart`)

    // add data to the chart
    chart?.applyNewData?.([
      { close: 4976.16, high: 4977.99, low: 4970.12, open: 4972.89, timestamp: 1587660000000, volume: 204 },
      { close: 4977.33, high: 4979.94, low: 4971.34, open: 4973.20, timestamp: 1587660060000, volume: 194 },
      { close: 4977.93, high: 4977.93, low: 4974.20, open: 4976.53, timestamp: 1587660120000, volume: 197 },
      { close: 4966.77, high: 4968.53, low: 4962.20, open: 4963.88, timestamp: 1587660180000, volume: 28 },
      { close: 4961.56, high: 4972.61, low: 4961.28, open: 4961.28, timestamp: 1587660240000, volume: 184 },
      { close: 4964.19, high: 4964.74, low: 4961.42, open: 4961.64, timestamp: 1587660300000, volume: 191 },
      { close: 4968.93, high: 4972.70, low: 4964.55, open: 4966.96, timestamp: 1587660360000, volume: 105 },
      { close: 4979.31, high: 4979.61, low: 4973.99, open: 4977.06, timestamp: 1587660420000, volume: 35 },
      { close: 4977.02, high: 4981.66, low: 4975.14, open: 4981.66, timestamp: 1587660480000, volume: 135 },
      { close: 4985.09, high: 4988.62, low: 4980.30, open: 4986.72, timestamp: 1587660540000, volume: 76 },
      { close: 4987.45, high: 4989.28, low: 4985.14, open: 4986.92, timestamp: 1587660600000, volume: 88 },
      { close: 4986.23, high: 4987.91, low: 4984.55, open: 4985.64, timestamp: 1587660660000, volume: 109 },
      { close: 4985.12, high: 4987.33, low: 4983.78, open: 4986.21, timestamp: 1587660720000, volume: 73 },
      { close: 4983.94, high: 4985.29, low: 4982.15, open: 4984.12, timestamp: 1587660780000, volume: 45 },
      { close: 4982.11, high: 4984.68, low: 4981.46, open: 4983.75, timestamp: 1587660840000, volume: 61 },
      { close: 4984.23, high: 4985.57, low: 4982.93, open: 4983.22, timestamp: 1587660900000, volume: 57 },
      { close: 4986.89, high: 4988.74, low: 4985.63, open: 4986.52, timestamp: 1587660960000, volume: 89 },
      { close: 4988.17, high: 4989.45, low: 4986.88, open: 4987.31, timestamp: 1587661020000, volume: 66 },
      { close: 4987.82, high: 4989.14, low: 4986.74, open: 4987.12, timestamp: 1587661080000, volume: 54 },
      { close: 4986.47, high: 4988.25, low: 4985.96, open: 4987.91, timestamp: 1587661140000, volume: 48 },
      { close: 4989.64, high: 4991.28, low: 4988.92, open: 4989.12, timestamp: 1587661200000, volume: 77 },
      { close: 4990.45, high: 4991.73, low: 4989.64, open: 4989.94, timestamp: 1587661260000, volume: 63 },
      { close: 4989.92, high: 4991.17, low: 4989.28, open: 4990.05, timestamp: 1587661320000, volume: 46 },
      { close: 4988.74, high: 4989.97, low: 4988.12, open: 4989.46, timestamp: 1587661380000, volume: 34 },
      { close: 4989.18, high: 4990.37, low: 4988.73, open: 4989.02, timestamp: 1587661440000, volume: 55 },
      { close: 4990.92, high: 4992.17, low: 4989.88, open: 4990.05, timestamp: 1587661500000, volume: 82 },
      { close: 4991.45, high: 4992.68, low: 4990.82, open: 4991.18, timestamp: 1587661560000, volume: 67 },
      { close: 4992.31, high: 4993.54, low: 4991.88, open: 4992.04, timestamp: 1587661620000, volume: 71 },
    ]);

    function handleResize() {
      chart?.resize?.();
    }

    window.addEventListener('resize', handleResize)
    return window.removeEventListener('resize', handleResize)
  }, []);

  return <Flex className="h-screen" direction="column">
    <nav className="flex flex-row w-full p-2">
      <h1 className="text-4xl font-bold ml-2">
        BRUH
      </h1>
      <div className="ml-auto">
        <ConnectKitButton />
      </div>
    </nav>
    <Separator />
    <Flex className="grow" direction="row" gap="2">
      <Flex className="p-4 w-1/5" direction="column" gap="2">
        <Button variant="secondary">Long</Button>
        <Button variant="destructive">Short</Button>
      </Flex>
      <Flex className="grow p-2" direction="column" gap="2">
        <div className="h-full w-full" id="live-chart" />
      </Flex>
      <Flex className="p-4 w-1/5" direction="column" gap="2">
        <Tabs defaultValue="deposit" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger className="w-1/2" value="deposit">Deposit</TabsTrigger>
            <TabsTrigger className="w-1/2" value="withdraw">Withdraw</TabsTrigger>
          </TabsList>
          <TabsContent value="deposit">
            <Flex direction="column" gap="2">
              <Input className="remove-arrow" type="number" placeholder="0" />
              <Button>Deposit</Button>
            </Flex>
          </TabsContent>
          <TabsContent value="withdraw">
            <Flex direction="column" gap="2">
              <Input className="remove-arrow" type="number" placeholder="0" />
              <Button>Withdraw</Button>
            </Flex>
          </TabsContent>
        </Tabs>
      </Flex>
    </Flex>
  </Flex>
}
