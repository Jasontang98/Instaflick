from .db import db

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    image_id = db.Column(db.Integer, db.ForeignKey('images.id'), nullable=False)
    comment = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now(), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'image_id': self.image_id,
            'comment': self.comment,
            'created_at': self.created_at
        }

    user = db.relationship('User', back_populates='comment')
    image = db.relationship('Image', back_populates='comment')
    comment_like = db.relationship('Comment_Like', back_populates='comment', cascade='all, delete-orphan')