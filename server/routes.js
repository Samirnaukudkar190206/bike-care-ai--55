import { Router } from 'express';
import { diagnoseSymptom } from './diagnose.js';
import { bikesData } from './data/bikes.js';

const router = Router();

// In-memory persistent collections (preloaded with sample confirmed booking)
let bookings = [
  {
    id: 1,
    reference: "BC-FSAB5P",
    bikeId: "ktm-duke-390",
    bikeName: "KTM 390 Duke",
    name: "Samir Naukudkar",
    email: "samiruttamnaukudkar190206@gmail.com",
    phone: "9529987734",
    service: "Pre-ride inspection",
    preferredDate: new Date().toISOString().split("T")[0],
    preferredTime: "Morning – 8:00–11:00",
    notes: null,
    status: "confirmed",
    receiptStatus: "queued",
    createdAt: new Date().toISOString()
  }
];

let contactMessages = [];
let nextBookingId = 2;

// 1. GET /api/bikes
router.get('/bikes', (req, res) => {
  res.json(bikesData);
});

// 2. POST /api/diagnose
router.post('/diagnose', (req, res) => {
  const { bikeId, customBikeName, issue } = req.body || {};

  if (!bikeId || typeof issue !== 'string' || issue.trim().length < 3) {
    return res.status(400).json({ error: "Please provide a valid bike and issue description." });
  }

  const result = diagnoseSymptom(bikeId, customBikeName, issue);
  res.json(result);
});

// 3. GET /api/insights
router.get('/insights', (req, res) => {
  res.json({
    bookingsThisMonth: Math.max(1, bookings.length),
    averageRating: 4.9,
    bikesSupported: bikesData.length,
    responseTime: "< 15 min"
  });
});

// 4. GET /api/bookings
router.get('/bookings', (req, res) => {
  res.json(bookings);
});

// 5. GET /api/bookings/:id
router.get('/bookings/:id', (req, res) => {
  const idOrRef = req.params.id;
  const booking = bookings.find(
    b => b.id === Number(idOrRef) || b.reference.toUpperCase() === idOrRef.toUpperCase()
  );

  if (!booking) {
    return res.status(404).json({ error: "Booking not found" });
  }

  res.json(booking);
});

// 6. POST /api/bookings
router.post('/bookings', (req, res) => {
  const {
    bikeId,
    customBikeName,
    name,
    email,
    phone,
    service,
    preferredDate,
    preferredTime,
    notes
  } = req.body || {};

  if (!bikeId || !name || !email || !phone || !preferredDate) {
    return res.status(400).json({ error: "All required fields must be filled." });
  }

  let bikeName = customBikeName || "Motorcycle";
  if (bikeId !== 'other') {
    const matchedBike = bikesData.find(b => b.id === bikeId);
    if (matchedBike) {
      bikeName = `${matchedBike.brand} ${matchedBike.model}`;
    }
  }

  // Generate 6-char random alphanumeric reference: e.g. BC-GIV9RO
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomCode = "";
  for (let i = 0; i < 6; i++) {
    randomCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const reference = `BC-${randomCode}`;

  const newBooking = {
    id: nextBookingId++,
    reference,
    bikeId,
    bikeName,
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    service: service || "Routine service",
    preferredDate,
    preferredTime: preferredTime || "Morning – 8:00–11:00",
    notes: notes ? notes.trim() : null,
    status: "confirmed",
    receiptStatus: "confirmed",
    createdAt: new Date().toISOString()
  };

  bookings.unshift(newBooking);
  res.status(201).json(newBooking);
});

// 7. POST /api/contact
router.post('/contact', (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message || message.trim().length < 5) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  const newMessage = {
    id: contactMessages.length + 1,
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    createdAt: new Date().toISOString()
  };

  contactMessages.push(newMessage);
  res.status(201).json(newMessage);
});

export default router;
