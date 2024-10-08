from flask import request, abort
import requests
import json
from flask import Flask
import yaml
from openai import OpenAI
import time
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
openapi_key = app.config['COMMON']['OPENAI_API_KEY']
client = OpenAI(api_key=openapi_key)

imageine_url = "https://api.apiframe.pro/imagine"
fetch_url = "https://api.apiframe.pro/fetch"
variation_url = "https://api.apiframe.pro/variations"
response = {}
# 用字典存储每个 IP 的调用次数
ip_counts = {}


def limit_calls(limit=2):
    def decorator(func):
        def wrapper(*args, **kwargs):
            client_ip = request.remote_addr  # 获取客户端 IP 地址
            if client_ip in ip_counts:
                if ip_counts[client_ip] >= limit:
                    abort(429)  # 如果这个 IP 的调用次数已达或超过限制，则返回 429 Too Many Requests
            else:
                ip_counts[client_ip] = 0  # 初始化计数
            ip_counts[client_ip] += 1  # 增加调用次数
            return func(*args, **kwargs)
        wrapper.__name__ = func.__name__
        return wrapper
    return decorator


def promptOptimizeForImage(prompt):
    prefix_reqiurement = 'Please help me optimize this prompt so that it meets the requirements of MidJounery for generating images，please only return the prompt content, I do not need any other content cause this prompt will be passed to dall-e-2 directly '
    promptStr = ""
    promptStr += prompt['prompt']
    promptStr += ','
    promptStr += prompt['model']
    promptStr += ','
    promptStr += prompt['aspectRatio']

    final_prompt = prefix_reqiurement+promptStr

    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": final_prompt}
        ]
    )

    message = completion.choices[0].message.content

    return message


def fetchImages(task_id, fetch_url):
    time.sleep(90)

    imgResults = {}
    payload = json.dumps({
        "task_id": task_id
    })
    headers = {
        'Content-Type': 'application/json',
        'Authorization': midjourney_key
    }

    result = requests.request("POST", fetch_url, headers=headers, data=payload)

    result_dict = json.loads(result.text)
    print(result_dict)
    if "image_urls" in result_dict:
        images = result_dict["image_urls"]

        imgResults['images'] = images
    else:
        imgResults['error'] = "Generating Image Failed"

    return imgResults


@limit_calls(limit=2)
def midjourneyGenerate(prompt,  edit=False, img=None, ratio=None):

    aspectRitio = ""

    if edit and img and ratio:
        aspectRitio = ratio
        prompt = img+" "+prompt
    else:
        message = promptOptimizeForImage(prompt)
        aspectRitio = prompt['aspectRatio']
        prompt = message

    payload = json.dumps({
        "prompt": prompt,
        "aspect_ratio":  aspectRitio,
        "process_mode": "fast",
        "webhook_url": "http://127.0.0.1:5000",
    })
    headers = {
        'Content-Type': 'application/json',
        'Authorization': midjourney_key
    }

    result = requests.request("POST", imageine_url,
                              headers=headers, data=payload)
    result_dict = json.loads(result.text)

    task_id = ""
    if "task_id" in result_dict:

        task_id = result_dict['task_id']
       ###################
        print(task_id)
       ########################
        imgResults = fetchImages(task_id, fetch_url)
        if 'images' in imgResults:
            if edit and img:
                response["images"] = imgResults['images'][0]
            else:
                response["images"] = imgResults['images']

        else:
            response["error"] = imgResults['error']

    else:

        response["error"] = "Generation failed"

    return response


def midjourneyEdit(index, parent_task_id):
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
