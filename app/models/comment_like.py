from .db import db

comment_likes = db.Table(
    "comment_likes",
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey("users.id"),
        primary_key=True
    ),
    db.Column(
        "comment_id",
        db.Integer,
        db.ForeignKey("comments.id"),
        primary_key=True
    )
)
