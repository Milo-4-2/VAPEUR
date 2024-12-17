# Welcome to **VAPEUR** !  
**VAPEUR** is a web application that allows to manage a video games collection.

---

## Installation

In order to run VAPEUR locally on your computer, you'll need to follow the following steps :

### 1 - Clone the GitHub repository

#### Using Git

**Git** is a distributed version control system that tracks versions of files used to control source code by programmers developing software collaboratively.

If you don't have **Git** installed on your computer, go to the [Git website](https://git-scm.com/), download it and run the executable to install it on your device.

Go to the location on your drive you want to store VAPEUR at using the File Explorer, right click anywhere in the window and select '**Open in Terminal**'. In the terminal that opens, type :

```bash
git clone https://github.com/Milo-4-2/VAPEUR.git
```

This will clone the repository on your computer at the location you selected.

#### Using a browser

An alternative way to do it is to download the repository from GitHub.

To do this, go to the [GitHub page](https://github.com/Milo-4-2/VAPEUR.git), click the green **Code** button and select '**Download ZIP**'.  
You can then extract the downloaded ZIP file's content to your desired location on your disk.

### 2 - Install Node.js

You will need **Node.js** to run VAPEUR.  
**Node.js** is a powerful, open-source, cross-platform runtime environment that allows you to run JavaScript code on the server side outside of a web browser.

If you don't already have **Node.js** installed on your computer, head to the [Node.js website](https://nodejs.org/en), download the installer and run it to install it on your device.

To check if **Node.js** is installed on your computer, you can open a terminal and type :

```bash
node -v
```

This should return a Node.js version like this for example : 

```bash
v20.18.1
```

### 3 - Install Express.js

VAPEUR was developed using **Express.js**, so you'll need it to run it on your computer.  
**Express.js** is a back end web application framework designed for building web applications and APIs with Node.js.

**To open the main VAPEUR folder, navigate in the File Explorer to the location where the main VAPEUR folder is saved, right-click it and select 'Open in Terminal'.** 

To install **Express.js**, open the **main VAPEUR folder** in a terminal and enter the following command :



```bash
npm install express
```

### 4 - Install Prisma

VAPEUR also uses **Prisma**.  
**Prisma** is an open-source ORM (Object-Relational Mapping) tool for Node.js and TypeScript. It simplifies database interactions by allowing the use of a strongly typed API instead of writing raw SQL queries.

To install **Prisma**, open the **main VAPEUR folder** in a terminal and enter the following command :

```bash
npm install prisma @prisma/client sqlite3
```

However, the database hasn't created it yet. In order to create it, enter this in the terminal :

```bash
npx prisma migrate dev --name init
```

Then, you'll need to generate the Prisma client that will allow the app to interact with the database. To do so, enter this in the terminal :

```bash
npx prisma generate
```

### 5 - Install Handlebars

VAPEUR uses **Handlebars**.  
**Handlebars** is a templating engine for JavaScript designed to create dynamic HTML.

To install **Handlebars**, open the **main VAPEUR folder** in a terminal and enter the following command :

```bash
npm install hbs
```

### 6 - Install Sharp

VAPEUR uses **Sharp** as well.  
**Sharp** is a Node.js library used for image processing. It allows to manipulate images quickly and efficiently, making it ideal for web applications that need to handle image uploads, transformations, or optimizations.

To install **Sharp**, open the **main VAPEUR folder** in a terminal and enter the following command :

```bash
npm install sharp
```

### 7 - Install Multer

VAPEUR uses **Multer**.  
**Multer** is a middleware for handling file uploads in Node.js. It's used in conjunction with the Express framework to handle multipart/form-data, which is the encoding type used for file uploads in HTML forms.

To install **Multer**, open the **main VAPEUR folder** in a terminal and enter the following command :

```bash
npm install multer
```

### 8 - Run VAPEUR

You now have all the necessary packages to run **VAPEUR**.  
To run **VAPEUR**, open the **main VAPEUR folder** in a terminal and enter the following command :

```bash
node server.js
```

You should see this appear in the terminal :

```bash
Server is running on port 3000
```

This means that you can now open your browser and go to http://localhost:3000/.  

If you want to stop **VAPEUR** from running, go back to the terminal and hit **CTRL + C**.

### Summary

This is a summary of the 8 steps you need to follow in order to run **VAPEUR**.

First, clone the repository on your local drive.  
Then, make sure to have **Node.js** installed on your computer.
Then, open the **main VAPEUR folder** in a terminal and enter the following commands :

```bash
npm install express
npm install prisma @prisma/client sqlite3
npx prisma migrate dev --name init
npx prisma generate
npm install hbs
npm install sharp
npm install multer
node server.js
```

---

## Features

**VAPEUR** allows you to :

* Add game editors to the database
* Edit a specific editor's data (its name)
* Add games to the database (games have a name, a description, a release date, an editor, a genre and a cover)
* Edit a specific game's data (except the cover)
* Delete a game from the database
* Display a list of all the editors
* Display a list of all the games
* Display a list of all the genres
* Display a specific editor's games
* Display a specific game's data

### Features still in development

* Delete an editor from the database
