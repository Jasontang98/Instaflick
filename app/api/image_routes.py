import boto3
import botocore

from flask import Blueprint, request, jsonify, render_template
from flask_login import login_required, current_user
from datetime import datetime
from app.models import User, Image, Comment, db, image_likes, Comment_Like
from app.config import Config
from app.aws_s3 import *
from app.forms import image_form, comment_form

image_routes = Blueprint('images', __name__)


######## IMAGES ########

# Edit Single Image Description

@image_routes.route('/edit/<int:id>', methods=['PUT'])
@login_required
def edit_image(id):
    data = request.json
    image = Image.query.get(id)
    image.description = request.json['description']
    db.session.commit()
    return image.to_dict()


# Get All Images on the Feed Page
@image_routes.route('/feed')
@login_required
def all_images():
    images = Image.query.all()
    data = [image.to_dict() for image in images]
    return {'images': data}

# Get Single Image
@image_routes.route('/<int:id>')
@login_required
def get_single_image(id):
    image = Image.query.get(id)
    return image.to_dict()


# Post a Single Image
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

# Delete a Single Image
@image_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_image(id):
    image = Image.query.get(id)
    db.session.delete(image)
    db.session.commit()
    return image.to_dict()



######## COMMENTS ########

# Get All Comments
@image_routes.route('/<int:id>/comments')
@login_required
def get_all_comments(id):
    comments = Comment.query.filter_by(image_id=id).all()
    data = [comment.to_dict() for comment in comments]
    return {'comments': data}


# Post a Single Comment
@image_routes.route('/<int:id>', methods=['POST'])
@login_required
def submit_single_comment(id):
    form = comment_form.CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            user_id=form.user_id.data,
            image_id=form.image_id.data,
            comment=form.comment.data
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()


# # Edit a Single Comment
@image_routes.route('/<int:id>/comments/<int:comment_id>', methods=['PUT'])
@login_required
def edit_comment(id, comment_id):
    # image = Image.query.get(id)
    comment = Comment.query.get(comment_id)
    form = comment_form.EditCommentForm()
    print("\n\n\n\n", form.comment.data)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment.comment = form.comment.data
        print("this is comment \n\n\n", comment)
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    # data = request.jso
    # comment = Comment.query.get(comment_id)
    # comment.comment = request.json['comment']
    # db.session.add(comment)
    # print(comment.comment, 'WHAT IS THIS')
    # db.session.commit()
    # return comment.to_dict()


# #Delete a Single Comment
@image_routes.route('/<int:id>/comments/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(id, comment_id):
    comment = Comment.query.get(comment_id)
    db.session.delete(comment)
    db.session.commit()
    return comment.to_dict()
