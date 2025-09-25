from flask import Flask, request, jsonify
import bcrypt
import pandas as pd
import joblib
# from utils.cleaning import clean_data # Import from another file/directory


API_KEYS = {
    'user0': bcrypt.hashpw(b"secret_api_key",bcrypt.gensalt()) # Salt is a pseudorandom string added to the end of the main hased password for extra security
}

# bcrypt.checkpw(x,y) for checking encoded passwords

