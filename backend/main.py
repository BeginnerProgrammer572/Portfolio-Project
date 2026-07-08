import os
from collections import defaultdict
from datetime import datetime, timedelta

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["POST"],
    allow_headers=["*"],
)


class ContactPayload(BaseModel):
    name: str
    email: EmailStr
    message: str
    website: str = ""  # honeypot field


_rate_log: defaultdict[str, list[datetime]] = defaultdict(list)
_LIMIT = 5
_WINDOW = timedelta(minutes=10)


def _check_rate(ip: str) -> None:
    now = datetime.now()
    _rate_log[ip] = [t for t in _rate_log[ip] if now - t < _WINDOW]
    if len(_rate_log[ip]) >= _LIMIT:
        raise HTTPException(status_code=429, detail="Too many requests")
    _rate_log[ip].append(now)


@app.post("/api/contact")
async def contact(payload: ContactPayload, request: Request):
    # Honeypot: silently drop bot submissions
    if payload.website:
        return {"ok": True}

    _check_rate(request.client.host)

    resend_key = os.getenv("RESEND_API_KEY")
    if resend_key:
        # Phase 3: swap in Resend SDK call here
        pass
    else:
        print("\n--- Contact Form Submission ---")
        print(f"From: {payload.name} <{payload.email}>")
        print(f"Message:\n{payload.message}")
        print("-------------------------------\n")

    return {"ok": True}
