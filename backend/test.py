import pandas as pd
import numpy as np
import csv


movies = []

# csv_read_file = pd.read_csv("/Users/ginnyhuang/Documents/moviiie-visual-analytics/backend/data/movie_test.csv", encoding= 'unicode_escape')
# # print(csv_read_file)

# for row in csv_read_file:
#     print(row)
#     movie.append(row)

# print(movie)

with open("/Users/ginnyhuang/Documents/moviiie-visual-analytics/backend/data/movie_test.csv", encoding='utf-8', errors='ignore') as csv_read_file:
        csv_read_data = csv.reader(csv_read_file)
        print(csv_read_data)
        for row in csv_read_data:
            # print(row)
            movies.append(row)


movie_items = []
for i in range(len(movies)):
    movie_items.append({'movie_name': movies[i][0], 'movie_revenue': movies[i][13], 'movie_budget': movies[i][14], 'movie_rating': movies[i][4]})
print(movie_items)