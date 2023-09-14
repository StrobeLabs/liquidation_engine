import { useEffect, useState } from 'react';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useSwitchNetwork
} from 'wagmi';
import { formatUnits, parseEther } from 'viem';
import { ConnectKitButton } from 'connectkit'
import { Flex } from '@radix-ui/themes';
import { init } from 'klinecharts'
import { Button } from '@/components/ui/button'
import { Separator } from "@/components/ui/separator"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/utils/abi';
import { data as chartData } from '@/utils/data';

import '@radix-ui/themes/styles.css';
import './index.css';

export function App() {
  const [formValue, setFormValue] = useState<`${number}`>('0');
  const { toast } = useToast();

  const { isConnected, address } = useAccount();
  const { switchNetwork } = useSwitchNetwork();

  // Calculate current user's balance
  const { data: accountData } = useContractRead({
    enabled: isConnected,
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'accounts',
    args: [address!],
  });
  const accountBalance = parseInt(formatUnits(accountData?.[1] ?? 0n, 18));

  const { write: deposit } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'deposit',
    value: parseEther(formValue),
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message
      });
    }
  })

  const { write: withdraw } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'withdraw',
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message
      });
    }
  })

  const { write: createOrder } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'createOrder',
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message
      });
    }
  })

  useEffect(() => {
    isConnected && switchNetwork?.(11155111); // Switch to Sepolia
  }, [isConnected, switchNetwork])

  useEffect(() => {
    if (!isConnected) return;
    const chart = init(`live-chart`);
    chart?.applyNewData?.(chartData);
    function handleResize() {
      chart?.resize?.();
    }
    window.addEventListener('resize', handleResize)
    return window.removeEventListener('resize', handleResize)
  }, [isConnected]);

  if (!isConnected) return <>
    <nav className="flex flex-row w-full p-2">
      <h1 className="text-4xl font-bold ml-2">
        !dydx
      </h1>
      <div className="ml-auto">
        <ConnectKitButton />
      </div>
    </nav>
    <Separator />
    <Flex className="w-screen p-4" direction="row">
      <ConnectKitButton />
    </Flex>
  </>

  return <Flex className="h-screen" direction="column">
    <nav className="flex flex-row w-full p-2">
      <h1 className="text-4xl font-bold ml-2">
        !dydx
      </h1>
      <div className="ml-auto">
        <ConnectKitButton />
      </div>
    </nav>
    <Separator />
    <Flex className="grow" direction="row" gap="2">
      <Flex className="p-4 w-1/5" direction="column" gap="2">
        <h1 className="text-xl"><b>Amount:</b> {accountBalance > 0 ? accountBalance : 'N/A'}</h1>
        <Button
          variant="secondary"
          onClick={() => createOrder({ args: [1n, 0, 1n]})}
        >
          Long
        </Button>
        <Button
          variant="destructive"
          onClick={() => createOrder({ args: [1n, 1, 1n]})}
        >
          Short
        </Button>
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
              <Input
                key="form-input"
                className="remove-arrow"
                type="number"
                placeholder="0"
                value={formValue}
                onChange={(e) => setFormValue(e.target.value as `${number}`)}
              />
              <Button onClick={() => deposit()}>Deposit</Button>
            </Flex>
          </TabsContent>
          <TabsContent value="withdraw">
            <Flex direction="column" gap="2">
              <Input
                key="form-input"
                className="remove-arrow"
                type="number"
                placeholder="0"
                value={formValue}
                onChange={(e) => setFormValue(e.target.value as `${number}`)}
              />
              <Button onClick={() => withdraw()}>Withdraw</Button>
            </Flex>
          </TabsContent>
        </Tabs>
        <h1></h1>
      </Flex>
    </Flex>
    <Toaster />
  </Flex>
}
