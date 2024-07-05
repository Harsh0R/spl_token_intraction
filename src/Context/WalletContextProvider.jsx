import React, { useMemo } from 'react'
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import * as web3 from "@solana/web3.js";

const WalletContextProvider = ({children}) => {

    const wallets = useMemo(() => [], []);

    const endpoint = web3.clusterApiUrl("devnet");
    console.log("Wallet ==> " ,wallets);
    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets}>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}

export default WalletContextProvider