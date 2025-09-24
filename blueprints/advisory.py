from flask import Blueprint, jsonify
import google.generativeai as genai
import os
from models import Farmer, Farm, Crop, Activity

advisory_bp = Blueprint("advisory", __name__)

@advisory_bp.route("/advisory/farmer/<int:farmer_id>", methods=["GET"])
def get_advisory(farmer_id):
    farmer = Farmer.query.get(farmer_id)
    if not farmer:
        return jsonify({"error": "Farmer not found"}), 404

    farms = Farm.query.filter_by(farmer_id=farmer.id).all()
    if not farms:
        return jsonify({"error": "No farms found for this farmer"}), 404

    # Consolidate all the information to be sent to the model
    prompt = f"Provide personalized farming advice for {farmer.name}.\n"
    prompt += f"Farmer Information: {farmer.name}, Phone: {farmer.phone_number}\n"

    for farm in farms:
        prompt += f"\nFarm Information: Location - {farm.location}, Size - {farm.size} acres\n"

        crops = Crop.query.filter_by(farm_id=farm.id).all()
        if crops:
            prompt += "Crops:\n"
            for crop in crops:
                prompt += f"- {crop.name}, Planted on {crop.planting_date}\n"

        activities = Activity.query.filter_by(farm_id=farm.id).order_by(Activity.date.desc()).limit(10).all()
        if activities:
            prompt += "Recent Activities:\n"
            for activity in activities:
                prompt += f"- {activity.date.strftime('%Y-%m-%d')}: {activity.activity_type} - {activity.details}\n"

    api_key = os.environ.get("GEMINI_API_KEY")
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("gemini-pro")
    response = model.generate_content(prompt)

    return jsonify({"advisory": response.text})
