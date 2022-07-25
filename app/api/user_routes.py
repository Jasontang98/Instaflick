from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
# @login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
# @login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

#edit user profile
@user_routes.route('/<int:id>/edit', methods=['PUT'])
# @login_required
def edit_user(id):
    data = request.json
    user = User.query.get(id)
    user.username = request.json['username']
    user.prof_pic_url = request.json['prof_pic_url']
    user.description = request.json['description']
    db.session.commit()
    return user.to_dict()

#delete specific user
@user_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
def delete_user(id):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'Your account has been removed.'})
