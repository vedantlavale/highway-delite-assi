import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
    date: { type: String, required: true },
    timeSlots: { type: [String], required: true },
    available: { type: Number, required: true, default: 10 },
    booked :{ type: Number, required: true, default: 0 }
})


const experienceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location:{type: String, required: true},
    about: {type: String,default: 'Curated small-group experience. Certified guide. Safety first with gear included.'},
    category: { type: String, required: true, default: 'Adventure' },
    image: { type: String, required: true,default: 'https://via.placeholder.com/400x300' },
})

export const Experience = mongoose.model('Experience', experienceSchema);
export const Slot = mongoose.model('Slot', slotSchema);