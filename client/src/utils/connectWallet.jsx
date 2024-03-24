import {Contract, ethers}  from "ethers";
import stakingAbi from "../ABI/stakingAbi.json";
import stakeTokenAbi from"../ABI/stakeTokenAbi.json";
 
export const connectWallet = async()=>{

 try {
    let [signer,provider,stakingContract,stakeTokenContract,chainId]=[null,null,null,null,null]
    if(window.ethereum==null){
        throw new Error("Metamask is not installed");
    }
    const accounts = await window.ethereum.request({
        method:"eth_requestAccounts"
    })

    let chainIdHex = await window.ethereum.request({
     method:'eth_chainId'        
    })
    
    chainId= parseInt(chainIdHex,16)
     let selectedAccount = accounts[0];
    if(!selectedAccount){
        throw new Error("No ethereum accounts available")
    }

    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();

    const stakingContractAddress="0xdbbb5205d01877a115d3c40316f466798c59d17a"
    const stakeTokenContractAddress="0x0768d8961a4bd90e5fcb03862a1886d93365caf4"
    
    stakingContract =new Contract(stakingContractAddress,stakingAbi,signer);
    stakeTokenContract = new Contract(stakeTokenContractAddress,stakeTokenAbi,signer);
    console.log(provider,selectedAccount,stakingContract,stakeTokenContract,chainId);

    return{provider,selectedAccount,stakeTokenContract,stakingContract,chainId}
} catch (error) {
    console.error(error);
    throw error
 }

}