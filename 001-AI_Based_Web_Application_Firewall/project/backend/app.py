from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report
import os
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load the dataset
train_data = pd.read_csv('../../SQL/train_data.csv')

# Check for NaN values in the dataset
print("Checking for NaN values in the dataset:")
print(train_data.isnull().sum())

# Drop rows with NaN values in the 'Label' column
train_data.dropna(subset=['Label'], inplace=True)

# Optionally, drop or fill NaN values in other relevant columns, if necessary
# train_data.fillna('', inplace=True)  # Fill NaNs in other columns if needed

# Check class distribution after handling NaN values
print("Class distribution after cleaning NaN values:")
print(train_data['Label'].value_counts())

# Vectorization
vectorizer = CountVectorizer(stop_words='english', max_features=1000)
X = vectorizer.fit_transform(train_data['Query'])
y = train_data['Label']

# Split the data
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
lr_model = LogisticRegression(max_iter=1000)
lr_model.fit(X_train, y_train)

# Evaluate the model
y_pred = lr_model.predict(X_val)
print(classification_report(y_val, y_pred))

# Prediction route
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    query = data.get('query')

    # Preprocess the query
    query = query.lower().replace(';', '')
    query_transformed = vectorizer.transform([query])

    print("Transformed Query:", query_transformed.toarray())  # Debug output

    lr_prediction = lr_model.predict(query_transformed)
    
    return jsonify({
        'Prediction': int(lr_prediction[0])
    })

if __name__ == '__main__':
    app.run(debug=True)
