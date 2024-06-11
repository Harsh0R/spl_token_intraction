import React, { useState } from 'react'
import * as web3 from "@solana/web3.js"
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import {
  createMintToInstruction,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAccount,
} from "@solana/spl-token";

const MintToForm = () => {

  const [txSig, setTxSig] = useState("")
  const [blanace, setBlanace] = useState(0)
  const [tokenAccount, setTokenAccount] = useState("")

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const link = () => {
    return txSig
      ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet`
      : "";
  };

  const mintToFunc = async (event) => {
    event.preventDefault();

    if (!publicKey || !connection) {
      return;
    }

    const transaction = new web3.Transaction();


    const mintPubKey = new web3.PublicKey(event.target.mint.value);
    const recipientPubKey = new web3.PublicKey(event.target.recipient.value);
    const amount = event.target.amount.value;

    const associatedToken = await getAssociatedTokenAddress(
      mintPubKey, recipientPubKey, false, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID
    )

    transaction.add(createMintToInstruction(
      mintPubKey, associatedToken, publicKey, amount
    ))

    const signature = await sendTransaction(transaction, connection);

    await connection.confirmTransaction(signature, "confirmed");
    setTxSig(signature);
    setTokenAccount(associatedToken.toString());
    const account = await getAccount(connection, associatedToken)
    setBlanace(account.amount.toString())

  }




  return (
    <>
      <br />
      <h2>Mint Token </h2>
      {
        publicKey ? (
          <form onSubmit={mintToFunc}>
            <b>Token Mint</b>
            <input id='mint' placeholder='Enter Mint Token' type="text" required />
            <b>Recipient:</b>
            <input
              id="recipient"
              type="text"
              placeholder="Enter Recipient PublicKey"
              required
            />
            <b>Amount Tokens to Mint:</b>
            <input
              id="amount"
              type="text"
              placeholder="e.g. 100"
              required
            />
            <button type="submit" >
              Mint Tokens
            </button>
          </form>
        ) : (
          <div>PubKey is not define</div>
        )
      }
      {txSig ? (
        <div>
          <p>Token Balance: {blanace} </p>
          <p>View your transaction on </p>
          <a href={link()}>Solana Explorer</a>
        </div>
      ) : (
        <div>
          txSig not define
        </div>
      )}
    </>

  )
}

export default MintToForm