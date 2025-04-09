// Token_List_PageNum      int    `json:"token_list_page_num"`

import { reqUserInfo } from "../service_api.ts";
import { isNetwork, Network } from "../types/index.enum.ts";

// 	LimitOrder_List_PageNum int    `json:"limit_order_list_page_num"`
export const userInfoTool = {
    name: "user_info",
    description: "获取用户的钱包地址，代币持仓，代币余额，限价单列表",
    inputSchema: {
        type: "object",
        properties: {
            network: { type: "string", description: "网络类型" },
            token_list_page_num: { type: "number", description: "代币列表页码", default: 1 },
            limit_order_list_page_num: { type: "number", description: "限价单列表页码", default: 1 },
        },
        required: ["network"],
    },
}

export const getUserInfo = async (network: Network, token_list_page_num = 1, limit_order_list_page_num = 1) => {

    if (!network || !isNetwork(network)) {
        throw new Error("network is not supported");
    }

    if (typeof token_list_page_num !== "number") {
        token_list_page_num = Number(token_list_page_num);
        if (isNaN(token_list_page_num)) {
            throw new Error("token_list_page_num is not a number");
        }
    }

    if (typeof limit_order_list_page_num !== "number") {
        limit_order_list_page_num = Number(limit_order_list_page_num);
        if (isNaN(limit_order_list_page_num)) {
            throw new Error("limit_order_list_page_num is not a number");
        }
    }

    const userInfo = await reqUserInfo(network, token_list_page_num, limit_order_list_page_num);
    return userInfo;
}