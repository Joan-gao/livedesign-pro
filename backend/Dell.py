
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
client = OpenAI(api_key=openapi_key)

response = {}


def promptOptimize(prompt):
    prefix_reqiurement = 'Please help me optimize this prompt so that it meets the requirements of DALL-E 2 for generating images，please only return the prompt content, I do not need any other content cause this prompt will be passed to dall-e-2 directly '
    final_prompt = prefix_reqiurement+prompt

    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": final_prompt}
        ]
    )

    message = completion.choices[0].message.content

    return message


def dellGenerate(prompt):

    message = promptOptimize(prompt)
    print(message)
    images = []

    try:

        imageResponse = client.images.generate(
            model="dall-e-2",
            prompt=message,
            quality="standard",
            n=1,
            size="256x256"
        )

        # for item in imageResponse.data:
        #     images.append(item.url)
        print("imageResponse: ", imageResponse.data[0].url)
        images.append(imageResponse.data[0].url)
        response["images"] = images
    except:
        response["error"] = "Generation failed"
    finally:

        return response


def dellEdit(imageUrl, prompt):
    default_img = "https://www.adorama.com/alc/wp-content/uploads/2017/11/shutterstock_114802408-825x465.jpg"
    # ssl._create_default_https_context = ssl._create_unverified_context
    # urllib.request.urlretrieve(imageUrl, "edited-image.png")
    # input_image_path = "edited-image.png"
    # image = Image.open(input_image_path)
    # rgba_image = image.convert("RGBA")
    # output_image_path = "output_rgba.png"
    # rgba_image.save(output_image_path)

    # client = OpenAI(api_key=openapi_key)
    try:

        # imageResponse = client.images.edit(
        #     model="dall-e-2",
        #     image=open(output_image_path, "rb"),
        #     prompt=prompt,
        #     n=1,
        #     size="256x256"
        # )
        response["images"] = default_img
        # response["images"] = imageResponse.data[0].url
    except:
        response["error"] = "Generation failed"
    finally:

        return response
