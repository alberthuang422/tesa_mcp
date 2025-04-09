import { reqTokenNativeForBscPrice, reqTokenNativeForEthPrice, reqTokenNativePrice } from "../service_api.ts";
import { isNetwork, Network } from "../types/index.enum.ts";

export const nativeTokenTool = {
    name: "native_token",
    description: "get the price of the native token",
    inputSchema: {
        type: "object",
        properties: {
            network: {
                type: "string",
                enum: ["solana", "eth", "base", "bsc"],
            },
        },
        required: ["network"],
    },
};

export const getNativeTokenPrice = async ({ network }: { network?: string }) => {

    if (!network || !isNetwork(network)) {
        throw new Error("network is not supported");
    }

    if (network === Network.SOLANA) {
        const { price } = await reqTokenNativePrice();
        return {
            nativeTokenPrice: price,
        }
    } else if (network === Network.ETH || network === Network.BASE) {
        const { price } = await reqTokenNativeForEthPrice();
        return {
            nativeTokenPrice: price,
        }
    } else if (network === Network.BSC) {
        const { price } = await reqTokenNativeForBscPrice();
        return {
            nativeTokenPrice: price,
        }
    }
    return {
        nativeTokenPrice: 0,
    }
}