import type { FC, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';

export const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
      {/* <PersistGate persistor={persistor}>{children}</PersistGate> */}
    </Provider>
  );
};
