from .db import db

image_likes = db.Table(
    "image_likes",
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey("users.id"),
        primary_key=True
    ),
    db.Column(
        "image_id",
        db.Integer,
        db.ForeignKey("images.id"),
        primary_key=True
    )
)
