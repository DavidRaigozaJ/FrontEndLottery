import {ConnectButton} from "web3uikit"

export default function Header() {
    return(
        <div>
            LottoMock-o
            <ConnectButton moralisAuth={false}/>
        </div>
    )
}
