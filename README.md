# Discover

A photo-sharing web application.

![Discover](/public/discover.png);

Visit [Discover](https://discover-social.vercel.app/)

After learning about backend development, I wanted to create a full-stack application. So I considered making a social media application. The fact that I had to use a database and build numerous features for this project prompted me to make it.

Users on the photo-sharing website can create, edit, and delete posts. While following other users, one can also like or comment on their postings.

- Users can create, edit, and remove posts as well as like, comment, and share other people's posts. In addition to that, a user can follow another user.
- Implemented Authentication using Firebase Auth and used Firestore and Firebase Storage for storing user post data and images.
- Integrated TanstackQuery for managing server-side state. Upon mutation, it re-fetches the data from the server.
- Implemented Real-time updates of likes and comments by subscribing to the document in Firestore.

## TechStack

### NextJS

NextJS is a React framework designed for production. Some features it offers are Image Optimization, SSG and SSR, and File-system Routing. It also includes built-in code splitting capability. During the build process, each file in the "pages/" directory will be automatically code split into its JavaScript bundle. Since it offers these fantastic features, I pick NextJS.

### Firebase

### TanStack Query

During the application's development, I discovered that visiting a page that has already been viewed results in a loading screen. That is a poor user experience. Instead, I could save the earlier results I had retrieved and display them alongside the loading icon. But it wasn't enough; the cached data needs to be updated when the user modifies the data in database. In addition, I wanted to combine several requests for the same data into one. To tackle the issue, I looked for libraries. While the majority of conventional state management frameworks, such as Redux, excel at handling client states, they fall short when handling async or server-side state. TanStack queries resolves all issues relating to server-side state management.

### TailwindCSS

Utility classes allow us to write the style of a component directly in the class, which speeds up development. Additionally, it offers a design system with typeface, colors, spacing, and many other elements.

### Zod

Verifying the user-submitted data on the server is crucial. For this, there are several libraries available.I decided to use Zod because I was already familiar with it. It permits building a data schema and comparing user-submitted data to it. Furthermore, it offers types for the schemas.

## Future Scope

- Allow user to upload a post with mulitple images and videos
- Add more authentication providers
