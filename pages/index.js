import Head from "next/head"
import styles from "../styles/Home.module.css"
import { useMoralis } from "react-moralis";
//import ManualHeader from "../components/ManualHeader"
import Header from "../components/Header"
import Lottery from "../components/LotteryEntrance"

export default function Home() {
    return (
        <div>
            <Head>
                <title>Lotto Loco</title>
                <meta name="description" content="Lottery Dapp" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header/>
            <Lottery/>

            {/* <ManualHeader/> */}
            Hello!
           {/**header / connect / nav*/}
        </div>
    )
}
