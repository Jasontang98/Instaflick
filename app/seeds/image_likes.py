from app.models import db, Image_Like

# Adds a demo user, you can add other users here if you want
def seed_image_likes():
    image_like1 = Image_Like(
        user_id=1, image_id=1)
    image_like2 = Image_Like(
        user_id=2, image_id=2)
    image_like3 = Image_Like(
        user_id=3, image_id=3)

    db.session.add(image_like1)
    db.session.add(image_like2)
    db.session.add(image_like3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_image_likes():
    db.session.execute('TRUNCATE image_likes RESTART IDENTITY CASCADE;')
    db.session.commit()
