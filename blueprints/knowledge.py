import os
from datetime import datetime

import google.generativeai as genai
import requests
from flask import Blueprint, jsonify, request

knowledge_bp = Blueprint("knowledge", __name__)

# Configure Gemini AI
GEMINI_API_KEY_2 = os.getenv("GEMINI_API_KEY_2")
if GEMINI_API_KEY_2:
    genai.configure(api_key=GEMINI_API_KEY_2)

# OpenWeather API configuration
OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY", "your_openweather_api_key")
OPENWEATHER_BASE_URL = "http://api.openweathermap.org/data/2.5"


@knowledge_bp.route("/content", methods=["POST"])
def get_knowledge_content():
    try:
        data = request.get_json()
        prompt = data.get("prompt", "")
        category_id = data.get("category_id", 1)

        if not prompt:
            return jsonify({"success": False, "error": "Prompt is required"}), 400

        # Enhance prompt with current weather data for weather-related categories
        enhanced_prompt = prompt
        if category_id in [1, 3]:  # Crop Calendar and Weather Patterns
            try:
                weather_data = get_current_weather("Kochi")
                if weather_data:
                    weather_context = f"\n\nCurrent weather in Kerala: Temperature: {weather_data['temperature']}°C, Condition: {weather_data['description']}, Humidity: {weather_data['humidity']}%"
                    enhanced_prompt += weather_context
            except:
                pass  # Continue without weather data if API fails

        # Generate content using Gemini AI
        if not GEMINI_API_KEY_2:
            return (
                jsonify({"success": False, "error": "Gemini API key not configured"}),
                500,
            )

        model = genai.GenerativeModel("gemini-1.5-flash")

        # Add context for better responses
        context = """You are an expert agricultural advisor for Kerala, India. Provide detailed, practical, and location-specific advice. 
        Format your response in a clear, readable manner with proper paragraphs and bullet points where appropriate. 
        Include specific examples relevant to Kerala's climate, soil, and farming conditions."""

        full_prompt = f"{context}\n\n{enhanced_prompt}"

        response = model.generate_content(full_prompt)
        content = (
            response.text
            if response.text
            else "Unable to generate content at this moment."
        )

        return jsonify(
            {
                "success": True,
                "content": content,
                "category_id": category_id,
                "timestamp": datetime.now().isoformat(),
            }
        )

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@knowledge_bp.route("/market-prices", methods=["GET"])
def get_market_prices():
    """Get current market prices for major crops in Kerala"""
    try:
        # This would typically connect to government market price APIs
        # For now, we'll use AI to generate current market insights
        if not GEMINI_API_KEY_2:
            return jsonify({"success": False, "error": "API key not configured"}), 500

        model = genai.GenerativeModel("gemini-1.5-flash")
        prompt = """Provide current market price information for major crops in Kerala, India including:
        - Rice (different varieties)
        - Coconut
        - Rubber
        - Black pepper
        - Cardamom
        - Turmeric
        - Ginger
        - Banana
        - Seasonal fruits and vegetables
        
        Include approximate price ranges per kg/quintal, recent trends, and factors affecting prices.
        Format as a structured response with crop names, prices, and market insights."""

        response = model.generate_content(prompt)
        content = response.text if response.text else "Market price data unavailable"

        return jsonify(
            {
                "success": True,
                "market_prices": content,
                "timestamp": datetime.now().isoformat(),
            }
        )

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


def get_current_weather(city="Kochi"):
    """Get current weather data from OpenWeatherMap API"""
    try:
        url = f"{OPENWEATHER_BASE_URL}/weather"
        params = {"q": city, "appid": OPENWEATHER_API_KEY, "units": "metric"}

        response = requests.get(url, params=params)
        if response.status_code == 200:
            data = response.json()
            return {
                "temperature": data["main"]["temp"],
                "description": data["weather"][0]["description"],
                "humidity": data["main"]["humidity"],
                "wind_speed": data["wind"]["speed"],
            }
        return None
    except:
        return None


@knowledge_bp.route("/weather-analysis", methods=["GET"])
def get_weather_analysis():
    """Get detailed weather analysis for farming"""
    try:
        weather_data = get_current_weather("Kochi")
        if not weather_data:
            return jsonify({"success": False, "error": "Weather data unavailable"}), 500

        if not GEMINI_API_KEY_2:
            return jsonify({"success": False, "error": "API key not configured"}), 500

        model = genai.GenerativeModel("gemini-1.5-flash")
        prompt = f"""Based on the current weather conditions in Kerala:
        - Temperature: {weather_data['temperature']}°C
        - Condition: {weather_data['description']}
        - Humidity: {weather_data['humidity']}%
        - Wind Speed: {weather_data['wind_speed']} m/s

        Provide detailed analysis for farmers including:
        1. Impact on current crops
        2. Farming activities recommended for today
        3. Irrigation needs
        4. Pest and disease risks
        5. Harvesting considerations
        6. Short-term weather preparation advice

        Format the response in clear sections with actionable advice."""

        response = model.generate_content(prompt)
        content = response.text if response.text else "Weather analysis unavailable"

        return jsonify(
            {
                "success": True,
                "weather_data": weather_data,
                "analysis": content,
                "timestamp": datetime.now().isoformat(),
            }
        )

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
