from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', prof_pic_url='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg', description='We Love InstaFlick')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', prof_pic_url='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg', description='Instagram is Mid')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', prof_pic_url='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg')


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    # image4 = Image(
    #     user_id=1, username='bobbie', image_url='https://i.ytimg.com/vi/LTgE_5MhUTQ/maxresdefault.jpg', description='TFT2', image_likes=[marnie, bobbie])

    # db.session.add(image4)

    

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
