import { getEnvData } from "./utils.ts";

class EnvValue {
    api_key: string
    api_key_symbol: string

    constructor() {
        this.api_key = getEnvData("API_KEY");
        this.api_key_symbol = getEnvData("API_KEY_SYMBOL");
    }

    getApiKey() {
        return this.api_key;
    }

    getApiKeySymbol() {
        return this.api_key_symbol;
    }

    setApiKey(api_key: string) {
        this.api_key = api_key;
    }

    setApiKeySymbol(api_key_symbol: string) {
        this.api_key_symbol = api_key_symbol;
    }
}

const envValueInstance = new EnvValue();
export default envValueInstance;


export const testInitEnvValue = () => {
    envValueInstance.setApiKey("ak_cf6ad77304e2b712f3b5de100a778840");
    envValueInstance.setApiKeySymbol("solana");
}