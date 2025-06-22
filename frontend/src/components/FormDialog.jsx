import { Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, FormHelperText, TextField } from '@mui/material'
import { Formik, useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import * as Yup from 'yup';
import { assets } from '../assets/assets';
import axios from 'axios'
import Swal from 'sweetalert2';
import { StoreContext } from '../context/StoreContext';
const FormDialog = ({open , handleClose}) => {
  const [type , setType] = useState("Registration")
  return (
    <div>
      <Dialog open = {open}  PaperProps={{
    sx: { p: 2 , width : "450px", maxWidth : "90%"} // MUI's own styling system
  }} className='relative'>
  <DialogTitle >
   <p className='font-semibold text-2xl'>
    {type == "Registration"  ? 'Sign up' : 'Login'}
   </p>
  </DialogTitle>
  <DialogContent >
   {type == "Registration" ? <Registration handleClose = {handleClose}/> : <Login handleClose = {handleClose}/>}
     {type == "Registration" ?   <div className='mt-2'>
    Already have an account ? <button className='text-[tomato]' onClick={()=>setType("Login")}>Login here</button>
  </div> :   <div className='mt-2'>
   Create a new account ? <button className='text-[tomato]' onClick={()=>setType("Registration")}>Click here</button>
  </div>}
  </DialogContent>
  <img src={assets.cross_icon} alt=""  className='w-4 absolute top-8 right-8 cursor-pointer' onClick={handleClose} />
 
      </Dialog>
    </div>
  )
}
const Registration = ({handleClose})=>{
      const validationSchema = Yup.object({
        name : Yup.string().required("Name is required "),
        email : Yup.string().email('Invalid Email').required('Email is required'),
        password : Yup.string().min(8, ' Minimum 6 Characters').required('Password is required'),
        terms : Yup.bool().oneOf([true] , 'You must accept the terms' )
    })
    const formik = useFormik({
        initialValues : {
            name : '',
            email : '' , 
            password : '',
            terms : false
        },
        validationSchema : validationSchema,
       onSubmit : async(values , {resetForm}) => {
  try {
    const response = await axios.post('https://food-delivery-4z3h.onrender.com/api/user/register', {
      name: values.name,
      email: values.email,
      password: values.password
    });

    if (response.data.success) {
      resetForm();
      await Swal.fire({
        title: "Registration Successful",
        text: "You have been registered",
        icon: "success",
      
      });
      handleClose(); // 🔥 SweetAlert ke baad close
    } else {
      await Swal.fire({
        title: "Warning",
        text: response.data.message,
        icon: "warning",
       
      });
    }

  } catch (err) {
    resetForm();
    await Swal.fire({
      title: "Registration Failed",
      text: err.response?.data?.message || "Something went wrong",
      icon: "error",
    
    });
  }
}

    })
    return(
        <form onSubmit={formik.handleSubmit} className='flex flex-col gap-4'>
       <TextField fullWidth name='name' placeholder='Enter your name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} error = {formik.touched.name && Boolean(formik.errors.name)} helperText = {formik.touched.name&& formik.errors.name}/>
       <TextField fullWidth name='email' placeholder='Enter your email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} error = {formik.touched.email && Boolean(formik.errors.email)} helperText = {formik.touched.email&& formik.errors.email}/>
        <TextField fullWidth name='password' placeholder='Enter your password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} error = {formik.touched.password && Boolean(formik.errors.password)} helperText = {formik.touched.password&& formik.errors.password}/>
       <button type='submit'  className='w-full py-2 bg-[tomato] text-white'>
Create account
       </button>

       <FormControlLabel
  control={
    <Checkbox
      name="terms"
      checked={formik.values.terms}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      color="primary"
    />
  }
   label={
    <span className="text-sm">By continuing, you agree to our Terms and Conditions</span>
  }
  
/>
{formik.touched.terms && formik.errors.terms && (
  <FormHelperText error>{formik.errors.terms}</FormHelperText>
)}
      </form>
    )
}
const Login = ({handleClose})=>{
  const {setToken} = useContext(StoreContext)
     const validationSchema = Yup.object({
    
        email : Yup.string().email('Invalid Email').required('Email is required'),
        password : Yup.string().min(8, ' Minimum 6 Characters').required('Password is required'),
        terms : Yup.bool().oneOf([true] , 'You must accept the terms' )
    })
    const formik = useFormik({
        initialValues : {
           
            email : '' , 
            password : '',
            terms : false
        },
        validationSchema : validationSchema,
       onSubmit : async(values , {resetForm}) => {
  try {
    const response = await axios.post("https://food-delivery-4z3h.onrender.com/api/user/login", {
      email: values.email,
      password: values.password
    });

    if (response.data.success) {
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token)
      resetForm();
      await Swal.fire({
        title: "Login Successful",
        text: response.data.message,
        icon: "success",
      });
     
      handleClose(); // 🔥 after Swal
    } else {
      await Swal.fire({
        title: "Login Failed",
        text: response.data.message,
        icon: "warning",
       
      });
    }

  } catch (err) {
    await Swal.fire({
      title: "Error",
      text: err.response?.data?.message || "Something went wrong",
      icon: "error",
     
    });
  }
}

    })
    return(
        <form onSubmit={formik.handleSubmit} className='flex flex-col gap-4'>
       
       <TextField fullWidth name='email' placeholder='Enter your email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} error = {formik.touched.email && Boolean(formik.errors.email)} helperText = {formik.touched.email&& formik.errors.email}/>
        <TextField fullWidth name='password' placeholder='Enter your password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} error = {formik.touched.password && Boolean(formik.errors.password)} helperText = {formik.touched.password&& formik.errors.password}/>
       <button type='submit'  className='w-full py-2 bg-[tomato] text-white'>
Login
       </button>

       <FormControlLabel
  control={
    <Checkbox
      name="terms"
      checked={formik.values.terms}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      color="primary"
    />
  }
   label={
    <span className="text-sm">By continuing, you agree to our Terms and Conditions</span>
  }
  
/>
{formik.touched.terms && formik.errors.terms && (
  <FormHelperText error>{formik.errors.terms}</FormHelperText>
)}
      </form>
    )
}
export default FormDialog
