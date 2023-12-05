import { greetingsRouter } from './greetings.router';
import { createTestingClient } from '../testing/create-testing-client';
import { register } from '../di';
import { GREETINGS_REPOSITORY_TOKEN } from './greetings.repository';
import { GreetingsRepositoryFake } from './greetings.repository.fake';

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
  const fakeRepo = new GreetingsRepositoryFake();
  register(GREETINGS_REPOSITORY_TOKEN, { useValue: fakeRepo });
  return createTestingClient(greetingsRouter);
}
