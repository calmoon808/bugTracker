const stream = require("getstream");

const client = stream.connect(
  process.env.REACT_APP_ACTIVITY_FEED_KEY, 
  process.env.REACT_APP_ACTIVITY_FEED_SECRET,
  process.env.REACT_APP_ACTIVITY_FEED_ID
)

module.exports = client