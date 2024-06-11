import React, { useState } from 'react'
import * as web3 from "@solana/web3.js"
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, getAssociatedTokenAddress , createAssociatedTokenAccountInstruction } from "@solana/spl-token"

const CreateTokenAccount = () => {

  const [txSig, setTxSig] = useState("")
  const [tokenAccount, settokenAccount] = useState("");
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const link = () => {
    return txSig
      ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet`
      : "";
  };

  const createTokenAccountFunc = async (event) => {
    event.preventDefault();
    if (!publicKey || !connection) {
      return;
    }

    const transaction = new web3.Transaction();
    const owner = new web3.PublicKey(event.target.owner.value);
    const mint = new web3.PublicKey(event.target.mint.value);

    const associatedToken = await getAssociatedTokenAddress(
      mint, owner, false, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID
    )
    transaction.add(
      createAssociatedTokenAccountInstruction(
        publicKey, associatedToken, owner, mint, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID
      )
    );

    sendTransaction(transaction, connection).then((sig) => {
      setTxSig(sig);
      settokenAccount(associatedToken.toString())
    })

  }

  return (
    <div>
      <h2>Create Token Account</h2>

      {
        publicKey ? (
          <form onSubmit={createTokenAccountFunc}>
            <b>Token Mint : </b>
            <input id='mint' placeholder='Enter Token u want to Mint' type="text" required />
            <br />
            <br />
            <b>Token Account Owner : </b>
            <input id='owner' placeholder='Enter Token account Owner Publickey' type="text" required />
            <br />
            <br />
            <button type="submit">Create Token Account</button>
          </form>
        ) : (
          <div>
            First Create mint Token
          </div>
        )
      }
      {
        txSig ? (
          <div>
            <p>Token Account Address = {tokenAccount}</p>
            <p>View transaction here </p>
            <a href={link()}>Solana Explorer</a>
          </div>
        ) : (
          <div>
            txSig Not define
          </div>
        )
      }

    </div>
  )
}

export default CreateTokenAccount