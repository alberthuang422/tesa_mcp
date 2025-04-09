export enum Network {
  SOLANA = "solana",
  ETH = "eth",
  BASE = "base",
  BSC = "bsc",
}

export enum TradeType {
  BUY = "buy",
  SELL = "sell",
}


export enum LimitOrderAction {
  INIT = 0,
  BUY_LOW = 1,
  SELL_LOW = 2,
  BUY_HIGH = 3,
  SELL_HIGH = 4,
}


export enum RequestMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}


export const isNetwork = (network: string): network is Network => {
  return Object.values(Network).includes(network as Network);
};


export const isTradeType = (type: string): type is TradeType => {
  return Object.values(TradeType).includes(type as TradeType);
};

