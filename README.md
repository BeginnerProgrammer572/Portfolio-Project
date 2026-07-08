# CAD Portfolio

## Run locally

**Frontend** (Vite dev server on http://localhost:5173):
```
cd frontend
npm run dev
```

**Backend** (FastAPI on http://localhost:8000):
```
cd backend
venv\Scripts\uvicorn main:app --reload
```

Both must be running at the same time. The frontend proxies `/api` requests to the backend automatically.

## Adding a project

1. Export your CAD file to OBJ or STL, then convert to GLB in Blender (File → Export → glTF 2.0, enable Draco compression)
2. Drop the `.glb` in `frontend/public/models/`
3. Place the downloadable file (STEP, DWG) in the same folder
4. Add an entry to `frontend/src/data/projects.json`
