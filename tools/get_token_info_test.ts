import envValueInstance, { testInitEnvValue } from "../envValue.ts";
import { reqSignIn } from "../service_api.ts";
import { Network } from "../types/index.enum.ts";
import { getTokenInfo } from "./get_token_info.ts";
import { getNativeTokenPrice } from "./native_token.ts";

Deno.test("get_token_info", async () => {

    testInitEnvValue();

    const tokenInfo = await getTokenInfo({
        contract_address: "9DHe3pycTuymFk4H4bbPoAJ4hQrr2kaLDF6J6aAKpump",
        network: "solana",
    });
    console.log("tokenInfo is :", tokenInfo);
});


Deno.test("get native token price", async () => {

    testInitEnvValue();

    const nativeTokenPrice = await getNativeTokenPrice({
        network: Network.SOLANA,
    });
    console.log("nativeTokenPrice is :", nativeTokenPrice);
});
