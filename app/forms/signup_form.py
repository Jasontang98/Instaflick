from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
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
        raise ValidationError(f'{field.data.text} must be less than 40 characters')

def email_validations(form, field):
    email = field.data

    if '@' not in email:
        raise ValidationError('Email must be a valid email.')
    if len(email) > 255:
        raise ValidationError('Email cannot be more than 255 characters.')
    elif len(email) == 0:
        raise ValidationError('Please provide an email address')

def email_exists(form, field):
    #Check to see if an email exists already
    email = field.data
    existing_email = User.query.filter(User.email == email).first()
    if existing_email:
        raise ValidationError('Email is already in use.')

# def password_matches(form, field):
#     password = field.data
#     confirm_password = field.data
#     if password != confirm_password:
#         raise ValidationError('Passwords do not match.  Please reconfirm password.')

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), Length(min=6, max=40), username_exists, user_exists, username_field_empty])
    email = StringField('email', validators=[DataRequired(), user_exists, email_validations, email_exists])
    password = StringField('password', validators=[DataRequired(), Length(min=6, max=20) ])
    # confirm_password = StringField('confirm password', validators=[DataRequired(), password_matches])
