import { reqLimitOrder, reqTokenInfo } from "../service_api.ts";
import { isNetwork, isTradeType, LimitOrderAction, Network, TradeType } from "../types/index.enum.ts";
import { isValidAddress } from "../utils.ts";


export const limitOrderTool = {
    name: "limit_order",
    description: "当你需要进行限价订单或者是期望在一个特定的价格再进行交易操作时，使用这个工具",
    inputSchema: {
        type: "object",
        properties: {
            network: { type: "string", enum: ["solana", "eth", "base", "bsc"] },
            coin_address: {
                type: "string",
                description: "the address of the coin",
            },
            amount: {
                type: "number",
                description: "the amount of the coin to trade, must be a number,如果是买入操作的话 你需要对代币进行精度转换,solana的原生代币精度为9,eth的原生代币精度为18",
            },
            target_price: {
                type: "number",
                description: "the target price of the coin, 代表着单个代币对应原生代币的价格",
            },
            type: {
                type: "string",
                enum: ["buy", "sell"],
                description: "the type of the order, buy or sell",
            },
            expire_seconds: {
                type: "number",
                description: "the expire seconds of the order, default is 3 days",
                default: 60 * 60 * 24 * 3,
            }
        },
        required: ["network", "coin_address", "amount", "target_price", "type"],
    },
};

export const createLimitOrder = async ({
    network,
    coin_address,
    amount,
    target_price,
    type,
    expire_seconds,
}: {
    network?: Network,
    coin_address?: string,
    amount?: number,
    target_price?: number,
    type?: TradeType,
    expire_seconds?: number,
}) => {
    if (!network || !isNetwork(network)) {
        throw new Error("network is not supported");
    }

    if (!type || !isTradeType(type)) {
        throw new Error("type is not supported");
    }

    if (!coin_address || !isValidAddress(coin_address, network)) {
        throw new Error("coin_address is not valid");
    }

    if (!amount || typeof amount !== "number") {
        throw new Error("amount is not valid");
    }

    if (!target_price || typeof target_price !== "number") {
        throw new Error("target_price is not valid");
    }

    if (!expire_seconds || typeof expire_seconds !== "number") {
        throw new Error("expire_seconds is not valid");
    }

    const tokenInfo = await reqTokenInfo(network, coin_address);

    let limitOrderAction = LimitOrderAction.INIT;

    if (type == TradeType.BUY) {
        if (target_price < Number(tokenInfo.price)) {
            limitOrderAction = LimitOrderAction.BUY_LOW;
        } else {
            limitOrderAction = LimitOrderAction.BUY_HIGH;
        }
    } else {
        if (target_price < Number(tokenInfo.price)) {
            limitOrderAction = LimitOrderAction.SELL_LOW;
        } else {
            limitOrderAction = LimitOrderAction.SELL_HIGH;
        }
    }

    const limitOrder = await reqLimitOrder(network, coin_address, tokenInfo.pool, String(amount), tokenInfo.decimal, limitOrderAction, expire_seconds, String(target_price));

    console.log("set limit order", limitOrder);


    return limitOrder;
};

