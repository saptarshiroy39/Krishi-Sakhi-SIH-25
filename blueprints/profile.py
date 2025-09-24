from flask import Blueprint, request, jsonify
from models import db, Farmer, Farm

profile_bp = Blueprint("profile", __name__)

@profile_bp.route("/farmer", methods=["POST"])
def create_farmer():
    data = request.get_json()
    new_farmer = Farmer(
        name=data["name"],
        phone_number=data["phone_number"]
    )
    db.session.add(new_farmer)
    db.session.commit()
    return jsonify({"message": "Farmer created successfully"}), 201

@profile_bp.route("/farm", methods=["POST"])
def create_farm():
    data = request.get_json()
    new_farm = Farm(
        farmer_id=data["farmer_id"],
        size=data["size"],
        location=data["location"]
    )
    db.session.add(new_farm)
    db.session.commit()
    return jsonify({"message": "Farm created successfully"}), 201

@profile_bp.route("/farmer/<int:farmer_id>", methods=["GET"])
def get_farmer(farmer_id):
    farmer = Farmer.query.get_or_404(farmer_id)
    return jsonify({
        "id": farmer.id,
        "name": farmer.name,
        "phone_number": farmer.phone_number
    })

@profile_bp.route("/farmer", methods=["GET"])
def get_farmers():
    farmers = Farmer.query.all()
    return jsonify([{
        "id": farmer.id,
        "name": farmer.name,
        "phone_number": farmer.phone_number
    } for farmer in farmers])

@profile_bp.route("/farm/<int:farm_id>", methods=["GET"])
def get_farm(farm_id):
    farm = Farm.query.get_or_404(farm_id)
    return jsonify({
        "id": farm.id,
        "farmer_id": farm.farmer_id,
        "size": farm.size,
        "location": farm.location
    })

@profile_bp.route("/farm", methods=["GET"])
def get_farms():
    farms = Farm.query.all()
    return jsonify([{
        "id": farm.id,
        "farmer_id": farm.farmer_id,
        "size": farm.size,
        "location": farm.location
    } for farm in farms])
