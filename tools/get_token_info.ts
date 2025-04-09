import { reqTokenInfo } from "../service_api.ts";
import { Network } from "../types/index.enum.ts";
import { tokenForLamportsToDecimals } from "../utils.ts";
import { getNativeTokenPrice } from "./native_token.ts";

export const getTokenInfoTool = {
    name: "get_token_info",
    description:
        "get token info, when you need to get the token info, you can use this tool,你能获取到代币对应原生获取的单价 `price` 和 代币对应的池子 `pool` 和 代币的精度 `decimal` 和代币对应的市值 `market_cap`",
    inputSchema: {
        type: "object",
        properties: {
            contract_address: {
                type: "string",
                description: "the contract address of the token",
            },
            network: {
                type: "string",
                enum: ["solana", "eth", "base", "bsc"],
                description: "the network symbol, support solana,eth,base,bsc",
            },
        },
        required: ["contract_address", "network"],
    },
};

export const getTokenInfo = async (
    {
        contract_address,
        network,
    }: {
        contract_address?: string;
        network?: string;
    },
) => {
    if (!Object.values(Network).includes(network as Network)) {
        throw new Error("network is not supported");
    }

    if (!contract_address) {
        throw new Error("contract_address is required");
    }

    console.log("start get token info");

    const tokenInfo = await reqTokenInfo(network as Network, contract_address);

    console.log("get token info success", JSON.stringify(tokenInfo));

    const { nativeTokenPrice } = await getNativeTokenPrice({ network: network as Network });

    tokenInfo.market_cap = Number(tokenInfo.price) *
        nativeTokenPrice *
        tokenForLamportsToDecimals(Number(tokenInfo.totalSupply), tokenInfo.decimal || 9)

    return tokenInfo;
};
