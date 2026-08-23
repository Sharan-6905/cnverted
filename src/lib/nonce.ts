import { headers } from "next/headers";

/**
 * The per-request nonce minted in middleware. Next stamps its own inline
 * bootstrap automatically; this is for the script tags we write ourselves.
 */
export async function getNonce() {
  return (await headers()).get("x-nonce") ?? undefined;
}
