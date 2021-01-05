
/* Import faunaDB sdk */
const process = require('process')

const { query, Client } = require('faunadb')

const client = new Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
})

const handler = async () => {
  console.log('Function `read-all` invoked')
  try{
    var result = await client.query(
      query.Map(
        query.Paginate(query.Documents(query.Collection("crud_op"))),
        query.Lambda(x => query.Get(x))
      )
    )
    return {
      statusCode: 200,
      body: JSON.stringify(result.data),
    }
  }
    catch(error) {
      console.log('error', error)
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      }
    }
}

module.exports = { handler }