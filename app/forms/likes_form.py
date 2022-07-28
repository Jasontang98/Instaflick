from flask_wtf import FlaskForm
from wtforms import SubmitField

class LikeForm(FlaskForm):
    like = SubmitField('Like')
