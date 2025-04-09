import { reqCoinDexscreenerWithSymbolPair } from "../service_api.ts";
import { isNetwork, Network } from "../types/index.enum.ts";


export const getTokenValueTickerTool = {
    name: "get_token_value_ticker",
    description: "if user just get a ticker, you can use this tool to get the token value ticker",
    inputSchema: {
        type: "object",
        properties: {
            network: { type: "string", enum: ["solana", "eth", "base", "bsc"], description: "the network of the token" },
            ticker: { type: "string", description: "the ticker of the token" },
        },
        required: ["network", "ticker"],
    },
}


export const getTokenValueTicker = async ({
    network,
    ticker,
}: {
    network?: string,
    ticker?: string
}) => {

    if (!network || !isNetwork(network)) {
        throw new Error("network is not supported");
    }

    if (!ticker) {
        throw new Error("ticker is not supported");
    }

    let tickerPair = ""

    switch (network) {
        case Network.SOLANA:
            tickerPair = `${ticker}/SOL`
            break
        case Network.ETH:
        case Network.BASE:
            tickerPair = `${ticker}/ETH`
            break
        case Network.BSC:
            tickerPair = `${ticker}/BNB`
            break
        default:
            throw new Error("network is not supported")
    }

    const res = await reqCoinDexscreenerWithSymbolPair({ coinPair: tickerPair })
    return {
        tokenValue: res.pairs[0],
    }
}