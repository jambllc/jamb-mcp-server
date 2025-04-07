# Jamb MCP Server

## Overview
TypeScript MCP Server with Local Victor API integration

## Prerequisites
- Node.js 18+
- Local Victor API credentials

## Configuration

### Command-Line Arguments
Highest priority configuration method:
```bash
npm start -- \
  --server-url http://your-server.com \
  --token your_session_token \
  --site-id your_site_id \
  --port 3002
```

### Environment Variables
Fallback configuration method:
```bash
export LV_SERVER_URL=http://your-server.com
export LV_SESSION_TOKEN=your_token
export LV_SITE_ID=your_site_id
export PORT=3001
export TRANSPORT=http

npm start
```

### Supported Arguments
- `--server-url`: Base URL for the Local Victor API (default: http://localhost:8001)
- `--token`: Authentication token for API access
- `--site-id`: Site/Account identifier
- `--port`: Server port (default: 3001)

## Running the Server

### Development
```bash
# Command-line arguments
npm run dev -- --token your_token --site-id your_site_id

# Or environment variables
export LV_SESSION_TOKEN=your_token
export LV_SITE_ID=your_site_id
npm run dev
```

### Production
```bash
# Command-line arguments
npm start -- --token your_token --site-id your_site_id

# Or environment variables
export LV_SESSION_TOKEN=your_token
export LV_SITE_ID=your_site_id
export TRANSPORT=http
npm start
```

## Available MCP Tools
- `echo`: Simple echo tool for testing
- `describe_business_schema`: Get detailed schema for business information
- `read_business`: Retrieve current business information
- `update_business`: Update business profile

## Configuration Priority
1. Command-line arguments
2. Environment variables
3. Default values
