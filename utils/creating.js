var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB({ region: 'us-east-2' });

exports.create = (userData) => {
    return createArticleInDynamoDB(articleData(userData));
};

const articleData = (userData) => {
    const articleInformation = {
        Key: {
            "ArticleID": {
                S: userData.ID
            }
        },
        AttributeUpdates: {
            'Title': {
                Action: 'PUT',
                Value: { S: userData.title }
            },
            'Category': {
                Action: 'PUT',
                Value: { S: userData.category }
            },
            'Description': {
                Action: 'PUT',
                Value: { S: userData.Description }
            },
        },
        TableName: "Articles",
        ReturnValues: 'ALL_NEW'
    };
    return articleInformation;
}

//Create an article in dynamoDb//
const createArticleInDynamoDB = (article) => {
    return dynamodb.updateItem(article).promise()
        .then((response) => {
            return response.Attributes.ArticleID.S;
        }).catch((err) => {
            return err;
        });
};
