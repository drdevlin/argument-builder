/**
 * Fetches all the existing sections of a document.
 * And formats them into a document object for the redux store.
 * @module
 */


/**
 * Helper Function.
 * Extracts the JSON body from fetch's response.
 * @param {<Response>} response Response object from fetch
 * @returns {Object}            A Javascript Object of the JSON body
 */
const extractBody = async (response) => {
  if (response.ok) {
    return await response.json();
  } else {
    return {};
  }
}


/**
 * Helper Function.
 * Formats the relevant unformatted sections into an appropriately formatted supporting claim object
 * for the redux store.
 * @param {Object[]} unformattedDocument An array of all fetched sections of the document
 * @param {number}   index               The index of the supporting claim. Needed when there's more than one.
 * @returns {Object}                     A supporting claim object for the redux store
 */
export const makeSupportingClaimObject = (unformattedDocument, index) => {
  let id, claim, position, clarifyingSentences, examples, linkingSentence;
  
  // Grab the supporting claim's base properties
  // The unformatted supporting claim (or the array of many) should be at unformattedDocument[1]
  if (Array.isArray(unformattedDocument[1])) {
    id = unformattedDocument[1][index].id;
    claim = unformattedDocument[1][index].claim;
    position = unformattedDocument[1][index].position;
  } else {
    id = unformattedDocument[1].id;
    claim = unformattedDocument[1].claim;
    position = unformattedDocument[1].position;
  }

  // Grab the clarifying sentences that belong to the supporting claim
  // The unformatted clarifying sentences (or sentence) should be at unformattedDocument[3]
  if (Array.isArray(unformattedDocument[3])) {
    clarifyingSentences = unformattedDocument[3].filter(({ supporting_claim_id }) => supporting_claim_id === id );
  } else {
    clarifyingSentences = (unformattedDocument[3].hasOwnProperty('supporting_claim_id') && unformattedDocument[3].supporting_claim_id === id)
      ? [ unformattedDocument[3] ]
      : [];
  }
  const extractSentences = clarifyingSentences.map(({ id, sentence, word }) => { return { id, sentence, word } });
  clarifyingSentences = extractSentences;

  // Grab the examples that belong to the supporting claim
  // The unformatted examples (or example) should be at unformattedDocument[4]
  if (Array.isArray(unformattedDocument[4])) {
    examples = unformattedDocument[4].filter(({ supporting_claim_id }) => supporting_claim_id === id );
  } else {
    examples = (unformattedDocument[4].hasOwnProperty('supporting_claim_id') && unformattedDocument[4].supporting_claim_id === id)
      ? [ unformattedDocument[4] ]
      : [];
  }
  const extractExamples = examples.map(({ id, example, word }) => { return { id, example, word }});
  examples = extractExamples;

  // Grab the linking sentence that belongs to the supporting claim
  // It should be at unformattedDocument[5]
  if (Array.isArray(unformattedDocument[5])) {
    const foundSentence = unformattedDocument[5].find(({ supporting_claim_id }) => supporting_claim_id === id)
    linkingSentence = { id: foundSentence.id, sentence: foundSentence.sentence };
  } else {
    linkingSentence = (unformattedDocument[5].hasOwnProperty('supporting_claim_id') && unformattedDocument[5].supporting_claim_id === id)
      ? { id: unformattedDocument[5].id, sentence: unformattedDocument[5].sentence }
      : {};
  }

  // Combine all the grabs into an object and return it
  return { id, claim, position, clarifyingSentences, examples, linkingSentence };
}


/**
 * Helper Function.
 * Formats all unformatted sections into an appropriately formatted document object for the redux store.
 * @param {Object[]} unformattedDocument An array of all fetched sections of the document
 * @returns {Object}                     A document object for the redux store
 */
export const makeDocumentObject = (unformattedDocument) => {

  // Grab the document's base properties
  const id = unformattedDocument[0].id;
  const title = unformattedDocument[0].title;

  // Make the formatted thesis object (and grab it)
  const thesis = { id: unformattedDocument[2].id, thesis: unformattedDocument[2].thesis };

  // Make each supporting claim into a formatted supporting claim object (and grab them)
  let supportingClaims;
  if (Array.isArray(unformattedDocument[1])) {
    supportingClaims = unformattedDocument[1].map((supportingClaim, index) => makeSupportingClaimObject(unformattedDocument, index));
  } else {
    supportingClaims = (unformattedDocument[1].hasOwnProperty('id')) ? [ makeSupportingClaimObject(unformattedDocument) ] : [];
  }

  // Combine all the grabs into an object and return it
  return { id, title, thesis, supportingClaims };
}


/**
 * The Main Function.
 * Fetches all the sections of a document, then formats it for the redux store.
 * @param {Object} user  The user's id and session id
 * @param {string} title The title of the document
 * @returns {Object}     A document object for the redux store
 */
const fetchFullDocument = async (user, title) => {
  try {

    // First we fetch the document's id
    let response, responseBody;
    response = await fetch(`http://localhost:4545/access/${user.id}/documents?title=${title}&s=${user.session_id}`);
    if (response.ok) {
      responseBody = await response.json();
    } else {
      throw new Error(response.statusText);
    }
    const document = responseBody;

    // Then we use the document id to fetch its supporting claims
    response = await fetch(`http://localhost:4545/access/${user.id}/supporting_claims?document_id=${document.id}&s=${user.session_id}`);
    const supportingClaims = await extractBody(response);

    // Now we create a bunch of arrays of fetches, which return promises
    const fetchThesis = fetch(`http://localhost:4545/access/${user.id}/theses?document_id=${document.id}&s=${user.session_id}`);
    const fetchClarifyingSentences = [], fetchExamples = [], fetchLinkingSentences = [];
    supportingClaims.forEach(supportingClaim => {
      fetchClarifyingSentences.push(fetch(`http://localhost:4545/access/${user.id}/clarifying_sentences?supporting_claim_id=${supportingClaim.id}&s=${user.session_id}`));
      fetchExamples.push(fetch(`http://localhost:4545/access/${user.id}/examples?supporting_claim_id=${supportingClaim.id}&s=${user.session_id}`));
      fetchLinkingSentences.push(fetch(`http://localhost:4545/access/${user.id}/linking_sentences?supporting_claim_id=${supportingClaim.id}&s=${user.session_id}`));
    });

    // And we stick all those in a Promise.all() to await them all in parallel
    const responses = await Promise.all([
      Promise.all([ fetchThesis ]),
      Promise.all(fetchClarifyingSentences),
      Promise.all(fetchExamples),
      Promise.all(fetchLinkingSentences)
    ]);

    // We convert all the JSON response bodies to JS objects
    const extractBodies = responses.map(set => Promise.all(set.map(each => extractBody(each))));
    const responseBodies = await Promise.all(extractBodies);

    // And we pull those JS objects out of the arrays returned by Promise.all()
    const thesis = responseBodies[0][0];
    const clarifyingSentences = responseBodies[1].flat();
    const examples = responseBodies[2].flat();
    const linkingSentences = responseBodies[3];

    // Then we take all these responses, format them into a document object for the redux store, and return it
    return makeDocumentObject([ document, supportingClaims, thesis, clarifyingSentences, examples, linkingSentences ]);

  } catch(err) {
    return err.message ? err.message : 'Something went wrong';
  }
}

export default fetchFullDocument;