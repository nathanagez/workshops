import { greetingsRouter } from './greetings.router';
import { createTestingClient } from './testing/create-testing-client';

describe(greetingsRouter.name, () => {
  it('should say hi', async () => {
    const { client } = setUp();

    const response = await client.get('/greetings');

    expect(response.statusCode).toBe(200);
    expect(response.body.items).toContainEqual(
      expect.objectContaining({
        label: 'Hi!',
      })
    );
  });
});

function setUp() {
  return createTestingClient(greetingsRouter);
}
