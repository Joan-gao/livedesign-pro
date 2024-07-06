
from flask import Flask, request, jsonify, abort
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
    response = {}
    prompt = request.json.get('message')
    print(prompt)
    if prompt is not None:
        # response = dellGenerate(prompt)
        response = midjourneyGenerate(prompt)
    else:
        response['error'] = 'Invalid Input,please check your  prompt'
    return jsonify({'response': response})


@app.route("/optimize/caption", methods=['POST'])
def generateCaption():
    response = {}
    description = request.json.get('des')
    print(description)
    if description is not None:

        response = promptOptimizeForCaption(description)

    else:
        response['error'] = 'Invalid Input,please check your description'
    return jsonify({'response': response})


@app.route("/edit", methods=['POST'])
def edit():
    response = {}
    imageUrl = request.json.get("imageUrl")
    prompt = request.json.get("prompt")
    ratio = request.json.get("ratio")
    if imageUrl is not None and prompt is not None:
        # response = dellEdit(imageUrl, prompt)
        response = midjourneyGenerate(
            prompt,  edit=True, img=imageUrl, ratio=ratio)

    else:
        response['error'] = 'Invalid Input,please check your image and prompt'
    # index = request.json.get('index')
    # parent_task_id = request.json.get('parent_task_id')
    # response = midjourneyModify(index, parent_task_id)
    return jsonify({'response': response})


@app.route("/re-generate", methods=['POST'])
def regenerate():
    response = {}
    prompt = request.json.get('message')
    print(prompt)
    if prompt is not None:
        # response = dellGenerate(prompt)

        response = midjourneyGenerate(prompt)
        # response["images"] = ["https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
        #                       "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
        #                       "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
        #                       "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"]

    else:
        response['error'] = 'Invalid Input,please check your  prompt'

    return jsonify({'response': response})
