"use client"

import { createContext, useState, useContext, useEffect } from "react"
import axios from "axios"

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setUser(JSON.parse(localStorage.getItem("user")))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password })
      const { token, user } = response.data
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      setUser(user)
      return user
    } catch (error) {
      console.error("Login error:", error.response?.data?.message || error.message)
      throw error
    }
  }

  const register = async (name, email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", { name, email, password })
      const { token, user } = response.data
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      setUser(user)
      return user
    } catch (error) {
      console.error("Registration error:", error.response?.data?.message || error.message)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
  }

  const value = {
    user,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

