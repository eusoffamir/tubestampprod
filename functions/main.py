# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

from firebase_functions import https_fn
from firebase_functions.options import set_global_options
from firebase_admin import initialize_app
from flask import Response, request, jsonify, make_response
import os
import requests

# For cost control, you can set the maximum number of containers that can be
# running at the same time. This helps mitigate the impact of unexpected
# traffic spikes by instead downgrading performance. This limit is a per-function
# limit. You can override the limit for each function using the max_instances
# parameter in the decorator, e.g. @https_fn.on_request(max_instances=5).
set_global_options(max_instances=10)

initialize_app()


@https_fn.on_request()
def on_request_example(req):
    print("on_request_example called")
    response = make_response("Hello world!", 200)
    response.headers['Content-Type'] = 'text/plain'
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


@https_fn.on_request()
def generate_timestamps(req):
    print("generate_timestamps called")
    # Handle CORS preflight
    if req.method == "OPTIONS":
        response = make_response('', 204)
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response
    # Parse JSON body
    try:
        data = req.get_json()
        print(f"Request JSON: {data}")
        youtube_url = data.get('url')
        if not youtube_url:
            print("Missing YouTube URL in request body")
            error_json = jsonify({'error': 'Missing YouTube URL'}).get_data(as_text=True)
            response = make_response(error_json, 400)
            response.headers['Content-Type'] = 'application/json'
            response.headers['Access-Control-Allow-Origin'] = '*'
            return response
    except Exception as e:
        print(f"Error parsing JSON body: {e}")
        error_json = jsonify({'error': 'Invalid JSON body'}).get_data(as_text=True)
        response = make_response(error_json, 400)
        response.headers['Content-Type'] = 'application/json'
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response

    api_key = os.environ.get('BUMPUPS_API_KEY')
    if not api_key:
        print("API key not set in environment variables")
        error_json = jsonify({'error': 'API key not set'}).get_data(as_text=True)
        response = make_response(error_json, 500)
        response.headers['Content-Type'] = 'application/json'
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response

    bumpups_url = 'https://api.bumpups.com/general/timestamps'
    payload = {
        'url': youtube_url,
        'model': 'bump-1.0',
        'language': 'en',
        'timestamps_style': 'long'
    }
    headers = {
        'Content-Type': 'application/json',
        'X-Api-Key': api_key
    }
    print(f"Sending POST to {bumpups_url} with payload: {payload} and headers: {headers}")

    try:
        resp = requests.post(bumpups_url, json=payload, headers=headers)
        print(f"Received response: status={resp.status_code}, body={resp.text}")
        resp.raise_for_status()
        response = make_response(resp.text, resp.status_code)
        response.headers['Content-Type'] = 'application/json'
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    except requests.RequestException as e:
        print(f"RequestException: {e}, response: {getattr(e.response, 'text', None)}")
        error_json = jsonify({'error': str(e), 'details': getattr(e.response, 'text', None)}).get_data(as_text=True)
        response = make_response(error_json, 500)
        response.headers['Content-Type'] = 'application/json'
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response