# Task-Management API
## Node, Express, MongoDB, Typescript, JavaScript, RabbitMQ, Socket.io

API that can authenticate user with email and password (Mock data)
API that can create task, update task & delete task.
When a task is created, it should be queued on Rabbitmq before being created in the db then send events through sockets.  



##

- [API URL](https://localhost:3000/api/v1)
- [github repo](https://github.com/Funmzy/Task-Management-API)

## Tech Stack

**Server:** Node, Express, Typescript


## Documentation

- [Postman doc](https://documenter.getpostman.com/view/18372119/2s8YekRumV)

## APP SET-UP

To run app,

1. run yarn
```bash
  yarn
```

2. edit environment variables in .env if need be, see sample.env file

3. compile 
```bash
  yarn compile:watch
```

4. start server
```bash
  yarn start:dev
```

