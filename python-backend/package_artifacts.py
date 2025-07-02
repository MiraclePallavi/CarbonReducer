# python-backend/package_artifacts.py

import pickle
from pathlib import Path

# 1) Point to your existing artifact folder
ART = Path(__file__).parent / "artifacts"
print("Looking in:", ART)
print("Files:", [p.name for p in ART.iterdir() if p.is_file()])

# 2) Manually re-declare the exact cols lists you used when training
categorical_cols = [
    'Body_Type','Sex','Diet','How_Often_Shower',
    'Heating_Energy_Source','Transport','Vehicle_Type',
    'Social_Activity','Frequency_of_Traveling_by_Air',
    'Waste_Bag_Size','Energy_efficiency'
]
numerical_cols = [
    'Monthly_Grocery_Bill','Vehicle_Monthly_Distance_Km',
    'Waste_Bag_Weekly_Count','How_Long_TV_PC_Daily_Hour',
    'How_Many_New_Clothes_Monthly','How_Long_Internet_Daily_Hour'
]
# 3) Load the raw pickles
ohe      = pickle.load(open(ART/"ohe.pkl","rb"))
scaler   = pickle.load(open(ART/"scaler.pkl","rb"))
binary_cols = pickle.load(open(ART/"binary_cols.pkl","rb"))
model    = pickle.load(open(ART/"carbon_footprint_model.pkl","rb"))

# 4) Overwrite ohe.pkl & scaler.pkl as dicts bundling in their cols lists:
with open(ART/"ohe.pkl","wb") as f:
    pickle.dump({"ohe": ohe, "categorical_cols": categorical_cols}, f)

with open(ART/"scaler.pkl","wb") as f:
    pickle.dump({"scaler": scaler, "numerical_cols": numerical_cols}, f)

# 5) Re‑save binary_cols.pkl and model untouched (optional):
#    If you want to keep the originals, write new files instead:
with open(ART/"binary_cols.pkl","wb") as f:
    pickle.dump(binary_cols, f)

with open(ART/"carbon_footprint_model.pkl","wb") as f:
    pickle.dump(model, f)

print("✅ Artifacts re-packaged successfully.")
