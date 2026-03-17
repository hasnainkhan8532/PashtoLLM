from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from llama_cpp import Llama
import os

app = FastAPI()

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model
model_path = "qehwa-model/qehwa-q8_0.gguf"
if not os.path.exists(model_path):
    raise RuntimeError(f"Model not found at {model_path}")

print(f"Loading model from {model_path}...")
llm = Llama(
    model_path=model_path,
    n_ctx=2048,
    n_gpu_layers=-1,  # Offload to Metal GPU
    verbose=False
)
print("Model loaded successfully!")

class GenerateRequest(BaseModel):
    prompt: str
    max_tokens: int = 500
    temperature: float = 0.7

@app.post("/generate")
async def generate(request: GenerateRequest):
    try:
        ALPACA_TEMPLATE = """Below is an instruction in Pashto or English. Write a detailed response in Pashto.

### Instruction:
{}

### Response:
"""
        formatted_prompt = ALPACA_TEMPLATE.format(request.prompt)
        
        output = llm(
            formatted_prompt,
            max_tokens=request.max_tokens,
            temperature=request.temperature,
            repeat_penalty=1.1,
            stop=["### Instruction:", "\n\n\n"],
            echo=False
        )
        
        response = output["choices"][0]["text"].strip()
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
