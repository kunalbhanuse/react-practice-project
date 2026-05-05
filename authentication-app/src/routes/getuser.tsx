import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/getuser')({
  component: GetUser,
})

type responseData = {
  _id: string
  avatar: {
    url: string
    localPath: string
    _id: string
  }
  username: string
  email: string
  role: string
  loginType: string
  isEmailVerified: boolean
  createdAt: string
  updatedAt: string
}

function GetUser() {
  const navigate = useNavigate()
  const [user, setUser] = useState<responseData>()
  useEffect(() => {
    const featchUser = async () => {
      const res = await axios.get(
        'https://api.freeapi.app/api/v1/users/current-user',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        },
      )
      console.log(res.data.data)
      setUser(res.data.data)
    }
    featchUser()
  }, [])
  const logoutUser = async () => {
    const res = await axios.post(
      'https://api.freeapi.app/api/v1/users/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    )
    console.log(res)
    localStorage.removeItem('accessToken')
    navigate({ to: '/login' })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-[350px] bg-white border border-gray-200 rounded-2xl shadow-xl p-6 space-y-4 text-center">
        {user ? (
          <>
            <img
              src={user.avatar.url}
              alt="avatar"
              className="w-20 h-20 rounded-full mx-auto"
            />

            <h1 className="text-xl font-bold">{user.username}</h1>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-400">{user.role}</p>

            <button onClick={logoutUser}>Logout</button>
          </>
        ) : (
          <p className="text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  )
}
