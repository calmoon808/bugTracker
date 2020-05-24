import React from 'react';
import Cookies from 'js-cookie';
import { StreamApp, FlatFeed, Activity, LikeButton } from 'react-activity-feed';
import 'react-activity-feed/dist/index.css';
const GetStream = () => {
  return (
    <StreamApp
      apiKey={process.env.REACT_APP_ACTIVITY_FEED_KEY}
      appId={process.env.REACT_APP_ACTIVITY_FEED_ID}
      token={Cookies.get('activityFeedToken')}
    > 
      <FlatFeed 
        feedGroup="projectFeed"
        LoadingIndicator
        notify
        Activity={(props) => 
          <Activity {...props} 
            Footer={() => (
              <div>
                <LikeButton {...props} />
              </div>
            )}
          />
        }
      />
    </StreamApp>
  );
};

export default GetStream;