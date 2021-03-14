import fetchFullDocument from './fetchFullDocument.js';

describe('fetchFullDocument(user, title)', () => {
  it('returns a full document formatted for redux', async () => {
    const user = {
      id: 'f4608031-2a1b-427c-9e44-8ae5106397ba',
      session_id: '650fa4db-6237-496a-9758-0c47d3c50980'
    };
    const title = 'will this work';

    const result = await fetchFullDocument(user, title);

    console.log(result);
  })
})