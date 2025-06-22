import React, { useRef, useState } from 'react'
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
const AddItem = () => {
  const fileInputRef = useRef(null)
  const [preview, setPreview] = useState(null)
const url = 'http://localhost:4000'
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    category: Yup.string().required('Category is required'),
    price: Yup.number()
      .typeError('Price must be a number')
      .positive('Price must be positive')
      .required('Price is required'),
    image: Yup.mixed()
      .required('Image is required')
      .test('fileType', 'Unsupported file format', (value) => {
        return value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type)
      })
      .test('fileSize', 'File too large (max 2MB)', (value) => {
        return value && value.size <= 2 * 1024 * 1024
      })
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      category: '',
      price: '',
      image: null
    },
    validationSchema,
  onSubmit: async (values, { resetForm }) => {
  const formData = new FormData()
  formData.append('name', values.name)
  formData.append('description', values.description)
  formData.append('category', values.category)
  formData.append('price', values.price)
  formData.append('image', values.image)

  try {
    const response = await axios.post(`${url}/api/food/addfood`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (response.data.success) {
      resetForm()
      setPreview(null)
    
    } else {
      alert('Failed to add item!')
    }
    toast.success(response.data.message)
  } catch (error) {
    console.error(error)
    alert('An error occurred while submitting the form.')
  }
}
  })

  const handleImageClick = () => {
    fileInputRef.current.click()
  }

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0]
    formik.setFieldValue('image', file)
    if (file) {
      setPreview(URL.createObjectURL(file))
    }
  }

  return (
    <form onSubmit={formik.handleSubmit} className="w-1/2 flex flex-col gap-4 p-4">

      {/* Image Upload */}
      <div>
        <label className="block mb-1 font-medium">Upload Image</label>
        <div
          onClick={handleImageClick}
          className="w-40 h-40 bg-gray-100 border border-dashed border-gray-400 flex items-center justify-center cursor-pointer"
        >
          {preview ? (
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <img src={assets.upload_area} alt="Upload" className="w-full h-full object-cover" />
          )}
        </div>
        <input
          type="file"
          name="image"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
        {formik.touched.image && formik.errors.image && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.image}</div>
        )}
      </div>

      {/* Name */}
      <TextField
        label="Product Name"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />

      {/* Description */}
      <TextField
        multiline
        rows={4}
        label="Description"
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />

      {/* Category + Price */}
      <div className="flex gap-4">
        <FormControl fullWidth error={formik.touched.category && Boolean(formik.errors.category)}>
          <InputLabel>Product Category</InputLabel>
          <Select
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <MenuItem value="Salad">Salad</MenuItem>
            <MenuItem value="Rolls">Rolls</MenuItem>
            <MenuItem value="Deserts">Deserts</MenuItem>
            <MenuItem value="Sandwich">Sandwich</MenuItem>
             <MenuItem value="Cake">Cake</MenuItem>
            <MenuItem value="Pure Veg">Pure Veg</MenuItem>
            <MenuItem value="Pasta">Pasta</MenuItem>
            <MenuItem value="Noodles">Noodles</MenuItem>
          </Select>
          {formik.touched.category && formik.errors.category && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.category}</div>
          )}
        </FormControl>

        <TextField
          label="Price"
          name="price"
          type="number"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
        />
      </div>

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  )
}

export default AddItem
