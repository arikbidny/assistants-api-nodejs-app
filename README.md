# Assistants API Nodejs App

## Description

This application is a Node.js-based backend service that provides APIs for managing and interacting with AI assistants. It leverages the Azure OpenAI Assistants SDK to create, retrieve, and manage AI assistants and their interactions.

The application is divided into two main parts:

1. Assistant Management: This includes creating new AI assistants, retrieving existing ones, and managing their properties. The relevant code can be found in assistantController.js.
2. Thread and Message Management: This part of the application handles the creation of threads and the addition of messages to these threads. The relevant code can be found in assistantController.js

The application also includes error handling middleware and utilities, which can be found in the middlewares and utils directories respectively.

## Installation

Follow these steps to install and run the application:

1. Clone the repository:

   ```
   git clone <repository-url>
   ```

2. Navigate into the directory:

   ```
   cd <repository-name>
   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. Create a `.env` file in the root directory of the project. Add your environment variables in this file:

   ```
   AZURE_ENDPOINT=""
   API_KEY=""
   API_VERSION=""
   NODE_ENV=development/production
   ```

5. Run the application:
   ```
   npm run dev
   ```

Please replace `<repository-url>` and `<repository-name>` with the actual URL and name of your repository. Also, replace the environment variables (`DATABASE_URL` and `SECRET_KEY`) with the actual variables your application uses.

Azure Assistants SDK: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/openai/openai-assistants

## License

Arik Bidny
