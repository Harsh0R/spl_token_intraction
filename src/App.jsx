import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WalletContextProvider from './Context/WalletContextProvider'
import AppBar from './Components/AppBar'
import BalanceDisplay from './Components/BalanceDisplay'
import MintToForm from './Components/MintToForm'
import CreateMint from './Components/CreateMint'
import CreateTokenAccount from './Components/CreateTokenAccount'

function App() {

  return (
    <WalletContextProvider>
      <AppBar />
      <div>
        <BalanceDisplay />
        <CreateMint />
        <CreateTokenAccount />
        <MintToForm />
      </div>
    </WalletContextProvider>
  )
}

export default App
