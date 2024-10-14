This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
- You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.
- This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Steps to run the application:
1. Set the `NEXT_PUBLIC_API_KEY` in your `.env.local` file.
2. This application was built using the latest version of React/Next.js.
3. I chose to use SSR wherever it was possible to optimize rendering time.
4. I also used Next Image, which loaded the images of the movies much faster than using the `<img>` tag.
5. The unit tests were created using Jest.

## Improvements that I would have made given more time:
- Separate the API requests to the Next.js server.
- Use layouts for shared components like Search and Navbar.
- Add more animations to the carousel.
- Create more complete error handling, as some images from the API don't load.