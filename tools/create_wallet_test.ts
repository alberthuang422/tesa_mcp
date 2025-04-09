import { createWallet } from "./creat_wallet.ts";
import { Network } from "../types/index.enum.ts";
import { testInitEnvValue } from "../envValue.ts";

Deno.test("create_wallet", async () => {
    testInitEnvValue()
    const wallet = await createWallet({
        network: Network.SOLANA,
    });
    console.log(wallet);
});
