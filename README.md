# Hopp
Hopp is Icelandic for "bounce".  This client/server app bounces data from one place to another for consumption via the web.  This is more of a collection (well, a collection of 2) of utilities than an actual finished app.  The sender is meant to reside wherever one is trying to copy logs *from*, as long as it can connect to a network (e.g. the Internet) that can reach the receiver.  The receiver is meant to sit somewhere visible, because it converts the incoming data from the sender into websocket traffic that is meant to be consumed by a web page.  The file viewer.html is a very basic example of how to consume the websocket.

## Installation
Copy sender.js and package.json to wherever you want to ship data *from*.  Configure it by editing the *settings* object at the top of the file.  Then:

```
npm i
node sender.js
```

Copy receiver.js and package.json to wherever you want the websocket to run from.

```
npm i
node receiver.js
```

Copy viewer.html to somewhere that can serve web pages.

## Usage
Use viewer.html as a template to build your own log viewer.

## Contributing
Not looking for contributions to this "project", it's just here to share as a base.

## License
[MIT](https://choosealicense.com/licenses/mit/)