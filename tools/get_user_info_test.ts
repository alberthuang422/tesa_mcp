import { testInitEnvValue } from "../envValue.ts";
import { Network } from "../types/index.enum.ts";
import { getUserInfo } from "./user_info.ts";

Deno.test("get user info", async () => {
    testInitEnvValue();
    const userInfo = await getUserInfo(Network.SOLANA, 1, 1);
    console.log(userInfo);
});