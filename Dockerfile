FROM node:18-alpine

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Generate Prisma client
RUN npm run prisma:generate

# Build TypeScript
RUN npm run build

# Remove development dependencies
RUN npm prune --production

EXPOSE 3000

# Use production build
CMD ["npm", "start"] 