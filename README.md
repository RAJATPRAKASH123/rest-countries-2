
# Restcountries API Project
<img width="1680" alt="Screenshot 2023-11-27 at 10 26 37 AM" src="https://github.com/RAJATPRAKASH123/rest-countries-2/assets/47978596/e727c7d4-e8f7-42cd-b80d-3a73ac7f9487">

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

- Displaying the Country as a Card component with details.
- Individual route for each country with details and flag.
- Added Pagination for navigating through multiple pages of results.
- Search for countries by name.
- Filter countries by region.
- Sort countries by population, area, and languages ( Right now I have only used Descending Sort, but the function for both types of sorting algorithm is there in the code)
- Both Filter and sort can work simultaneously.
- Responsive design for a seamless user experience. Both Dark Mode & Light Mode UI   are added.
- Authentication Token added for secure login using Credentials and Github.



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


Before Sign up Home Page

Dark Mode - 
<img width="1680" alt="Screenshot 2023-11-27 at 10 09 53 AM" src="https://github.com/RAJATPRAKASH123/rest-countries-2/assets/47978596/4cd5140d-00ce-4d84-9bcc-d7be5f894157">

Light Mode - 

Signing in using Credentials 

Dark Mode - 
<img width="1680" alt="Screenshot 2023-11-27 at 10 11 49 AM" src="https://github.com/RAJATPRAKASH123/rest-countries-2/assets/47978596/5705bcd9-cce9-4f98-9eed-7ff7ed2e497f">

Light Mode -
<img width="1680" alt="Screenshot 2023-11-27 at 10 13 33 AM" src="https://github.com/RAJATPRAKASH123/rest-countries-2/assets/47978596/e4998a63-d76a-4397-9850-80c632532f8a">

On Signing In - {You can sign in as admin and user both}

Light Mode - 
<img width="1680" alt="Screenshot 2023-11-27 at 10 15 43 AM" src="https://github.com/RAJATPRAKASH123/rest-countries-2/assets/47978596/83fbcc5a-21cd-4c97-8272-97c3304d44d6">

Dark Mode - 
<img width="1680" alt="Screenshot 2023-11-27 at 10 16 11 AM" src="https://github.com/RAJATPRAKASH123/rest-countries-2/assets/47978596/a2f255bf-40ef-47b7-ac50-d88b1b9a78c3">

Filtered By region -
<img width="1680" alt="Screenshot 2023-11-27 at 10 16 36 AM" src="https://github.com/RAJATPRAKASH123/rest-countries-2/assets/47978596/0b390f18-f88f-45a1-99eb-ac41070cafc0">

Descending Sort by Population and Filtered By Region -
<img width="1680" alt="Screenshot 2023-11-27 at 10 17 26 AM" src="https://github.com/RAJATPRAKASH123/rest-countries-2/assets/47978596/3b7575f0-9de2-4e31-af24-08a831d88802">

Individual route for each Country with the details - 
<img width="1680" alt="Screenshot 2023-11-27 at 10 18 31 AM" src="https://github.com/RAJATPRAKASH123/rest-countries-2/assets/47978596/5a9b8e34-8480-49d1-834c-96248dedd520">
