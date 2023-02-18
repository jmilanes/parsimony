import React, { ReactNode } from "react";
import { Services } from "../services/app.service";

const ServicesContext = React.createContext<Services | null>(null);

export const createServicesProvider =
  (services: any) =>
  ({ children }: { children: ReactNode }) => {
    return (
      <ServicesContext.Provider value={services}>
        {children}
      </ServicesContext.Provider>
    );
  };

export const useServices = (): Services => {
  const context = React.useContext(ServicesContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context as Services;
};
