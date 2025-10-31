import mongoose from 'mongoose';

const timeSlotSchema = new mongoose.Schema({
    time: { type: String, required: true },
    available: { type: Number, required: true, default: 10 },
    booked: { type: Number, required: true, default: 0 }
});

const slotSchema = new mongoose.Schema({
    date: { type: String, required: true },
    times: [timeSlotSchema]
});

const experienceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    about: { type: String, required: true, default: 'Curated small-group experience. Certified guide. Safety first with gear included.' },
    category: { type: String, required: true, default: 'Adventure' },
    image: { type: String, required: true, default: 'https://via.placeholder.com/400x300' },
    minAge: { type: Number, required: true, default: 10 },
    slots: [slotSchema]
});

export const Experience = mongoose.model('Experience', experienceSchema);