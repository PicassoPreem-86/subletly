# Subletly

A modern, full-stack sublet marketplace platform connecting landlords with renters looking for short-term housing solutions.

## Features

### For Landlords
- Create and manage property listings
- Upload property images and details
- Set availability dates and pricing
- Receive and manage inquiries from renters
- Track listing views and engagement

### For Renters
- Browse available sublets with advanced filtering
- Save favorite properties for later
- Send inquiries directly to landlords
- View detailed property information
- Role-based dashboard experience

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Database**: [Supabase PostgreSQL](https://supabase.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [NextAuth.js v5](https://authjs.dev/) + Supabase Auth
- **Data Fetching**: [TanStack React Query](https://tanstack.com/query)
- **Validation**: [Zod](https://zod.dev/)

## Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun
- A Supabase account (free tier works)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/subletly.git
cd subletly
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example environment file and fill in your values:

```bash
cp .env.example .env.local
```

Required environment variables:

```env
# Database (Supabase)
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Set up the database

Generate the Prisma client and push the schema to your database:

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
subletly-app/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── properties/    # Property CRUD endpoints
│   │   ├── inquiries/     # Inquiry management
│   │   └── saved-properties/
│   ├── browse/            # Property browsing page
│   ├── dashboard/         # Role-based dashboards
│   │   ├── landlord/
│   │   └── renter/
│   ├── login/             # Login page
│   ├── signup/            # Registration page
│   └── properties/[id]/   # Property detail page
├── components/            # Reusable React components
├── lib/                   # Utility libraries
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Prisma client singleton
│   ├── supabase.ts       # Supabase client
│   └── validations.ts    # Zod schemas
├── prisma/               # Database schema
│   └── schema.prisma
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/[...nextauth]` - NextAuth.js handlers

### Properties
- `GET /api/properties` - List all properties
- `POST /api/properties` - Create a new property
- `GET /api/properties/[id]` - Get property details
- `PUT /api/properties/[id]` - Update a property
- `DELETE /api/properties/[id]` - Delete a property
- `GET /api/properties/my-listings` - Get landlord's listings
- `POST /api/properties/[id]/view` - Track property view

### Inquiries
- `GET /api/inquiries` - List inquiries
- `POST /api/inquiries` - Create an inquiry

### Saved Properties
- `GET /api/saved-properties` - Get saved properties
- `POST /api/saved-properties` - Save a property
- `DELETE /api/saved-properties` - Remove saved property

## Scripts

```bash
npm run dev       # Start development server with Turbopack
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

## Database Schema

The application uses the following main models:

- **User** - User accounts with role (LANDLORD/RENTER)
- **Property** - Property listings with details and images
- **Inquiry** - Renter inquiries for properties
- **SavedProperty** - User's saved/favorited properties

See `prisma/schema.prisma` for the complete schema definition.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add your environment variables
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- AWS Amplify
- Netlify
- Railway
- Render

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
