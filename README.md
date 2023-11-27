
# Restcountries API Project

- This Rest Countries API project is in Next JS. Next Auth is used for Authentication and Authorization. 
- Project is created in a way such that multiple roles can be added. I have added two roles right now - admin/user.
- Logged In can be done via Credentials ( Hardcoded in the code ) and by LogIn through  Github. 
- Please create a [GitHub Oauth App](https://github.com/settings/developers) and add the client ID, client secret to .env.local file in rest-countries-2 folder to login via Github.
- Please add a username, password and role to ```/Users/silverlight/Desktop/rest-countries-2/rest-countries-2/src/app/api/auth/[...nextauth]/options.ts``` login via Credentials.

Other techs - Typescript, React.


## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project utilizes the Restcountries API to fetch and display information about countries. It's built using [React](https://reactjs.org/) and designed to provide a user-friendly interface for exploring details about various countries.

## Features

- Search for countries by name
- Filter countries by region
- Sort countries by population, area, and languages
- Responsive design for a seamless user experience
- Pagination for navigating through multiple pages of results

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine 



### Installation

1. Clone the repository:

   ```bash
   git clone repo link

2. Change into the project directory: 
```bash

cd rest-countries-2
```
3. Install Dependencies : 
```bash

npm install

```

4. Create a secret key using openssl. Put this in ```rest-countries-2/.env.local``` file

```bash
openssl rand -base64 32
```
5. I have used jsonwebtoken to create accessToken. It also needs to create a SECRET_KEY. We can take help of openssl to achieve that
// npm i jsonwebtoken
// npm i --save-dev @types/jsonwebtoken
// Creating SECRET_KEY - 
// openssl rand -base64 32 - xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

6. 
- Please create a [GitHub Oauth App](https://github.com/settings/developers) and add the client ID, client secret to .env.local file in rest-countries-2 folder to login via Github.
- Please add a username, password and role to ```/Users/silverlight/Desktop/rest-countries-2/rest-countries-2/src/app/api/auth/[...nextauth]/options.ts``` login via Credentials.

7. Start the server : 
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

```

## Usage

You can start navigating the webapp via - http://localhost:3000/

