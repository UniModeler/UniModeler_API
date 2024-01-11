import * as mongo from 'mongodb'


let conn;

try {
  conn = await mongo.MongoClient.connect(process.env.DB_CONSTR, { connectTimeoutMS: 10000, socketTimeoutMS: 10000 });
  console.log('MongoDB conectado com sucesso!');
}
catch (error) {
  console.log(error)
}



/**
 * connect to many collections
 * @param {String[]} collactions array of string with the collections name
 * @return {mongo.Collection<mongo.Document>[]} Returns a array of collection
*/
export function connect(...collactions) {
  return collactions.map(col => conn.db('psicoways').collection(col));
}






/**
 * Description of the function
 * @callback CollectionCallback
 * @param {Collection<Document>} collection 
*/


