import { Button, Input } from '@heroui/react'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { RegisterApi } from '../Service/Auth'

export default function Register() {
  const [errMsg, setErrMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const navigate = useNavigate()
  const { handleSubmit, register, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: ""
    }
  })

  const { mutate, isPending } = useMutation({
    mutationKey: ['register'],
    mutationFn: (formData) => RegisterApi(formData),
    onSuccess: (data) => {
      reset();
      setSuccessMsg(data.msg)
       localStorage.setItem("userId", data.user._id);
      console.log(data.user);
      setTimeout(()=>{
        navigate('/login');
      },5000)
    },
    onError: (error) => {
      const msg = error.response?.data?.error || error.message || "Something went wrong";
      setErrMsg(msg);
    }
  });

  function handleRegister(formData) {
    setErrMsg('');
    setSuccessMsg('');
    mutate(formData);
  }

  return (
    <>
    
    
    <form onSubmit={handleSubmit(handleRegister)}>
      <div className='flex flex-col gap-6'>
        <h1 className='text-[#1ebbcc] text-center'>Register To Note</h1>

        <Input label="Name" {...register('name', { required: "Name is required" })}
          isInvalid={Boolean(errors?.name?.message)}
          errorMessage={errors?.name?.message}
          variant='bordered'
        />
        
        <Input label="Email" type="email" {...register('email', { required: "Email is required" })}
          isInvalid={Boolean(errors?.email?.message)}
          errorMessage={errors?.email?.message}
          variant='bordered'
        />

        <Input label="Password" type="password" {...register('password', { required: "Password is required" })}
          isInvalid={Boolean(errors?.password?.message)}
          errorMessage={errors?.password?.message}
          variant='bordered'
        />

        <Input label="Age" type="number" {...register('age', { required: "Age is required" })}
          isInvalid={Boolean(errors?.age?.message)}
          errorMessage={errors?.age?.message}
          variant='bordered'
        />

        <Input label="Phone" type="number" {...register('phone', { required: "Phone is required" })}
          isInvalid={Boolean(errors?.phone?.message)}
          errorMessage={errors?.phone?.message}
          variant='bordered'
        />

        <Button type='submit' isLoading={isPending} className='border text-[#1ebbcc] border-[#1ebbcc]' variant="bordered">
          Register
        </Button>

        <p>Already Have Account? <Link to='/login' className='text-[#1ebbcc] font-bold cursor-pointer'>Login now</Link></p>

        {errMsg && <p className='p-2 bg-red-200 text-red-700 text-sm text-center capitalize rounded'>{errMsg}</p>}
        {successMsg && <p className='p-2 bg-green-200 text-green-700 text-sm text-center capitalize rounded'>{successMsg}</p>}
      </div>
    </form>
    
    </>
  )
}
