'use strict';
const Elasticsearch = require('elasticsearch');

console.log('Loading function');
const esClient = new Elasticsearch.Client({
    host: "https://search-article-app-327y2etlnclhf4alfdyxl2o2om.us-east-2.es.amazonaws.com",
    connectionClass: require('http-aws-es')
});



console.log(esClient);
exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    const esPromises = event.Records.map((record) => {
        console.log(record.eventID);
        console.log(record.eventName);
        console.log(record);
        console.log('DynamoDB Record: %j', record.dynamodb);
        const item = record.dynamodb.NewImage;
        if (record.dynamodb.OldImage && !item) {
            return esClient.delete({
                index: "asianet",
                type: "Article",
                id: record.dynamodb.OldImage.ArticleID.S
            }).catch((err) => {
                if (err.statusCode !== 404) {
                    throw err;
                }
                return `Article#${record.dynamodb.OldImage.ArticleID.S} is deleted`;
            });
        }
        else {
            const id = item.ArticleID.S;
            return esClient.index({
                index: "asianet",
                type: "Article",
                id,
                body: item
            });
        }
    });
    Promise.all(esPromises).then((results) => {
        console.log(results);
        callback(null, results);
    }).catch((err) => {
        callback(err);
    });
};