const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const allUsers = () => {
  // Utility function
  // RETURNS: List of all users in the database
  // Return type: User[]
  /* YOUR CODE HERE */
};

exports.verifyUser = (userInfo) => {
  // Utility function
  // Verifies the user is logged in
  // May need more params/to be adjusted, I didn't really think this one through
};

// GET user by ID or users by AdminID
exports.getUserById = catchAsync(async (req, res, next) => {
  // Verify the user is logged in, and get their user ID from JWT
  /* YOUR CODE HERE */

  // Check if they are an admin or not
  /* YOUR CODE HERE */

  // If they are not an admin:

  //    Send back the information on the single user with success status code 200
  /*    YOUR CODE HERE */

  // If they are an admin:

  //    Segment the data to get (total users / total admin users) users (we can figure this out later)
  /*    YOUR CODE HERE */

  //    Send back the information on the multiple users with success status code 200
  /*    YOUR CODE HERE */
});

// POST signup user
exports.signup = catchAsync(async (req, res, next) => {
  // Get the info about the user
  const newUserInfo = req.params;

  // Sign the user up
  /* YOUR CODE HERE */
});

// POST login user
exports.login = catchAsync(async (req, res, next) => {
  // Get the info about the user who is trying to log in
  const userInfo = req.params;

  // Validate that the user login info matches an instance in the database
  /* YOUR CODE HERE */

  // If the user has incorrect credentials, raise a 401 Unauthorized error
  /* YOUR CODE HERE */

  // If the user has the correct credentials, log them in (I'm thinking JWT)
  /* YOUR CODE HERE */
});

// DELETE user by ID
exports.deleteUser = catchAsync(async (req, res, next) => {
  // Verify the user is logged in, and get their user ID from JWT
  /* YOUR CODE HERE */
  // Delete the user from the database
  /* YOUR CODE HERE */
});

// PATCH user by ID - Edits user information
exports.patchUser = catchAsync(async (req, res, next) => {
  // Verify the user is logged in, and get their user ID from JWT
  /* YOUR CODE HERE */

  // Get the info the user wants to change
  const updatedInfo = req.query;

  // Change the info in the database
  /* YOUR CODE HERE */
});
