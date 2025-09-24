import os

from flask import Flask, render_template
from dotenv import load_dotenv
from flask_migrate import Migrate

from models import db
from blueprints.chat import chat_bp
from blueprints.profile import profile_bp
from blueprints.activity import activity_bp
from blueprints.advisory import advisory_bp

def create_app():
    app = Flask(__name__)
    load_dotenv()

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    migrate = Migrate(app, db)

    app.register_blueprint(chat_bp)
    app.register_blueprint(profile_bp)
    app.register_blueprint(activity_bp)
    app.register_blueprint(advisory_bp)

    @app.route("/")
    def index():
        return render_template("index.html")

    @app.route("/activities")
    def activities():
        return render_template("activities.html")

    @app.route("/chat")
    def chat_page():
        return render_template("chat.html")

    @app.route("/schemes")
    def schemes_page():
        return render_template("schemes.html")

    @app.route("/knowledge")
    def knowledge_page():
        return render_template("knowledge.html")

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 3000)))
