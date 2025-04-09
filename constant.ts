import { Network } from "./types/index.enum.ts";

const APP_NAME = "trade_mcp";
const APP_VERSION = "1.0.0";

const API_SOL_URL = "https://testapi.tesa.top:7443";

const API_ETH_URL = "https://ethapi.tesa.top";

const API_BASE_URL = "https://baseapi.tesa.top";

const API_BSC_URL = "https://bscapi.tesa.top";

const BASE_URL: Record<Network, string> = {
  [Network.SOLANA]: API_SOL_URL,
  [Network.ETH]: API_ETH_URL,
  [Network.BASE]: API_BASE_URL,
  [Network.BSC]: API_BSC_URL,
};

export { APP_NAME, APP_VERSION, BASE_URL };
