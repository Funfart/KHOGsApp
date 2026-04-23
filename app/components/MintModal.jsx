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
