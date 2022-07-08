from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
# engine = create_engine('mysql+pymysql://root:password@localhost:3306/PJ02')
engine=create_engine(SQLALCHEMY_DATABASE_URL,connect_args={"check_same_thread": False})
meta = MetaData()
# conn = engine.connect()

Base = declarative_base()

session_maker=sessionmaker(autocommit=False, autoflush=False, bind=engine)


#Dependency injection. See https://fastapi.tiangolo.com/tutorial/dependencies/dependencies-with-yield/?h=yield
def get_db():
    db=session_maker()
    try:
        yield db
    finally:
        db.close()
