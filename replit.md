# IEO Application System

## Overview

This is a full-stack web application for IEO (International Economic Organization), a financial assistance organization. The system allows users to apply for grants and submit contact inquiries through a modern, responsive web interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **Styling**: Tailwind CSS with custom IEO branding
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: React Query for server state, React hooks for local state
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript (ESM modules)
- **Data Storage**: In-memory storage (MemStorage class) with interface for future database integration
- **API**: RESTful endpoints for applications and contact submissions
- **Development**: Vite for hot module replacement and development server

### Build System
- **Bundler**: Vite for client-side code
- **Server Bundler**: esbuild for production server bundle
- **Package Manager**: npm
- **TypeScript**: Strict configuration with path aliases

## Key Components

### Database Schema (Prepared for PostgreSQL)
The application uses Drizzle ORM with PostgreSQL schema definitions but currently runs with in-memory storage:

- **Applications Table**: Stores grant application data including personal information, financial details, and document references
- **Contact Submissions Table**: Stores contact form submissions with basic inquiry information

### API Endpoints
- `POST /api/applications` - Submit new grant applications
- `GET /api/applications` - Retrieve all applications (admin endpoint)
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Retrieve all contact submissions (admin endpoint)

### Frontend Pages
- **Home Page** (`/`): Landing page with hero carousel, services overview, team information, testimonials, and contact form
- **Apply Page** (`/apply`): Comprehensive grant application form with file upload capabilities
- **Team Bio Pages** (`/team/:name`): Individual team member profile pages
- **404 Page**: Not found error page

### UI Component System
- Custom theme with FESSA brand colors (blue primary, neutral base)
- Comprehensive component library based on Radix UI
- Responsive design patterns
- Accessible form controls and navigation

## Data Flow

1. **User Interaction**: Users navigate through the site and fill out forms
2. **Form Validation**: Client-side validation using Zod schemas
3. **API Requests**: React Query handles server communication
4. **Server Processing**: Express routes validate and process requests
5. **Data Storage**: Currently stored in memory, ready for database integration
6. **Response Handling**: Success/error feedback through toast notifications

## External Dependencies

### Core Framework Dependencies
- React ecosystem (React, React DOM, React Query)
- Express.js for server framework
- Wouter for client-side routing

### UI and Styling
- Tailwind CSS for styling
- Radix UI primitives for accessible components
- Lucide React for icons
- Custom FESSA branding variables

### Development and Database
- Drizzle ORM with PostgreSQL dialect (ready for database integration)
- Neon Database serverless client (configured but not actively used)
- Vite with React plugin for development
- TypeScript with strict configuration

### Form Handling
- React Hook Form for form state management
- Zod for schema validation and type safety
- @hookform/resolvers for Zod integration

## Deployment Strategy

### Development
- Vite development server with hot module replacement
- Express server with middleware for API routes
- TypeScript compilation and type checking
- In-memory storage for rapid development

### Production Build
1. **Client Build**: Vite builds React application to `dist/public`
2. **Server Build**: esbuild bundles Express server to `dist/index.js`
3. **Static Serving**: Express serves built client files in production
4. **Database Migration**: Ready for PostgreSQL with Drizzle migrations in `migrations/` directory

### Environment Configuration
- Database URL configuration for PostgreSQL (via `DATABASE_URL` environment variable)
- Development vs production mode handling
- Replit-specific development enhancements

The application is architected for easy transition from development with in-memory storage to production with PostgreSQL database, requiring minimal code changes thanks to the storage interface abstraction.