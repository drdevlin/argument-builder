import createUser from './createUser';

describe('createUser(userInfo)', () => {
  it('returns a response', async () => {
    const user = { email: 'foo@bar.com', password: 'baz' };
    const response = await createUser(user);
    console.log(response);
    expect(response).not.toBeNull();
  });
});
