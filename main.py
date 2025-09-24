import os

from dotenv import load_dotenv
from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_migrate import Migrate

from blueprints.activity import activity_bp
from blueprints.advisory import advisory_bp
from blueprints.chat import chat_bp
from blueprints.profile import profile_bp
from models import db


def create_app():
    app = Flask(__name__)
    load_dotenv()

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dev-secret-key")

    # Enable CORS for React frontend
    CORS(app, origins=["http://localhost:3000"])

    db.init_app(app)
    migrate = Migrate(app, db)

    # Register API blueprints with /api prefix
    app.register_blueprint(chat_bp, url_prefix="/api")
    app.register_blueprint(profile_bp, url_prefix="/api")
    app.register_blueprint(activity_bp, url_prefix="/api")
    app.register_blueprint(advisory_bp, url_prefix="/api")

    # Serve React frontend static files (when built)
    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def serve_react_app(path):
        frontend_dist = os.path.join(os.path.dirname(__file__), "frontend", "dist")
        if path != "" and os.path.exists(os.path.join(frontend_dist, path)):
            return send_from_directory(frontend_dist, path)
        else:
            return send_from_directory(frontend_dist, "index.html")

    # API Routes
    @app.route("/api/health")
    def health_check():
        return {"status": "healthy", "message": "Krishi Sakhi API is running"}

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
