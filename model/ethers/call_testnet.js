const { ethers } = require('ethers');

// Use MetaMask's provider
let provider = new ethers.providers.Web3Provider(window.ethereum);
let signer = provider.getSigner();
async function connectWallet() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
}
connectWallet();
const contractAddress = "0x0e18AA8E01FbF62d11666F055D3e3BE26a810F01";
const contractABI = [ 
    {
      "inputs": [
        {
          "internalType": "uint256[1]",
          "name": "instances",
          "type": "uint256[1]"
        },
        {
          "internalType": "bytes",
          "name": "proof",
          "type": "bytes"
        }
      ],
      "name": "verify",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true,
      "signature": "0xa2bd95d1"
    }
  ] ;

const contract = new ethers.Contract(contractAddress, contractABI, signer);
async function callVerify(instance, proof) {
    try {
        let tx = await contract.verify(instance, proof);
        console.log('Transaction Hash:', tx.hash);
        
        // Wait for the transaction to be mined
        let receipt = await tx.wait();
        console.log('Transaction Receipt:', receipt);
        
    } catch (error) {
        console.error("Error calling verify function:", error);
    }
}

// Sample data (replace with your actual data)
const instance = [17005591436463863406]; // As uint256[1]
const proof = ethers.utils.hexlify("./proof.bytes");  // Convert your proof data to hex format

callVerify(instance, proof);
