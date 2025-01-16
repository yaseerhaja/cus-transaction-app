# Customer Transaction App

A comprehensive full-stack web application with an Angular frontend, Node.js backend powered by GraphQL API, and automated testing & deployment pipelines.

[![Watch the video](https://ngapp.s3.eu-north-1.amazonaws.com/assets/banner/banner-mov.gif)](https://ngapp.s3.eu-north-1.amazonaws.com/assets/banner/project-banner.mp4)
![Local GIF](https://ngapp.s3.eu-north-1.amazonaws.com/assets/banner/banner-mobile.gif)
---

## Table of Contents

- [About](#about)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Features](#features)
- [Testing](#testing)
  - [API Testing with Bruno](#api-testing-with-bruno)
  - [End-to-End Testing with Playwright](#end-to-end-testing-with-playwright)
- [Deployment](#deployment)
  - [AWS S3 (Frontend)](#aws-s3-frontend)
  - [GitHub Actions](#github-actions)
- [License](#license)

---

## About

This project is a full-stack web application designed with **Angular** for the frontend and **Node.js** with **GraphQL** for the backend. It incorporates automated testing strategies with **Bruno** for API testing and **Microsoft Playwright** for end-to-end testing. Deployment is managed on **AWS** with **S3** for the frontend and **EC2** for the backend. Continuous integration and deployment (CI/CD) pipelines are set up via **GitHub Actions** for seamless operations.

---

## Tech Stack

- **Frontend**: Angular v19, HTML, CSS, TypeScript
- **Backend**: Node.js, GraphQL - https://github.com/yaseerhaja/cus-transaction-app-server
- **API Testing**: Bruno
- **End-to-End Testing**: Microsoft Playwright
- **Deployment**:
  - **AWS**: S3 (Frontend), EC2 (Backend)
- **CI/CD**: GitHub Actions

---

## Getting Started

Follow these steps to get the project up and running locally.

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v14.x or higher)
- **Angular CLI** (v12.x or higher)
- **AWS CLI** (for deployment)
- **Git** (for version control)

### Clone the Repository

```bash
git clone https://github.com/yaseerhaja/cus-transaction-app.git
cd cus-transaction-app
```

### Install Dependencies
For the frontend (Angular):
```bash
npm install
```
For the backend (Node.js):
https://github.com/yaseerhaja/cus-transaction-app-server

---

### Project Structure

```angular2html
├── cus-transaction-app/        # Angular frontend
│   ├── src/
│   ├── package.json
│   ├── bruno                   # API Test
│   ├── e2e/                    # Microsoft Playwright Smoke test
│   ├── .github/                # GitHub Actions workflow files
│   ├── └── workflows/
│   ├── README.md
│   └── angular.json
```

---

## Features

- **Frontend**: Responsive UI built with Angular, communicating with a GraphQL API.
- **Backend**: RESTful GraphQL API built with Node.js for seamless data interaction.
- **API Testing**: Bruno for automated API tests to ensure the backend is functional.
- **End-to-End Testing**: Microsoft Playwright for testing user flows and frontend interactions.
- **CI/CD**: Fully automated build, test, and deployment pipeline through GitHub Actions.
- **Deployment**:
  - **Frontend** is hosted on AWS S3.(http://ngapp.s3-website.eu-north-1.amazonaws.com)
  - **Backend** is deployed on AWS EC2. (http://13.60.195.142:8081/graphql)

---

## Testing

### API Testing with Bruno

[Bruno](https://github.com/brunocsilva/bruno) is used for API testing. It ensures that the backend GraphQL API is working as expected by running automated tests.


### End-to-End Testing with Playwright

We use [Microsoft Playwright](https://playwright.dev/) to perform end-to-end testing to ensure the frontend works smoothly.
To run Playwright tests:

For Headless Mode
```bash
npm run start:test
npm run test:e2e
```

For UI Inreractive
```bash
npm run start:test
npm run test:e2e:ui
```
---

## Deployment

### GitHub Actions

I have set up **GitHub Actions** for CI/CD that handles the separate deployment of frontend and backend.

- **Frontend Workflow**: Automatically deploys the Angular app to AWS S3 on push to the `master` branch.

Check the `.github/workflows/` directory for workflow files.

### AWS S3 (Frontend)
The frontend is hosted on AWS S3. Once the build is ready, you can deploy the application by uploading the contents of the dist/ folder to an S3 bucket.
http://ngapp.s3-website.eu-north-1.amazonaws.com

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

You can find the `LICENSE` file in the root of the repository.

