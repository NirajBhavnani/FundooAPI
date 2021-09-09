# FundooAPI
## *A note-keeping API made with Express.js, with MongoDB as its database.*

### File Structure
```js
FundooAPI
│   .gitignore
│   index.js
│   package-lock.json
│   package.json
│   swagger.yaml
│
├───Controllers
│       notesController.js
│       userControler.js
│
├───Middlewares
│       notesMiddleware.js
│       userMiddleware.js
│
├───Models
│       notes.js
│       user.js
│
└───Router      
│       noteRouter.js
│       router.js
│
└───Utils
        logger.js
```

### Branches :
* 1_Express_Kickoff: Fundamentals of express and mongoose
* 2_Basics: Understanding middlewares and improving routes usage
* 3_Router_Models: Creating Router and Models directories as per MVC architecture
* 4_CRUD_User
* 5_CRUD_User_Middleware
* 6_MVC_Login_Register
* 7_WinstonLogger
* 8_ExpressValidator
* 9_Swagger
* 10_NotesAPI