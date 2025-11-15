# Sri Lanka Tourism - Admin Panel

Admin panel for managing Sri Lanka Tourism application.

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool
- **React Router** - Routing

## Project Structure

```
admin/
├── src/
│   ├── components/
│   │   ├── AdminLayout.jsx    # Main layout wrapper
│   │   ├── Sidebar.jsx        # Sidebar navigation
│   │   └── Header.jsx         # Top header
│   ├── pages/
│   │   ├── Dashboard.jsx      # Dashboard page
│   │   └── Login.jsx          # Login page
│   ├── App.jsx                # Main app component
│   ├── App.css                # App styles
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Installation

1. Install dependencies:
```bash
npm install
# or
pnpm install
```

## Running the Application

### Development Mode
```bash
npm run dev
```

The admin panel will run on `http://localhost:5174` (different port from frontend)

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Features

- Dashboard with statistics
- Sidebar navigation
- Login page
- Responsive design
- Ready for backend integration

## TODO

- [ ] Connect to backend API
- [ ] Implement authentication
- [ ] Add Tours management page
- [ ] Add Hotels management page
- [ ] Add Transports management page
- [ ] Add Restaurants management page
- [ ] Add Users management page
- [ ] Add Bookings management page
- [ ] Add Settings page
- [ ] Implement CRUD operations
- [ ] Add form validation
- [ ] Add image upload functionality

