from .db import db
from .comment_like import comment_likes

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    image_id = db.Column(db.Integer, db.ForeignKey('images.id'), nullable=False)
    username = db.Column(db.String(40), nullable=False)
    comment = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now(), nullable=False)

    user = db.relationship('User', back_populates='comment')
    image = db.relationship('Image', back_populates='comment')
    comment_likes = db.relationship('User', secondary=comment_likes, back_populates='user_comments_likes')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'image_id': self.image_id,
            'username': self.username,
            'comment': self.comment,
            'created_at': self.created_at
        }

    # def __repr__(self):
    #     return '<Comment: {}>'.format(self.id)
    # @property
    # def description(self):
    #     return self.comment


    # comment_like = db.relationship('Comment_Like', backref='comment', cascade='all, delete-orphan')
