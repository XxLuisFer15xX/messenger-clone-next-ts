import { useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { AuthSocialButton, Button, TextInput } from '@components/atoms'

type Variant = 'LOGIN' | 'REGISTER'

export const AuthForm = () => {
  const router = useRouter()
  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [isLoading, setIsLoading] = useState(false)

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER')
    } else {
      setVariant('LOGIN')
    }
  }, [variant])

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    setIsLoading(true)
    try {
      if (variant === 'REGISTER') {
        await axios.post('/api/auth/register', data)
        toast.success('Logged in!')
        await signIn('credentials', { ...data })
      }
      if (variant === 'LOGIN') {
        const response = await signIn('credentials', {
          ...data,
          redirect: false,
        })
        if (response?.error) {
          toast.error('Invalid credentials')
        }
        if (response?.ok && !response?.error) {
          toast.success('Logged in!')
          router.push('/users')
        }
      }
    } catch (error) {
      toast.error('Something went wrong')
      console.log(error)
    }
    setIsLoading(false)
  }

  const socialAction = async (action: string) => {
    setIsLoading(true)
    const response = await signIn(action, { redirect: false })
    if (response?.error) {
      toast.error('Invalid credentials')
    }
    if (response?.ok && !response?.error) {
      toast.success('Logged in!')
    }
    setIsLoading(false)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && (
            <TextInput
              id="name"
              label="Name"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          <TextInput
            id="email"
            label="Email Address"
            type="email"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <TextInput
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          {variant === 'REGISTER' && (
            <TextInput
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          <div>
            <Button fullWidth type="submit">
              {variant === 'LOGIN' ? 'Sing in' : 'Register'}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction('github')}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction('google')}
            />
          </div>
          <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
            <div>
              {variant === 'LOGIN'
                ? 'New to Messenger?'
                : 'Already hava an account'}
            </div>
            <div onClick={toggleVariant} className="underline cursor-pointer">
              {variant === 'LOGIN'
                ? 'New to Messenger?'
                : 'Already hava an account'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
