/**
 * @function useSelectEnabledStatus
 */

/* --- Global --- */
import { useState, useEffect } from "react";

/* --- Effect --- */
export const useSelectEnabledStatus = state => {
  const [isEnabled, setEnabled] = useState(false);
  const [isEnableRequested, setIsEnableRequested] = useState(false);

  useEffect(() => {
    if (state.isEnableRequested) setIsEnableRequested(true);
  }, [state.isEnableRequested]);

  useEffect(() => {
    if (state.isEnableSuccess) setEnabled(true);
  }, [state.isEnableSuccess]);

  return {
    ready: isEnabled,
    requested: isEnableRequested
  };
};
