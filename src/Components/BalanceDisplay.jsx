import React, { useEffect, useState } from 'react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'

const BalanceDisplay = () => {

    const [balance, setBalance] = useState(0)
    const { connection } = useConnection();
    const { publicKey } = useWallet();

    useEffect(() => {

        if (!connection || !publicKey) {
            return
        }
        connection.getAccountInfo(publicKey).then((info) => {
            setBalance(info.lamports);
        })

        return () => {

        }
    }, [connection, publicKey])


    return (
        <div>
            <h2>Balance Section</h2>
            {
                publicKey ? `SOL Balance => ${balance / LAMPORTS_PER_SOL} SOL` : 'TO Show Balance first Connect wallet'
            }
        </div>
    )
}

export default BalanceDisplay