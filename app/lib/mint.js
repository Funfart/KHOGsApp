import { ethers } from 'ethers';

const CONTRACT_ADDRESS = "0x8f864Dcc9125466C7b8e224b870585f219f6FC4b";

const ABI = [
  "function mint(uint256 id, uint256 amount) payable"
];

export async function mintDIBBS({ id = 0, amount = 1 }) {
  if (!window.ethereum) throw new Error("No wallet");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

  // price = 0 → no ETH needed
  const tx = await contract.mint(id, amount, {
    value: 0
  });

  await tx.wait();

  return tx.hash;
}
