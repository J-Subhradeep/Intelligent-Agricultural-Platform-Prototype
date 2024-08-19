from fastapi import FastAPI, HTTPException, File, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
import uvicorn
import timm
from fastai.vision.all import *
from fastai.learner import load_learner
from io import BytesIO
from PIL import Image
import pickle
from contextlib import contextmanager
import pathlib

model_path = "./ml_models/tomato_dtect/model.pkl"
model = load_learner(model_path)


tomato_cat = ('bacterial_spot', 'early_blight','healthy','late_blight','leaf_mold','mosaic_virus','septoria_leaf_spot',
              'spider_mites_(two_spotted_spider_mite)','target_spot','yellow_leaf_curl_virus')


cat = tomato_cat

# prediction function
def classify_image(categories,model,img):
    pred_class, pred_idx, probs = model.predict(img)
    return dict(zip(categories,map(float,probs)))

def predict_image(file, cat, model):
        # Read the image file

        try:
            image = Image.create(file)
            if image is None:
                raise ValueError("Image could not be loaded.")
        except Exception as e:
                print(f"Error opening image: {e}")
        print(image)

        # Perform prediction using the model
        prediction = classify_image(cat,model,image)

        return JSONResponse(content=jsonable_encoder(prediction), status_code=200)


# Create FastAPI app
app = FastAPI()
#middleware config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/predict")
async def tomato(file: UploadFile = File(...)):
    contents = await file.read()
    return predict_image(contents, tomato_cat, model)



if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)