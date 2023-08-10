import React from "react";

interface BootstrapContextValue {
  bootstrap4: boolean;
}

export const BootstrapContext = React.createContext<BootstrapContextValue>({
  bootstrap4: false
});
