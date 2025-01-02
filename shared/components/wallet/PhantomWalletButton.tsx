'use client';

import React, { useEffect, useState } from 'react';

export const PhantomWalletButton = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    if (window.solana && window.solana.isPhantom) {
      window.solana.connect({ onlyIfTrusted: true }).then(({ publicKey }) => {
        setWalletAddress(publicKey.toString());
      });
    }
  }, []);

  const connectWallet = async () => {
    if (window.solana) {
      const { publicKey } = await window.solana.connect();
      setWalletAddress(publicKey.toString());
    }
  };

  const disconnectWallet = () => {
    window.solana?.disconnect();
    setWalletAddress(null);
  };

  return (
    <div>
      {walletAddress ? (
        <div className="wallet-info">
          <span className="mr-2">Connected: {walletAddress}</span>
          <button onClick={disconnectWallet} className="phantom-wallet-button">
            Disconnect
          </button>
        </div>
      ) : (
        <button onClick={connectWallet} className="phantom-wallet-button">
          Connect Phantom Wallet
        </button>
      )}
    </div>
  );
};
