"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
import jwt, datetime, os

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# Secret Key JWT (lub w .env)
SECRET_KEY = os.getenv("JWT_SECRET", "supersecretkey")



# TEST 

@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {
        "message": "Holi! I'm a message that came from the backend"
    }
    return jsonify(response_body), 200



# SIGNUP

@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"msg": "Missing email or password"}), 400

    # chech the user
    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "User already exists"}), 400

    # #hasła
    hashed_pw = generate_password_hash(password)
    new_user = User(email=email, password=hashed_pw, is_active=True)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User created successfully"}), 201



# Login (TOKEN)

@api.route('/token', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    # email searching
    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"msg": "Invalid credentials"}), 401

    # creating JWT
    token = jwt.encode({
        "sub": user.id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }, SECRET_KEY, algorithm="HS256")

    return jsonify({"token": token})



# private (WYMAGA TOKENA)

@api.route('/private', methods=['GET'])
def private_route():
    auth_header = request.headers.get("Authorization", None)

    if not auth_header:
        return jsonify({"msg": "Missing Authorization header"}), 401

    try:
        token = auth_header.split(" ")[1]
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user = User.query.get(decoded["sub"])

        if not user:
            return jsonify({"msg": "User not found"}), 404

        return jsonify({"msg": f"Holi {user.email}!"}), 200
    except Exception as e:
        return jsonify({"msg": "Invalid or expired token"}), 401
