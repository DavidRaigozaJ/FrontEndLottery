//cal the lottery
import { useMoralis, useWeb3Contract } from "react-moralis"
import {abi, contractAddesses} from "../constants/"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"

  

export default function Lottery() {
    const {Moralis, chainId: chainIdHex, isWeb3Enabled} = useMoralis()
    const chainId = parseInt(chainIdHex)
    const raffleAddress = chainId in contractAddesses ? contractAddesses[chainId][0] : null 
    
    const dispatch = useNotification()
    
    
    const [entranceFee, setEntranceFee] = useState("0")
    const [numberOfPlayers, setNumberOfPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")
     
    
    const {
        runContractFunction: enterRaffle,
        data: enterTxResponse,
        isLoading,
        isFetching,
    } = useWeb3Contract({
       abi: abi,
       contractAddress: raffleAddress,
       functionName: "enterRaffle",
       msgValue: entranceFee,
       params: {},
     })


     const {runContractFunction: getEntranceFee} = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
     })

     const {runContractFunction: getNumberOfPlayers} = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getNumberOfPlayers",
        params: {},
     })

     const {runContractFunction: getRecentWinner} = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getRecentWinner",
        params: {},
     })


     async function updateUIValues() {

            
        const entranceFeeFromCall = (await getEntranceFee()).toString()
        const numberOfPlayersFromCall = (await getNumberOfPlayers()).toString()
        const recentWinnerFromCall = (await getRecentWinner()).toString()
        setEntranceFee(entranceFeeFromCall)
        setNumberOfPlayers(numberOfPlayersFromCall)
        setRecentWinner(recentWinnerFromCall)
     }

   
     useEffect(() => {
        if (isWeb3Enabled) {

        
             updateUIValues()
        }
    }, [isWeb3Enabled])

    const handleSuccess = async function (tx) {
        await tx.wait(1)
        handleNotification(tx)
        updateUIValues()
    }

    const handleNotification = function() {
        dispatch({
            type:"info",
            message:"Transaction Complete!",
            title: "Tx Notification",
            position: "topR",
            icon: "bell"
        })
    }

    return(
        <div>
            Hi From Lottery
            {raffleAddress ? (
            <div>
                <button onClick={async function() {

                    await enterRaffle({
                        onSuccess: handleSuccess,
                        onError: (error) => console.log(error),

                    })
                    
                    }}>Enter Raffle!</button>

                EntranceFee{ethers.utils.formatUnits(entranceFee, "ether")}ETH
                number Of Players: {numberOfPlayers}
                Recent Winner: {recentWinner}
                </div>
            ) : (
            <div>No Raffle Address</div>
            )}
            
        </div>
    )
}