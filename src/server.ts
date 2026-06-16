import { app } from './app';
import { env } from './config/env';
import { AppDataSource } from './data-source';

AppDataSource.initialize()
  .then(() => {
    app.listen(env.port, () => {
      console.log(`API running on http://localhost:${env.port}${env.apiPrefix}`);
    });
  })
  .catch((error) => {
    console.error('Error while initializing database connection:', error);
    process.exit(1);
  });
