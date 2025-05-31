# Wikipedia Q&A Web Scraper

A powerful web scraping and question-answering system that extracts content from Wikipedia pages and provides accurate answers to user queries using semantic similarity and the Gemini API.

## 🚀 Features

- Wikipedia content extraction and processing
- Intelligent text chunking for better context management
- Semantic similarity-based chunk selection
- Integration with Gemini API for accurate answers
- RESTful API endpoint using Flask
- Easy-to-use Postman interface

## 🛠️ Tech Stack

- Python 3.x
- Flask (Web Framework)
- Wikipedia API
- Sentence Transformers
- Gemini API
- NLTK
- Conda (Environment Management)
- Postman (API Testing)

## 📋 Prerequisites

- Python 3.x installed
- Conda package manager
- Postman (for API testing)
- Google AI Studio API key for Gemini

## 🚀 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd webscraper_assignment
```

2. Create and activate Conda environment:
```bash
conda create --name webScraper
conda activate webScraper
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

## 💻 Usage

1. Start the Flask server:
```bash
python webscraper.py
```

2. The server will start and display a local URL (typically `http://127.0.0.1:5000`)

3. Using Postman:
   - Set HTTP method to POST
   - Enter the URL shown in the terminal
   - Set request body to raw JSON
   - Format your query as:
   ```json
   {
       "query": "Your question here"
   }
   ```
   - Click Send to get the response

4. To stop the server, press `Ctrl+C` in the terminal

5. Deactivate the Conda environment when done:
```bash
conda deactivate
```

## 🔧 How It Works

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

## 📝 API Documentation

### Endpoint
```
POST /answer
```

### Request Format
```json
{
    "query": "Your question here"
}
```

### Response Format
```json
{
    "answer": "Generated answer based on Wikipedia content"
}
```

## ⚠️ Limitations

- Queries must be relevant to the Wikipedia page content
- Large Wikipedia pages may require more processing time
- API rate limits may apply for Wikipedia and Gemini API
- Single-threaded processing (not optimized for concurrent queries)

## 🔍 Technical Details

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

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Wikipedia API for content access
- Google AI Studio for Gemini API
- Sentence Transformers library
- Flask framework
- NLTK library 
