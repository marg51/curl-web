# Curl Web

### What is it?

Another [postman](https://www.getpostman.com/) or [paw](https://paw.cloud)

<img width="1429" alt="screen shot 2016-09-29 at 09 20 24" src="https://cloud.githubusercontent.com/assets/543507/18946304/2ad82fac-8626-11e6-8d4b-5ac492831c4f.png">

<img width="784" alt="screen shot 2016-09-29 at 09 20 45" src="https://cloud.githubusercontent.com/assets/543507/18946301/2863c394-8626-11e6-96af-a10aaae813b8.png">



## Tasks


### Level 1

- [ ] Improve the design of the list of available queries (left side)
- [ ] Improve the design of the Query View
- [ ] Can edit the name of the queries (currently it is `query.method + query.url`)
- [ ] Can clone queries
- [x] Persist queries on localstorage


### Level 2

- [ ] Add a global context
 - [ ] Choose / manage environments (ie. default hostname)
 - [ ] Choose / manage profiles (ie. user token )
 - [ ] Persisted on localstorage

A simplified version of the context would look like this:
```
context = {
    environments: {
        production: {
            hostname: "https://google.com",
            profiles: {
                staff: {
                    token: "123"
                }
            },
            profile: "staff"
        }
    },
    environment: "production"
}
```

This is how postman do it
![Postman environments](https://cloud.githubusercontent.com/assets/543507/18924582/9ed20b90-85a8-11e6-8fe6-3b6ae84494ae.png)

- [ ] Can lock queries (no further change on url & headers & params can be made unless you clone it)
- [ ] Create groups of queries
 - [ ] Automatically group queries by hostname
 - [ ] Create a new group manually and add queries to it
- [ ] Add Query History
 - [ ] list of recently triggered queries
 - [ ] last status of a query
- [ ] separate GET params from URL
- [ ] use flexbox instead of float-left or col-xx-n
- [ ] add tabs: ability to add new tabs to edit queries


### Level 3

- [ ] Dynamic headers/params (`function(context, queries)`)
- [ ] pre-request scripts ( can trigger other queries and the result would be set in the context, useful to get a token before doing an API call )
- [ ] Oauth authentication
- [ ] shareable (via link)



### Level Hardcore

- [ ] use redux to handle queries manipulations
- [ ] ctrl-z [depends on redux]

- [ ] fix the cors issue ( ie. create node/nginx proxy )

- [ ] tests
 - [ ] JSONschema
 - [ ] check any variable (like response time, size …)
 - [ ] full suite ( ie. full group of queries )


## Rules

- Should work on all modern browsers ( at least latest chrome, latest firefox )
- Only JSON. The body sent and data received are expected to be JSON only.
- Don't be shy: if you need external dependencies or if you need to refactor a large part of the code, go for it!
- Your ideas come first: if you think something should be done but is not in this list, do it!


## How to setup

```
git clone https://github.com/marg51/curl-web.git
cd curl-web
npm install
npm run build
npm start
```

At this point, you can open your browser at http://localhost:8080 and it should work.

If you get a 404 when you reload, go the root URL everytime.

If you don't want that to happen, you can use the attached nginx.conf. Don't forget to update the path (line 8 of nginx.conf)

If you're on linux, add it to `/etc/nginx/conf.d/`
If you're on mac, add it to `/usr/local/etc/nginx/conf.d/`

if nginx is already started: `sudo nginx -s reload` or `sudo nginx`


### Other commands

`npm run build:watch`
`npm test`
`npm run test:watch`
