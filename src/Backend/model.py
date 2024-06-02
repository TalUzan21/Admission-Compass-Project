import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# Load the dataset
df = pd.read_csv('student_data_final_testing.csv')

# Mapping dictionary for degree types
degree_mapping = {'B.Sc.': 1, 'M.Sc.': 2, 'B.A.': 3, 'M.A.': 4}  # Assign 0 to represent unknown types

# Convert string values to numeric
df['Type'] = df['Type'].map(degree_mapping)

# Identify features and target
target = df['accepted']
train_data = df.drop('accepted', axis=1)

# Save feature names to a file
feature_names = train_data.columns.tolist()
with open('feature_names.pkl', 'wb') as f:
    pickle.dump(feature_names, f)

# Split the data
X_train, X_test, y_train, y_test = train_test_split(train_data, target, test_size=0.3, random_state=101)

# Train the model
random_forest = RandomForestClassifier(n_estimators=100, random_state=42)
random_forest.fit(X_train, y_train)

# Save the trained model
with open('rf.pkl', 'wb') as f:
    pickle.dump(random_forest, f)


# Function to preprocess data
def preprocess_data(data, feature_names):
    df = pd.DataFrame([data])
    df = df.reindex(columns=feature_names)
    return df

# Function to compute SHAP values
def compute_shap_values(model, X_train, X_filtered):
    import shap
    explainer = shap.Explainer(model, X_train)
    shap_values = explainer(X_filtered)
    return shap_values
