
import {
    reqBuyToken,
    reqTokenInfo,
    reqTokenSell,
    reqTransInfo,
} from "../service_api.ts";
import { isNetwork, Network, TradeType } from "../types/index.enum.ts";

export const tradeTokenTool = {
    name: "trade_token",
    description:
        "当你需要进行代币的买卖操作时，使用这个工具",
    inputSchema: {
        type: "object",
        properties: {
            contract_address: { type: "string" },
            network: {
                type: "string",
                enum: ["solana", "eth", "base", "bsc"],
                description: "the network symbol, support solana,eth,base,bsc",
            },
            amount: { type: "number", description: "the amount of the token to trade, must be a number" },
            type: { type: "string", description: "the type of the trade, support buy, sell" },
        },
        required: ["contract_address", "network", "amount", "type"],
    },
};

export const tradeToken = async (
    {
        contract_address,
        network,
        amount,
        type,
    }: {
        contract_address?: string,
        network?: string,
        amount?: number,
        type?: string,
    }
) => {

    if (!network || !isNetwork(network)) {
        throw new Error("network is not supported");
    }

    if (type && !Object.values(TradeType).includes(type as TradeType)) {
        throw new Error("type is not supported");
    }
    if (typeof amount !== "number") {
        amount = Number(amount);
        if (isNaN(amount)) {
            throw new Error("amount is not a number");
        }
        if (amount <= 0) {
            throw new Error("amount is not positive");
        }
    }

    if (!contract_address || !network) {
        throw new Error("contract_address and network are required");
    }

    const res = type == TradeType.BUY
        ? await reqBuyToken(
            network,
            contract_address,
            amount,
        )
        : await reqTokenSell(
            network,
            contract_address,
            amount,
        );

    if (!res) {
        throw new Error("trade failed");
    }

    const maxRetrs = 10;
    let retryTansinfo = 0;

    let isTransSuccess = false;

    let transStatus = "";

    let txInfo = {} as ITokenTxInfoResForEth;

    while (retryTansinfo < maxRetrs) {
        txInfo = await reqTransInfo(network, res.txSignature);
        if (network !== Network.SOLANA) {
            console.log("got tx info", txInfo);
            if (txInfo.status == "2") {
                isTransSuccess = true;
                transStatus = txInfo.status;
                break;
            }
            if (txInfo.status == "-1") {
                throw new Error("trade failed");
            }
            if (txInfo.status == "1") {
                transStatus = txInfo.status;
            }
        }

        if (!!txInfo.type == true) {
            isTransSuccess = true;
            transStatus = txInfo.status;
            break;
        }
        retryTansinfo++;
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    if (!isTransSuccess) {
        if (transStatus == "1") {
            throw new Error("trade success,but got trade onchain value is fail");
        }
        throw new Error("trade failed");
    }

    return {
        ...txInfo,
        txSignature: res.txSignature,
    };
};
