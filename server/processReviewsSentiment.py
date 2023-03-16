from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import csv
from collections import defaultdict

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
				"UNCHARTED",
				]


sid_obj = SentimentIntensityAnalyzer()

moviesSentiments = defaultdict(list)
with open('movieReviews.csv', newline='') as csvfile:
	reader = csv.DictReader(csvfile)
	for row in reader:
		movieName = row['movie_name']
		if movieName in selectMovie:
			moviesSentiments[movieName]
			moviesSentiments[movieName].append(row['movie_reviews_mix'])

	for movie in selectMovie:
		text = " ".join(moviesSentiments[movie])
		wordSentiment = sid_obj.polarity_scores(text)
		print(movie, end="")
		# print(wordSentiment['compound'])
		if wordSentiment['compound'] >= 0.9995:
			print(": Positive")
		elif wordSentiment['compound'] <= -0.99:
			print(": Negative")
		else:
			print(": Neutral")



