from app.models import db, Image


# Adds a demo user, you can add other users here if you want
def seed_images():
    image1 = Image(
        user_id=1, image_url='https://i.ytimg.com/vi/jd0cYBY4tbU/sddefault.jpg', description='TFT1')
    image2 = Image(
        user_id=1, image_url='https://i.ytimg.com/vi/HU6v4I0yor8/hqdefault.jpg', description='')
    image3 = Image(
        user_id=3, image_url='https://i.ytimg.com/vi/LTgE_5MhUTQ/maxresdefault.jpg', description='TFT2')

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
