import requests
import json
from flask import Flask
import yaml
app = Flask(__name__)


def read_yaml(yaml_file_path):
    """
 Read configuration data from a YAML file and return it as a dictionary.

Args:
    yaml_file_path (str): The path to the YAML file.

Returns:
    dict: A dictionary containing the configuration data.
    """
    with open(yaml_file_path, 'rb') as f:
        config_data = yaml.safe_load(f.read())
    return config_data


config_data = read_yaml("setting.yaml")
app.config.update(config_data)
midjourney_key = app.config['COMMON']['MIDJOURNEY_KEY']

imageine_url = "https://api.apiframe.pro/imagine"
fetch_url = "https://api.apiframe.pro/fetch"
variation_url = "https://api.apiframe.pro/variations"
response = {}


def fetchImages(task_id, fetch_url):
    # {
    #     "task_id": "123456789123",
    #     "prompt": "a sunflower..",
    #     "image_urls": [
    #         "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
    #         "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
    #         "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
    #         "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
    #     ]
    # }

    payload = json.dumps({
        "task_id": task_id
    })
    headers = {
        'Content-Type': 'application/json',
        'Authorization': midjonery_key
    }

    result = requests.request("POST", fetch_url, headers=headers, data=payload)
    result_dict = json.loads(result.text)

    if "image_urls" in result_dict:
        images = result_dict["image_urls"]

        result['images'] = images
        result['prompt'] = result_dict['prompt']
    else:
        result['error'] = "Generating Image Failed"

    return result


def midjourneyGenerate(prompt):
    prompt = 'a sunflower field in the wind'
    midjounery_key = app.config['COMMON']['MIDJOURNEY_KEY']

    payload = json.dumps({
        "prompt": prompt,
        "aspect_ratio": "3:2",
        "process_mode": "fast",
        "webhook_url": "http://127.0.0.1:5000",
    })
    headers = {
        'Content-Type': 'application/json',
        'Authorization': midjounery_key
    }

    result = requests.request("POST", imageine_url,
                              headers=headers, data=payload)
    result_dict = json.loads(result.text)

    task_id = ""
    if "task_id" in result_dict:
        task_id = result_dict['task_id']
        image_result = fetchImages(task_id, fetch_url)
        if 'images' in image_result:

            response["images"] = image_result['images']
            response["prompt"] = image_result['prompt']

        else:
            response["error"] = image_result['error']

    else:

        response["error"] = "Generation failed"

    return response


def midjourneyModify(index, parent_task_id):
    payload = json.dumps({
        "parent_task_id": parent_task_id,
        "index": index
    })
    headers = {
        'Content-Type': 'application/json',
        'Authorization': midjourney_key
    }

    result = requests.request("POST", variation_url,
                              headers=headers, data=payload)
    result_dict = json.loads(result.text)

    task_id = ""
    if "task_id" in result_dict:
        task_id = result_dict['task_id']
        image_result = fetchImages(task_id, fetch_url)
        if 'images' in image_result:

            response["images"] = image_result['images']
            response["prompt"] = image_result['prompt']

        else:
            response["error"] = image_result['error']

    else:

        response["error"] = "Generation failed"

    return response
