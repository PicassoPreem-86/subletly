# Contributing to Subletly

Thank you for your interest in contributing to Subletly! This document provides guidelines and information about contributing to this project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How to Contribute

### Reporting Bugs

Before submitting a bug report:
1. Check the existing issues to avoid duplicates
2. Use the bug report template when creating a new issue
3. Include as much detail as possible:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, Node version)

### Suggesting Features

We welcome feature suggestions! When proposing a new feature:
1. Check existing issues and discussions
2. Use the feature request template
3. Explain the problem your feature would solve
4. Describe your proposed solution
5. Consider any alternatives you've thought about

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Install dependencies**: `npm install`
3. **Make your changes** following our coding standards
4. **Test your changes** thoroughly
5. **Run linting**: `npm run lint`
6. **Commit your changes** with a clear, descriptive message
7. **Push to your fork** and submit a pull request

## Development Setup

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun
- A Supabase account for database access

### Local Development

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/subletly.git
cd subletly

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Fill in your environment variables

# Set up the database
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types for all function parameters and return values
- Avoid using `any` type
- Use interfaces for object shapes

### React Components

- Use functional components with hooks
- Keep components focused and small
- Use proper naming conventions (PascalCase for components)
- Add proper TypeScript props interfaces

### Styling

- Use Tailwind CSS for styling
- Follow the existing design patterns
- Ensure responsive design for all components

### API Routes

- Use proper HTTP methods (GET, POST, PUT, DELETE)
- Validate input with Zod schemas
- Return appropriate status codes
- Include proper error handling

### Commits

- Write clear, concise commit messages
- Use present tense ("Add feature" not "Added feature")
- Reference issue numbers when applicable

## Project Structure

```
subletly-app/
├── app/          # Next.js App Router pages and API routes
├── components/   # Reusable React components
├── lib/          # Utility functions and configurations
├── prisma/       # Database schema
├── public/       # Static assets
└── types/        # TypeScript type definitions
```

## Testing

Before submitting a PR, ensure:
- Your code builds without errors: `npm run build`
- Linting passes: `npm run lint`
- Your changes work as expected in the browser

## Questions?

If you have questions about contributing, feel free to:
- Open a discussion on GitHub
- Check existing issues for similar questions

Thank you for contributing to Subletly!
