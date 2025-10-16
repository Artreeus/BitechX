# BitechX Products Management

A modern, full-featured product management application built with Next.js 15 (App Router), React, Redux Toolkit, and Tailwind CSS.

## 🎨 Design

This application features a polished, modern UI using a carefully selected color palette:

- **Rich Black** (#0D1821) - Primary dark color
- **Anti-flash White** (#EFF1F3) - Background color
- **Hooker's Green** (#4E6E5D) - Primary accent color
- **Lion** (#AD8A64) - Secondary accent color
- **Chestnut** (#A44A3F) - Error/danger color

## ✨ Features

### Authentication
- Simple email-based authentication
- JWT token management with Redux
- Persistent sessions using localStorage
- Protected routes with automatic redirects

### Product Management
- **Browse Products**: Paginated product listing with responsive grid layout
- **Search**: Real-time search by product name with debouncing
- **Filter**: Filter products by category
- **Create**: Add new products with comprehensive validation
- **Edit**: Update existing products
- **Delete**: Remove products with confirmation dialogs
- **Details**: View full product information with image gallery

### Advanced Features
- **Pagination**: Navigate through products with offset-based pagination
- **Category Management**: Select categories when creating/editing products
- **Image Gallery**: Support for multiple product images with preview
- **Form Validation**: Client-side validation with inline error messages
- **Error Handling**: Graceful error states with retry functionality
- **Loading States**: Beautiful loading spinners for better UX
- **Responsive Design**: Mobile-first design that works on all devices
- **Cache Management**: Redux state management with automatic updates

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 18
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Language**: TypeScript
- **Image Optimization**: Next.js Image component

## 📦 Installation

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd bitechx
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
```bash
npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy your Next.js application.

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Click "Deploy"

Your app will be live in minutes!

### Deploy to Netlify

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop your `.next` folder
   - Or connect your GitHub repository

### Environment Variables

No environment variables are required for this application. The API base URL is configured directly in the code.

If you want to make it configurable:

1. Create a `.env.local` file:
   ```
   NEXT_PUBLIC_API_URL=https://api.bitechx.com
   ```

2. Update `lib/api/client.ts` to use the environment variable.

## 📖 Usage

### Login

1. Navigate to the login page
2. Enter your email address (use the same email from your job application)
3. Click "Sign In"
4. You'll receive a JWT token and be redirected to the products page

### Managing Products

#### Browse Products
- View all products in a responsive grid
- Use pagination to navigate through pages
- See product details including name, description, price, and category

#### Search Products
- Use the search bar to find products by name
- Results update in real-time as you type
- Clear search to return to paginated view

#### Filter by Category
- Select a category from the dropdown to filter products
- Combine with search for refined results
- Clear filters to view all products

#### Create a Product
1. Click "Add Product" in the navigation
2. Fill in all required fields:
   - Product Name (min 3 characters)
   - Description (min 10 characters)
   - Price (must be > 0)
   - Category (select from dropdown)
   - At least one image URL
3. Add multiple images if needed
4. Click "Create Product"

#### Edit a Product
1. Click "Edit" on any product card or detail page
2. Modify the fields you want to change
3. Click "Update Product"

#### Delete a Product
1. Click "Delete" on any product card or detail page
2. Confirm the deletion in the popup dialog
3. The product will be removed from your list

#### View Product Details
- Click on any product card to view full details
- See all product images in a gallery
- View product metadata (ID, created date, updated date)
- Quick access to Edit and Delete actions

## 🎯 Features Checklist

### Core Requirements ✅
- [x] Authentication with JWT token management
- [x] Login/logout functionality
- [x] Protected routes
- [x] Product listing with pagination
- [x] Real-time search by product name
- [x] Create product with category
- [x] Edit product with category update
- [x] Delete product with confirmation
- [x] Product details page
- [x] Client-side validation (all fields)
- [x] Error handling and display
- [x] Loading states
- [x] Cache management with Redux
- [x] Responsive design (mobile + desktop)

### Bonus Features ✅
- [x] Filter products by category
- [x] Multiple image support with gallery
- [x] Smooth animations and transitions
- [x] Modern, polished UI with custom color palette
- [x] Image optimization with Next.js Image
- [x] Debounced search for better performance
- [x] Active filter display with clear option
- [x] Empty states with helpful messages
- [x] Form field validation with inline errors
- [x] Keyboard navigation support (Escape to close modals)
- [x] Accessible UI components

## 🏗 Project Structure

```
bitechx/
├── app/                          # Next.js App Router
│   ├── login/                    # Login page
│   ├── products/                 # Products pages
│   │   ├── [slug]/              # Product detail page
│   │   ├── edit/[id]/           # Edit product page
│   │   └── new/                 # Create product page
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page (redirect)
│   ├── providers.tsx            # Redux provider
│   └── globals.css              # Global styles
├── components/                   # Reusable components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Textarea.tsx
│   ├── Select.tsx
│   ├── Modal.tsx
│   ├── ConfirmDialog.tsx
│   ├── LoadingSpinner.tsx
│   ├── ErrorMessage.tsx
│   ├── Navbar.tsx
│   └── ProductCard.tsx
├── lib/                         # Business logic
│   ├── api/                     # API clients
│   │   ├── client.ts           # Axios instance
│   │   ├── auth.ts             # Auth API
│   │   ├── products.ts         # Products API
│   │   └── categories.ts       # Categories API
│   ├── features/               # Redux slices
│   │   ├── auth/
│   │   ├── products/
│   │   └── categories/
│   ├── store.ts                # Redux store
│   └── hooks.ts                # Redux hooks
├── public/                      # Static assets
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🧪 Validation Rules

### Product Name
- Required
- Minimum 3 characters

### Description
- Required
- Minimum 10 characters

### Price
- Required
- Must be a valid number
- Must be greater than 0
- Must be less than 1,000,000

### Category
- Required
- Must select from available categories

### Images
- At least one image URL required
- Must be valid URLs (starting with http:// or https://)
- Support for multiple images

## 🎨 UI/UX Highlights

- **Modern Design**: Clean, professional interface with attention to spacing and typography
- **Color Consistency**: Carefully applied color palette throughout the application
- **Smooth Animations**: Subtle transitions and hover effects
- **Responsive Layout**: Mobile-first design that scales beautifully
- **Loading States**: Clear feedback during asynchronous operations
- **Error Handling**: User-friendly error messages with retry options
- **Empty States**: Helpful messages when no data is available
- **Form Validation**: Real-time inline validation with clear error messages
- **Confirmation Dialogs**: Prevent accidental deletions
- **Image Gallery**: Beautiful product image display with thumbnails
- **Accessibility**: Keyboard navigation and semantic HTML

## 📝 API Integration

The application integrates with the BitechX API:

- **Base URL**: https://api.bitechx.com
- **Authentication**: JWT Bearer token
- **Content-Type**: application/json

### Endpoints Used

- `POST /auth` - Get authentication token
- `GET /products` - List products with pagination
- `GET /products/search` - Search products
- `GET /products/:slug` - Get product by slug
- `POST /products` - Create product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product
- `GET /categories` - List categories

## 🤝 Contributing

This is a job application project. For any questions or issues, please contact the repository owner.

## 📄 License

This project is private and proprietary.

## 👤 Author

Built with ❤️ for BitechX job application

---

**Note**: Make sure to use the same email address for authentication that you used in your job application.
"# BitechX" 
