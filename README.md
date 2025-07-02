<h1 align="center">🌱 CARBONREDUCER</h1>
<p align="center"><i>Transforming Data into a Greener Future</i></p>

<p align="center">
  <img src="https://img.shields.io/badge/last%20commit-today-brightgreen" />
  <img src="https://img.shields.io/badge/typescript-88.5%25-blue" />
  <img src="https://img.shields.io/badge/languages-4-purple" />
</p>

---

## 🛠️ Built with the tools and technologies

<p align="center">
  <img src="https://img.shields.io/badge/-JSON-black?logo=json&logoColor=white" />
  <img src="https://img.shields.io/badge/-Markdown-000000?logo=markdown&logoColor=white" />
  <img src="https://img.shields.io/badge/-npm-red?logo=npm&logoColor=white" />
  <img src="https://img.shields.io/badge/-Mongoose-orange?logo=mongoose&logoColor=white" />
  <img src="https://img.shields.io/badge/-scikit--learn-f7931e?logo=scikit-learn&logoColor=white" />
  <img src="https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/-NumPy-013243?logo=numpy&logoColor=white" />
  <img src="https://img.shields.io/badge/-Python-3776AB?logo=python&logoColor=white" />
  <br />
  <img src="https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/-Zod-3b82f6" />
  <img src="https://img.shields.io/badge/-ESLint-4B32C3?logo=eslint&logoColor=white" />
  <img src="https://img.shields.io/badge/-pandas-150458?logo=pandas&logoColor=white" />
  <img src="https://img.shields.io/badge/-Axios-5A29E4?logo=axios&logoColor=white" />
  <img src="https://img.shields.io/badge/-dateFns-FF69B4" />
  <img src="https://img.shields.io/badge/-React%20Hook%20Form-EC5990?logo=reacthookform&logoColor=white" />
  <img src="https://img.shields.io/badge/-Appwrite-F02E65?logo=appwrite&logoColor=white" />
</p>

---

## 📑 Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [License](#license)

---

## 🔍 Overview

CarbonReducer is a full-stack, AI-powered platform that tracks users' carbon emissions based on their habits and lifestyle choices. It offers personalized insights, visual analytics, and practical recommendations to promote more sustainable living.

## 🚀 Getting Started

### 📋 Prerequisites

This project requires the following dependencies:

- **Programming Language:** TypeScript
- **Package Manager:** Npm, Pip

---

### 🛠️ Installation

Build CarbonReducer from the source and install dependencies:

1. 🔁 Clone the repository:

```bash
git clone https://github.com/MiraclePallavi/CarbonReducer
````

2. 📁 Navigate to the project directory:

```bash
cd CarbonReducer
```

3. 🔧 Install frontend dependencies:

```bash
npm install
```

4. 🐍 Set up the Python backend:

```bash
cd python-backend
python -m venv .venv
source .venv/bin/activate  # On Windows use .venv\Scripts\activate
pip install -r requirements.txt
```

5. ⚙️ Configure Appwrite (authentication and DB):

Make sure the Appwrite server is running and your `.env.local` file contains:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://<your-endpoint>
NEXT_PUBLIC_APPWRITE_PROJECT=<your-project-id>
```

6. 🔌 Start the servers:

Start the backend server:

```bash
cd python-backend
uvicorn app:app --reload
```

Start the frontend server:

```bash
npm run dev
```

> ✅ The application will be running at [http://localhost:3000](http://localhost:3000)

```

Let me know if you also want the README header or feature section code to match the style you showed earlier.
```

## 🚀 Features

- 🌎 Tracks and compares personal carbon footprint over time  
- 📊 Visualizes trends and emissions statistics  
- 🧾 Provides actionable recommendations to reduce emissions  
- 🔐 Authenticated user sessions using Appwrite  
- ☁️ MongoDB storage for historical user data  

---

## 🧰 Tech Stack

- Frontend: React, Next.js, Tailwind CSS, shadcn/ui  
- Backend: FastAPI, Python (NumPy, pandas, scikit-learn)  
- Auth & DB: Appwrite, MongoDB with Mongoose  
- Dev Tools: TypeScript, Zod, ESLint, Axios, date-fns  

---

## 🤝 Contributing

Feel free to open issues or submit pull requests! Contributions are welcome.

---

## 📄 License

This project is licensed under the MIT License.
