import pandas as pd
import numpy as np
import csv

def read_CSVfile():
    movie = []
    with open("/Users/ginnyhuang/Documents/moviiie-visual-analytics/server/data/movie_test.csv", encoding='utf-8', errors='ignore') as csv_read_file:
            csv_read_data = csv.reader(csv_read_file)
            next(csv_read_data, None) #skip header
            for row in csv_read_data:
                movie.append(row)
    return movie