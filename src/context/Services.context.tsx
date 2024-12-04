import React, { createContext, useContext, ReactNode } from 'react';
import {
  chatService,
  httpService,
  storageService,
  userService,
} from '../services';

interface ServiceContextType {
  http: typeof httpService;
  storageService: typeof storageService;
  userService: typeof userService;
  chatService: typeof chatService;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const ServiceProvider = ({ children }: { children: ReactNode }) => {
  const services: ServiceContextType = {
    http: httpService,
    storageService: storageService,
    userService: userService,
    chatService: chatService,
  };

  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useServices = (): ServiceContextType => {
  const context = useContext(ServiceContext);

  if (!context) {
    throw new Error('useServices must be used within a ServiceProvider');
  }

  return context;
};
