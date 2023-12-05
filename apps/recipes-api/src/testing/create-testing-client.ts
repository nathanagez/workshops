import express, { Router } from 'express';
import supertest from 'supertest';

export function createTestingClient(router: Router) {
  const app = express();
  app.use(router);
  return {
    client: supertest(app),
  };
}
