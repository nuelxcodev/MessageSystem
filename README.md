Task: Two-Microservice Email Processing System
You're to build a small backend system using Node.js, TypeScript, Mongoose, Redis, and BullMQ, split into two services to simulate microservice communication.
Overview:
There will be two separate services that work together:
Service A (API Service)


This service exposes a single POST endpoint /messages.


It should accept an object with two fields: email and message.


It validates the input.


Then it saves the data into a MongoDB collection.


After saving, it pushes a job to a Redis queue (using BullMQ), passing the ID of the saved message.


Service B (Worker Service)


This service listens to the Redis queue.


When it receives a job, it uses the provided ID to fetch the saved message from MongoDB.


It then simulates sending the message by logging the output in this format:
 "Sending message to [email]: [message]".


What we’re testing:
Your ability to structure a Node.js project with TypeScript.


Basic knowledge of Mongoose (MongoDB).


Your ability to use BullMQ and Redis for job queues.


Clear separation of logic between services (microservice simulation).


How you handle asynchronous data and job processing.


Requirements:
Use TypeScript across both services.


Connect both services to the same MongoDB and Redis instance.


Make sure each service runs independently (separate folders or apps).


Services can run locally on different ports (e.g., 3001 for API, 3002 for worker).


You may optionally use Docker Compose to spin everything up easily.


Bonus (optional):
Add input validation (e.g., check if email is valid).


Add retry attempts or failure handling for jobs.


Add an optional GET endpoint on Service A to list all saved messages.


Keep things simple and clean. Focus more on correctness, structure, and microservice flow than complex features.

