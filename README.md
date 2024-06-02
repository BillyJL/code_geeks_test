# Event Management System

## Overview

The Event Management System (EMS) is a full-featured event management system that allows users to create, view, update, and delete events. It also includes an event recommendation algorithm.

## Technologies

- **Frontend**: Next.js, Material UI, React Google Maps API
- **Backend**: NestJS, TypeORM, PostgreSQL
- **Database**: PostgreSQL

## Setup Instructions

### Requirements

- Node.js
- npm
- PostgreSQL

### Backend Setup

1. Navigate to the `backend` directory:

   ```bash
   cd backend
2. Install dependencies:
    ```bash
    npm install
3. Create a .env file in the backend directory and add the following environment variables:
    ```env
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=your_db_username
    DB_PASSWORD=your_db_password
    DB_DATABASE=your_db_name
4. Start the server:
    ```bash
    npm start
### Frontend Setup
1. Navigate to the `frontend` directory:

   ```bash
   cd frontend
2. Install dependencies:
    ```bash
    npm install
3. Create a .env file in the backend directory and add the following environment variables:
    ```env
    API_URL=http://localhost:3001
    GOOGLE_MAP_API_KEY=your_google_maps_api_key
4. Start the server:
    ```bash
    npm run dev
## Usage

### Creating an Event

1. Navigate to the main page.
2. Click the "Create New Event" button.
3. Fill out the form and click "Submit".

### Viewing an Event

1. Navigate to the main page.
2. Click on an event card to view its details.

### Updating an Event

1. Navigate to the event details page.
2. Click the "Edit" button.
3. Make changes and click "Submit".

### Deleting an Event

1. Navigate to the event details page.
2. Click the "Delete" button.
3. Confirm the deletion in the confirmation dialog.

## Solution Overview

### Frontend

- **EventListPage**: Displays a list of events, including sorting and filtering options, and allows creating new events.
- **EventDetailsPage**: Shows detailed information about an event, including similar events based on categories.
- **EventForm**: A form for creating and editing events.
- **MapView**: Integration with Google Maps API to display events on a map.

### Backend

- **EventsController**: Controller for managing events (CRUD operations).
- **EventsService**: Service for handling business logic related to events.
- **EventEntity**: Database schema for events.
- **RecommendationAlgorithm**: Simple algorithm for recommending similar events based on category.

## Author

Taras Mikulskyi
