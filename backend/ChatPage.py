
from flask import Flask, request, jsonify
from flask_cors import CORS
from Midjounery import *
from Dell import *

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/', methods=['POST'])
def index():
    user_message = request.json.get('message')
    return jsonify({'response': user_message})


@app.route("/generate", methods=['POST'])
def generate():
    prompt = request.json.get('message')
    print(prompt)
    if prompt is not None:
        response = dellGenerate(prompt)
    # response = midjourneyGenerate(prompt)
    else:
        response['error'] = 'Invalid Input,please check your  prompt'
    return jsonify({'response': response})


@app.route("/edit", methods=['POST'])
def edit():
    imageUrl = request.json.get("imageUrl")
    prompt = request.json.get("prompt")
    if imageUrl is not None and prompt is not None:
        response = dellEdit(imageUrl, prompt)

    else:
        response['error'] = 'Invalid Input,please check your image and prompt'
    # index = request.json.get('index')
    # parent_task_id = request.json.get('parent_task_id')
    # response = midjourneyModify(index, parent_task_id)
    return jsonify({'response': response})


@app.route("/re-generate", methods=['POST'])
def regenerate():
    prompt = request.json.get('prompt')
    if prompt is not None:
        response = dellGenerate(prompt)
        # response = midjourneyGenerate(prompt)
    else:
        response['error'] = 'Invalid Input,please check your  prompt'

    return jsonify({'response': response})
