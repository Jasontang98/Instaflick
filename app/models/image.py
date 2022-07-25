from tkinter import CASCADE
from .db import db
from .image_like import image_likes

class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'image_url': self.image_url,
            'description': self.description,
            'created_at': self.created_at
        }

    user = db.relationship('User', secondary=image_likes, back_populates='images', single_parent=True, cascade='all, delete-orphan')
    comment = db.relationship('Comment', back_populates='image', cascade='all, delete-orphan')
