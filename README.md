# Introduction
Muziki is a web application for artists. A logged in user can view various artists and their albums.

## Index

- [Project Details](#project-details)
  - [Tools and Technologies](#tools-and-technologies)
- [Getting Started](#getting-started)
  - [Pre-Requisites](#pre-requisites)
  - [Running the project locally](#running-the-project-locally)

## Project Details
### Tools and Technologies
This web application is built using;
- React + Vite + JavaScript
- `styling`: Tailwind CSS
- `routing`: React Router
- `state management`: Context API
- `unit tests`: Vitest + React Testing Library
- `authentication provider`: Google OAuth

##  Getting Started
### Pre-Requisites
You should have the following tools installed.
- Node.js
- Node Package manager e.g npm

### Running the project locally
**Steps to set up the local environment.**
1. Clone the repository. In your terminal, run the following command.
```bash
  git clone https://github.com/stephanieopala/music-app.git
```

2. Navigate to the ```music-app``` folder.
```bash
cd music-app
```

3. Install the dependencies
```bash
npm install
```

4. Add the client id environment variable.
- Create a ```.env``` file at the root of the project.
- Add the following to the file.
```
VITE_CLIENT_ID="199059421088-viufk0fhaipbu9m2rsgpkjtmprf4cnq9.apps.googleusercontent.com"
```
- Save the file.

5. Run and view the project in a browser.
```bash
npm run dev
```

**Steps to work with feature branch**

1. To start working on a new feature, create a new branch from the `develop` branch, prefixed with `feat` and followed by feature name. (ie. `feat/feature_name`)
2. Once you are done with your changes, you can raise PR.

**Steps to create a pull request**

1. Make a PR to `develop` branch.
2. Comply with the best practices and guidelines.
3. It must pass all continuous integration checks.

After this, changes will be merged.


