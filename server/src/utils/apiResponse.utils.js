// Standardised API response helpers
// All controllers use these helpers so the response shape is consistent.

/**
 * Send a success response
 * @param {object} res - Express response object
 * @param {number} statusCode
 * @param {string} message
 * @param {*} data - payload to send
 */
const sendSuccess = (
  res,
  statusCode = 200,
  message = "Success",
  data = null,
) => {
  const payload = { success: true, message };
  if (data !== null) payload.data = data;
  return res.status(statusCode).json(payload);
};

/**
 * Send an error response (used inside controllers for expected errors)
 * Unexpected errors should be passed to next(error) instead.
 */
const sendError = (res, statusCode = 400, message = "Something went wrong") => {
  return res.status(statusCode).json({ success: false, message });
};

module.exports = { sendSuccess, sendError };
