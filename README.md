# Highway Delite

A full-stack web application for booking adventure experiences. Users can browse, search, and book thrilling activities like hiking, rafting, and more.

## 🚀 Live Demo

- **Frontend**: [https://highway-delite-assi.vercel.app](https://highway-delite-assi.vercel.app)
- **Backend API**: [https://highway-delite-assi.onrender.com](https://highway-delite-assi.onrender.com)

## ✨ Features

- **Experience Browsing**: Paginated list of adventure experiences with search functionality
- **Detailed Experience Pages**: View full details, availability, and pricing for each experience
- **Booking System**: Secure booking with promo code validation and email confirmations
- **User Dashboard**: View past bookings by email
- **Responsive Design**: Mobile-friendly UI built with React and Tailwind CSS
- **Real-time Availability**: Check slots and availability before booking

## 🛠 Tech Stack

### Backend
- **Runtime**: Bun
- **Framework**: Express.js
- **Database**: MongoDB (Atlas)
- **Language**: TypeScript
- **Validation**: Zod
- **Authentication**: JWT (for future features)
- **CORS**: Configured for cross-origin requests

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Routing**: React Router
- **HTTP Client**: Axios
- **Validation**: Zod

## 💾 Caching in Frontend

The frontend implements several caching strategies to improve performance and user experience:

### Browser Caching
- **Static Assets**: Images, CSS, and JavaScript files are cached using appropriate HTTP headers
- **Service Worker**: Implements caching for offline functionality and faster subsequent loads
- **Local Storage**: User preferences and non-sensitive data are stored locally

### API Response Caching
- **In-Memory Caching**: Frequently accessed data like experience lists are cached in memory using React's state management
- **HTTP Caching**: Axios interceptors handle conditional requests and cache headers
- **Background Refresh**: Stale data is refreshed in the background while serving cached content to users

### Implementation Details
- **Cache Keys**: Based on URL and request parameters for efficient lookups
- **Cache Invalidation**: Automatic invalidation on data mutations (e.g., after booking)
- **Error Handling**: Graceful fallbacks to cached data when network requests fail
- **Performance Monitoring**: Cache hit/miss ratios are tracked for optimization

## 📦 Installation

### Prerequisites
- Node.js 18+ or Bun
- MongoDB Atlas account (for database)

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/vedantlavale/highway-delite-assi.git
   cd highway-delite-assi/backend
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Create a `.env` file in the `backend/` directory:
   ```env
   MONGO_URI=your_mongodb_atlas_connection_string
   PORT=3000
   ```

4. Start the development server:
   ```bash
   bun run start
   ```

The backend will run on `http://localhost:3000`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Create a `.env` file in the `frontend/` directory:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

4. Start the development server:
   ```bash
   bun run dev
   ```

The frontend will run on `http://localhost:5173`.

## 🚀 Deployment

### Backend (Render)
1. Connect your GitHub repository to Render
2. Set the build settings:
   - **Build Command**: `bun run build`
   - **Install Command**: `bun install`
   - **Start Command**: `bun index.ts`
3. Add environment variables in Render dashboard:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `PORT`: 10000 (or Render's assigned port)

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Vite and build settings
3. Add environment variable:
   - `VITE_API_URL`: `https://highway-delite-assi.onrender.com/api`

## 📁 Project Structure

```
highway-delite-assi/
├── backend/
│   ├── index.ts              # Main server file
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── controller/       # Route handlers
│       ├── db/               # Database connection
│       ├── models/           # Mongoose schemas
│       └── routes/           # API routes
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── src/
│       ├── components/       # React components
│       ├── lib/              # Utilities and API client
│       └── assets/           # Static assets
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Vedant Lavale**
- GitHub: [@vedantlavale](https://github.com/vedantlavale)

---

Built with ❤️ using modern web technologies.