# Wikipedia Q&A Web Scraper

A powerful web scraping and question-answering system that extracts content from Wikipedia pages and provides accurate answers to user queries using semantic similarity and the Gemini API.

## Features

- Wikipedia content extraction and processing
- Intelligent text chunking for better context management
- Semantic similarity-based chunk selection
- Integration with Gemini API for accurate answers
- RESTful API endpoint using Flask
- Easy-to-use Postman interface

## Tech Stack

- Python 3.x
- Flask (Web Framework)
- Wikipedia API
- Sentence Transformers
- Gemini API
- NLTK
- Conda (Environment Management)
- Postman (API Testing)

## Prerequisites

- Python 3.x installed
- Conda package manager
- Postman (for API testing)
- Google AI Studio API key for Gemini

## How It Works

### 1. Web Scraping and Content Processing
- Extracts content from Wikipedia pages using the Wikipedia API
- Processes and tokenizes the content
- Creates manageable chunks for better context handling

### 2. Semantic Similarity and Chunk Selection
- Uses sentence transformers to generate embeddings
- Implements cosine similarity to find relevant chunks
- Selects top 3 most relevant chunks for query processing

### 3. Query Processing
- Processes user queries through the Gemini API
- Combines relevant chunks with the query
- Generates accurate, context-aware responses

### 4. API Endpoint
- Flask-based REST API
- Accepts POST requests with JSON queries
- Returns responses in JSON format

## Limitations

- Queries must be relevant to the Wikipedia page content
- Large Wikipedia pages may require more processing time
- API rate limits may apply for Wikipedia and Gemini API
- Single-threaded processing (not optimized for concurrent queries)

## Technical Details

### Key Components

1. **Content Extraction**
   - Wikipedia API integration
   - Page content processing
   - Text tokenization using NLTK

2. **Chunking System**
   - Configurable chunk size
   - Word-based tokenization
   - Semantic chunk selection

3. **Similarity Processing**
   - Sentence transformer embeddings
   - Cosine similarity calculations
   - Top-k chunk selection

4. **Query Processing**
   - Gemini API integration
   - Context-aware answer generation
   - JSON response formatting 
