from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Length

class CommentForm(FlaskForm):
    user_id = StringField('User ID', validators=[DataRequired()])
    image_id = StringField('Image ID', validators=[DataRequired()])
    username = StringField('Username', validators=[DataRequired()])
    comment = TextAreaField('Comment', validators=[DataRequired(), Length(min=1, max=500)])
    submit = SubmitField('Submit')

class EditCommentForm(FlaskForm):
    comment = TextAreaField("Comment", validators=[DataRequired(), Length(min=1, max=500)])
