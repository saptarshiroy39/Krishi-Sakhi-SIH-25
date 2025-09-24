from flask import Blueprint, request, jsonify
from models import db, Activity
from datetime import datetime

activity_bp = Blueprint("activity", __name__)

def log_activity_from_chat(farm_id, activity_type, details):
    """Logs an activity from the chat blueprint."""
    new_activity = Activity(
        farm_id=farm_id,
        activity_type=activity_type,
        details=details
    )
    db.session.add(new_activity)
    db.session.commit()
    return {"message": "Activity logged successfully"}

@activity_bp.route("/activity", methods=["POST"])
def create_activity():
    data = request.get_json()
    new_activity = Activity(
        farm_id=data["farm_id"],
        activity_type=data["activity_type"],
        details=data.get("details")
    )
    db.session.add(new_activity)
    db.session.commit()
    return jsonify({"message": "Activity created successfully"}), 201

@activity_bp.route("/activity/farm/<int:farm_id>", methods=["GET"])
def get_activities_for_farm(farm_id):
    activities = Activity.query.filter_by(farm_id=farm_id).all()
    return jsonify([{
        "id": activity.id,
        "farm_id": activity.farm_id,
        "activity_type": activity.activity_type,
        "date": activity.date.isoformat(),
        "details": activity.details
    } for activity in activities])
