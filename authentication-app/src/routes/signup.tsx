import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/signup')({
  component: Signup,
})

type signUpForm = {
  email: string
  password: string
  role: string
  username: string
}

function Signup() {
  const { register, handleSubmit } = useForm<signUpForm>()

  const onSubmit = async (data: signUpForm) => {
    const res = await axios.post(
      'https://api.freeapi.app/api/v1/users/register',
      data,
    )
    console.log(res.data.data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[350px] bg-white border border-gray-200 rounded-2xl shadow-xl p-6 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">
          SignUp / <Link to="/login">Login</Link>
        </h1>

        <label className="flex flex-col text-sm font-medium">
          Username
          <input
            type="text"
            {...register('username')}
            className="mt-1 p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>

        <label className="flex flex-col text-sm font-medium">
          Email
          <input
            type="email"
            {...register('email')}
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

        <label className="flex flex-col text-sm font-medium">
          Role
          <input
            type="text"
            {...register('role')}
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

export default Signup
