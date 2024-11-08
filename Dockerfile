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

# Create startup script
RUN echo "#!/bin/sh\n\
npm run prisma:migrate\n\
npm start" > ./start.sh && chmod +x ./start.sh

EXPOSE 3000

CMD ["./start.sh"]