/* --- Global --- */
import { useEffect, useState } from "react";
import { withEthers } from "@ethers-react/system";

/* --- Effect --- */
export const useBalanceChange = (provider, adrs) => {
  const ethers = withEthers();
  const [address, setAddress] = useState(adrs);
  const [balance, setBalance] = useState({});

  /* --- Block Mind : Listen Event --- */
  useEffect(() => {
    if (address && ethers.provider) {
      ethers.provider.on(address, balanceBigNumber =>
        setBalance({
          number: balanceBigNumber,
          wei: balanceBigNumber.toString(),
          eth: ethers.instance.utils.formatEther(balanceBigNumber),
          trimmed: ethers.instance.utils
            .formatEther(balanceBigNumber)
            .substring(0, 5)
        })
      );
    }
    return () => {
      if (ethers.provider) {
        ethers.provider.removeListener(address);
      }
    };
  }, [ethers.provider]);

  return {
    address,
    balance,
    setAddress
  };
};
