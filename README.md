# Graftcode Hello World

A Next.js frontend calling a Python backend through Graftcode Gateway — no REST API needed.

## What is Graftcode?

Graftcode lets you call backend methods directly from the frontend as if they were local functions. Under the hood, Graftcode Gateway (`gg`) exposes your backend classes over WebSocket and auto-generates a typed SDK for the frontend. The result: **zero boilerplate**, **cross-language interop**, and **type-safe method calls**.

## Architecture

```
Next.js (TypeScript)  ──WebSocket──▶  Graftcode Gateway (gg)  ──▶  Python HelloService
  localhost:3000                        ports 80 + 81                hello_world.py
```

- **Port 80** — WebSocket endpoint. The frontend connects via `ws://localhost/ws`.
- **Port 81** — Vision portal (`/GV`). Browse services, inspect methods, get the npm install command.
- **Port 3000** — Next.js dev server.

## Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop/)
- [Bun](https://bun.sh/) (or Node.js 18+)
- A Graftcode account at [portal.graftcode.com](https://portal.graftcode.com)

## Setup

### 1. Get your Project Key

1. Sign up / log in at [portal.graftcode.com](https://portal.graftcode.com)
2. Go to **Start deployment** and complete the deployment wizard
3. Copy the **Project Key** from step 2 of the wizard

### 2. Start the backend

```bash
cd backend

# Build the Docker image
docker build -t graftcode-hello .

# Run it with your project key
docker run -d \
  -p 80:80 \
  -p 81:81 \
  -e GRAFTCODE_PROJECT_KEY=<your-project-key> \
  --name graftcode-hello \
  graftcode-hello
```

Verify it's running:

- `docker ps` should show the container
- Open [http://localhost:81/GV](http://localhost:81/GV) — you should see `HelloService` with its methods

### 3. Install the generated SDK

From the Vision portal at `localhost:81/GV`, copy the npm install command and run it in the frontend directory:

```bash
cd frontend

# The command from Vision portal will look something like:
bun add --registry https://grft.dev/<your-project-key> @graft/<package-name>
```

### 4. Wire up the frontend

Open `frontend/src/app/page.tsx` and uncomment the Graftcode imports and calls:

```tsx
// Replace the commented-out imports with:
import { GraftConfig, HelloService } from "@graft/<your-project-key>";

// And in callBackend(), uncomment:
GraftConfig.host = "ws://localhost/ws";
const helloResult = await HelloService.hello("Graftcode");
const timeResult = await HelloService.get_time();
setGreeting(helloResult);
setServerTime(timeResult);
```

Remove the placeholder lines below them.

### 5. Start the frontend

```bash
cd frontend
bun dev
```

Open [http://localhost:3000](http://localhost:3000) and click **Call HelloService**.

## Verification

| Check | Expected |
|-------|----------|
| `docker ps` | Container `graftcode-hello` running |
| `localhost:81/GV` | Vision portal shows `HelloService` with `hello` and `get_time` methods |
| `localhost:3000` | Greeting from Python + server time displayed |
| Stop the container | Frontend shows an error (proves it's a real remote call) |

## Project Structure

```
recruitment-task/
├── backend/
│   ├── hello_service/
│   │   ├── __init__.py       # Python module init
│   │   └── hello_world.py   # Python class — no framework, no HTTP, just methods
│   └── Dockerfile            # Python + gg (.deb), exposes ports 80/81
├── frontend/
│   ├── src/app/
│   │   ├── layout.tsx        # App shell
│   │   └── page.tsx          # Calls HelloService via Graftcode
│   ├── package.json
│   └── next.config.ts
├── .env.example
└── README.md
```
