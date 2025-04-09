import { testInitEnvValue } from "../envValue.ts";
import { Network, TradeType } from "../types/index.enum.ts";
import { createLimitOrder } from "./limit_order.ts";

Deno.test("limit order", async () => {
    testInitEnvValue();
    const res = await createLimitOrder({
        network: Network.SOLANA,
        coin_address: "9DHe3pycTuymFk4H4bbPoAJ4hQrr2kaLDF6J6aAKpump",
        amount: 1000,
        target_price: 0.00016999703508235211,
        type: TradeType.BUY,
        expire_seconds: 60 * 60 * 24 * 3,
    });
});