import time
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from controller import read_CSVfile


app = Flask(__name__)
CORS(app)

@app.route('/time')
@cross_origin()
def get_current_time():
    return {'time': time.time()}


@app.route('/profile')
@cross_origin()
def my_profile():
    response_body = {
        "name": "Nagato",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body

@app.route('/getMovieOverview')
def get_movie_overview():
    movies = read_CSVfile()
    movie_items = []
    for i in range(len(movies)):
        movie_items.append({'movie_name': movies[i][0], 'movie_revenue': movies[i]
                           [13], 'movie_budget': movies[i][14], 'movie_rating': movies[i][4]})
    
    return jsonify(movie_items)