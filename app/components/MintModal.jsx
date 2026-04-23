'use client';

export default function MintModal({ onClose, onMint, minting }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>

        <div className="modal-text">
          🎁 Exclusive FREE Mint
        </div>

        <img
          src="https://ipfs.io/ipfs/bafybeicinhd4gy3c52ybyh4xqr6eql7nokpl37vc4zx2rl3pkylbn26lym"
          style={{
            width: '100%',
            borderRadius: '12px',
            marginBottom: '12px'
          }}
        />

        <div className="modal-sub">
          Claim your DIBBS Artifact (Limit 3 per wallet)
        </div>
        <div className="mint-explain">
          🎁 Free Mint on Base Network  
          ✔ No ETH cost  
          ✔ Verified contract  
        </div>
        
        <a
          href="https://basescan.org/address/0x8f864Dcc9125466C7b8e224b870585f219f6FC4b"
          target="_blank"
        >
          View Contract
        </a>

        <button
          className="modal-btn"
          onClick={onMint}
          disabled={minting}
        >
          {minting ? 'Minting...' : 'Mint FREE'}
        </button>

      </div>
    </div>
  );
}
