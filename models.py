from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Farmer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone_number = db.Column(db.String(20), unique=True, nullable=False)

class Farm(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    farmer_id = db.Column(db.Integer, db.ForeignKey('farmer.id'), nullable=False)
    size = db.Column(db.Float, nullable=False)
    location = db.Column(db.String(200), nullable=False)

class Crop(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    farm_id = db.Column(db.Integer, db.ForeignKey('farm.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    planting_date = db.Column(db.Date, nullable=False)
    harvest_date = db.Column(db.Date, nullable=True)

class Livestock(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    farm_id = db.Column(db.Integer, db.ForeignKey('farm.id'), nullable=False)
    species = db.Column(db.String(100), nullable=False)
    breed = db.Column(db.String(100), nullable=True)
    count = db.Column(db.Integer, nullable=False)

class Activity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    farm_id = db.Column(db.Integer, db.ForeignKey('farm.id'), nullable=False)
    activity_type = db.Column(db.String(100), nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    details = db.Column(db.Text, nullable=True)
