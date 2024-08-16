# Employee Client

This is my entry for the Frontend (Part 2) task.

This will be dependent on the Backend Service used in the initial task,
and it should look for http://localhost:8080/graphql. Running docker-compose
for the backend service and this separately will enable communication with each other.

## Getting Started

The technologies I've used are as follows:

1. SvelteKit
2. TypeScript
3. Vite
4. Skeleton UI
5. ES Lint
6. PostCSS
7. Prettier

Before anything else, run `npm install` to install the dependencies.

To spin up the project, either kickstart it via `docker compose up -d` or
do `docker build -t "employee-client" .` and afterwards create a container based on the
image via `docker run -d -p80:3000 employee-client`.

If you'd like to try spinning up the development cycle, use the command `npm run dev`.
