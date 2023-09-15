import { useEffect, useState } from 'react';
import range from "lodash/range.js";
import { useAccount } from 'wagmi';
import { privateKeyToAccount, generatePrivateKey } from 'viem/accounts'
import { ConnectKitButton } from 'connectkit'
import { Flex } from '@radix-ui/themes';
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { init } from 'klinecharts'
import {
  DataEditor,
  GridSelection,
  CompactSelection,
  GridColumn,
  GridCellKind
} from '@glideapps/glide-data-grid';
import { useExtraCells } from '@glideapps/glide-data-grid-cells'
import type { SparklineCell } from "@glideapps/glide-data-grid-cells";

import '@radix-ui/themes/styles.css';
import "@glideapps/glide-data-grid/dist/index.css";
import '@/index.css';
import { data } from '@/utils/data'

const columns: GridColumn[] = [
  { title: "Pair", id: "Pair", width: 150 },
  { title: "Quantity", id: "quantity", width: 100 },
  { title: "Type", id: "type", width: 100 },
  { title: "Address", id: "address", grow: 1 },
  { title: "Chart", id: "chart", width: 300 },
  { title: "", id: "liquidate", width: 150 },
];

let num: number = 1;
function rand(): number {
  return (num = (num * 16807) % 2147483647) / 2147483647;
}

const defiTokens = [
  "ETH",
  "LINK",
  "UNI",
  "AAVE",
  "COMP",
  "MKR",
  "SNX",
  "CRV",
  "YFI",
  "BAL",
  "SUSHI",
  "COMP",
  "REN",
  "UMA",
  "CRV",
  "ALPHA",
  "SXP",
  "DYDX",
  "BNT",
  "CREAM"
];

// You can access individual tokens by index, for example:
// const firstToken = defiTokens[0]; // This would give you "ETH"

const darkTheme = {
  accentColor: "#8c96ff",
  accentLight: "rgba(202, 206, 255, 0.253)",

  textDark: "#ffffff",
  textMedium: "#b8b8b8",
  textLight: "#a0a0a0",
  textBubble: "#ffffff",

  bgIconHeader: "#b8b8b8",
  fgIconHeader: "#000000",
  textHeader: "#a1a1a1",
  textHeaderSelected: "#000000",

  bgCell: "#16161b",
  bgCellMedium: "#202027",
  bgHeader: "#212121",
  bgHeaderHasFocus: "#474747",
  bgHeaderHovered: "#404040",

  bgBubble: "#212121",
  bgBubbleSelected: "#000000",

  bgSearchResult: "#423c24",

  borderColor: "rgba(225,225,225,0.2)",
  drilldownBorder: "rgba(225,225,225,0.4)",

  linkColor: "#4F5DFF",

  headerFontStyle: "bold 14px",
  baseFontStyle: "13px",
  fontFamily: "Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif",
};

export function Dash() {
  const { isConnected } = useAccount();



  const cellProps = useExtraCells();
  const [selection, setSelection] = useState<GridSelection>({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty(),
  });

  useEffect(() => {
    // initialize the chart
    const chart = init(`live-chart`)

    // add data to the chart
    chart?.applyNewData?.(data);

    function handleResize() {
      chart?.resize?.();
    }

    window.addEventListener('resize', handleResize)
    return window.removeEventListener('resize', handleResize)
  }, []);

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

  return <Flex className="h-screen" gap="2" direction="column">
    <nav className="flex flex-row w-full p-2">
      <h1 className="text-4xl font-bold ml-2">
        !dydx
      </h1>
      <div className="ml-auto">
        <ConnectKitButton />
      </div>
    </nav>
    <Separator />
    <Flex className="items-center" direction="row" gap="2">
      <div className="ml-auto">Liquidate Selected:</div>
      <Button>Liquidate</Button>
    </Flex>
    <Flex className="grow" direction="row" gap="2">
      <Flex className="w-full rounded-lg">
        <DataEditor
          {...cellProps}
          theme={darkTheme}
          rowMarkers="both"
          width='100%'
          height='100%'
          gridSelection={selection}
          onGridSelectionChange={setSelection}
          rows={500}
          columns={columns}
          getCellContent={function(cell): any {
            const [col, row] = cell;
            if (col === 0) {
              const randomPair = `${defiTokens[Math.floor(Math.random() * defiTokens.length)]}-${defiTokens[Math.floor(Math.random() * defiTokens.length)]}`
              return {
                kind: GridCellKind.Text,
                data: randomPair,
                displayData: randomPair,
                allowOverlay: false
              }
            }
            if (col === 1) {
              const randomNumber = Math.floor(Math.random() * 100);
              return {
                kind: GridCellKind.Text,
                data: '' + randomNumber,
                displayData: '' +randomNumber,
                allowOverlay: false
              }
            }
            if (col === 2) {
              const perpType = Math.floor(Math.random() * 2) === 0 ? 'LONG' : 'SHORT';
              return {
                kind: GridCellKind.Text,
                data: perpType,
                displayData: perpType,
                allowOverlay: false
              }
            }
            if (col === 3) {
              return {
                kind: GridCellKind.Text,
                data: generatePrivateKey(),
                displayData: privateKeyToAccount(generatePrivateKey()).address,
                allowOverlay: false
              }
            }
            if (col === 4) {
              num = row + 1;
              const values = range(0, 30).map(() => rand() * 100 - 50);
              return {
                kind: GridCellKind.Custom,
                allowOverlay: false,
                copyData: "4",
                data: {
                  kind: "sparkline-cell",
                  values,
                  graphKind: "bar",
                  displayValues: values.map(x => Math.round(x).toString()),
                  color: row % 2 === 0 ? "#77c4c4" : "#D98466",
                  yAxis: [-50, 50],
                },
              };
            }
            if (col === 5) {
              rand();
              const d = {
                kind: GridCellKind.Custom,
                cursor: "pointer",
                allowOverlay: true,
                copyData: "4",
                readonly: true,
                data: {
                  kind: "button-cell",
                  backgroundColor: ["transparent", "bgHeaderHasFocus"],
                  color: ["textDark", "accentFg"],
                  borderColor: "borderColor",
                  borderRadius: 9,
                  title: "Liquidate",
                  onClick: () => window.alert("Button clicked"),
                },
                themeOverride: {
                  baseFontStyle: "700 12px",
                },
              };
              return d;
            }

            num = row + 1;
          }
          }
        />
      </Flex>
    </Flex>
  </Flex>
}
