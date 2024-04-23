# Light App
  * Super fast app built on super fast tools mostly built on my house

## Features
- Search movies and TV series asynchronously with sorting
  - use type SQL query in input box
  - backend receives SQL, then execute SQL asynchronously, after the result is received
  the server sends the result set to the front-end, this will give the user the ability to execute multiple  read queries in parallel and the user will see the result of each query in collapse panel
## tools
1. lsqs for message queue ((J/T)S on bun runtime)
2. yew web framework for web front-end
3. mongodb for database
4. golang for backend
