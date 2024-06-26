import React from 'react'
import './App.css'
import {FormProvider} from './components/BmiContext'
import BmiWrapper from './components/BmiWrapper'

function App() {
  return (
    <div className='conatiner'>
      <div className='row text-center justify-content-center bg-img'>
        <div className='col-12 col-md-6 border-light rounded glass-morphism'>
          <FormProvider>
            <BmiWrapper />
          </FormProvider>
        </div>
      </div>
     
    </div>
  )
}

export default App

