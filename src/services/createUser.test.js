import createUser from './createUser';

describe('createUser(userInfo)', () => {
  it('returns a response', async () => {
    const user = { email: 'foo@bar.com', password: 'baz' };
    const response = await createUser(user);
    expect(response).not.toBeNull();
  });
  it('returns a successful status object on success', async () => {
    const user = { email: 'goo@car.com', password: 'caz' };
    const response = await createUser(user);
    expect(response.ok).toBeTruthy();
  });
  it('returns a failure status object on fail', async () => {
    const user = { email: 'goo@car.com', password: 'caz' };
    const response = await createUser(user);
    expect(response.ok).toBeFalsy();
  });
});
