from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pickle
import matplotlib
import matplotlib.pyplot as plt
import base64
from io import BytesIO
from model import preprocess_data, compute_shap_values, X_train
import numpy as np
import shap

matplotlib.use('Agg')
# Create a Flask application instance
app = Flask(__name__)

# Enable CORS for all routes, allowing requests from any origin
CORS(app, resources={r"/*": {"origins": "*"}})

# Load the dataset and model
df = pd.read_csv('student_data_final_testing.csv')
# Mapping dictionary for degree types
degree_mapping = {'B.Sc.': 1, 'M.Sc.': 2, 'B.A.': 3, 'M.A.': 4}  # Assign 0 to represent unknown types
# Convert string values to numeric
df['Type'] = df['Type'].map(degree_mapping)

# Load the model and feature names
with open('feature_names.pkl', 'rb') as f:
    feature_names = pickle.load(f)
rf = pickle.load(open('rf.pkl', 'rb'))

# Define a route for handling HTTP GET requests to the root URL
@app.route('/', methods=['GET'])
def get_data():
    data = {
        "message": "API is Running"
    }
    return jsonify(data)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        query_df = preprocess_data(data, feature_names)
        prediction = rf.predict(query_df)
        prediction = list(map(int, prediction))
        return jsonify({'Prediction': prediction})
    except Exception as e:
        return jsonify({'error': str(e)})

# Define a route for SHAP analysis
@app.route('/shap', methods=['POST'])
def shap_analysis():
    try:
        data = request.get_json()
        institution_id = data.get('institution_id', None)
        Type = data.get('Type', None)
        
        # Filter data based on institution ID or degree ID
        filtered_data = df
        if institution_id is not None:
            filtered_data = filtered_data[filtered_data['institution_id'] == institution_id]
        if Type is not None:
            filtered_data = filtered_data[filtered_data['Type'] == Type]
        
        # Preprocess the filtered data
        X_filtered = filtered_data.drop('accepted', axis=1)
        
        # Compute SHAP values
        shap_values = compute_shap_values(rf, X_train, X_filtered)
        shap_values_for_positive_class = shap_values.values[..., 1]

        # Ensure the shapes match
        assert shap_values_for_positive_class.shape[0] == X_filtered.shape[0], "Mismatch in number of rows between SHAP values and filtered data"
        assert shap_values_for_positive_class.shape[1] == X_filtered.shape[1], "Mismatch in number of columns between SHAP values and filtered data"

        # Calculate mean absolute SHAP value for each feature
        feature_importances = np.mean(np.abs(shap_values_for_positive_class), axis=0)

        # Create a DataFrame to display the feature importances
        feature_importances_df = pd.DataFrame({
            'Feature': feature_names,
            'Importance': feature_importances
        })

        # Sort the DataFrame by importance
        feature_importances_df = feature_importances_df.sort_values(by='Importance', ascending=False)
        
        # Print the feature importances
        print(feature_importances_df)

          # Convert DataFrame to JSON and return
        return feature_importances_df.to_json(orient='records')
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
