const express = require("express")
const Event = require("../models/Event")
const auth = require("../middleware/auth")

const router = express.Router()

// Create a new event
router.post("/", auth, async (req, res) => {
  try {
    const { name, description, date } = req.body
    const event = new Event({
      name,
      description,
      date,
      createdBy: req.user.userId,
    })
    await event.save()
    res.status(201).json(event)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Get all events for the logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user.userId })
    res.json(events)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Get a single event
router.get("/:id", auth, async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id, createdBy: req.user.userId })
    if (!event) {
      return res.status(404).json({ message: "Event not found" })
    }
    res.json(event)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Update an event
router.put("/:id", auth, async (req, res) => {
  try {
    const { name, description, date } = req.body
    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.userId },
      { name, description, date },
      { new: true },
    )
    if (!event) {
      return res.status(404).json({ message: "Event not found" })
    }
    res.json(event)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Delete an event
router.delete("/:id", auth, async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({ _id: req.params.id, createdBy: req.user.userId })
    if (!event) {
      return res.status(404).json({ message: "Event not found" })
    }
    res.json({ message: "Event deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router

