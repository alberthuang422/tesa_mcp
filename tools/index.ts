import { getTokenInfo } from "./get_token_info.ts";
import { tradeToken } from "./trade_token.ts";
import { getTokenInfoTool } from "./get_token_info.ts";
import { tradeTokenTool } from "./trade_token.ts";
import { createLimitOrder, limitOrderTool } from "./limit_order.ts";
import { getNativeTokenPrice, nativeTokenTool } from "./native_token.ts";
import { getTokenValueTicker, getTokenValueTickerTool } from "./token_value_ticker.ts";
import { createWallet, createWalletTool } from "./creat_wallet.ts";
import { userInfoTool } from "./user_info.ts";
import { getUserInfo } from "./user_info.ts";


export const toolsList = [
    getTokenInfoTool,
    tradeTokenTool,
    limitOrderTool,
    nativeTokenTool,
    getTokenValueTickerTool,
    createWalletTool,
    userInfoTool,
];

export const toolToHandler = {
    [getTokenInfoTool.name]: getTokenInfo,
    [tradeTokenTool.name]: tradeToken,
    [limitOrderTool.name]: createLimitOrder,
    [nativeTokenTool.name]: getNativeTokenPrice,
    [getTokenValueTickerTool.name]: getTokenValueTicker,
    [createWalletTool.name]: createWallet,
    [userInfoTool.name]: getUserInfo,
};
