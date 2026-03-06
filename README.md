MarketNest – Fashion Marketplace

1)Architecture
React frontend communicates with Node.js backend API.
The backend connects to MongoDB Atlas and Cloudinary for storage.

2)Authentication Flow
1. User signs up with role (Brand or Customer)
2. Password is hashed using bcrypt
3. Login generates JWT access token and refresh token
4. Access token is used for protected routes
5. Refresh token is stored in httpOnly cookie

3)Folder Structure
Explain backend and frontend folders.

4)Security Decisions
Password hashing
JWT authentication
Role-based middleware
Protected routes
Ownership validation for product updates

5) AI Usage
ChatGPT was used for debugging, architecture suggestions, and code improvements.
