# FarManage - Database & API Design

## Overview
FarManage is a farm management system focused on milk production tracking, livestock management, and revenue calculation. This document outlines the database schema and API structure needed to support the system.

## Database Schema

### Tables Structure

#### 1. Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  farm_name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### 2. Milk Production Table
```sql
CREATE TABLE milk_production (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  morning_liters DECIMAL(10,2) DEFAULT 0,
  afternoon_liters DECIMAL(10,2) DEFAULT 0,
  evening_liters DECIMAL(10,2) DEFAULT 0,
  total_liters DECIMAL(10,2) GENERATED ALWAYS AS (morning_liters + afternoon_liters + evening_liters) STORED,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, date)
);
```

#### 3. Livestock Table
```sql
CREATE TABLE livestock (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  animal_type VARCHAR(50) NOT NULL, -- 'cow', 'bull', 'calf', etc.
  sex VARCHAR(10) NOT NULL, -- 'male', 'female'
  birth_date DATE,
  dam_name VARCHAR(255), -- Mother's name
  sire_name VARCHAR(255), -- Father's name
  breed VARCHAR(100),
  health_status VARCHAR(50) DEFAULT 'healthy',
  is_active BOOLEAN DEFAULT true,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### 4. Revenue Settings Table
```sql
CREATE TABLE revenue_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  price_per_liter DECIMAL(10,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'USD',
  effective_from DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, effective_from)
);
```

#### 5. Support Tickets Table
```sql
CREATE TABLE support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'open', -- 'open', 'in_progress', 'resolved', 'closed'
  priority VARCHAR(10) DEFAULT 'medium', -- 'low', 'medium', 'high', 'urgent'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## API Endpoints

### Authentication

#### POST /auth/register
**Description:** Register a new user
```json
Request:
{
  "email": "farmer@example.com",
  "password": "securepassword",
  "farmName": "Green Valley Farm"
}

Response:
{
  "user": {
    "id": "uuid",
    "email": "farmer@example.com",
    "farmName": "Green Valley Farm",
    "createdAt": "2024-01-01T00:00:00Z"
  },
  "token": "jwt_token_here"
}
```

#### POST /auth/login
**Description:** Login user
```json
Request:
{
  "email": "farmer@example.com",
  "password": "securepassword"
}

Response:
{
  "user": {
    "id": "uuid",
    "email": "farmer@example.com",
    "farmName": "Green Valley Farm"
  },
  "token": "jwt_token_here"
}
```

### Milk Production

#### GET /milk-production
**Description:** Get milk production records with optional date filtering
```json
Request:
Querystring: ?startDate=2024-01-01&endDate=2024-01-31&page=1&limit=20

Response:
{
  "records": [
    {
      "id": "uuid",
      "date": "2024-01-15",
      "morningLiters": 25.5,
      "afternoonLiters": 30.0,
      "eveningLiters": 22.3,
      "totalLiters": 77.8,
      "notes": "Good production day",
      "createdAt": "2024-01-15T08:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3
  },
  "summary": {
    "totalLiters": 2340.5,
    "averageDaily": 75.5,
    "bestDay": {
      "date": "2024-01-15",
      "liters": 85.2
    }
  }
}
```

#### POST /milk-production
**Description:** Record daily milk production
```json
Request:
{
  "date": "2024-01-15",
  "morningLiters": 25.5,
  "afternoonLiters": 30.0,
  "eveningLiters": 22.3,
  "notes": "Good production day"
}

Response:
{
  "record": {
    "id": "uuid",
    "date": "2024-01-15",
    "morningLiters": 25.5,
    "afternoonLiters": 30.0,
    "eveningLiters": 22.3,
    "totalLiters": 77.8,
    "notes": "Good production day",
    "createdAt": "2024-01-15T08:00:00Z"
  }
}
```

#### PUT /milk-production/:id
**Description:** Update milk production record
```json
Request:
{
  "morningLiters": 26.0,
  "afternoonLiters": 31.0,
  "eveningLiters": 23.0,
  "notes": "Updated production numbers"
}

Response:
{
  "record": {
    "id": "uuid",
    "date": "2024-01-15",
    "morningLiters": 26.0,
    "afternoonLiters": 31.0,
    "eveningLiters": 23.0,
    "totalLiters": 80.0,
    "notes": "Updated production numbers",
    "updatedAt": "2024-01-15T18:30:00Z"
  }
}
```

### Livestock Management

#### GET /livestock
**Description:** Get livestock records with filtering options
```json
Request:
Querystring: ?animalType=cow&sex=female&isActive=true&page=1&limit=10

Response:
{
  "animals": [
    {
      "id": "uuid",
      "name": "Bessie",
      "animalType": "cow",
      "sex": "female",
      "birthDate": "2022-03-15",
      "damName": "Molly",
      "sireName": "Thor",
      "breed": "Holstein",
      "healthStatus": "healthy",
      "isActive": true,
      "age": {
        "years": 2,
        "months": 1
      },
      "notes": "High milk producer",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  },
  "summary": {
    "totalAnimals": 25,
    "activeCows": 15,
    "calves": 5,
    "bulls": 5
  }
}
```

