from sqlalchemy import Column, Column,Text,Integer
from config.db import meta, Base,engine
# users = Table('users', meta,
# Column('id', Integer, primary_key=True),
# Column('name', String(255)),
# Column('email', String(255)),
# Column('password', String(255))
# )


class User(Base):
    __tablename__='users'

    id=Column(Integer, primary_key=True)
    name=Column(Text,nullable=False)
    email=Column(Text,nullable=False)
    password=Column(Text,nullable=False)

meta.create_all(engine)