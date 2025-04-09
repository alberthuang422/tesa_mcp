import axios from "npm:axios";
import { Network } from "./types/index.enum.ts";
import { request } from "./request_handler.ts";
import envValueInstance from "./envValue.ts";

const MAX_RETRIES = 3;

async function retryRequest(fn: () => Promise<any>, retries = MAX_RETRIES) {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (error: any) {
            if (i === retries - 1) throw error;
            console.log(`Retry ${i + 1}/${retries} after error:`, error.message);
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
    }
}

export const reqSignIn = async (network: Network): Promise<ISignInResponse> => {
    return await request.POST(network, "/api/mcp/sign_in", {
        network: network,
    });
}

export const reqUserInfo = async (network: Network, token_list_page_num: number, limit_order_list_page_num: number): Promise<IUserInfoResponse> => {
    return await request.GET(network, "/api/mcp/user_info", {
        token_list_page_num,
        limit_order_list_page_num,
    });
}

export const reqTokenInfo = async (network: Network, coin: string): Promise<ICoinInfoRes> => {
    return await retryRequest(async () => {
        return await request.GET(network, "/api/mcp/coin_info", {
            coin: coin,
            api_key: envValueInstance.getApiKey(),
            api_key_symbol: envValueInstance.getApiKeySymbol(),
        });
    });
};

export const reqBuyToken = async (
    network: Network,
    coin: string,
    amount: number,
): Promise<IBuyTokenRes> => {
    return await retryRequest(async () => {
        return await request.POST(network, "/api/mcp/buy", {
            coin,
            amount: amount
        });
    });
};

export const reqTokenSell = async (
    network: Network,
    coin: string,
    amount: number,
): Promise<ISellTokenRes> => {
    return await retryRequest(async () => {
        return await request.POST(network, "/api/mcp/sell", {
            coin,
            amount
        });
    });
};

export const reqTransInfo = async (
    network: Network,
    txSignature: string,
): Promise<ITokenTxInfoResForEth> => {
    return await retryRequest(async () => {
        return await request.GET(network, "/api/mcp/tx_info", {
            tx_hash: txSignature,
        });
    });
};

export const reqLimitOrder = async (
    network: Network,
    coin: string,
    pool: string,
    amount: string,
    decimal: number,
    action: number,
    expireSeconds: number,
    solPrice: string
): Promise<ILimitOrderResponse> => {
    return await retryRequest(async () => {
        return await request.POST(network, "/api/mcp/limit/create", {
            coin,
            pool,
            amount,
            decimal,
            action,
            expireSeconds,
            solPrice,
        });
    });
};

export const reqTokenNativePrice = async (): Promise<INativePriceResponse> => {
    return await retryRequest(async () => {
        return await request.GET(Network.SOLANA, '/api/mcp/native_price', {});
    });
}

export const reqTokenNativeForEthPrice = async (): Promise<INativePriceResponse> => {
    return await retryRequest(async () => {
        return await request.GET(Network.ETH, '/api/mcp/native_price', {});
    });
}

export const reqTokenNativeForBscPrice = async (): Promise<INativePriceResponse> => {
    return await retryRequest(async () => {
        return await request.GET(Network.BSC, '/api/mcp/native_price', {});
    });
}

export const reqcoinDexScreenerCoin = async ({
    coin,
}: {
    coin: string
}): Promise<IDexScreenerTokenInfoRes> => {
    return await retryRequest(async () => {
        return await request.GET(Network.SOLANA, "", {}, `https://api.dexscreener.com/latest/dex/tokens/${coin}`, {});
    });
}

export const reqCoinDexscreenerWithSymbolPair = async ({
    coinPair
}: {
    coinPair: string
}): Promise<IDexscreenerCoinSearchResult> => {
    return await retryRequest(async () => {
        return await request.GET(Network.SOLANA, "", {
        }, `https://api.dexscreener.com/latest/dex/search?q=${coinPair}`, {});
    });
}
