This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This project explores two concepts:
* GraphQl data fetching using Appolo client.
* middleware to handle internal re-routing of requests based on user-agent and page type.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev

# build:
npm run build
# followed by
npm run start
```

Open [http://localhost:3000](http://localhost:3000)


## Structure

#### IMPORTANT !
This project is dependent on the GraphQl Server project to fetch the data.
Get it here: [GraphQl Apollo Server](https://github.com/guipina/graphql-server-test)

### Middleware
* Routes the request to the respective device type directory based on user agent ("desktop" or "mobile").
* Routes the request to the respective dynamic url page based on the Static URL cache.

### Webhook endpoint to refetch URL list
webhook URL [http://localhost:3000/refetch-static-urls](http://localhost:3000/refetch-static-urls)




