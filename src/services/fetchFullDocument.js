const extractBody = async (response) => {
  if (response.ok) {
    return await response.json();
  } else {
    return {};
  }
}

export const makeSupportingClaimObject = (unformattedDocument, index) => {
  let id, claim, position, clarifyingSentences, examples, linkingSentence;
  
  // supporting claim
  if (Array.isArray(unformattedDocument[1])) {
    id = unformattedDocument[1][index].id;
    claim = unformattedDocument[1][index].claim;
    position = unformattedDocument[1][index].position;
  } else {
    id = unformattedDocument[1].id;
    claim = unformattedDocument[1].claim;
    position = unformattedDocument[1].position;
  }

  // clarifying sentences
  if (Array.isArray(unformattedDocument[3])) {
    clarifyingSentences = unformattedDocument[3].filter(({ supporting_claim_id }) => supporting_claim_id === id );
  } else {
    clarifyingSentences = (unformattedDocument[3].hasOwnProperty('supporting_claim_id') && unformattedDocument[3].supporting_claim_id === id)
      ? [ unformattedDocument[3] ]
      : [];
  }
  const extractSentences = clarifyingSentences.map(({ sentence }) => sentence);
  clarifyingSentences = extractSentences;

  // examples
  if (Array.isArray(unformattedDocument[4])) {
    examples = unformattedDocument[4].filter(({ supporting_claim_id }) => supporting_claim_id === id );
  } else {
    examples = (unformattedDocument[4].hasOwnProperty('supporting_claim_id') && unformattedDocument[4].supporting_claim_id === id)
      ? [ unformattedDocument[4] ]
      : [];
  }
  const extractExamples = examples.map(({ example }) => example);
  examples = extractExamples;

  // linking sentence
  if (Array.isArray(unformattedDocument[5])) {
    linkingSentence = unformattedDocument[5].find(({ supporting_claim_id }) => supporting_claim_id === id).sentence;
  } else {
    linkingSentence = (unformattedDocument[5].hasOwnProperty('supporting_claim_id') && unformattedDocument[5].supporting_claim_id === id)
      ? unformattedDocument[5].sentence
      : '';
  }
  return { id, claim, position, clarifyingSentences, examples, linkingSentence };
}

export const makeDocumentObject = (unformattedDocument) => {
  const id = unformattedDocument[0].id;
  const title = unformattedDocument[0].title;
  const thesis = unformattedDocument[2].thesis;
  let supportingClaims;
  if (Array.isArray(unformattedDocument[1])) {
    supportingClaims = unformattedDocument[1].map((supportingClaim, index) => makeSupportingClaimObject(unformattedDocument, index));
  } else {
    supportingClaims = (unformattedDocument[1].hasOwnProperty('id')) ? [ makeSupportingClaimObject(unformattedDocument) ] : [];
  }
  return { id, title, thesis, supportingClaims };
}

const fetchFullDocument = async (user, title) => {
  try {
    let response, responseBody;
    response = await fetch(`http://localhost:4545/access/${user.id}/documents?title=${title}&s=${user.session_id}`);
    if (response.ok) {
      responseBody = await response.json();
    } else {
      throw new Error(response.statusText);
    }
    const document = responseBody;
    response = await fetch(`http://localhost:4545/access/${user.id}/supporting_claims?document_id=${document.id}&s=${user.session_id}`);
    const supportingClaims = await extractBody(response);
    const fetchThesis = fetch(`http://localhost:4545/access/${user.id}/theses?document_id=${document.id}&s=${user.session_id}`);
    const fetchClarifyingSentences = [], fetchExamples = [], fetchLinkingSentences = [];
    supportingClaims.forEach(supportingClaim => {
      fetchClarifyingSentences.push(fetch(`http://localhost:4545/access/${user.id}/clarifying_sentences?supporting_claim_id=${supportingClaim.id}&s=${user.session_id}`));
      fetchExamples.push(fetch(`http://localhost:4545/access/${user.id}/examples?supporting_claim_id=${supportingClaim.id}&s=${user.session_id}`));
      fetchLinkingSentences.push(fetch(`http://localhost:4545/access/${user.id}/linking_sentences?supporting_claim_id=${supportingClaim.id}&s=${user.session_id}`));
    });
    const responses = await Promise.all([
      Promise.all([ fetchThesis ]),
      Promise.all(fetchClarifyingSentences),
      Promise.all(fetchExamples),
      Promise.all(fetchLinkingSentences)
    ]);
    const extractBodies = responses.map(set => Promise.all(set.map(each => extractBody(each))));
    const responseBodies = await Promise.all(extractBodies);
    const thesis = responseBodies[0][0];
    const clarifyingSentences = responseBodies[1].flat();
    const examples = responseBodies[2].flat();
    const linkingSentences = responseBodies[3];
    return makeDocumentObject([ document, supportingClaims, thesis, clarifyingSentences, examples, linkingSentences ]);
  } catch(err) {
    return err.message ? err.message : 'Something went wrong';
  }
}

export default fetchFullDocument;