import { getEnvData } from "../utils.ts";

class JWT {
  jwt: string;

  constructor() {
    this.jwt = getEnvData("USER_JWT");
  }

  getJwt() {
    return this.jwt;
  }
  setJwt(jwt: string) {
    this.jwt = jwt;
  }
}

const JWTInstance = new JWT();
export default JWTInstance;
