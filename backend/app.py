from google import genai
from PIL import Image
from io import BytesIO
from flask import Flask, jsonify, request, send_file
import os
from google.cloud import texttospeech
from google.cloud import secretmanager
from firebase_admin import credentials
from flask_cors import CORS
from dotenv import load_dotenv
from google.cloud import speech
load_dotenv()

# Initialize the credentials
cred = credentials.Certificate("service.json")

# Initialize the path to the current directory
script_dir = os.path.dirname(__file__)

def get_secret(secret_name:str):
    '''Get the secret from the Secret Manager

    Args:
        secret_name (str): The name of the secret to retrieve
    
    Returns:
        str: The value of the secret
    '''

    client = secretmanager.SecretManagerServiceClient()
    project_id = os.getenv('PROJECT_ID')
    secret_path = f"projects/{project_id}/secrets/{secret_name}/versions/latest"
    response = client.access_secret_version(request={"name": secret_path})
    return response.payload.data.decode("UTF-8")

# Get the API key from the Secret Manager
api_key = get_secret("my-api-key")
n = len(api_key)
api_key = api_key[4:n-4]

# Initialize the client
client = genai.Client(api_key=api_key)

def generate_voice(text_data:str):
    '''Generate a voice for the text data
    Args:
        text_data (str): The text data to generate voice for
    Returns:
        bytes: The generated voice data
    '''
    # Instantiates a client
    ttsclient = texttospeech.TextToSpeechClient()

    # Set the text input to be synthesized
    synthesis_input = texttospeech.SynthesisInput(text=text_data)

    # Build the voice request, select the language code ("en-US") and the ssml
    voice = texttospeech.VoiceSelectionParams(
        language_code="en-US", ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL
    )

    # Select the type of audio file 
    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3
    )

    # Perform the text-to-speech request on the text input with the selected
    # voice parameters and audio file type
    response = ttsclient.synthesize_speech(
        input=synthesis_input, voice=voice, audio_config=audio_config
    )


    # The response's audio_content is binary.
    with open(f"output.mp3", "wb") as out:
        # Write the response to the output file.
        out.write(response.audio_content)
    return response.audio_content


    
def synthesise_audio():
    # Instantiates a client
    client = speech.SpeechClient()

    # The name of the audio file to transcribe
    with open("audio.mp3", "rb") as audio_file:
        byte_data = audio_file.read()

    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.MP3,
        sample_rate_hertz=16000,
        language_code="en-US",
    )
    audio = {"content": byte_data}

    # Detects speech in the audio file
    response = client.recognize(config=config, audio=audio)

    for result in response.results:
        print(f"Transcript: {result.alternatives[0].transcript}")
    return result.alternatives[0].transcript

def recognise_image(file):
    image_data = file.read()
    image = Image.open(BytesIO(image_data))
    response = client.models.generate_content(
    model="gemini-2.0-flash",
    contents=[image, "This image contains the handwritten text of a dyslexia patient, kindly recognize the text and return the text alone."])
    print(response.text)
    response_text = response.text
    return response_text




app = Flask(__name__)
CORS(app)

@app.route('/tts',methods=['POST'])
def text_to_speech():
    data = request.get_json()

    text = data.get('text')
    if not text:
        return jsonify({"Error":"Text NULL"}),400
    
    try:
        generate_voice(text)
        return send_file(
        "output.mp3",
        mimetype="audio/mp3",  # Set the correct MIME type for the audio format
        as_attachment=False    # Set to True if you want the file to be downloaded
    )

    except Exception as e:
        return jsonify({"error":str(e)}),500

@app.route('/vts', methods=['POST'])
def voice_to_text():
    # Check if the 'file' key is in the request files
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']

    # Check if the file is empty
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

  
    if not file.filename.lower().endswith('.mp3'):
        return jsonify({"error": "File is not an MP3"}), 400

    # Save the file to a specific directory (optional)
    save_path = "audio.mp3"
    file.save(save_path)
    text = synthesise_audio()
    

    # Return a success response
    return jsonify({
        "text" : text
    }), 200

@app.route('/recognise', methods=['POST'])
def process_image():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        response_text = recognise_image(file)
    except Exception as e:
        return jsonify({"error":str(e)}),500

    
    # Return the image dimensions as a response
    return jsonify({
        "message": "Image processed successfully",
        "text":response_text
        
    }), 200


# Main entry point for running the Flask app 
if __name__ == '__main__':
    # Use the PORT environment variable 
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port)

