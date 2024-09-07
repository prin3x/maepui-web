# Use a more recent Node.js version
FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml (if available)
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of your app's source code
COPY . .

# Build your app
RUN pnpm run build

# Expose the port your app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["pnpm", "start"]