# TMDB API PROJECT

# Introduction

This application is built using React and TypeScript to fetch and display data from the TMDB API. It utilizes Vite as a bundler, MySQL for the backend database, Firebase for authentication, and Nodemon for efficient backend development.

## Installation

1. **Clone the repository** :

   ```bash
   git clone [https://github.com/your-username/your-repo-name.git](https://github.com/S-boudjemai/tmdb-project-perso.git)
   cd your-repo-name

   ```

2. **Install dependencies** :

npm install

3. **Set up environment variables** :

   - Create a `.env` file in the root directory and add the following :

VITE_DB_PASSWORD=your_db_password
VITE_API_KEY=your_api_key

4. **Start the development serverr** :

npm run dev

5. **Run the backend server** :

nodemon src/server.ts

## Usage

1. **Access the application**:

   - Open your browser and go to `http://localhost:5173` to view the app.

2. **Login and Authentication**:

   - Use the Firebase authentication to log in to the app.

3. **Explore Movies**:

   - Search for movies using the search bar.
   - View detailed information about each movie, including ratings and reviews.

4. **Manage Favorites**:
   - Add movies to your favorites list for quick access later.

## Project Structure

- **`src/`**: Contains all the frontend React code.
  **`assets/`**: Static assets like images, icons, etc.
  - **`components/`**: Reusable React components.
  - **`pages/`**: Different pages or views of the application.
  - **`utils/`**: Utility functions and helpers.
  - **`Types/`**: TypeScript interfaces and types.
  - **`contexts/`**: Context providers for global state management (e.g., authentication, theme).
  - **`firebase/`**: Firebase configuration and initialization (e.g., authentication, Firestore).
  - **`pages/`**: Different pages or views of the application.
- **`backend/`**: Contains all the backend code.
- **`src/`**: Source files for the backend.
- **`routes/`**: API routes.
- **`config/`**: Configuration files (e.g., database).
- **`db.ts`**: Database connection and configuration.

## Scripts

Here are some of the key scripts you can run:

- **`npm run dev`**: Starts the development server with hot reloading.
- **`npm run build`**: Builds the app for production.
- **`npm run lint`**: Lints the project using ESLint.
- **`npm run preview`**: Previews the production build locally.
- **`npm run test`**: Runs the tests (if applicable).

## Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**.
2. **Create a new branch** (`git checkout -b feature/your-feature-name`).
3. **Commit your changes** (`git commit -m 'Add some feature'`).
4. **Push to the branch** (`git push origin feature/your-feature-name`).
5. **Create a pull request**.

Please ensure your code follows the established conventions and is well-documented.

## Contact

If you have any questions, feel free to reach out:

- **Name**: Sofiane Boudjemai
- **Email**: sofiane.boudjemai.pro@gmail.com

## Acknowledgements

- Special thanks to [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie data.
- Thanks to the [React](https://reactjs.org/) and [Vite](https://vitejs.dev/) communities for their awesome tools and support.
