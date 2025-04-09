import { reqBuyToken } from "./service_api.ts";
import JWTInstance from "./tools/jwt.ts";
import { Network } from "./types/index.enum.ts";

Deno.test("test buy token", async () => {
    JWTInstance.setJwt(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6Imx5aXpyaWlpQGdtYWlsLmNvbSIsImV4cCI6NTM0MjgyNjk3OCwiaWF0IjoxNzQyODI2OTc4LCJpc3MiOiJiYWNrZW5kIn0.zRM_cI3MW8nPk9R4Ymro7HHauzXxcxrdZwIh10XEmXA",
    );
    const res = await reqBuyToken(
        Network.SOLANA,
        "9DHe3pycTuymFk4H4bbPoAJ4hQrr2kaLDF6J6aAKpump",
        10000000,
    );
    console.log(res);
});
