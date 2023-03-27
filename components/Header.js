import {ConnectButton} from "web3uikit"

export default function Header() {
    return(
        <div  className="p-5 border-b-2">
            <h1 className="py-6 px-6 font-blog text-3xl">LottoMock-o</h1>
            <div className="ml-auto py-2 px-4"></div>
            <ConnectButton moralisAuth={false}/>
        </div>
    )
}
