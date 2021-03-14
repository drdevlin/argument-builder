import saveEntry from './saveEntry.js';

describe('saveEntry(user, type, entry)', () => {
  it('puts an existing entry or creates a new one', async () => {
    const user = {
      id: 'f4608031-2a1b-427c-9e44-8ae5106397ba',
      session_id: '650fa4db-6237-496a-9758-0c47d3c50980'
    };
    const type = 'theses';
    const entry = {
      id: 'cec195f9-8a48-4e02-b8b7-ed70b93606df',
      thesis: 'This is the thesis.'
    };
    const documentId = '7677e7d5-68d4-4deb-8f79-f0c7add84818';

    const response = await saveEntry(user, type, entry, documentId);

    console.log(response);
  });
});