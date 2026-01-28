#!/bin/bash
# Subletly Environment Health Check Script
# Purpose: Validate environment before starting development work
# Usage: ./scripts/init.sh
# Exit Code: 0 = healthy, non-zero = issues detected

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counter for issues
ISSUES=0

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Subletly Environment Health Check${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# 1. Check Node.js Version
echo -e "${BLUE}[1/8] Checking Node.js version...${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v | sed 's/v//')
    NODE_MAJOR=$(echo $NODE_VERSION | cut -d. -f1)

    if [ "$NODE_MAJOR" -ge 18 ]; then
        echo -e "${GREEN}✓ Node.js version: v$NODE_VERSION (OK)${NC}"
    else
        echo -e "${RED}✗ Node.js version: v$NODE_VERSION (FAILED - Need 18+)${NC}"
        ISSUES=$((ISSUES + 1))
    fi
else
    echo -e "${RED}✗ Node.js not found (FAILED)${NC}"
    ISSUES=$((ISSUES + 1))
fi
echo ""

# 2. Check npm
echo -e "${BLUE}[2/8] Checking npm...${NC}"
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓ npm version: $NPM_VERSION (OK)${NC}"
else
    echo -e "${RED}✗ npm not found (FAILED)${NC}"
    ISSUES=$((ISSUES + 1))
fi
echo ""

# 3. Check node_modules
echo -e "${BLUE}[3/8] Checking node_modules...${NC}"
if [ -d "node_modules" ]; then
    MODULE_COUNT=$(ls -1 node_modules | wc -l | tr -d ' ')
    echo -e "${GREEN}✓ node_modules exists ($MODULE_COUNT packages installed)${NC}"
else
    echo -e "${YELLOW}⚠ node_modules not found${NC}"
    echo -e "${YELLOW}  Run: npm install${NC}"
    ISSUES=$((ISSUES + 1))
fi
echo ""

# 4. Check .env file
echo -e "${BLUE}[4/8] Checking .env file...${NC}"
if [ -f ".env" ]; then
    echo -e "${GREEN}✓ .env file exists${NC}"

    # Check for required environment variables
    REQUIRED_VARS=("DATABASE_URL" "NEXTAUTH_SECRET" "NEXTAUTH_URL")
    MISSING_VARS=()

    for VAR in "${REQUIRED_VARS[@]}"; do
        if ! grep -q "^${VAR}=" .env; then
            MISSING_VARS+=("$VAR")
        fi
    done

    if [ ${#MISSING_VARS[@]} -eq 0 ]; then
        echo -e "${GREEN}✓ All required environment variables present${NC}"
    else
        echo -e "${YELLOW}⚠ Missing required environment variables:${NC}"
        for VAR in "${MISSING_VARS[@]}"; do
            echo -e "${YELLOW}  - $VAR${NC}"
        done
        ISSUES=$((ISSUES + 1))
    fi
else
    echo -e "${RED}✗ .env file not found (FAILED)${NC}"
    echo -e "${YELLOW}  Copy .env.example to .env and configure${NC}"
    ISSUES=$((ISSUES + 1))
fi
echo ""

# 5. Check Prisma
echo -e "${BLUE}[5/8] Checking Prisma...${NC}"
if [ -f "prisma/schema.prisma" ]; then
    echo -e "${GREEN}✓ Prisma schema exists${NC}"

    # Check if Prisma client is generated
    if [ -d "node_modules/.prisma/client" ] || [ -d "node_modules/@prisma/client" ]; then
        echo -e "${GREEN}✓ Prisma client generated${NC}"
    else
        echo -e "${YELLOW}⚠ Prisma client not generated${NC}"
        echo -e "${YELLOW}  Run: npx prisma generate${NC}"
        ISSUES=$((ISSUES + 1))
    fi
else
    echo -e "${RED}✗ Prisma schema not found (FAILED)${NC}"
    ISSUES=$((ISSUES + 1))
fi
echo ""

# 6. Check Database Connection
echo -e "${BLUE}[6/8] Checking database connection...${NC}"
if [ -f ".env" ] && grep -q "^DATABASE_URL=" .env; then
    if command -v npx &> /dev/null && [ -f "prisma/schema.prisma" ]; then
        # Try to execute a simple query
        if npx prisma db execute --stdin <<< "SELECT 1" &> /dev/null; then
            echo -e "${GREEN}✓ Database connection successful${NC}"
        else
            echo -e "${YELLOW}⚠ Database connection failed${NC}"
            echo -e "${YELLOW}  Check DATABASE_URL in .env${NC}"
            ISSUES=$((ISSUES + 1))
        fi
    else
        echo -e "${YELLOW}⚠ Cannot test database (Prisma not available)${NC}"
    fi
else
    echo -e "${YELLOW}⚠ DATABASE_URL not configured${NC}"
    ISSUES=$((ISSUES + 1))
fi
echo ""

# 7. Check TypeScript
echo -e "${BLUE}[7/8] Checking TypeScript...${NC}"
if [ -f "tsconfig.json" ]; then
    echo -e "${GREEN}✓ tsconfig.json exists${NC}"

    # Try to validate TypeScript (if tsc is available)
    if [ -d "node_modules" ] && command -v npx &> /dev/null; then
        if npx tsc --noEmit &> /dev/null; then
            echo -e "${GREEN}✓ TypeScript compilation check passed${NC}"
        else
            echo -e "${YELLOW}⚠ TypeScript compilation has errors${NC}"
            echo -e "${YELLOW}  Run: npx tsc --noEmit to see errors${NC}"
            ISSUES=$((ISSUES + 1))
        fi
    fi
else
    echo -e "${RED}✗ tsconfig.json not found (FAILED)${NC}"
    ISSUES=$((ISSUES + 1))
fi
echo ""

# 8. Check package.json
echo -e "${BLUE}[8/8] Checking package.json...${NC}"
if [ -f "package.json" ]; then
    echo -e "${GREEN}✓ package.json exists${NC}"

    # Check for required scripts
    REQUIRED_SCRIPTS=("dev" "build")
    MISSING_SCRIPTS=()

    for SCRIPT in "${REQUIRED_SCRIPTS[@]}"; do
        if ! grep -q "\"${SCRIPT}\":" package.json; then
            MISSING_SCRIPTS+=("$SCRIPT")
        fi
    done

    if [ ${#MISSING_SCRIPTS[@]} -eq 0 ]; then
        echo -e "${GREEN}✓ Required npm scripts present${NC}"
    else
        echo -e "${YELLOW}⚠ Missing npm scripts:${NC}"
        for SCRIPT in "${MISSING_SCRIPTS[@]}"; do
            echo -e "${YELLOW}  - $SCRIPT${NC}"
        done
    fi
else
    echo -e "${RED}✗ package.json not found (FAILED)${NC}"
    ISSUES=$((ISSUES + 1))
fi
echo ""

# Summary
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Health Check Summary${NC}"
echo -e "${BLUE}========================================${NC}"

if [ $ISSUES -eq 0 ]; then
    echo -e "${GREEN}✓ Environment is healthy! Ready to start work.${NC}"
    echo ""
    echo -e "${BLUE}Next Steps:${NC}"
    echo -e "  1. Read recent progress: ${YELLOW}tail -100 ai/PROGRESS.md${NC}"
    echo -e "  2. Check available features: ${YELLOW}cat ai/FEATURES.json | jq '.features[] | select(.passes == false) | {id, name, priority}' | head -20${NC}"
    echo -e "  3. Start development server: ${YELLOW}npm run dev${NC}"
    echo ""
    exit 0
else
    echo -e "${RED}✗ Found $ISSUES issue(s) that need attention.${NC}"
    echo ""
    echo -e "${YELLOW}Please fix the issues above before starting work.${NC}"
    echo ""
    exit 1
fi
