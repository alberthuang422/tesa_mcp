import { reqSignIn } from "../service_api.ts";
import { Network } from "../types/index.enum.ts";

export const createWalletTool = {
    name: "create_wallet",
    description: "创建一个钱包,当用户需要创建一个钱包时,或者使用其他工具得到没有钱包地址的错误的时候,使用这个工具",
    inputSchema: {
        type: "object",
        properties: {
            network: { type: "string", enum: ["solana", "eth", "base", "bsc"] },
        },
        required: ["network"],
    },
};

export const createWallet = async ({ network }: { network: Network }) => {
    const { wallet_address } = await reqSignIn(network);
    return {
        wallet_address: wallet_address,
    };
};
