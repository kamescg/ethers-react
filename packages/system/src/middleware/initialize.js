/**
 * @function contractLoad
 */

/* --- Global --- */
import { selectNetworkName } from "../lib/helpers";

/* --- Configuration --- */
const DEPLOYED = "deployed";
const FACTORY = "factory";

/* --- Function --- */
export const contractLoad = (contracts) => (initialState) => {
  let contractNetwork = {};
  let contractLibrary = {};
  let networkId;

  contracts.forEach((contract) => {
    /* @dev FIND A BETTER WAY TO DETECT CONTRACT STATUS
     * Truffle and Embark compile smart contracts differently.
     * It would be great to set a standard or create a library
     * that unifies their format.
     */
    networkId = contract.networks ? Object.keys(contract.networks) : [];
    /* --- Standard JSON : Smart Contract JSON --- */
    if (networkId.length > 0) {
      const networkId = Object.keys(contract.networks)[0];
      const address = contract.networks[networkId].address;
      const transactionHash = contract.networks[networkId].transactionHash;

      contractNetwork[address] = {
        address: address,
        abi: contract.abi,
        bytecode: contract.bytecode,
        transactionHash: transactionHash,
        name: contract.contractName || contract.name,
        contractName: contract.contractName || contract.name,
        type: DEPLOYED,
        network: {
          chainId: Number(networkId),
          name: selectNetworkName(networkId),
        },
      };
    }

    /* --- Custom Input : Smart Contract --- */
    if (contract.network) {
      contractNetwork[contract.address] = {
        address: contract.address,
        abi: contract.abi,
        bytecode: contract.bytecode,
        contractName: contract.name || contract.contractName,
        transactionHash: contract.transactionHash,
        name: contract.name || contract.contractName,
        type: DEPLOYED,
        network: contract.network,
      };
    }

    /* --- Factory : Smart Contract --- */
    if (networkId.length === 0 && !contract.address && contract.contractName) {
      contractLibrary[contract.contractName] = {
        abi: contract.abi,
        bytecode: contract.bytecode,
        contractName: contract.contractName,
        type: FACTORY,
      };
    }
  });

  return {
    ...initialState,
    contracts: {
      ...contractNetwork,
    },
    library: {
      ...contractLibrary,
    },
  };
};
