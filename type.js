const avro = require('avsc');

const avroSchema = {
  name: 'TopicX',
  type: 'record',
  fields: [
    {
      name: 'date',
      type: {
        type: 'long',
        logicalType: 'timestamp-millis'
      }
    },
    {
      name: 'name',
      type: 'string'
    }
  ]
};

const type = avro.parse(avroSchema)

module.exports = type;
