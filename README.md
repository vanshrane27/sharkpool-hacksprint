# Shark Pool

Shark Pool is an online platform inspired by **Shark Tank**, enabling startup founders to pitch their ideas and investors to explore and invest in promising startups. Built with **Vite (React) and Firebase**, this platform streamlines the startup investment process with a structured dashboard for both **investors** and **startup owners**.

## 🚀 Features

### 🌍 Home Page
- A common landing page themed around **#MakeInIndia**.

### 🔑 Authentication (Firebase)
- User **registration and login** for both **Investors** and **Startup Owners**.
- Firebase **authentication and storage**.

### 🏦 Investor Dashboard
1. **List of all registered startups**.
2. **View startup details** (info filled by startup owners).
3. **Invest in a startup** by filling an investment form:
   - Equity percentage
   - Investment amount
   - Total valuation (auto-calculated)
4. **Investment Requests**:
   - "Pending Investments"
   - "Approved Investments"

### 📈 Startup Owner Dashboard
1. **Register as a startup owner**.
2. **Host a Startup** by filling in details:
   - Organization Name
   - Founder & Co-founder(s) Name(s)
   - Equity and Investment Ask
   - Company Domain (e.g., "Healthcare", "Sustainable")
   - Pitching Video Link
   - Website Link
3. **Hosted Startups**: View and manage startups hosted by the user.
4. **Investment Requests**:
   - View received investment requests.
   - Accept or reject investment offers.
   - Send acknowledgment notifications to investors upon acceptance.

---

## 🛠️ Tech Stack
- **Frontend**: React (Vite) Tailwind CSS
- **Backend**: Firebase
- **Database & Storage**: Firebase Firestore & Firebase Storage
- **Authentication**: Firebase Auth

## 📂 Project Setup
### Clone the Repository
```sh
git clone https://github.com/vanshrane27/sharkpool-hacksprint.git
cd sharkpool-hacksprint
```

### Install Dependencies
```sh
npm install
```

### Set Up Environment Variables
Create a `.env` file in the root directory and add:
```sh
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Run the Application
```sh
npm run dev
```

---

## 🤝 Contributing
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m "Add feature"`
4. Push to branch: `git push origin feature-name`
5. Open a Pull Request.

## 📜 License
This project is **open-source** and available under the **MIT License**.

---

💡 *Join India Startup Nexus and revolutionize online startup investments!* 🚀

