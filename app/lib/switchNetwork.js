export async function ensureBaseNetwork() {
  if (!window.ethereum) throw new Error("No wallet");

  const BASE_CHAIN_ID = '0x2105';

  const current = await window.ethereum.request({
    method: 'eth_chainId'
  });

  if (current === BASE_CHAIN_ID) return true;

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: BASE_CHAIN_ID }]
    });

    // ✅ wait for actual confirmation
    await new Promise((resolve) => {
      const handler = (chainId) => {
        if (chainId === BASE_CHAIN_ID) {
          window.ethereum.removeListener('chainChanged', handler);
          resolve();
        }
      };
      window.ethereum.on('chainChanged', handler);
    });

    return true;

  } catch (err) {
    if (err.code === 4902) {
      // chain not added → add it
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: BASE_CHAIN_ID,
          chainName: 'Base Mainnet',
          nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18
          },
          rpcUrls: ['https://mainnet.base.org'],
          blockExplorerUrls: ['https://basescan.org']
        }]
      });

      return true;
    }

    throw new Error("User rejected network switch");
  }
}
