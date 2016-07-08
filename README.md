# TIMLIO

The time-tracker primarily for software development.

Main feature is tight integration with project management system Trello.

## Project structure 
- The `meteor-app` directory contains meteor app
- The `chrome` directory contains the chrome extension


## Start Meteor application

Under `timlio-com/app` run `./run.sh`

## Setup chrome extension

### Development

- Run script 
```bash
# build files to './dev'
$ npm run start
```
- [Load unpacked extensions](https://developer.chrome.com/extensions/getstarted#unpacked) with `./dev` folder.

#### Configuring your app for webhooks in development

- Read the [instruction](https://developer.github.com/webhooks/configuring/) how to expose your local host to the Internet using [ngrok](https://ngrok.com/download) tool
- You can expose your localhost by running `./ngrok http <port>`
- You should see something like this: `Forwarding    http://7e9ea9dc.ngrok.io -> 127.0.0.1:4567`
- Than copy `*.ngrok.io` URL and add `/webhooks` to the end. Paste it to the `meteor-app/settings-local.json` with `callbackURL` key. It should look something like:
```
{
  "trello": {
    "appKey": "<yourAppKey>",
    "token": "<yourSecretToken>",
    "callbackURL": "http://fc0986ec.ngrok.io/webhooks"
  }
}
```
- Than to start an app run `meteor-app/run.sh` script or just type in terminal `meteor --settings settings-local.json -p <port>`