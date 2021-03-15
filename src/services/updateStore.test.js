import updateStore from './updateStore.js';
import { objectToUpdate } from './updateStore.js';

const state = {
  id: '0',
  title: 'title',
  thesis: {
    id: '1',
    thesis: 'initial'
  },
  supportingClaims: [
    {
      id: '2',
      claim: 'initial',
      position: 0,
      clarifyingSentences: [{
        id: '3',
        sentence: 'initial'
      }],
      examples: [{
        id: '4',
        example: 'initial'
      }],
      linkingSentence: {
        id: '5',
        sentence: 'initial'
      }
    }
  ]
}

const expected = {
  id: '0',
  title: 'title',
  thesis: {
    id: '1',
    thesis: 'initial'
  },
  supportingClaims: [
    {
      id: '2',
      claim: 'initial',
      position: 0,
      clarifyingSentences: [{
        id: '3',
        sentence: 'initial'
      }],
      examples: [{
        id: '4',
        example: 'initial'
      }],
      linkingSentence: {
        id: '5',
        sentence: 'initial'
      }
    }
  ]
}

describe('updateStore(entry)', () => {
  describe('returns a function for updating the store', () => {
    it('updates the thesis', () => {
      const entry = { theses: { id: '1', thesis: 'updated' }};
      const update = updateStore(entry);
      const action = { payload: entry };

      expected.thesis.thesis = 'updated';
  
      update(state, action);
      
      expect(state).toMatchObject(expected);
      state.thesis.thesis = 'initial';
      expected.thesis.thesis = 'initial';
    });
    it('updates a supporting claim', () => {
      const entry = { supporting_claims: { id: '2', claim: 'updated', position: 1 }};
      const update = updateStore(entry);
      const action = { payload: entry };

      expected.supportingClaims[0].claim = 'updated';
      expected.supportingClaims[0].position = 1;
  
      update(state, action);
      
      expect(state).toMatchObject(expected);
      state.supportingClaims[0].claim = 'initial';
      state.supportingClaims[0].position = 0;
      expected.supportingClaims[0].claim = 'initial';
      expected.supportingClaims[0].position = 0;
    });
    it('updates a clarifying sentence', () => {
      const entry = { clarifying_sentences: { id: '3', sentence: 'updated' }};
      const update = updateStore(entry);
      const action = { payload: entry };

      expected.supportingClaims[0].clarifyingSentences[0].sentence = 'updated';
  
      update(state, action);
      
      expect(state).toMatchObject(expected);
      state.supportingClaims[0].clarifyingSentences[0].sentence = 'initial';
      expected.supportingClaims[0].clarifyingSentences[0].sentence = 'initial';
    });
    it('updates an example', () => {
      const entry = { examples: { id: '4', example: 'updated' }};
      const update = updateStore(entry);
      const action = { payload: entry };

      expected.supportingClaims[0].examples[0].example = 'updated';
  
      update(state, action);
      
      expect(state).toMatchObject(expected);
      state.supportingClaims[0].examples[0].example = 'initial';
      expected.supportingClaims[0].examples[0].example = 'initial';
    });
    it('updates a linking sentence', () => {
      const entry = { linking_sentences: { id: '5', sentence: 'updated' }};
      const update = updateStore(entry);
      const action = { payload: entry };

      expected.supportingClaims[0].linkingSentence.sentence = 'updated';
  
      update(state, action);
      
      expect(state).toMatchObject(expected);
      state.supportingClaims[0].linkingSentence.sentence = 'initial';
      expected.supportingClaims[0].linkingSentence.sentence = 'initial';
    });
  });
});


describe('objectToUpdate(id, supportingClaims)', () => {
  it('finds the object with the given id', () => {
    const id = 'foo';
    const supportingClaims = [{
      clarifyingSentences: [{
        id: 'foo',
        sentence: 'bar'
      }],
      examples: []
    }];

    const expected = supportingClaims[0].clarifyingSentences[0];

    const result = objectToUpdate(id, supportingClaims);

    expect(result).toBe(expected);
  })
})