from .db import db

class Image_Like (db.Model):
    __tablename__ = 'image_likes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    image_id = db.Column(db.Integer, db.ForeignKey('images.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'image_id': self.image_id
        }

    user = db.relationship('User', back_populates='image_like')
    image = db.relationship('Image', back_populates='image_like')
