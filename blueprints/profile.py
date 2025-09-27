import os
from datetime import datetime

import google.generativeai as genai
from flask import Blueprint, jsonify, request

from models import Activity, Crop, Farm, Farmer, Livestock, db

profile_bp = Blueprint("profile", __name__)

# Configure Gemini AI
genai.configure(api_key=os.environ.get("GEMINI_API_KEY_1"))
model = genai.GenerativeModel("gemini-pro")


@profile_bp.route("/farmer", methods=["POST"])
def create_farmer():
    data = request.get_json()
    new_farmer = Farmer(name=data["name"], phone_number=data["phone_number"])
    db.session.add(new_farmer)
    db.session.commit()
    return jsonify({"message": "Farmer created successfully"}), 201


@profile_bp.route("/farm", methods=["POST"])
def create_farm():
    data = request.get_json()
    new_farm = Farm(
        farmer_id=data["farmer_id"], size=data["size"], location=data["location"]
    )
    db.session.add(new_farm)
    db.session.commit()
    return jsonify({"message": "Farm created successfully"}), 201


@profile_bp.route("/farmer/<int:farmer_id>", methods=["GET"])
def get_farmer(farmer_id):
    farmer = Farmer.query.get_or_404(farmer_id)
    return jsonify(farmer.to_dict())


@profile_bp.route("/farmer", methods=["GET"])
def get_farmers():
    farmers = Farmer.query.filter_by(is_active=True).all()
    return jsonify([farmer.to_dict() for farmer in farmers])


@profile_bp.route("/farm/<int:farm_id>", methods=["GET"])
def get_farm(farm_id):
    farm = Farm.query.get_or_404(farm_id)
    return jsonify(farm.to_dict())


@profile_bp.route("/farm", methods=["GET"])
def get_farms():
    farms = Farm.query.filter_by(is_active=True).all()
    return jsonify([farm.to_dict() for farm in farms])


@profile_bp.route("/profile/<int:farmer_id>", methods=["GET"])
def get_profile(farmer_id):
    """Get comprehensive profile data for a farmer"""
    farmer = Farmer.query.get_or_404(farmer_id)
    farms = Farm.query.filter_by(farmer_id=farmer_id).all()

    # Get statistics
    total_crops = 0
    total_activities = 0
    crops_data = []

    for farm in farms:
        crops = Crop.query.filter_by(farm_id=farm.id).all()
        activities = Activity.query.filter_by(farm_id=farm.id).count()

        total_crops += len(crops)
        total_activities += activities

        crops_data.extend(
            [
                {
                    "name": crop.name,
                    "planting_date": (
                        crop.planting_date.isoformat() if crop.planting_date else None
                    ),
                    "harvest_date": (
                        crop.harvest_date.isoformat() if crop.harvest_date else None
                    ),
                }
                for crop in crops
            ]
        )

    profile_data = {
        "farmer": {
            "id": farmer.id,
            "name": farmer.name,
            "phone_number": farmer.phone_number,
            "email": f"{farmer.name.lower().replace(' ', '.')}@email.com",
            "location": farms[0].location if farms else "Not specified",
            "experience_years": 15,  # Default for now
        },
        "farms": [
            {
                "id": farm.id,
                "size": farm.size,
                "location": farm.location,
                "crops": [crop["name"] for crop in crops_data if crop],
                "livestock": ["Cows", "Goats"],  # Default for now
            }
            for farm in farms
        ],
        "stats": {
            "total_crops": total_crops,
            "total_activities": total_activities,
            "farms_count": len(farms),
            "experience_years": 15,
        },
    }

    return jsonify(profile_data)


