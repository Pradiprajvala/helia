
import React, { createContext, useContext, useReducer } from 'react'

const DataLayerContext = createContext()

const DataLayer = ({ initialState, reducer, children}) => {



  return (
    <DataLayerContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </DataLayerContext.Provider>
  )
}

export default DataLayer

export const DataLayerValue = () => useContext(DataLayerContext)