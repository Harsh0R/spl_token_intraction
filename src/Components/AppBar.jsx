import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import React from 'react'

const AppBar = () => {
    return (
        <div>
            <h2>Wallet Connectio</h2>
            <WalletMultiButton />
        </div>
    )
}

export default AppBar