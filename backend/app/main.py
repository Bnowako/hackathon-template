from app.config import create_app


app = create_app()

@app.get("/status")
async def main():
    return {"status": "OK"}

