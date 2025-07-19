import { getTokenSymbolURI as getTokenSymbolURIFromCdn } from "@morpho-org/uikit/lib/utils";
import { Address } from "viem";
import { sonic } from "viem/chains";

type TokenList = {
  name: string;
  logoURI: string;
  timestamp: string;
  keywords: string[];
  version: { major: number; minor: number; patch: number };
  tokens: { name: string; symbol: string; decimals: number; chainId: number; address: Address; logoURI: string }[];
};

export function getTokenURI(
  token: { symbol?: string; address: Address; chainId?: number },
  tokenLists: { [chainId: number]: TokenList[] } = { [sonic.id]: [sonicTokenList] },
) {
  if (token.chainId !== undefined) {
    const match = tokenLists[token.chainId]
      ?.map((tokenList) => tokenList.tokens)
      .flat()
      .find(
        (candidate) =>
          candidate.address.toLowerCase() === token.address.toLowerCase() && candidate.chainId === token.chainId,
      )?.logoURI;

    if (match) return match;
  }

  return token.symbol ? getTokenSymbolURIFromCdn(token.symbol) : undefined;
}

const sonicTokenList: TokenList = {
  name: "Sonic Token List",
  logoURI: "https://assets.plume.org/images/logos/plume/plume.svg",
  timestamp: "2024-03-26T12:00:00.000Z",
  keywords: ["sonic", "rwa", "defi", "rezerve", "rezerve.money"],
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  tokens: [
    {
      name: "Rezerve.Money",
      symbol: "RZR",
      decimals: 18,
      chainId: 146,
      address: "0xb4444468e444f89e1c2cac2f1d3ee7e336cbd1f5",
      logoURI: "/tokens/rzr.png",
    },
    {
      name: "Liquid Staked Rezerve.Money",
      symbol: "lstRZR",
      decimals: 18,
      chainId: 146,
      address: "0x67a298e5b65db2b4616e05c3b455e017275f53cb",
      logoURI: "/tokens/lstrzr.png",
    },
  ],
};
