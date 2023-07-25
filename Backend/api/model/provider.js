const mongoose = require('mongoose');
const { providerSchema } = require('../schemas/provider.schema');

//Create provider model

const Provider = mongoose.model('Provider', providerSchema);

module.exports = { Provider }