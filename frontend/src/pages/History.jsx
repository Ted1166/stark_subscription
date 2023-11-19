// import React, { useEffect, useState } from 'react';
// import { Grid, Notification } from '@mantine/core';
// import { contract } from '../config/config';

// const History = () => {
//   const [subscriptionHistory, setSubscriptionHistory] = useState([]);

//   const updateHistory = (packageSubscribed) => {
//     const newSubscription = {
//       package: packageSubscribed.name,
//       subscribedAt: new Date().toLocaleString(), // Store the subscription date and time
//     };

//     setSubscriptionHistory([...subscriptionHistory, newSubscription]);
//   };

//   const getHistory = () => {
//     // Logic to retrieve user's subscription history from database or context, etc.
//     // Example: Replace this with your actual data fetching logic
//     // const userHistory = fetchUserSubscriptionHistory(); 
//     // setSubscriptionHistory(userHistory);
//   };

//   useEffect(() => {
//     getHistory();
//   }, []);

//   // Event handler function when the user successfully subscribes to a channel
//   const handleSubscriptionFromChannel = (packageSubscribed) => {
//     updateHistory(packageSubscribed);
//     // Perform any additional actions needed when a user subscribes from Subscription_channel
//     // This function will be called whenever a user subscribes from the Subscription_channel component
//   };

//   // Subscription_channel component (SubscriptionPackage.jsx) can call this function to trigger history update
//   const updateHistoryFromSubscriptionChannel = (packageSubscribed) => {
//     handleSubscriptionFromChannel(packageSubscribed);
//   };

//   return (
//     <div>
//       {/* Display user's subscription history */}
//       <Grid>
//         {subscriptionHistory.map((subscription, index) => (
//           <Grid.Col key={`subscription_${index}`} span={{ xs: 12 }}>
//             <div>
//               <p>Package: {subscription.package}</p>
//               <p>Subscribed At: {subscription.subscribedAt}</p>
//             </div>
//           </Grid.Col>
//         ))}
//       </Grid>
//     </div>
//   );
// };

// export default History;

import React from 'react'

const History = () => {
  return (
    <div>History</div>
  )
}

export default History