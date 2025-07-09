from firebase_functions import https_fn
from firebase_functions.options import set_global_options
from firebase_admin import initialize_app
from flask import Response, request, jsonify, make_response
import os
import requests

initialize_app()
BUMPUPS_API_KEY = os.getenv("BUMPUPS_API_KEY")

# whitelist of supported ISO language codes
SUPPORTED_LANGUAGES = {"en","hi","es","pt","ru","de","fr","ja","ko","ar"}

@https_fn.on_request()
def on_request_example(req):
    print("on_request_example called")
    response = make_response("Hello world!", 200)
    response.headers['Content-Type'] = 'text/plain'
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

@https_fn.on_call(
    enforce_app_check=True   # Reject missing/invalid App Check tokens
)
def generate_timestamps(req: https_fn.CallableRequest) -> dict:
    # Log incoming request
    print("generate_timestamps: received data:", req.data)

    # 1) Auth guard
    if not req.auth or not req.auth.uid:
        print("generate_timestamps: ❌ Auth failed; req.auth =", req.auth)
        return {"error": "Authentication required."}
    print(f"generate_timestamps: ✅ Auth passed for UID={req.auth.uid}")

    # 2) App Check guard
    if not getattr(req, "app", None):
        print("generate_timestamps: ❌ App Check failed; req.app =", getattr(req, "app", None))
        return {"error": "App Check required."}
    print("generate_timestamps: ✅ App Check passed; app token info:", req.app)

    # 3) Extract & validate parameters
    youtube_url = req.data.get("url")
    if not youtube_url:
        print("generate_timestamps: ❌ Missing URL")
        return {"error": "Missing YouTube URL."}

    lang = req.data.get("language", "en")
    if lang not in SUPPORTED_LANGUAGES:
        print(f"generate_timestamps: ⚠️ Unsupported language '{lang}', defaulting to 'en'")
        lang = "en"

    print(f"generate_timestamps: Calling Bumpups API for URL={youtube_url}, language={lang}")

    # 4) Prepare Bumpups request
    api_key = os.environ.get('BUMPUPS_API_KEY')
    if not api_key:
        print("generate_timestamps: ❌ API key not set in environment variables")
        return {"error": "API key not set"}

    headers = {
        "Content-Type": "application/json",
        "X-Api-Key": api_key
    }
    payload = {
        "url": youtube_url,
        "model": "bump-1.0",
        "language": lang,
        "timestamps_style": "long"
    }

    # 5) Call Bumpups
    try:
        resp = requests.post(
            "https://api.bumpups.com/general/timestamps",
            headers=headers,
            json=payload,
            timeout=120
        )
        resp.raise_for_status()
        result = resp.json()
        print("generate_timestamps: Bumpups API success, returning result")
        return result

    except requests.RequestException as e:
        print("generate_timestamps: Bumpups API error:", str(e))
        return {"error": str(e)}