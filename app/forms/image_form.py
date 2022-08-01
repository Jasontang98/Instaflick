from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length

def description_limit(form, field):
    description = field.data
    if len(description):
        raise ValidationError('Description is too long.')

class ImageForm(FlaskForm):
    description = StringField('description', validators=[Length(max=500), description_limit])
