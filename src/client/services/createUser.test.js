import createUser from './createUser';

describe('createUser(userInfo)', () => {
  it('returns a response', async () => {
    const user = { email: 'foo@bar.com', password: 'baz' };
    const response = await createUser(user);
    console.log(response);
    expect(response).not.toBeNull();
  });
  it('returns a successful status object on success', async () => {
    const user = { email: 'foo@bar.com', password: 'baz' };
    const expectedResponse = { success: true, message: 'User foo@bar.com created.' };
    const actualResponse = await createUser(user);
    expect(actualResponse).toMatchObject(expectedResponse);
  });
  it('returns a failure status object on fail', async () => {
    const user = { email: 'foo@bar.com', password: 'baz' };
    const response = await createUser(user);
    expect(response.success).toBeFalsy();
    expect(response.message).toBeTruthy();
  });
});
