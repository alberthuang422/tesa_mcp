import { testInitEnvValue } from "../envValue.ts";
import { Network, TradeType } from "../types/index.enum.ts";
import { tradeToken } from "./trade_token.ts";

Deno.test("trade token", async () => {
    testInitEnvValue();
    const res = await tradeToken({
        contract_address: "9DHe3pycTuymFk4H4bbPoAJ4hQrr2kaLDF6J6aAKpump",
        network: Network.SOLANA,
        amount: 10000000,
        type: TradeType.BUY,
    });
    console.log(res);
});
