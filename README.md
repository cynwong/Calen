# Calen

Calen is an application aimed to server as all-in-one organizing tool.

## Project descriptions

Calen is a multi-purpose planning tool that can be used as a planner, scheduler, tasks organizer, or even a diary. The vision is to aid the user in organizing their schedules and increase their productivities.

## The Inspriation

In my daily life, I use numerous organizer tools such as Google Calendar, Asana, and Trello for task management and that includes those little notes on my Fridge about various things. I asked myself what if there is a tool where I can do everything in one place.  Hence, the birth of Calen.  Calen is short for Calendar.

## User story

> As a user, I want to store all my plans, and tasks in one place so that I can quickly increase my productivity.

## User Instruction

* Sign up if you have not done so yet. Otherwise, log in to your account.
* On the left side of dashboard is list of scheduled events and diary entries and on right is Todo list.
* To navigate to specific page such as Scheduler or Diary, click on the burger icon at the upper left corner.
* To add new event, click on the date cell in the calendar.
* To view or modify individual event, click on the event.

## Technical Instruction

### Run Application in developer environment

Note: Calen is using ts-node-dev to monitor the changes in the file system and concurrently to run both front-end and back-end code.

#### Run Calen in development environment

```sh
# cd into calen directory

# run watch on both server and client
$ npm run watch

# run server only
$ npm run watch:server

# run client only
$ npm start --prefix=client

```

#### Build Calen

```sh

# build server
$ npm run build

# build client
$ npm run build --prefix=client

```

#### Run Calen in production environment

**Note: Built calen is required before running this command

```sh

$ npm start

```
## Technologies used

* MongoDB & Mongoose
* Express.js
* React.js
* Node.js
* Typescript.js
* Material-UI Framework
* Passport.js
* FullCalendar.js (React)
* SCSS
* AXIOS / AJAX
* moment.js
* ESlint
* [Quick Email Verification](https://quickemailverification.com)

## Future Development

* User customization of features.
* Connect to / integration with existing platforms such as google calendar, and trello, for better user experience.
* Sharing/Public
* Planner for continuous stages.

## Credit

Background photo credit: [Lisa Fotios @ pexels](http://www.lisafotiosphotography.co.uk/?ref=pexels)
