import React, { createContext, useState } from "react";

const FormContext = createContext();

const FormProvider = ({children}) => {
    const [data , setData ] = useState({
        weight: '',
        height: ''
    });

    return(
        <FormContext.Provider value={{data , setData}} >
            {children}
        </FormContext.Provider>
    );
};

export { FormProvider , FormContext };