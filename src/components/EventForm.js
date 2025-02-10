"use client"

import { useState } from "react"

const EventForm = ({ onSubmit }) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ name, description, date })
    setName("")
    setDescription("")
    setDate("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div>
        <label htmlFor="name" className="block mb-1">
          Event Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="description" className="block mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="date" className="block mb-1">
          Date
        </label>
        <input
          type="datetime-local"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Create Event
      </button>
    </form>
  )
}

export default EventForm

