export async function ensureBaseNetwork() {
  if (!window.ethereum) throw new Error("No wallet");

  const provider = window.ethereum;

  const currentChain = await provider.request({
    method: 'eth_chainId'
  });

  // ✅ Already on Base
  if (currentChain === '0x2105') return true;

  try {
    // 👉 Try switching
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x2105' }]
    });

    return true;

  } catch (err) {
    // 🔥 If Base not added → add it
    if (err.code === 4902) {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [BASE_CHAIN]
      });

      return true;
    }

    // ❌ User rejected or failed
    throw new Error("Please switch to Base network");
  }
}
