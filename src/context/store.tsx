import React, { createContext, useReducer } from 'react';
import reducer from './reducers';

const initialState = {
  account: {},
};

export const Context = createContext(initialState);

export interface IStoreProps {
  children: JSX.Element;
}

export default function Store({ children }: IStoreProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    // @ts-ignore
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  );
}