#### POST /livestock
**Description:** Add new animal to livestock
```json
Request:
{
  "name": "Bessie",
  "animalType": "cow",
  "sex": "female",
  "birthDate": "2022-03-15",
  "damName": "Molly",
  "sireName": "Thor",
  "breed": "Holstein",
  "notes": "High milk producer"
}

Response:
{
  "animal": {
    "id": "uuid",
    "name": "Bessie",
    "animalType": "cow",
    "sex": "female",
    "birthDate": "2022-03-15",
    "damName": "Molly",
    "sireName": "Thor",
    "breed": "Holstein",
    "healthStatus": "healthy",
    "isActive": true,
    "notes": "High milk producer",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

### Revenue Management

#### GET /revenue/settings
**Description:** Get current revenue settings
```json
Response:
{
  "settings": {
    "id": "uuid",
    "pricePerLiter": 1.25,
    "currency": "USD",
    "effectiveFrom": "2024-01-01",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### POST /revenue/settings
**Description:** Update price per liter
```json
Request:
{
  "pricePerLiter": 1.35,
  "currency": "USD",
  "effectiveFrom": "2024-02-01"
}

Response:
{
  "settings": {
    "id": "uuid",
    "pricePerLiter": 1.35,
    "currency": "USD",
    "effectiveFrom": "2024-02-01",
    "createdAt": "2024-01-15T10:00:00Z"
  }
}
```

#### GET /revenue/calculate
**Description:** Calculate revenue for date range
```json
Request:
Querystring: ?startDate=2024-01-01&endDate=2024-01-31

Response:
{
  "revenue": {
    "totalLiters": 2340.5,
    "pricePerLiter": 1.25,
    "totalRevenue": 2925.63,
    "currency": "USD",
    "period": {
      "startDate": "2024-01-01",
      "endDate": "2024-01-31",
      "days": 31
    },
    "breakdown": [
      {
        "date": "2024-01-01",
        "liters": 75.5,
        "revenue": 94.38
      }
    ]
  }
}
```

### Support System

#### GET /support/tickets
**Description:** Get user support tickets
```json
Request:
Querystring: ?status=open&page=1&limit=10

Response:
{
  "tickets": [
    {
      "id": "uuid",
      "subject": "Unable to update milk production",
      "message": "I'm having trouble updating yesterday's milk production record...",
      "status": "open",
      "priority": "medium",
      "createdAt": "2024-01-15T09:00:00Z",
      "updatedAt": "2024-01-15T09:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 3,
    "totalPages": 1
  }
}
```

#### POST /support/tickets
**Description:** Create new support ticket
```json
Request:
{
  "subject": "Unable to update milk production",
  "message": "I'm having trouble updating yesterday's milk production record. The form seems to freeze when I click save.",
  "priority": "medium"
}

Response:
{
  "ticket": {
    "id": "uuid",
    "subject": "Unable to update milk production",
    "message": "I'm having trouble updating yesterday's milk production record...",
    "status": "open",
    "priority": "medium",
    "createdAt": "2024-01-15T09:00:00Z"
  }
}
```

## Database Indexes

For optimal performance, consider these indexes:

```sql
-- Milk production indexes
CREATE INDEX idx_milk_production_user_date ON milk_production(user_id, date);
CREATE INDEX idx_milk_production_date ON milk_production(date);

-- Livestock indexes
CREATE INDEX idx_livestock_user_id ON livestock(user_id);
CREATE INDEX idx_livestock_active ON livestock(user_id, is_active);
CREATE INDEX idx_livestock_type ON livestock(user_id, animal_type);

-- Revenue settings indexes
CREATE INDEX idx_revenue_settings_user_effective ON revenue_settings(user_id, effective_from);

-- Support tickets indexes
CREATE INDEX idx_support_tickets_user_status ON support_tickets(user_id, status);
CREATE INDEX idx_support_tickets_created ON support_tickets(created_at);
```

## Row Level Security (RLS) Policies

All tables should implement RLS to ensure users can only access their own data:

```sql
-- Enable RLS
ALTER TABLE milk_production ENABLE ROW LEVEL SECURITY;
ALTER TABLE livestock ENABLE ROW LEVEL SECURITY;
ALTER TABLE revenue_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

-- Policies (example for milk_production)
CREATE POLICY "Users can view own milk production" ON milk_production
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own milk production" ON milk_production
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own milk production" ON milk_production
  FOR UPDATE USING (auth.uid() = user_id);
```

## Error Handling

All API endpoints should return consistent error formats:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "pricePerLiter",
      "message": "Price must be greater than 0"
    }
  }
}
```

Common HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request (validation errors)
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error