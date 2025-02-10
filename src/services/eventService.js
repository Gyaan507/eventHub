import axios from "axios"

const API_URL = "http://localhost:5000/api"

const getToken = () => localStorage.getItem("token")

export const fetchEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/events`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    return response.data
  } catch (error) {
    console.error("Error fetching events:", error)
    throw error
  }
}

export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(`${API_URL}/events`, eventData, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    return response.data
  } catch (error) {
    console.error("Error creating event:", error)
    throw error
  }
}

export const updateEvent = async (id, eventData) => {
  try {
    const response = await axios.put(`${API_URL}/events/${id}`, eventData, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    return response.data
  } catch (error) {
    console.error("Error updating event:", error)
    throw error
  }
}

export const deleteEvent = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/events/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    return response.data
  } catch (error) {
    console.error("Error deleting event:", error)
    throw error
  }
}

