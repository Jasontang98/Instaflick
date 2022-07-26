from flask import Blueprint, request
from flask_login import login_required
from app.models import User, Image, Comment, db, image_like, comment_like
from app.config import Config

like_routes = Blueprint('likes', __name__)

#### LIKES #####

#### PLEASE WORK #####

# GET LIKES ON A SINGLE IMAGE

@like_routes.route('/images/<int:id>/likes')
@login_required
def get_likes_on_image():
    likes = Image.query.all
