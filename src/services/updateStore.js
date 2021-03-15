export const objectToUpdate = (id, supportingClaims) => {
  let found;
  for (let i = 0; i < supportingClaims.length; i++) {
    const search1 = supportingClaims[i].clarifyingSentences.find(el => el.id === id);
    if (search1) {
      found = search1;
      break;
    }
    const search2 = supportingClaims[i].examples.find(el => el.id === id);
    if (search2) {
      found = search2;
      break;
    }
  }
  return found;
}

const updateStore = (entry) => {
  let update;
  const [ type ] = Object.entries(entry)[0];
  switch (type) {
    case 'theses':
      update = (state, action) => {
        state.thesis.thesis = action.payload.theses.thesis;
      }
      break;
    case 'supporting_claims':
      update = (state, action) => {
        const id = action.payload.supporting_claims.id;
        const claimObject = state.supportingClaims.find(el => el.id === id);
        claimObject.claim = action.payload.supporting_claims.claim;
        claimObject.position = action.payload.supporting_claims.position;
      }
      break;
    case 'clarifying_sentences':
      update = (state, action) => {
        const id = action.payload.clarifying_sentences.id;
        objectToUpdate(id, state.supportingClaims).sentence = action.payload.clarifying_sentences.sentence;
      }
      break;
    case 'examples':
      update = (state, action) => {
        const id = action.payload.examples.id;
        objectToUpdate(id, state.supportingClaims).example = action.payload.examples.example;
      }
      break;
    case 'linking_sentences':
      update = (state, action) => {
        const id = action.payload.linking_sentences.id;
        state.supportingClaims.find(el => el.linkingSentence.id === id).linkingSentence.sentence = action.payload.linking_sentences.sentence;
      }
      break;
    default:
      update = (state, action) => {}
  }

  return update;
}

export default updateStore;