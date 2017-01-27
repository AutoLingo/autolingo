   - what your goal for the MVP was
   - which parts work
   - which parts don't work yet
   - open / unresolved questions
   - particular parts of the code you'd like us to look at
   - and instructions for building and using the project.

# AutoLingo

Video chatting with live translation. Works with Google Chrome and https://.

## Goal for MVP

Build one-on-one video chat component with following features: video chat, speech recognition, and translation capabilities.

## Which parts work

Video streaming and speech recognition. Translation working on pending component.
Replaced redux-thunk with redux-observables.  API dispatches are now in the form of an Observable stream. Still need to figure out how to throttle api requests, but the basic framework is working.

## Which parts don't work yet

Message transfer. Needs refactoring to React/Redux.
X
## Open / unresolved questions


## Particular parts of the code you'd like us to look at

Not yet.

## Instructions for building and using the project
```
npm install
npm start
```