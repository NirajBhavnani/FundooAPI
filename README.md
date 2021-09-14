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
│       authentication.js
│       notesMiddleware.js
│       userMiddleware.js
│
├───Models
│       notes.js
│       user.js
│
├───Router      
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
* 4_CRUD_User: Performed CRUD operations on User Model
* 5_CRUD_User_Middleware: Performed CRUD operations using Middleware
* 6_MVC_Login_Register: More specific MVC pattern followed and authentication as well as registration of User is implemented
* 7_WinstonLogger: Winston Logger is implemented to replace console.log and to store the logs in files and mongodb
* 8_ExpressValidator: express-validator is used for the server-side validation
* 9_Swagger: Swagger functionality is integrated for maintaining documentation
* 10_NotesAPI: Notes schema is generated and CRUD operations are performed.
* 11_JWT: JWT(Token) Generation and Authentication is implemented in user schema as well as notes schema.
* 12_ForgetResetPassword: Bcrypt package, forgot and reset password (nodemailer) functionalities added.