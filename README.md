# AutoLingo

Your World. Any Language. Live translation video chat. Works on Google Chrome and https://.

## Goal for MVP

Build a one-on-one video chat component with following features: video chat, speech recognition, and translation capabilities.

## Which parts work

Video streaming and speech recognition. Translation working on pending component.
Replaced redux-thunk with redux-observables.  API dispatches are now in the form of an Observable stream. Still need to figure out how to throttle api requests, but the basic framework is working.

## Which parts don't work yet

Group chat rooms per available country. User management by redux.

## Open / unresolved questions

## Particular parts of the code you'd like us to look at

## Instructions for building and using the project
```
npm install
npm run build
npm run build-css
npm start
```