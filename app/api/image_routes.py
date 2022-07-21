import boto3
import botocore

from flask import Blueprint, request, jsonify, render_template
from flask_login import login_required, current_user
from datetime import datetime
from app.models import User, Image, Comment, db, Image_Like, Comment_Like
from app.config import Config
from app.aws_s3 import *
from app.forms import image_form


image_routes = Blueprint('images', __name__)

@image_routes.route('/edit/<int:id>', methods=['PUT'])
@login_required
def edit_image(id):
    data = request.json
    print (data, '-------------------------------------')
    image = Image.query.get(id)
    image.description = request.json['description']
    db.session.commit()
    return image.to_dict()
    # image = Image.query.get(id)
    # form = image_form.ImageForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():
    #
    #     print(image.description, "Image description\n\n\n\n")
    #     # image.description = data['description']
    #     image.description = form.description.data

    #     print('SOMETHING ELSE FOOL \n \n')
    #     db.session.add(image)
    #     db.session.commit()
    #     return image.to_dict()
    # return 'Error: Could not edit image'


# all images on feed
@image_routes.route('/feed')
@login_required
def all_images():
    images = Image.query.all()
    data = [image.to_dict() for image in images]
    return {'images': data}

# get single image
@image_routes.route('/<int:id>')
def get_single_image(id):
    image = Image.query.get(id)
    return image.to_dict()


# post a single image
@image_routes.route('/', methods=['POST'])
@login_required
def submit_single_image():
    if "file" not in request.files:
        return "No user_file key in request.files"

    file = request.files["file"]

    if file:
        file_url = upload_file_to_s3(file, Config.S3_BUCKET)
         # create an instance of <Your_Model>

        # data = request.json
        file = Image(
            user_id=current_user.id,
            # image_url=request.form.get('image_url'),
            description=request.form.get('description'),
            image_url=file_url
        )
        db.session.add(file)
        db.session.commit()
        return file.to_dict()
    else:
        return 'No File Attached!'




@image_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_image(id):
    image = Image.query.get(id)
    db.session.delete(image)
    db.session.commit()
    return image.to_dict()
