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

To install **Express.js**, navigate in the File Explorer to the location where the **main VAPEUR folder** is saved, right-click it and select '**Open in Terminal**'. In the terminal that opens, type :

```bash
npm install express
```

### 4 - Install Prisma

VAPEUR also uses **Prisma**.  
**Prisma** is an open-source ORM (Object-Relational Mapping) tool for Node.js and TypeScript. It simplifies database interactions by allowing the use of a strongly typed API instead of writing raw SQL queries.

To install **Prisma**, navigate in the File Explorer to the location where the **main VAPEUR folder** is saved, right-click it and select '**Open in Terminal**'. In the terminal that opens, enter the following commands :

```bash
npm install prisma @prisma/client sqlite3
npx prisma init
npx prisma generate
```

But the database isn't actually created it yet. In order to create it, enter this in the terminal :

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

To install **Prisma**, navigate in the File Explorer to the location where the **main VAPEUR folder** is saved, right-click it and select '**Open in Terminal**'. In the terminal that opens, enter the following commands :

```bash
npm install hbs
```

### 6 - Install Sharp

