
import { useEffect } from "react"
import { useMoralis } from "react-moralis"

export default function ManualHeader() {

    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } = useMoralis()
    // button that connects to wallet, checks accounts and check if web3 is enabled!

    // this a hook constantly checks if web3 is enabled

    useEffect(() => {
        if(isWeb3Enabled) return
        if(typeof window !== "undefined"){
            if (window.localStorage.getItem("connected")) {
                enableWeb3()
            }
        }
    }, [isWeb3Enabled])

  
    // this a hook determine if is not connected and stops the browser from trying to connect

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`)
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("Null account found")
            }
        })
    },[])


      //React button Component

    return(
    
    <div>
        {account ? (<div>Connected to {account.slice(0,6)}...{account.length - 4}</div>
        ) : (

            //button component
        <button 

        
        onClick={async () => {
            await enableWeb3()
            if(typeof window !== "undefined") {
                window.localStorage.setItem("connected", "injected")
            }
            
            }}
            disabled={isWeb3EnableLoading}
            >
                Connect
                </button>)}
        
    </div>
    
    )
}

