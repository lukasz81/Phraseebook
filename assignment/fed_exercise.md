Write a single page application in a front end technology of choice. The application should have a single page with a navbar, containing a single drop-down to present a list of notifications.

The application will consume the notification feed from the URL http://www.mocky.io/v2/5b4315f12e00004c002230c3 that provides an example of aggregated notifications.

The notification feed is from a hypothetical social website that allows users to write posts, like posts and comment on posts. The notifications can be of two types: Like and Comment. Like indicates that one or more users liked a user's post and Comment indicates that one or more users commented on a user's post. The notifications are aggregated per type and post.

The UI should present a single element per object in the feed and contain the following information:
 - The post title (truncated if too long)
 - A placeholder of the picture of the first person that liked/commented on the post.
 - The names of the users that like/commented on the post presented with the following logic.
       Full name of the first user
       Full name of the second user if present
       Number of additional users that liked/commented if more than 2

The goal is to assess not just the processing of the data, but also the use of front-end specific technologies. We are looking for a response that is as close to production ready as possible.

Use the provided example as a guide on how to visualise the feed. We do not expect the visualisation to match the UI design exactly and would prefer to see original implementation of the layout and interaction with consideration for things like responsive layout.

A button in the navbar should display the number of notifications and provide the trigger to open the feed and display the list of unread notifications. Clicking the same button again should mark all notifications as read.
