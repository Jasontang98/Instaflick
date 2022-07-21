from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError

class ImageForm(FlaskForm):
    description = StringField(500)
