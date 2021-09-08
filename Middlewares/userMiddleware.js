const User = require("../Models/user");
const logger = require("../Utils/logger");

let userMiddleware = {

    // MIDDLEWARE FUNCTION: To reuse the same code for user-fetch
    async getUser(req, res, next){ //next: if we call this move on to the next section of code
        let user;
        try {
            user = await User.findById(req.params.userId);
            if(user==null){
                logger.error(`Status: 404: User not found`);
                return res.status(404).json({message: "Could not find user"}) //404: Could not find anything
            }
        } catch (error) {
            logger.error(`Status: ${res.statusCode}: ${error.message}`);
            return res.status(500).json({message: error}); //500: Something wrong with server
        }
        res.user = user;
        next();
    }
}

module.exports = userMiddleware;