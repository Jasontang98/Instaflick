from .db import db
from .image_like import Image_Like

class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    username = db.Column(db.String(40), nullable=False)
    description = db.Column(db.String(500))
    image_likes = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())

    # RELATIONSHIP
    user = db.relationship('User', back_populates='image')
    comment = db.relationship('Comment', back_populates='image', cascade='all, delete-orphan')
    image_like = db.relationship('Image_Like', back_populates='image')


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'image_url': self.image_url,
            'username': self.username,
            'description': self.description,
            'likes': [like.to_dict() for like in self.image_like],
            # likes = [i for i in likes]
            # top line of code shows the objects themselves of users.
            # bottom shows number of likes
            # 'likes': len(self.image_likes),
            'created_at': self.created_at
        }
