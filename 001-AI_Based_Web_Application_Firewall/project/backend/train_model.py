import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline
import pickle
import os

# Create models directory if it doesn't exist
os.makedirs('models', exist_ok=True)

# Load the datasets
train_data = pd.read_csv('../../SQL/train_data.csv')  # Adjust path to your dataset

# Preprocess the queries
def preprocess_query(query):
    query = query.lower()
    query = query.replace(';', '')
    return query

train_data['Query'] = train_data['Query'].apply(preprocess_query)

# Initialize CountVectorizer and transform data
vectorizer = CountVectorizer()
X_train = vectorizer.fit_transform(train_data['Query'])
y_train = train_data['Label']

# Remove rows with NaN values in y_train
non_nan_indices = ~y_train.isna()
X_train = X_train[non_nan_indices]
y_train = y_train[non_nan_indices]

# Create a pipeline that scales the data and trains Logistic Regression
lr_model = make_pipeline(StandardScaler(with_mean=False), LogisticRegression(max_iter=1000))

# Train the model
lr_model.fit(X_train, y_train)

# Save the trained Logistic Regression model
with open('models/lr_model.pkl', 'wb') as file:
    pickle.dump(lr_model, file)

# Save the fitted vectorizer
with open('models/vectorizer.pkl', 'wb') as file:
    pickle.dump(vectorizer, file)

print("Model and vectorizer saved!")
