
import { Button, Input } from '@heroui/react'
import { useMutation } from '@tanstack/react-query'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { LoginApi} from '../Service/Auth'
import { AuthContext } from '../context/AuthContext'

export default function Login() {
  const [errMsg, setErrMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
    const { setIsLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate();
  const { handleSubmit, register, formState: { errors }, reset } = useForm({
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const { mutate, isPending } = useMutation({
    mutationKey: ['Login'],
    mutationFn: (formData) => LoginApi(formData),
    onSuccess: (data) => {
      reset();
      localStorage.setItem('token' , data.token)
      setSuccessMsg(data.msg)
      setIsLoggedIn(true);
      navigate('/')
    //   console.log(data.user);
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
    
    
    <form onSubmit={handleSubmit(handleRegister)} className=''>
      <div className='flex flex-col gap-3 xl:gap-6'>
        <h1 className='text-[#1ebbcc] text-center'>Login To Note</h1>

        
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

    

        <Button type='submit' isLoading={isPending} className='text-[#1ebbcc] border border-[#1ebbcc]' variant="bordered">
          Login
        </Button>

        <p>Don't Have Account? <Link to='/register' className='text-[#1ebbcc] font-bold cursor-pointer'>Register now</Link></p>

        {errMsg && <p className='p-2 bg-red-200 text-red-700 text-sm text-center capitalize rounded'>{errMsg}</p>}
        {successMsg && <p className='p-2 bg-green-200 text-green-700 text-sm text-center capitalize rounded'>{successMsg}</p>}
      </div>
    </form>
    
    </>
  )
}
