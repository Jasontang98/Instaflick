from .db import db

# comment_likes = db.Table(
#     "comment_likes",
#     db.Column(
#         "user_id",
#         db.Integer,
#         db.ForeignKey("users.id"),
#         primary_key=True
#     ),
#     db.Column(
#         "comment_id",
#         db.Integer,
#         db.ForeignKey("comments.id"),
#         primary_key=True
#     )
# )

# class Comment_Like(db.Model):
#     __tablename__ = 'comment_likes'

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'), nullable=False)

#     # RELATIONSHIPS

#     user = db.relationship('User', back_populates='user')
#     comment = db.relationship('Comment', back_populates='comments')
