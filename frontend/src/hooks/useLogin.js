import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))
      console.log("json: ", json)
      // update the auth context with the rolea and email
      dispatch({ type: 'LOGIN', payload: { ...json, role: json.role, email: json.email } })
      // log email and role
      console.log("email: ", json.email)
      console.log("role: ", json.role)


      // update loading state
      setIsLoading(false)
    }
  }

  return { login, isLoading, error }
}