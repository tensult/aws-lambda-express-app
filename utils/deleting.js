var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB({ region: 'us-east-2' });

exports.delete = (articleID) => {
    return deleteArticleInDynamoDB(articleData(articleID));
}

const articleData = (articleID) => {
    var articleInformation = {
        Key: {
            "ArticleID": {
                S: articleID
            }
        },
        ReturnValues: "ALL_OLD",
        TableName: "Articles"
    };
    return articleInformation;
}

//Delete an article in DynamoDB by provided ID //
const deleteArticleInDynamoDB = (articleInformation) => {
    return dynamodb.deleteItem(articleInformation).promise().then((response) => {
        return response.Attributes.ArticleID.S;
    }).catch((err) => {
        return err;
    });
}
