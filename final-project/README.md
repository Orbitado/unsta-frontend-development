# 💰 Expense Tracker Application

A modern expense tracking application built with React, TypeScript, and Vite. This application helps users manage their daily expenses with a beautiful UI and persistent data storage.

## 🚀 Features

- ✨ Modern and responsive UI
- 📊 Track expenses by category
- 📅 Date-based expense logging
- 💾 Persistent data storage using JSON Server
- 🎨 Beautiful UI components with Tailwind CSS
- 📱 Mobile-friendly design

## 🛠️ Tech Stack

- **Frontend:**

  - React 19.1.0
  - TypeScript 5.8.3
  - Vite 6.3.5
  - Tailwind CSS 4.1.8
  - Radix UI Components

- **Backend:**
  - JSON Server (Local API)
  - Concurrently (Run multiple scripts)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (LTS version recommended)
- npm (comes with Node.js)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd final-project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development servers

You have two options to run the application:

#### Option A: Run everything with one command (Recommended)

```bash
npm run dev:full
```

This will start both the frontend and the JSON Server simultaneously.

#### Option B: Run servers separately

In terminal 1 (JSON Server - Backend):

```bash
npm run json-server
```

In terminal 2 (React App - Frontend):

```bash
npm run dev
```

### 4. Access the application

- Frontend: Open [http://localhost:5173](http://localhost:5173)
- API: [http://localhost:3001/expenses](http://localhost:3001/expenses)

## 📁 Project Structure

```
final-project/
├── src/
│   ├── modules/
│   │   └── expenses/
│   │       ├── services/    # API and business logic
│   │       ├── hooks/       # Custom React hooks
│   │       └── types/       # TypeScript interfaces
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utility functions
│   └── constants/           # Application constants
├── db.json                  # JSON Server database
└── package.json            # Project dependencies
```

## 🔄 API Endpoints

The application uses JSON Server to provide the following REST endpoints:

- `GET /expenses` - Get all expenses
- `POST /expenses` - Create a new expense
- `PUT /expenses/:id` - Update an expense
- `DELETE /expenses/:id` - Delete an expense

## 💻 Available Scripts

- `npm run dev` - Start the Vite development server
- `npm run json-server` - Start the JSON Server backend
- `npm run dev:full` - Run both frontend and backend simultaneously
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

## 📱 Features in Detail

### Expense Management

- Add new expenses with category, date, description, and amount
- Edit existing expenses
- Delete expenses
- View expense history in a table format

### Categories

Available expense categories:

- Almacén
- Transporte
- Gimnasio
- Entretenimiento
- Salud
- Educación
- Servicios
- Otros

## 🔒 Data Persistence

The application uses JSON Server to persist data in a `db.json` file. This means:

- Data survives page refreshes
- Multiple users can access the same data
- Data can be backed up by copying `db.json`

## 🎨 UI Components

The application uses a combination of:

- Radix UI for accessible components
- Tailwind CSS for styling
- Custom components for specific functionality

## 🐛 Common Troubleshooting

### Common Issues:

1. **"Error fetching expenses"**

   - Ensure JSON Server is running on port 3001
   - Check if `db.json` exists and is readable

2. **"Port already in use"**

   - Stop other local servers
   - Change port in package.json scripts

3. **"Cannot find module"**
   - Run `npm install` again
   - Clear npm cache: `npm cache clean --force`

## 🙋‍♂️ Author

Leonardo Juan Pablo Valdez - Full Stack Developer & Software Engineer at Wootic
