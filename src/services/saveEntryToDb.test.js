import saveEntryToDb from './saveEntryToDb.js';

describe('saveEntryToDb(user, type, entry)', () => {
  it('puts an existing entry or creates a new one', async () => {
    const user = {
      id: 'f4608031-2a1b-427c-9e44-8ae5106397ba',
      session_id: '5b01d45f-bbb5-4817-8787-c475ced03294'
    };
    const type = 'theses';
    const entry = {
      id: '1b8e0ffc-e847-465d-aec4-162601e0f02d',
      thesis: 'This is the thesis.'
    };
    const documentId = '7677e7d5-68d4-4deb-8f79-f0c7add84818';

    const response = await saveEntryToDb(user, type, entry, documentId);

    console.log(response);
  });
});