import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: Login,
})

type LoginForm = {
  password: string
  username: string
}

function Login() {
  const navigation = useNavigate()
  const { register, handleSubmit, reset } = useForm<LoginForm>()

  const onsubmit = async (data: LoginForm) => {
    const res = await axios.post(
      'https://api.freeapi.app/api/v1/users/login',
      data,
    )
    const user = res.data.data
    const accessToken = res.data.data.accessToken
    const refreshToken = res.data.data.refreshToken

    localStorage.setItem('accessToken', accessToken)
    alert('login success')
    navigation({ to: '/getuser' })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="w-[350px] bg-white border border-gray-200 rounded-2xl shadow-xl p-6 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <label className="flex flex-col text-sm font-medium">
          Username
          <input
            type="text"
            {...register('username')}
            className="mt-1 p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>
        <label className="flex flex-col text-sm font-medium">
          Password
          <input
            type="password"
            {...register('password')}
            className="mt-1 p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Login
