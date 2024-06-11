import React, { useState } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import * as web3 from "@solana/web3.js"
import { MINT_SIZE, TOKEN_PROGRAM_ID, createInitializeMintInstruction, getMinimumBalanceForRentExemptMint } from '@solana/spl-token'

import('buffer').then(({ Buffer }) => {
    window.Buffer = Buffer;
});



const CreateMint = () => {



    const [txSig, setTxSig] = useState('')
    const [mint, setmint] = useState("")

    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const link = () => {
        return txSig
            ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet`
            : "";
    };

    const createMintToken = async (event) => {
        event.preventDefault();

        if (!publicKey || !connection) {
            return;
        }
        const mint = web3.Keypair.generate();
        const lamports = await getMinimumBalanceForRentExemptMint(connection);
        const transaction = new web3.Transaction();

        transaction.add(
            web3.SystemProgram.createAccount({
                fromPubkey: publicKey,
                newAccountPubkey: mint.publicKey,
                space: MINT_SIZE,
                lamports,
                programId: TOKEN_PROGRAM_ID
            }),
            createInitializeMintInstruction(
                mint.publicKey,
                0,
                publicKey,
                publicKey,
                TOKEN_PROGRAM_ID
            )
        );

        sendTransaction(transaction, connection, { signers: [mint] }).then((sig) => {
            setTxSig(sig);
            setmint(mint.publicKey.toString())
        })

    }




    return (
        <div>
            <h2>Create Mint Token</h2>
            {
                publicKey ? (

                    <form onSubmit={createMintToken}>
                        <button type="submit">Create Mint Token</button>
                    </form>

                ) : (
                    <div>
                        Connect ur wallet first
                    </div>
                )
            }
            {
                txSig ? (
                    <div>
                        <p>mint Address = {mint}</p>
                        <p>View ur transaction here : </p>
                        <a href={link()}> Soloana Explorer </a>
                    </div>
                ) : (
                    <div>
                        ...
                    </div>
                )
            }

        </div>
    )
}

export default CreateMint