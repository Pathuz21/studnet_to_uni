# Student to University Connector

A full-stack web application connecting students with universities worldwide, featuring AI-powered matching and comprehensive university information.

## Features

- 🔍 AI-Powered University Matching
- 👥 Student & Alumni Community
- 💰 Scholarship & Financial Aid Finder
- 🏫 Virtual University Tours
- 📊 Application Progress Tracker
- 🤖 AI Chatbot for Admission Guidance
- 💼 Internship & Placement Opportunities
- ⭐ Review & Rating System
- 🏫 Attend different collage events or get update about different collage events like coding etc
- 🌐 Multilingual Support

## Tech Stack

### Frontend
- Next.js 14
- React
- Tailwind CSS
- i18n for internationalization
- Three.js for 3D tours
- Redux Toolkit for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- OpenAI API for AI features
- Socket.io for real-time features

## Project Structure

```
student_to_uni/
├── frontend/           # Next.js frontend application
├── backend/           # Express.js backend server
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/student_to_uni.git
cd student_to_uni
```

2. Install Frontend Dependencies:
```bash
cd frontend
npm install
```

3. Install Backend Dependencies:
```bash
cd ../backend
npm install
```

4. Set up environment variables:
- Create `.env` files in both frontend and backend directories
- Copy the example environment variables from `.env.example`

5. Start the development servers:

Frontend:
```bash
cd frontend
npm run dev
```

Backend:
```bash
cd backend
npm run dev
```

## Environment Variables

### Frontend (.env)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 