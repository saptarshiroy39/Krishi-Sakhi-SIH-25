import os

from dotenv import load_dotenv
from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_migrate import Migrate

from blueprints.activity import activity_bp
from blueprints.advisory import advisory_bp
from blueprints.chat import chat_bp
from blueprints.home import home_bp
from blueprints.knowledge import knowledge_bp
from blueprints.profile import profile_bp
from blueprints.schemes import schemes_bp
from models import db


def create_app():
    app = Flask(__name__)
    load_dotenv()

    # Database configuration - PostgreSQL with fallback to SQLite
    database_url = os.environ.get("DATABASE_URL")
    if database_url:
        # Production PostgreSQL
        if database_url.startswith("postgres://"):
            database_url = database_url.replace("postgres://", "postgresql://", 1)
        app.config["SQLALCHEMY_DATABASE_URI"] = database_url
    else:
        # Development - can use PostgreSQL or SQLite
        postgres_config = {
            "host": os.environ.get("DB_HOST", "localhost"),
            "port": os.environ.get("DB_PORT", "5432"),
            "database": os.environ.get("DB_NAME", "krishi_sakhi"),
            "username": os.environ.get("DB_USER", "postgres"),
            "password": os.environ.get("DB_PASSWORD", ""),
        }

        # Try PostgreSQL first, fallback to SQLite
        if all(postgres_config.values()) and postgres_config["password"]:
            app.config["SQLALCHEMY_DATABASE_URI"] = (
                f"postgresql://{postgres_config['username']}:{postgres_config['password']}"
                f"@{postgres_config['host']}:{postgres_config['port']}/{postgres_config['database']}"
            )
        else:
            # Fallback to SQLite for development
            app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"

    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dev-secret-key")

    # Enable CORS for React frontend
    allowed_origins = os.environ.get("ALLOWED_ORIGINS", "*").split(",")
    CORS(app, origins=allowed_origins, supports_credentials=True)

    db.init_app(app)
    migrate = Migrate(app, db)

    # Register API blueprints with /api prefix
    app.register_blueprint(chat_bp, url_prefix="/api")
    app.register_blueprint(profile_bp, url_prefix="/api")
    app.register_blueprint(activity_bp, url_prefix="/api")
    app.register_blueprint(advisory_bp, url_prefix="/api")
    app.register_blueprint(schemes_bp, url_prefix="/api")
    app.register_blueprint(home_bp, url_prefix="/api/home")
    app.register_blueprint(knowledge_bp, url_prefix="/api/knowledge")

    # API Routes
    @app.route("/api/health")
    def health_check():
        return {"status": "healthy", "message": "Krishi Sakhi API is running"}

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
