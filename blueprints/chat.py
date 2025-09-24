import os
from flask import Blueprint, jsonify, request
import google.generativeai as genai
from blueprints.activity import log_activity_from_chat

chat_bp = Blueprint("chat", __name__)

@chat_bp.route("/chat", methods=["POST"])
def chat():
    message = request.json.get("message")
    if not message:
        return jsonify({"error": "Please provide a message"}), 400

    api_key = os.environ.get("GEMINI_API_KEY")
    genai.configure(api_key=api_key)

    # Define the tool for logging activities
    log_activity_tool = {
        "name": "log_activity",
        "description": "Logs a farming activity.",
        "parameters": {
            "type": "object",
            "properties": {
                "farm_id": {
                    "type": "integer",
                    "description": "The ID of the farm."
                },
                "activity_type": {
                    "type": "string",
                    "description": "The type of activity (e.g., sowing, irrigation, pest control)."
                },
                "details": {
                    "type": "string",
                    "description": "A detailed description of the activity."
                }
            },
            "required": ["farm_id", "activity_type", "details"]
        }
    }

    # Use the gemini-1.5-pro-latest model for better understanding and function calling
    model = genai.GenerativeModel(
        model_name="gemini-1.5-pro-latest",
        tools=[log_activity_tool]
    )

    # Start a chat session to maintain context
    chat_session = model.start_chat()
    response = chat_session.send_message(message)

    # Check if the model wants to call the tool
    function_call = response.candidates[0].content.parts[0].function_call
    if function_call:
        if function_call.name == "log_activity":
            args = function_call.args
            result = log_activity_from_chat(
                farm_id=args["farm_id"],
                activity_type=args["activity_type"],
                details=args["details"]
            )
            # Send the result of the tool call back to the model
            response = chat_session.send_message(
                f"Tool call result: {result['message']}"
            )
            return jsonify({"response": response.text})

    # If no tool is called, return the model's response
    return jsonify({"response": response.text})
