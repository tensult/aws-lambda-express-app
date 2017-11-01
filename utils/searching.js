const Elasticsearch = require('elasticsearch');
let AWS = require('aws-sdk');

/*
--keep your aws configuration details here---
AWS.config.update({
     credentials: new AWS.Credentials('accessKeyID','secretAccessKey'),
     region: 'us-east-2'
});
*/

const esClient = new Elasticsearch.Client({
    host: "https://search-article-app-327y2etlnclhf4alfdyxl2o2om.us-east-2.es.amazonaws.com",
    connectionClass: require('http-aws-es')
});

exports.search = function (category, searchText) {
    return searchArticleInElasticsearch(category, searchText).then(function (response) {
        var articles = response.hits.hits;
        return articles;
    }).catch((err) => {
        return err;
    })
}

// Getting records from elasticsearch by category and text //
const searchArticleInElasticsearch = (category, searchText) => {
    return esClient.search({
        index: 'asianet',
        type: 'Article',
        body: {
            "query": {
                "bool": {
                    "must": [
                        { "match": { "Category.S": category } },
                        {
                          "multi_match": { "query": searchText, "fields": ["_all", "title^3"] }
                        }
                    ]
                }
            }
        }
    });
}