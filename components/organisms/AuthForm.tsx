import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { AuthSocialButton, Button, TextInput } from '@components/atoms'
import { BsGithub, BsGoogle } from 'react-icons/bs'

type Variant = 'LOGIN' | 'REGISTER'

export const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [isLoading, setIsLoading] = useState(false)

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER')
    } else {
      setVariant('LOGIN')
    }
  }, [variant])

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true)
    if (variant === 'REGISTER') {
    }
    if (variant === 'LOGIN') {
    }
    setIsLoading(false)
  }

  const socialAction = (action: string) => {
    setIsLoading(true)

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
              type="confirmPassword"
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
              onClick={() => socialAction('Github')}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction('Google')}
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
