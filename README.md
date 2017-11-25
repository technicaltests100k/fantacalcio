This project was bootstrapped with
[Create React App](https://github.com/facebookincubator/create-react-app), but I
have ejected it as I wanted to use Enzyme therefore I had to do it in order to
have full control in the configuration.

## Table of Contents

* [Run project](#run-project)
* [Launch Tests](#launch-tests)
* [Launch Tests with coverage](#launch-tests-with-coverage)
* [Pitch](#pitch)
* [Player](#player)
* [Instructions](#instructions)

## Run Project

```
yarn start
```

or

```
npm start
```

## Launch Tests

```
yarn test
```

or

```
npm test
```

## Launch Tests with coverage

```
yarn test --coverage
```

or

```
npm test --coverage
```

## Pitch

Pitch is the main component which receive the "team" data from the API and takes
care of diploing the players in the correct rows. The are 2 different way of
displaying players:

* Formation: The players are displayed in rows with their tshirts, but only when
  the viewport is >320px. When it is below 320px, only the tshirts are still
  visible, not the names.
* List: The players are displayed in an ordered list, but only when the viewport
  is 320px. When is >320px the list dissaper completely.

NOTE: Please, do note that I am aware this goes against the test's description,
but I thought it was a good idea showing how clear and gracefully the team with
the tshirts still appears. Obviously the names would have been way to small, but
this is why we have the list! :) There are at least 2 way to do what the test's
description says. I suppose we can go through them in person.

Normal use:

```
<Pitch team={currentTeam} />
```

with list:

```
<Pitch type={'list'} team={currentTeam} />
```

## Player

This is simply the player component which return the player's information
wrapped in either a <li> tag or <div>. The information diplayed are different in
the two cases as the purpose is different.

Wrapped in a <li>

```
<Player player={player} />;
```

Wrapped in a <div> with the tshirt img

```
<Player player={player} tshirt={true} />;
```

## Instructions:

Task: Create a page which shows the lineup and formation of a team. Once you
have finished please also submit/make available your codebase. The lineup and
formation data is available from a HTTP API and through a WebSocket.

The initial data should first be retrieved from the API endpoint provided with a
HTTP GET request. After the data has been rendered on the page you should then
use pusher (https://pusher.com) to start listening for any updates to the lineup
using the channel/event details provided. Any updates/changes to the lineup
should then be reflected on the rendered lineup.

An image is included which can be used for a football pitch background. In
whatever format and display you choose, the lineup should collapse gracefully
and be rendered in a list format for a viewport width below 320px.

There are 3 possible formations across 5 possible rows including the goalkeeper:
442, 4411 and 3421. Images are included to explain each formation.

## Additional Information

The possible match lineups and data structure are included in a json file. The
"formation_place" variable corresponds to the numbers on the formations
provided.

The only API endpoint is at http://lineups.dev.fantech.io/ which simply returns
JSON data.

The pusher channel is being sent data every 20 seconds. The details for
subscribing to pusher are: APP_KEY = 6a3acdaba86ad858948b APP_CLUSTER = eu
Channel = lineups Event = lineup-updated

You will not be judged on your design skills for this task, usability and
functionality are more important. You can use whatever libraries and tools you
want to - perhaps Vue or React would be a good choice combined with a HTTP
client library, such as Axios, and Pusher. You can use as much time as you want
to but please only use a responsible amount of time on the project.
