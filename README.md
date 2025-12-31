# 🏡 Nestora — Stay anywhere, feel at Home

**Nestora** is a full-stack web application for exploring, creating, and managing property listings (called "Nests").  
It provides a complete accommodation platform where users can list their stays, browse others, and interact through reviews — all with authentication, authorization, and a fully functional interface.

---

## 🚀 Tech Stack

**Frontend:**  
- HTML, CSS, Bootstrap, JavaScript, EJS, Font Awesome for Icons

**Backend:**  
- Node.js  
- Express.js  
- RESTful APIs  

**Database:**  
- MongoDB (via Mongoose)  
- MongoDB Atlas (Cloud Database)

**Authentication:**  
- Passport.js (Local Strategy)

**Utilities & Tools:**  
- Cloudinary (for image uploads)  
- Hoppscotch (for API testing)  
- Mapbox (for maps & geolocation)  
- Express-session + connect-mongo (for session storage)  
- dotenv (for environment variables)

---

### 🏠 Nests Management
- View all Nests without logging in  
- Create, edit, and delete own Nests after login  
- Categorize Nests (e.g., *Rooms*, *Trending*, etc.)  
- Upload and manage images via Cloudinary  
- Each Nest includes:
  - Title, description, price, location, category, and images  
  - Interactive map shown below the listing  

---

### 💬 Reviews
- Any logged-in user can post a review on any Nest  
- Only the review owner can delete their own review  

---

### ⚙️ Additional Functionalities
- **Tax Toggler:**  
  - Show or hide total taxes on all listings (user-controlled)  
- **Map Integration:**  
  - Displays property location below each Nest using Mapbox  
- **Responsive Navbar & Footer:**  
  - Navbar includes a search bar (frontend implemented)  
  - Footer displays site info and social links  

---

### 🧱 Error Handling
- Centralized error management using Express middleware  
- Custom `ExpressError` utility class for clean error reporting  

---

## 🧰 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Gouravjaat07/Nestora.git
cd Nestora

2️⃣ Install Dependencies
npm install

3️⃣ Configure Environment Variables

Create a .env file in the root directory and add the following:

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_secret_key
MAPBOX_TOKEN=your_mapbox_token
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret

4️⃣ Run the Application
node app.js

App will run on:
👉 http://localhost:8080/listings

🧾 API Testing

You can test API routes using Hoppscotch or Postman.

👨‍💻 Author

Gourav
🔗 GitHub</a> | LinkedIn

📜 License

This project is open-source and available under the MIT License.


---

Would you like me to create a **fancier version** (with colorful badges like “Made with Node.js,” “MongoDB,” “Bootstrap,” etc. and emoji headers) to make it stand out on GitHub visually?

