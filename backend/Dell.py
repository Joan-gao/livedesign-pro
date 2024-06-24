
from flask import Flask
from openai import OpenAI
import yaml
import urllib.request
import ssl
from PIL import Image


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
openapi_key = app.config['COMMON']['OPENAI_API_KEY']

response = {}


def dellGenerate(prompt):

    images = []
    client = OpenAI(api_key=openapi_key)
    try:

        imageResponse = client.images.generate(
            model="dall-e-2",
            prompt=prompt,
            quality="standard",
            n=4,
            size="256x256"
        )

        for item in imageResponse.data:
            images.append(item.url)
        response["images"] = images
    except:
        response["error"] = "Generation failed"
    finally:

        return response


def dellEdit(imageUrl, prompt):
    ssl._create_default_https_context = ssl._create_unverified_context
    urllib.request.urlretrieve(imageUrl, "edited-image.png")
    input_image_path = "edited-image.png"
    image = Image.open(input_image_path)
    rgba_image = image.convert("RGBA")
    output_image_path = "output_rgba.png"
    rgba_image.save(output_image_path)

    client = OpenAI(api_key=openapi_key)
    try:

        imageResponse = client.images.edit(
            model="dall-e-2",
            image=open(output_image_path, "rb"),
            prompt=prompt,
            n=1,
            size="256x256"
        )

        response["images"] = imageResponse.data[0].url
    except:
        response["error"] = "Generation failed"
    finally:

        return response
