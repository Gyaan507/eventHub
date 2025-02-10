"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import EventList from "../components/EventList"
import EventForm from "../components/EventForm"
import { fetchEvents, createEvent, updateEvent, deleteEvent } from "../services/eventService"

const Dashboard = () => {
  const { user } = useAuth()
  const [events, setEvents] = useState([])
  const [showEventForm, setShowEventForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    try {
      const fetchedEvents = await fetchEvents()
      setEvents(fetchedEvents)
    } catch (error) {
      console.error("Error fetching events:", error)
    }
  }

  const handleCreateEvent = async (eventData) => {
    try {
      await createEvent(eventData)
      setShowEventForm(false)
      loadEvents()
    } catch (error) {
      console.error("Error creating event:", error)
    }
  }

  const handleUpdateEvent = async (id, eventData) => {
    try {
      await updateEvent(id, eventData)
      setEditingEvent(null)
      loadEvents()
    } catch (error) {
      console.error("Error updating event:", error)
    }
  }

  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvent(id)
      loadEvents()
    } catch (error) {
      console.error("Error deleting event:", error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome, {user?.name}</h1>
      <button
        onClick={() => setShowEventForm(!showEventForm)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-8"
      >
        {showEventForm ? "Cancel" : "Create Event"}
      </button>
      {showEventForm && <EventForm onSubmit={handleCreateEvent} />}
      {editingEvent && (
        <EventForm
          onSubmit={(eventData) => handleUpdateEvent(editingEvent._id, eventData)}
          initialData={editingEvent}
          onCancel={() => setEditingEvent(null)}
        />
      )}
      <EventList events={events} onEdit={setEditingEvent} onDelete={handleDeleteEvent} />
    </div>
  )
}

export default Dashboard

