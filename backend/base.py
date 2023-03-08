from flask import Flask, jsonify, make_response
from flask_cors import CORS
from controller import read_CSVfile

api = Flask(__name__)
CORS(api, resources={r"/*": {"origins": "http://localhost:3000"}})


@api.route('/')
def home():
    return 'Hello World'


@api.route('/getMovieOverview')
def get_movie_overview():
    movies = read_CSVfile()
    movie_items = []
    for i in range(len(movies)):
        movie_items.append({'movie_name': movies[i][0], 'movie_revenue': movies[i]
                           [13], 'movie_budget': movies[i][14], 'movie_rating': movies[i][4]})
    response = make_response(jsonify(movie_items))
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET')
    return response


if __name__ == '__main__':
    api.run(port=3100, debug=True)
