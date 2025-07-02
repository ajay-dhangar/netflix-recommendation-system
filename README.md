# 🎬 Netflix Movie Recommendation System using Content-Based Filtering

### 📌 Overview

With an ever-growing library of movies and shows, Netflix prioritizes giving users personalized recommendations. This project builds a **content-based recommendation engine** that suggests movies similar to a given title based on features like genres, cast, and plot descriptions.

![image](https://github.com/user-attachments/assets/8825ab7d-534e-424d-8401-13eb69c6a62d)

---

### 🧠 Objective

To create a movie recommendation system that analyzes the content of movies (metadata) and recommends similar titles using natural language processing and cosine similarity.

![image](https://github.com/user-attachments/assets/385895d5-685f-4352-b211-7c0e87e4c351)

---

### 📊 Dataset

- **Source**: [TMDB 5000 Movie Dataset](https://www.kaggle.com/datasets/tmdb/tmdb-movie-metadata) or [Netflix Movies and TV Shows dataset](https://www.kaggle.com/datasets/shivamb/netflix-shows)
- **Features Used**: Title, Overview, Genre, Cast, Crew, Keywords, etc.

---

### 🧪 Techniques Used

- Content-Based Filtering
- Text Vectorization (TF-IDF / CountVectorizer)
- Cosine Similarity
- Natural Language Processing (NLP)

---

### 🔍 How It Works

1. Combine selected metadata fields into a single string for each movie.
2. Vectorize this text using TF-IDF or CountVectorizer.
3. Compute cosine similarity between vectors.
4. Return top N similar movies to the given input title.

---

### 📈 Sample Results

Given input: `Inception`  
Top 5 Recommendations:
- Interstellar  
- The Matrix  
- Shutter Island  
- Source Code  
- Predestination

---

### ✅ Features

* Personalized recommendations
* Fast similarity matching using cosine distance
* Easy-to-use interactive interface
* Modular and clean code structure

---

### 🧼 Future Improvements

* Add hybrid filtering with user ratings
* Incorporate collaborative filtering
* Deploy with Flask/Docker or on Heroku/Streamlit Cloud

---

### 👨‍💻 Author

* [Ajay Dhangar](https://github.com/ajay-dhangar)

---

### 📄 License

This project is licensed under the [MIT License](/LICENSE).
