import React, { useContext, useState } from 'react'
import {FormContext} from './BmiContext'
import { IoIosRefreshCircle } from "react-icons/io";

function BmiWrapper() {
    const {data ,setData} = useContext(FormContext);
    const [calculate , setCalculate ] = useState(null);
    const [errors , setErrors ] = useState({});
    const [submittedData , setSubmittedData ] = useState({});

    const handleHeightChange =(e) => {
        const height = e.target.value ;
        setData({...data , height});
    }
    const handleWeightChange = (e) => {
        const weight = e.target.value ;
        setData({...data , weight});
    }

    const validateBmi = (data) => {
        const errors = {};
        if(!data.height){
            errors.height = 'Enter a height';
        }
        if(!data.weight){
            errors.weight = 'Weight is required';
        }
        return errors;
    }


    const handleCalculate = (e) => {
        e.preventDefault();
        const errors = validateBmi(data);
        if(errors && Object.keys(errors).length > 0){
            setErrors(errors);
        }else{
            const height = parseFloat(data.height);
            const weight = parseFloat(data.weight);
            if(height && weight) {
                const heightInMeters = height / 100;
                const bmi = weight / (heightInMeters * heightInMeters);
                setCalculate(bmi.toFixed(2)); // Calculate and store BMI
                setData({
                    height : '',
                    weight : ''
                })
            }
            setErrors({});
        }
    }

    const handleRefresh  = (e) => {
        setData({
            height:'',
            weight:''
        })
        setErrors({});
        setCalculate();
    }

  return (
    <div className="container  ">
        <div className="row justify-content-center text-center  rounded ">
            <div className='text-end'>
               <IoIosRefreshCircle 
               title='refresh' 
               className='ms-4 fw-bold' 
               size={40} 
               color='white' 
               onClick={handleRefresh}
               />
            </div>
            <div className='d-flex justify-content-center'>
            <h2 className="text-center  fw-bold ms-3 wrapper">
                bmi calculator
            </h2>
            </div>
            <div className="col-12  col-md-7 pt-1  pt-sm-4">
                <div className="d-flex flex-column align-items-center gap-2">
                    <label className='fw-bold '>Height :</label>
                    <label>
                     <input
                      type="number"
                      className=' w-75 rounded border border-2 border-dark fw-bold px-4 glass-morphism'
                      style={{height:'2.5rem'}}
                      value={data.height}
                      onChange={handleHeightChange}
                      />
                    </label>
                    <p className='mb-0'>(in cm)</p>
                    {errors.height && (
                        <span className='fw-bold text-danger'>
                            {errors.height}
                        </span>
                    )}
                </div>
            </div>
            <div className="col-12  col-md- pt-1  pt-sm-2">
                <div className="d-flex flex-column align-items-center gap-2">
                    <label className='fw-bold '>Weight :</label>
                    <label>
                     <input
                      type="number"
                      className=' w-75 rounded border border-2 border-dark fw-bold px-4 glass-morphism'
                      style={{height:'2.5rem'}}
                      value={data.weight}
                      onChange={handleWeightChange}
                      />
                    </label>
                    <p className='mb-0'>(in Kg)</p>
                    {errors.weight && (
                        <span className='fw-bold text-danger'>
                            {errors.weight}
                        </span>
                    )}
                </div>
            </div>
             <div className="col-12 col-md-7 pt-3 d-flex flex-column gap-3 align-items-center">
                <label className='fw-bold'>
                    Your BMI is :
                </label>
             <div 
              className="border border-3 border-dark rounded w-50 glass-morphism"
              style={{height:'9rem'}}
              >
               {calculate !== null && (
                    <span className='fw-bold'>
                        {calculate}
                    </span>
                )}
                 {calculate !== null && calculate >= 18.5 && calculate <= 24.9 && (
                        <div className='text-success fw-bold'>
                            Healthy weight range
                        </div>
                    )}
                    {calculate !== null && (calculate < 18.5 || calculate > 24.9) && (
                        <div className='text-danger fw-bold'>
                            BMI outside healthy range
                        </div>
                    )}
              </div>
               <button 
               className='btn btn-dark'
               onClick={handleCalculate}
               >
                   Calculate
               </button>
         </div>
        </div>
    </div>
  )
}

export default BmiWrapper