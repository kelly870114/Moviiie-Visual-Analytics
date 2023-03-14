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
        movie_items.append({'movie_name': movies[i][0], 
                            'movie_poster': movies[i][1],
                            'movie_budget': movies[i][2],
                            'movie_revenue': movies[i][4],
                            'movie_tomato_audience': movies[i][6],
                            'movie_tomato_tomatometer': movies[i][7],
                            'movie_imdb_rating': movies[i][9],
                            'movie_imdb_metascore': movies[i][10]
                            })

    
    return jsonify(movie_items)

@app.route('/getMovieReviews')
def get_movie_review():
    wordcloud = process_reviews()
    wordcloudJSON = []
    for word in wordcloud: # Modify to json format (for data export)
        wordcloudJSON.append({"text": word, "value": wordcloud[word]})
    
    return wordcloudJSON
