from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Length, ValidationError

def comment_field_empty(form, field):
    comment_body = field.data
    if len(comment_body) == 0:
        raise ValidationError('Please provide a comment.')

def comment_too_long(form, field):
    comment_body = field.data
    if len(comment_body) > 500:
        raise ValidationError('Comment is too long.')

class CommentForm(FlaskForm):
    user_id = StringField('User ID', validators=[DataRequired()])
    image_id = StringField('Image ID', validators=[DataRequired()])
    username = StringField('Username', validators=[DataRequired()])
    comment = TextAreaField('Comment', validators=[DataRequired(), Length(min=1, max=500), comment_field_empty])
    submit = SubmitField('Submit')

class EditCommentForm(FlaskForm):
    comment = TextAreaField("Comment", validators=[DataRequired(), Length(min=1, max=500), comment_field_empty])
