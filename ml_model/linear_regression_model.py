import json
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import mean_squared_error
from datetime import datetime

# Load data from JSON file
with open("training_data.json", "r") as file:
    data = json.load(file)

# Function to preprocess the data
def preprocess_data(data):
    X = []
    y = []
    comments_list = []  # List to store all comments
    for entry in data:
        # Extracting features
        features = [
            int(entry["no of followers"]),
            int(entry["no of following"]),
            int(datetime.strptime(entry["date of joining"], '%Y-%m-%d').timestamp()),  # Converting date to timestamp
            int(entry["no of post"]),
            # You can add more features as needed
        ]
        # Concatenate all comments for this entry into a single string
        comments_str = ' '.join(entry["comments"])
        comments_list.append(comments_str)
        X.append(features)
        # Assuming the rating is provided in the data
        y.append(int(entry["rating"]))

    return X, y, comments_list

# Preprocess the data
X, y, comments_list = preprocess_data(data)

# Split the data into training and testing sets
X_train, X_test, y_train, y_test, comments_train, comments_test = train_test_split(X, y, comments_list, test_size=0.2, random_state=42)

# Convert comments into TF-IDF features
tfidf_vectorizer = TfidfVectorizer(max_features=1000)  # You can adjust the max_features as needed
tfidf_train = tfidf_vectorizer.fit_transform(comments_train)
tfidf_test = tfidf_vectorizer.transform(comments_test)

# Combine numeric features with TF-IDF features
X_train_combined = np.hstack((X_train, tfidf_train.toarray()))
X_test_combined = np.hstack((X_test, tfidf_test.toarray()))

# Train the model
model = LinearRegression()
model.fit(X_train_combined, y_train)

# Evaluate the model
y_pred = model.predict(X_test_combined)
mse = mean_squared_error(y_test, y_pred)
print("Mean Squared Error:", mse)

# Example of using the model for new data entry
new_entry = {
    "no of followers": 1000,
    "no of following": 500,
    "date of joining": "2022-01-01",
    "no of post": 50,
    "comments": ["Great job!", "Keep it up"],
    # You can add more features as needed
}
new_entry_features = [
    new_entry["no of followers"],
    new_entry["no of following"],
    int(datetime.strptime(new_entry["date of joining"], '%Y-%m-%d').timestamp()),
    new_entry["no of post"]
]
new_entry_comments = ' '.join(new_entry["comments"])
new_entry_tfidf = tfidf_vectorizer.transform([new_entry_comments])
new_entry_features_combined = np.hstack((new_entry_features, new_entry_tfidf.toarray().flatten()))  # Flatten TF-IDF array
predicted_rating = model.predict([new_entry_features_combined])
print("Predicted Rating:", predicted_rating[0])
