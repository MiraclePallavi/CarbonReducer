from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from predictor import predict_input

app = FastAPI()

@app.post("/predict")
async def predict(request: Request):
    input_dict = await request.json()
    raw_pred = predict_input(input_dict)
    # Cast to a native float
    prediction = float(raw_pred)

    return JSONResponse({"carbon_emission": prediction})
