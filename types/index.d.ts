interface ICoinInfoRes {
  address: string;
  pool: string;
  decimal: number;
  price: string;
  totalSupply: string;
  name: string;
  image: string;
  holderNumber: number;
  market_cap?: number | null;
}

interface ISignatureRes {
  txSignature: string;
}

interface IBuyTokenRes extends ISignatureRes { }

interface ISellTokenRes extends ISignatureRes { }

interface ITokenTxInfoRes {
  inAmount: string;
  inName: string;
  outAmount: string;
  outName: string;
  type: 1 | 2;
}

interface ITokenTxInfoResForEth extends ITokenTxInfoRes {
  status: string;
}

interface ITokenCoinProfitRes {
  balance: string;
  buyAmount: string;
  initial: string;
  price: string;
  rawBalance: string;
  sellAmount: string;
  totalSupply: string;
  value: string;
  profit: number;
  name: string;
  address: string;
  image: string;
  pool: string;
  period: number;
  decimal: number;
  buyBalance: string;
  sellBalance: string;
}

// API接口请求与响应类型定义
interface IApiResponse<T> {
  code: number;
  msg: string;
  data: T;
}

// 用户登录请求参数
interface ISignInRequest {
  api_key: string;
  api_key_symbol: string;
}

// 用户登录响应
interface ISignInResponse {
  wallet_address: string;
}

// 用户信息响应
interface IUserInfoResponse {
  id: number;
  api_key: string;
  api_key_symbol: string;
  wallet_address: string;
  created_at: string;
  updated_at: string;
}

// 代币信息请求参数
interface ICoinInfoRequest {
  api_key: string;
  api_key_symbol: string;
  coin: string;
}

// 买入代币请求参数
interface IBuyTokenRequest {
  api_key: string;
  api_key_symbol: string;
  coin: string;
  pool?: string;
  amount: string;
  decimal: number;
}

// 卖出代币请求参数
interface ISellTokenRequest {
  api_key: string;
  api_key_symbol: string;
  coin: string;
  pool?: string;
  amount: string;
  decimal: number;
}

// 获取交易信息请求参数
interface ITxInfoRequest {
  api_key: string;
  api_key_symbol: string;
  txSignature: string;
}

// 创建限价单请求参数
interface ILimitOrderRequest {
  api_key: string;
  api_key_symbol: string;
  coin: string;
  pool?: string;
  amount: string;
  decimal: number;
  action: number;
  expireSeconds: number;
  solPrice: string;
}

// 限价单响应
interface ILimitOrderResponse {
  Id: number;
}

// 原生代币价格响应
interface INativePriceResponse {
  price: number;
}

interface IDexScreenerTokenInfoRes {
  pairs: IResTokenInfoForDexscreenerListItem[]
  schemaVersion: string
}

interface IDexscreenerCoinSearchResult {
  pairs: IDexScreenerTokenPairInfo[]
}

interface IResTokenInfoForDexscreenerListItem {
  chainId: string
  dexId: string
  url: string
  label?: string[]
  pairAddress: string
  marketCap?: number
  baseToken: {
    address: string
    name: string
    symbol: string
  }
  quoteToken: {
    address: string
    name: string
    symbol: string
  }
  priceNative: string
  priceUsd: string
  txns: {
    m5: {
      buys: number
      sells: number
    }
    h1: {
      buys: number
      sells: number
    }
    h6: {
      buys: number
      sells: number
    }
    h24: {
      buys: number
      sells: number
    }
  }
  volume: {
    h24: number
    h6: number
    h1: number
    m5: number
  }
  priceChange: {
    m5: number
    h1: number
    h6: number
    h24: number
  }
  liquidity: {
    usd: number
    base: number
    quote: number
  }
  fdv: number
  pairCreatedAt: number
  info: {
    imageUrl: string
    websites: {
      label: string
      url: string
    }[]
    socials: {
      type: string
      url: string
    }[]
  }
}

interface IDexScreenerTokenPairInfo {
  chainId: string
  dexId: string
  url: string
  pairAddress: string
  baseToken: {
    address: string
    name: string
    symbol: string
  }
  quoteToken: {
    address: string
    name: string
    symbol: string
  }
  priceNative: string
  priceUsd: string
  txns: {
    m5: {
      buys: number
      sells: number
    }
    h1: {
      buys: number
      sells: number
    }
    h6: {
      buys: number
      sells: number
    }
    h24: {
      buys: number
      sells: number
    }
  }
  volume: {
    h24: number
    h6: number
    h1: number
    m5: number
  }
  priceChange: {
    m5: number
    h1: number
    h6: number
    h24: number
  }

  liquidity: {
    usd: number
    base: number
    quote: number
  }
  fdv: number
  marketCap: number
  pairCreatedAt: number
  info: {
    imageUrl: string
    header: string
    openGraph: string
    websites: {
      label: string
      url: string
    }[]
    socials: {
      type: string
      url: string
    }[]
  }
}