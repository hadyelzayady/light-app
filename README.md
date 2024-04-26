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

## Project Ideas
Certainly! Here are some backend project ideas with a focus on lower-level programming:

1. HTTP Server from Scratch:
     Implement a basic HTTP server in C or Rust without using existing frameworks. This project involves socket programming, parsing HTTP requests, and handling responses.
2. Execution System: takes code to run -> runs code in server -> return execution result to the user
3. Database Engine:
     Build a simple database engine in C or Rust. Start with a key-value store and then extend it to support more complex operations like indexing and querying.
4. Distributed Key-Value Store:
     Create a distributed key-value store system using a language like Go. This project involves network programming, data replication, and fault tolerance.
5. Message Queue System:
     Develop a message queue system in C or Rust for asynchronous communication between microservices. Implement features like message persistence, message routing, and message acknowledgment.
6. TCP/IP Stack Implementation:
     Implement a TCP/IP stack from scratch in C. This project involves implementing the TCP, IP, and Ethernet layers, as well as handling packet routing and transmission.
7. Web Server with CGI Support:
     Build a web server with CGI (Common Gateway Interface) support in C or Rust. This project involves parsing HTTP requests, executing CGI scripts, and generating HTTP responses.
8. Proxy Server:
     Develop a simple proxy server in C or Rust that forwards HTTP requests and responses between clients and servers. This project involves socket programming, request forwarding, and caching.
9. Blockchain Node:
     Create a simple blockchain node in C or Rust. Implement features like block validation, peer-to-peer networking, and consensus mechanisms (e.g., Proof of Work).
10. File System:
     Build a basic file system in C or Rust. This project involves implementing file allocation, directory structures, and file operations (e.g., read, write, delete).
11. Web Framework from Scratch:
        Develop a lightweight web framework in C or Rust inspired by existing frameworks like Flask or Express.js. This project involves routing requests, handling middleware, and generating responses.
