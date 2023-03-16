from wordcloud import WordCloud, STOPWORDS, ImageColorGenerator
import csv
from collections import defaultdict
from flask import jsonify
import json

selectMovie = ["CASINO",
				"JOKER",
				"SLEEPERS",
				"AVATAR",
				"IRON MAN",
				"THE HUNGER GAMES",
				"CINDERELLA",
				"TITANIC",
				"TWILIGHT",
				"KNIVES OUT",
				"ANT-MAN",
				"BABYLON",
				"GREEN BOOK",
				"LIFE",
				"ALIEN",
				"GET OUT",
				"DRIVE",
				"OBLIVION",
				"PREY",
				"FIFTY SHADES OF GREY",
				"FIFTY SHADES FREED",
				"FIFTY SHADES DARKER",
				"AFTER",
				"WONDER WOMAN 1984",
				"STRANGE WORLD",
				"HALLOWEEN ENDS",
				"WHITE NOISE",
				"THE MATRIX RESURRECTIONS",
				"HELLRAISER",
				"ETERNALS",
				"THE BLUE LAGOON",
				"THE LOST CITY",
				"TICKET TO PARADISE",
				"JUST GO WITH IT",
				"LEAP YEAR",
				"BLACK ADAM",
				"GODZILLA VS. KONG",
				"THOR: LOVE AND THUNDER",
				"UNCHARTED"
				]
dictionary = ["movie", "film", "movies", "films"]

f = open("words.js", "a")
f.write("export default [")

moviesReviews = defaultdict(list)
with open('movieReviews.csv', newline='') as csvfile:
	reader = csv.DictReader(csvfile)
	for row in reader:
		movieName = row['movie_name']
		if movieName in selectMovie:
			moviesReviews[movieName]
			moviesReviews[movieName].append(row['movie_reviews_mix'])
			
	for movie in selectMovie:
		print(movie)
		text = " ".join(moviesReviews[movie])
		wordcloud = WordCloud(stopwords = STOPWORDS).process_text(text)

		wordcloudJSON = []
		for word in wordcloud:
			if word not in dictionary:
				wordcloudJSON.append({"text": word, "value": wordcloud[word]})
		
		f.write(str(wordcloudJSON))
		f.write(",")
	f.write("];")

f.close()

