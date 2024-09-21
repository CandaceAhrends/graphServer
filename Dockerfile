FROM node:18

WORKDIR /usr/src/app

COPY . .

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which the app will run
EXPOSE 4000

# Define the command to run the application
CMD ["npm", "run", "dev"]