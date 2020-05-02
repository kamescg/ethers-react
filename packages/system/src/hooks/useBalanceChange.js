/* --- Global --- */
import { useEffect, useState } from "react";
import { withEthers, utils } from "@ethers-react/system";

/* --- Effect --- */
export const useBalanceChange = address => {
  const ethers = withEthers();
  const [balance, setBalance] = useState({});

  /* --- Block Mind : Listen Event --- */
  useEffect(() => {
    if (address && ethers.provider) {
      ethers.provider.on(address, balanceBigNumber =>
        setBalance({
          number: balanceBigNumber,
          wei: balanceBigNumber.toString(),
          eth: utils.formatEther(balanceBigNumber),
          trimmed: utils.formatEther(balanceBigNumber).substring(0, 5)
        })
      );
    }
    return () => {
      if (ethers.provider) {
        ethers.provider.removeListener(address);
      }
    };
  }, [address, ethers.provider]);

  return balance;
};
