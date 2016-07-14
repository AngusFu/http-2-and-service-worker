# HTTP/2 server with koa

refrence:

- [Easy HTTP/2 Server with Node.js and Express.js/](http://webapplog.com/http2-node/)

- [add-spdy-http-2-push-methods-to-koa-middleware/](http://stackoverflow.com/questions/34693381/add-spdy-http-2-push-methods-to-koa-middleware)

1.first, generate ssl certificate

```bash

# make directory for certificates
> mkdir cert && cd cert

> openssl genrsa -des3 -passout pass:x -out server.pass.key 2048

# ...

> openssl rsa -passin pass:x -in server.pass.key -out server.key 

# ...

> rm server.pass.key
> openssl req -new -key server.key -out server.csr

# ...

> openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt

# ...
# done!

```

2.coding

```bash

# return to project root and then create a new directory
> cd .. && mkdir server

> npm init

> npm install express spdy --save

> cd server 
> touch index.js
> vim index.js

# now begin coding...

```

[see the server code here](./server/index.js)


3.run the server

```bash

pm2 start ./server/index.js

# or
node index.js

```