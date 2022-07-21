from app.models import db, Comment

# Adds a demo user, you can add other users here if you want
def seed_comments():
    comment1 = Comment(
        user_id=2, image_id=3, comment="Bro, that's last season")
    comment2 = Comment(
        user_id=3, image_id=3, comment='3-star Lulu?! What!!!')
    comment3 = Comment(
        user_id=1, image_id=2, comment='Too OP! Syfen!')

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
