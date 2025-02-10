const EventList = ({ events }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <div key={event._id} className="border rounded p-4">
          <h2 className="text-xl font-bold mb-2">{event.name}</h2>
          <p className="mb-2">{event.description}</p>
          <p className="mb-2">Date: {new Date(event.date).toLocaleDateString()}</p>
          <p className="mb-2">Attendees: {event.attendees?.length || 0}</p>
        </div>
      ))}
    </div>
  )
}

export default EventList

