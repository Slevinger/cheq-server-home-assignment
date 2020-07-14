// middleware for doing role-based permissions

module.exports = {
  permit: (...allowed) => {
    const isAllowed = role => allowed.indexOf(role) > -1;

    // return a middleware
    return (request, response, next) => {
      let error = false;
      if (request.user && isAllowed(request.user.role)){
        if(request.params.user_id && request.user.role !== "admin" && request.user.id !== request.params.user_id){
          error = true;
        }
      } // role is allowed, so continue on the next middleware
      else {
        error = true;
      }
      if(error){
        response.status(403).json({
          message: 'Forbidden',
          more_info: `user with role "${request.user.role}" cant perform this request`,
        });
      } else {
        next();
      }
    };
  },
};
