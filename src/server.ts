import connectionDB from './config/database.ts';
import app from './app.ts';

// Database 
connectionDB();

// Server 
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('unhandledRejection', (err: unknown) => {
  const message = err instanceof Error
    ? `${err.name} | ${err.message}`
    : String(err);

  console.error(`unhandledRejection: ${message}`);
  server.close(() => {
    console.error('Shutting down...');
    process.exit(1);
  });
});

export default server;