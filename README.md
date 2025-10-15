**Global360 — TodoList By Akash**

A small, hands-on Todo List app built with Angular (frontend) and .NET 9 Web API (backend).
It’s a simple, functional project meant to show a clean full-stack workflow — a front-end UI talking to a lightweight API with in-memory data (no database setup needed).

**TECH STACK**

Frontend: Built with Angular using TypeScript and HTML for the user interface.
Backend: Developed with .NET 9 Web API in C# to handle requests and data.
Storage: Uses an in-memory list — no database required (data resets when restarted).

**HOW TO RUN LOCALLY**

Make sure you have Node.js, npm, and the .NET 9 SDK installed.

**Step 1: Clone the repository**

git clone https://github.com/akash271291/Global360.git

cd Global360

**Step 2: Start the backend**

Open a terminal inside the backend folder:
cd Todo-backend
dotnet restore
dotnet run

The API will start — usually at:
http://localhost:5035

**Step 3: Start the frontend**

Open another terminal and run the Angular app:
cd Todo-frontend
npm install
npm start

Once it compiles, open your browser and go to:
http://localhost:4200

The app should load and connect to the backend API automatically.

**NOTES**

Backend uses in-memory data storage — restarting clears all TODOs.

Make sure the backend is running before starting the frontend.

If the frontend cannot connect, check the backend port and update the apiUrl in the Angular service.
