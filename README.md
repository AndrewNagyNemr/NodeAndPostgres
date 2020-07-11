## Requirements
PostgreSQL Version V12.  
Latest version of node and npm

## Installation of Server
create a database.
```bash
cd .\server\
npm i 
```
Set environment variables as below:
```bash

If you are using window machine
set db_name="Enter your db name here"
set db_user="Enter your db username here"
set db_password="Enter your db password here"
set db_port="Enter your db port here"
set db_host="Enter your host here"
if you are using mac or linux machine =>replace "set" with "export" 
```
Set database tables with dummy data:
```bash
node start.js
```
Start server app
```bash
node index.js
```
## Installation of client
```bash
cd .\client\
npm i 
```
Start client app
```bash
npm start
```
