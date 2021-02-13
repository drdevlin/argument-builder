const users = {
  email: 'string', //max length 48
  password: 'string' //max length 48
};

const documents = {
  id: 'string', //uuid
  title: 'string', //max length 48
  user_id: 'string' //fk users email
}

const theses = {
  id: 'string', //uuid
  thesis: 'string', //max length 256
  document_id: 'string' //fk documents id
}

const supporting_claims = {
  id: 'string', //uuid
  claim: 'string', //max length 256
  position: 'number',
  document_id: 'string' //fk documents id
}

const clarifying_sentences = {
  id: 'string', //uuid
  sentence: 'string', //max length 256
  supporting_claim_id: 'string' //fk supporting_claims id
}

const examples = {
  id: 'string', //uuid
  example: 'string', //max length 256
  supporting_claim_id: 'string' //fk supporting_claims id
}

const linking_sentences = {
  id: 'string', //uuid
  sentence: 'string', //max length 256
  supporting_claim_id: 'string' //fk supporting_claims id
}

module.exports = { 
  users, 
  documents, 
  theses,
  supporting_claims,
  clarifying_sentences,
  examples,
  linking_sentences
};