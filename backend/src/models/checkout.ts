import mongoose from "mongoose";


const checkoutSchema = new mongoose.Schema({
    experienceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Experience', required: true },
    experienceTitle: { type: String, required: true },
    date:{ type: String, required: true},
    time:{ type: String, required: true},
    quantity: { type: Number, required: true, min: 1 },
    subtotal: { type: Number, required: true },
    taxes: { type: Number, required: true },
    total: { type: Number, required: true },
    userEmail: { type: String, required: true },
    bookedAt: { type: Date, default: Date.now },
    promocode: { type: String, default: null },
    fullName: { type: String, required: true },
    discount: { type: Number, default: 0 },
    bookingref: { type: String, required: true, unique: true },
    bookingStatus: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' },
}, { timestamps: true });


checkoutSchema.index({ email: 1, experienceId: 1, date: 1, time: 1 });

export const Checkout = mongoose.model('Checkout', checkoutSchema);