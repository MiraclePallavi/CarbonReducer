import pandas as pd, pickle
from pathlib import Path
import os
here = Path(__file__).resolve().parent
ART = next(
    (p for p in [here/"artifacts", here.parent/"artifacts"] if p.exists()),
    None
)

# DEBUG: show the resolved path & contents
print("🔎 predictor.py __file__:", Path(__file__).resolve())
print("🔎 Searching ART directory at:", ART)
if ART:
    print("🔎 ART contains:", os.listdir(ART))
else:
    print("⚠️ ART folder not found!")

# Now load your files:
if ART is None:
    raise FileNotFoundError("ART directory not found. Please ensure the 'artifacts' folder exists in the expected location.")

with open(ART / "ohe.pkl", "rb") as f:
    tmp = pickle.load(f)
    ohe, categorical_cols = tmp["ohe"], tmp["categorical_cols"]

with open(ART / "scaler.pkl", "rb") as f:
    tmp = pickle.load(f)
    scaler, numerical_cols = tmp["scaler"], tmp["numerical_cols"]

with open(ART/"binary_cols.pkl","rb") as f:
    binary_cols = pickle.load(f)

# 🛠 Ensure it's a plain list of column names:
if isinstance(binary_cols, dict):
    # if you accidentally pickled a dict, take its keys
    binary_cols = list(binary_cols.keys())
elif not isinstance(binary_cols, list):
    # if it’s some other iterable, convert
    binary_cols = list(binary_cols)

with open(ART / "carbon_footprint_model.pkl", "rb") as f:
    model = pickle.load(f)


def expand_multiselect_column(df, col):
    df = df.copy()
    df[col] = df[col].apply(lambda x: eval(x) if isinstance(x, str) else [])
    for item in sorted({item for sublst in df[col] for item in sublst}):
        df[f"{col}_{item}"] = df[col].apply(lambda lst: item in lst)
    return df.drop(columns=[col])

def prepare_input(input_dict):
    # 1) Raw → DataFrame
    df = pd.DataFrame([input_dict])
    # Debug
    print("df columns:", df.columns.tolist())
    print("df[categorical_cols] cols:", [c for c in categorical_cols if c in df.columns])

    # 2) Normalize column names
    df.columns = df.columns.str.replace(" ", "_")

    # 3) Expand multi‑selects
    df = expand_multiselect_column(df, "Recycling")
    df = expand_multiselect_column(df, "Cooking_With")

    # 4) One‑hot & scale
    X_cat = ohe.transform(df[categorical_cols])
    X_num = scaler.transform(df[numerical_cols])

    # 5) Derive binary indicator columns on the fly
    used = set(categorical_cols) | set(numerical_cols)
    # All other columns in df are your binary flags
    bin_cols = [col for col in df.columns if col not in used]
    X_bin = df[bin_cols].reset_index(drop=True)

    # 6) Build DataFrames
    X_cat = pd.DataFrame(X_cat, columns=ohe.get_feature_names_out(categorical_cols))
    X_num = pd.DataFrame(X_num, columns=numerical_cols)

    # 7) Concatenate
    full = pd.concat([X_cat, X_num, X_bin], axis=1)

    # 8) Align to model’s expected features
    expected = (
        model.get_booster().feature_names
        if hasattr(model, "get_booster")
        else model.feature_names_in_
    )
    full = full.reindex(columns=expected, fill_value=0)

    return full

def predict_input(input_dict):
    Xp = prepare_input(input_dict)
    return model.predict(Xp)[0]
