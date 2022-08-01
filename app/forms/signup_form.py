from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.api.user_routes import user
from app.models import User


def email_empty(form, field):
    email = field.data
    if len(email) == 0:
        raise ValidationError(' must be provided.')

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError(' is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError(' is already in use.')

def username_field_empty(form, field):
    username = field.data
    if len(username) == 0:
        raise ValidationError(' is required.')
    # elif len(username) > 40:
    #     raise ValidationError(' must be less than 40 characters')

def email_validations(form, field):
    email = field.data

    if '@' not in email:
        raise ValidationError(' Field must be a valid email.')
    elif len(email) < 4:
        raise ValidationError(' Field must be between 4 and 255 characters.')
    elif len(email) == 0:
        raise ValidationError('Please provide an email address.')
    elif len(email) > 255:
        raise ValidationError(' field cannot be more than 255 characters.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), Length(min=4, max=40), username_exists, username_field_empty])
    email = StringField('email', validators=[DataRequired(), user_exists, email_validations, email_empty])
    password = StringField('password', validators=[DataRequired(), Length(min=6, max=20) ])
    # confirm_password = StringField('confirm password', validators=[DataRequired(), password_does_not_match])
