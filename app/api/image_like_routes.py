from flask import Blueprint, request, jsonify, render_template
from flask_login import login_required, current_user
from datetime import datetime
from app.models import User, Image, Comment, db
from app.config import Config
from app.aws_s3 import *
from app.forms import image_form, comment_form, like_image_form
from app.models.image_like import Image_Like

image_like_routes = Blueprint('likes', __name__)

# ######## IMAGE LIKES ################

# GET LIKES ON A SINGLE IMAGE

@image_like_routes.route('/<int:id>')
# @login_required
def get_likes_on_image(id):
    image = Image.query.get(id)
    return image.to_dict()

# POST A LIKE ON A SINGLE IMAGE

@image_like_routes.route('/<int:id>', methods=['POST'])
# @login_required
def post_like_on_image(id):
    image = Image.query.get(id)
    form = like_image_form.LikeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        like = Image_Like(
            user_id=form.user_id.data,
            # id=id,
            image_id=id
        )
        db.session.add(like)
        db.session.commit()
        return like.to_dict()



@image_like_routes.route('/<int:id>/like/<int:like_id>', methods=['DELETE'])
# @login_required
def remove_like_on_image(id, like_id):
    image = Image.query.get(id)
    like = Image_Like.query.get(like_id)
    db.session.delete(like)
    db.session.commit()
    return like.to_dict()
