from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.api.user_routes import user
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def username_field_empty(form, field):
    username = field.data
    if len(username) == 0:
        raise ValidationError('Username is required.')
    elif len(username) > 40:
        raise ValidationError('Username cannot be more than 40 characters.')

def email_validations(form, field):
    email = field.data

    if '@' not in email:
        raise ValidationError('Email must be a valid email.')
    if len(email) > 255:
        raise ValidationError('Email cannot be more than 255 characters.')
    elif len(email) == 0:
        raise ValidationError('Please provide an email address')

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, user_exists, username_field_empty])
    email = StringField('email', validators=[DataRequired(), user_exists, email_validations])
    password = StringField('password', validators=[DataRequired()])
