import { createThirdwebClient } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
 
const clientId = "5c9e60ae0eda6988b9a4174283224961";//import.meta.env.THIRDWEB_CLIENT_ID;
 
export const thirdWebClient = createThirdwebClient({ clientId });
export const currentChain = baseSepolia;