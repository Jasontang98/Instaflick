from app.models import db, Comment_Like

# Adds a demo user, you can add other users here if you want
def seed_comment_likes():
    comment_like1 = Comment_Like(
        user_id=3, comment_id=2)
    comment_like2 = Comment_Like(
        user_id=2, comment_id=1)
    comment_like3 = Comment_Like(
        user_id=1, comment_id=3)

    db.session.add(comment_like1)
    db.session.add(comment_like2)
    db.session.add(comment_like3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comment_likes():
    db.session.execute('TRUNCATE comment_likes RESTART IDENTITY CASCADE;')
    db.session.commit()
