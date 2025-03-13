from beanie import Document

# Documents needs to be added to the document_models list in the config.py file
class ExampleDocument(Document):
    name: str
    
    
    