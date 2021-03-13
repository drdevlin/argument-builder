import fetchFullDocument from './fetchFullDocument.js';

describe('fetchFullDocument(user, title)', () => {
  it('returns a full document formatted for redux', async () => {
    const user = {
      id: 'f4608031-2a1b-427c-9e44-8ae5106397ba',
      session_id: '899fef8f-187e-4c55-ad5b-f4d9a26074a1'
    };
    const title = 'will this work';

    const result = await fetchFullDocument(user, title);

    console.log(result);
  })
})