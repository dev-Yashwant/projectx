import random
from datetime import datetime, timedelta
import json
import math

# Function to generate random comments
def generate_comments(num_comments):
    global positive_words
    # Commonly used words for generating comments
    positive_words = ["Great", "Nice", "Excellent", "Amazing", "Awesome", "Fantastic", "Superb", "Impressive", "Outstanding", "Brilliant"]
    negative_words = ["Terrible", "Horrible", "Awful", "Bad", "Disappointing", "Poor", "Worst", "Trash", "Unsatisfactory", "Disgusting"]
    
    comments = []
    for _ in range(num_comments):
        words = positive_words if random.random() < 0.5 else negative_words  # Choose positive or negative words randomly
        comment_length = random.randint(1, 5)  # Generate random comment length
        comment = " ".join([random.choice(words) for _ in range(comment_length)]) + "!"
        comments.append(comment)
    return comments

# Function to calculate sub-rating
def calculate_subrating(value, max_value):
    if value == 0:
        return 0
    return int(100 * math.log(1 + value) / math.log(1 + max_value))

# Function to calculate rating
def calculate_rating(account_age_days, followers, following, num_posts, comments):
    # Calculate sub-ratings for each feature
    subrating_followers = calculate_subrating(followers, 5000)
    subrating_following = calculate_subrating(following, 1500)
    subrating_posts = calculate_subrating(num_posts, 50)
    subrating_age = calculate_subrating(account_age_days, 3 * 365)
    
    # Calculate average sub-rating
    average_subrating = (subrating_followers + subrating_following + subrating_posts + subrating_age) / 4
    
    # Calculate sentiment ratio
    if not comments:
        sentiment_ratio = 0
    else:
        num_positive_comments = sum(1 for comment in comments if any(word in comment.lower() for word in positive_words))
        sentiment_ratio = num_positive_comments / len(comments)
    
    # Calculate final rating
    rating = int((sentiment_ratio * 100 + average_subrating) / 2)
    
    return rating

# Generate training data
training_data = []

# Generate 100 elements
for _ in range(100):
    # Generate random values for features
    followers = random.randint(500, 5000)
    following = random.randint(200, 1500)
    join_date = datetime.now() - timedelta(days=random.randint(1, 365*3))  # Variable joining dates (up to 3 years)
    num_posts = random.randint(10, 50)
    
    # Generate positive and negative comments (same number)
    num_comments = 20  # Generate exactly 20 comments
    comments = generate_comments(num_comments)
    
    # Calculate account age in days
    account_age_days = (datetime.now() - join_date).days
    
    # Calculate rating
    rating = calculate_rating(account_age_days, followers, following, num_posts, comments)
    
    # Create a dictionary for the entry
    entry = {
        "no of followers": followers,
        "no of following": following,
        "date of joining": join_date.strftime('%Y-%m-%d'),
        "no of post": num_posts,
        "comments": comments,
        "rating": rating
    }
    
    training_data.append(entry)

# Write data to JSON file
with open('training_data.json', 'w') as file:
    json.dump(training_data, file, indent=4)

print("Training data created and saved to 'training_data.json'")