@profile_bp.route("/profile/<int:farmer_id>/analytics", methods=["GET"])
def get_profile_analytics(farmer_id):
    """Get AI-powered analytics for farmer profile"""
    try:
        farmer = Farmer.query.get_or_404(farmer_id)
        farms = Farm.query.filter_by(farmer_id=farmer_id).all()

        # Collect farm data for analysis
        farm_info = []
        for farm in farms:
            crops = Crop.query.filter_by(farm_id=farm.id).all()
            activities = Activity.query.filter_by(farm_id=farm.id).all()

            farm_info.append(
                {
                    "size": farm.size,
                    "location": farm.location,
                    "crops": [crop.name for crop in crops],
                    "recent_activities": [
                        activity.activity_type for activity in activities[-5:]
                    ],
                }
            )

        # Generate AI analysis
        prompt = f"""
        Analyze this farmer's profile and provide insights:
        
        Farmer: {farmer.name}
        Farms: {len(farms)} farm(s)
        Farm Details: {farm_info}
        
        Provide analysis on:
        1. Farm productivity insights
        2. Crop diversification recommendations
        3. Seasonal planning suggestions
        4. Risk management advice
        
        Keep the response practical and actionable for an Indian farmer.
        """

        response = model.generate_content(prompt)

        return jsonify(
            {
                "farmer_name": farmer.name,
                "analysis": response.text,
                "generated_at": "2025-09-26",
            }
        )

    except Exception as e:
        return jsonify({"error": f"Failed to generate analytics: {str(e)}"}), 500


@profile_bp.route("/profile/<int:farmer_id>", methods=["PUT"])
def update_profile(farmer_id):
    """Update farmer profile"""
    try:
        farmer = Farmer.query.get_or_404(farmer_id)
        data = request.get_json()

        # Update farmer data
        if "name" in data:
            farmer.name = data["name"]
        if "phone_number" in data:
            farmer.phone_number = data["phone_number"]

        db.session.commit()

        return jsonify(
            {
                "message": "Profile updated successfully",
                "farmer": {
                    "id": farmer.id,
                    "name": farmer.name,
                    "phone_number": farmer.phone_number,
                },
            }
        )

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Failed to update profile: {str(e)}"}), 500


@profile_bp.route("/farm/<int:farm_id>", methods=["PUT"])
def update_farm(farm_id):
    """Update farm details"""
    try:
        farm = Farm.query.get_or_404(farm_id)
        data = request.get_json()

        # Update farm data
        if "size" in data:
            farm.size = float(data["size"])
        if "location" in data:
            farm.location = data["location"]

        # Update crops if provided
        if "crops" in data:
            # Delete existing crops
            Crop.query.filter_by(farm_id=farm_id).delete()
            # Add new crops
            for crop_name in data["crops"]:
                if crop_name.strip():  # Only add non-empty crop names
                    new_crop = Crop(
                        farm_id=farm_id,
                        name=crop_name.strip(),
                        planting_date=datetime.now().date(),
                    )
                    db.session.add(new_crop)

        # Update livestock if provided
        if "livestock" in data:
            # Delete existing livestock
            Livestock.query.filter_by(farm_id=farm_id).delete()
            # Add new livestock
            for livestock_name in data["livestock"]:
                if livestock_name.strip():  # Only add non-empty livestock names
                    new_livestock = Livestock(
                        farm_id=farm_id,
                        species=livestock_name.strip(),
                        count=1,  # Default count
                    )
                    db.session.add(new_livestock)

        db.session.commit()

        return jsonify(
            {
                "message": "Farm updated successfully",
                "farm": {
                    "id": farm.id,
                    "farmer_id": farm.farmer_id,
                    "size": farm.size,
                    "location": farm.location,
                },
            }
        )

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Failed to update farm: {str(e)}"}), 500


@profile_bp.route("/farm/<int:farm_id>", methods=["DELETE"])
def delete_farm(farm_id):
    """Delete a farm"""
    try:
        farm = Farm.query.get_or_404(farm_id)

        # Delete associated crops and activities first
        Crop.query.filter_by(farm_id=farm_id).delete()
        Activity.query.filter_by(farm_id=farm_id).delete()

        # Delete the farm
        db.session.delete(farm)
        db.session.commit()

        return jsonify({"message": "Farm deleted successfully"})

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Failed to delete farm: {str(e)}"}), 500
