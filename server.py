from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import io
import os
import hashlib
import time
from gtts import gTTS  # Google Text-to-Speech

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # For development
# For production, use specific origin:
# CORS(app, resources={r"/*": {"origins": "https://your-frontend-url.onrender.com"}})

# Create a cache directory if it doesn't exist
CACHE_DIR = os.path.join(os.getcwd(), "tts_cache")
if not os.path.exists(CACHE_DIR):
    os.makedirs(CACHE_DIR)

# Define available voices/languages
AVAILABLE_VOICES = [
    {"id": "en", "name": "English"},
    {"id": "fr", "name": "French"},
    {"id": "es", "name": "Spanish"},
    {"id": "de", "name": "German"},
    {"id": "it", "name": "Italian"},
    {"id": "pt", "name": "Portuguese"},
    {"id": "ru", "name": "Russian"},
    {"id": "ja", "name": "Japanese"},
    {"id": "ko", "name": "Korean"},
    {"id": "zh-CN", "name": "Chinese (Simplified)"},
    {"id": "hi", "name": "Hindi"}
]

@app.route('/tts', methods=['POST', 'OPTIONS'])
def tts():
    if request.method == 'OPTIONS':
        return '', 200
    
    try:
        # Get text from request
        text = request.json.get('text', 'Hello world')
        
        # Get language from request (default to 'en' if not provided)
        lang = request.json.get('lang', 'en')
        
        print(f"Received text: {text}")
        print(f"Language/accent: {lang}")

        # Create a unique filename based on the text content AND language
        text_hash = hashlib.md5((text + lang).encode()).hexdigest()
        cache_file = os.path.join(CACHE_DIR, f"{text_hash}.mp3")
        
        # Check if we have a cached version
        if os.path.exists(cache_file):
            print(f"Using cached audio file: {cache_file}")
            return send_file(cache_file, mimetype='audio/mpeg')
            
        # Generate new audio
        print(f"Generating new audio file for text: {text}")
        tts = gTTS(text=text, lang=lang, slow=False)
        tts.save(cache_file)
        
        # Return the audio file
        return send_file(cache_file, mimetype='audio/mpeg')
        
    except Exception as e:
        print(f"Error: {e}")
        return str(e), 500

@app.route('/tts/voices', methods=['GET'])
def get_voices():
    """Return the list of available voices/languages"""
    try:
        return jsonify({"voices": AVAILABLE_VOICES})
    except Exception as e:
        print(f"Error fetching voices: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/', methods=['GET'])
def index():
    """Return basic API information or documentation"""
    return jsonify({
        "name": "Text-to-Speech API",
        "version": "1.0.0",
        "endpoints": {
            "/tts": "POST - Convert text to speech",
            "/tts/voices": "GET - List available voices"
        }
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)