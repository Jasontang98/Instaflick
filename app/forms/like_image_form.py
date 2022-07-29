
from flask_wtf import FlaskForm
from sqlalchemy import Integer
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError

class LikeForm(FlaskForm):
    user_id = IntegerField('User ID', validators=[DataRequired()])
