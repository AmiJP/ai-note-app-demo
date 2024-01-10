# AI Note taking app

AI note-taking app harnesses the power of OpenAI's DALL-E-2 for dynamic image generation based on note titles. Leveraging Amazon S3 for secure and scalable image storage, each note's visual representation is created and persisted seamlessly.

## Technologies Used

This project is built with following techstack:

### Frontend

- Framework: React
- Language: TypeScript
- Module Bundler: Vite
- CSS Framework: Tailwind CSS
- UI Library: Shadcn UI
- Data Caching, Fetching, Server Sync, and State Management: Tanstack Query
- API Client: Axios
- Client Routing: React Router Dom
- Icon Library: Lucide Icons

## Backend

- Framework: Express JS
- Language: TypeScript
- Authentication & Authorization: Express Session
- Database: SQLite
- ORM: TypeORM for object relation mapping & database operations
- Image Generation : OpenAI Dall-e-2 model
- Image Storage: AWS S3 Bucket

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (I used v18.19.0 - see `.nvmrc` file)
- npm (Node Package Manager)

## Running the Project

Follow these steps to get the project up and running on your local machine:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/AmiJP/ai-note-app-demo.git
   ```

2. Navigate to the project root directory:

   ```bash
   cd ai-note-app-demo
   ```

3. Install Server Dependencies:

   ```bash
   cd server
   npm install
   ```

4. Run the Server:

   ```bash
    NODE_ENV=development npm run dev
   ```

5. Add new Terminal window and Install Client Dependencies:

   ```bash
   cd client
   npm install
   ```

6. Run the Client:

   ```bash
    NODE_ENV=development npm run dev
   ```

   This will start the development server, and you can access the application at http://localhost:3000 in your web browser.

   `Note:` I have implemented a [mock OpenAI call](/server/src/utils/getMockImage.ts) for image generation, providing randomly predefined images in development mode.

## Demo

-![Demo Recording](https://github.com/AmiJP/openhouseAi-coding-exercise/assets/128651055/0e637692-d72b-4bb3-9d5e-04ed16411ace)
