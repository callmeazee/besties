// Fix trailing slash automatically if process.env.CLIENT has one
const clientUrl = process.env.CLIENT?.replace(/\/$/, "");

const corsConfig = {
  origin: clientUrl || "https://besties-sandy.vercel.app",
  credentials: true,
};

export default corsConfig;
