let AWS = require('aws-sdk');
/*
AWS.config.update({
  credentials: new AWS.Credentials('accessKeyID','secretAccessKey'),
  region: 'us-east-2'
});
*/
require('./index').handler({
    Records: [
        {
            dynamodb: {
                "ApproximateCreationDateTime": 1506336000,
                "Keys": {
                    "ArticleID": {
                        "S": "AR003"
                    }
                },
                "NewImage": {
                    "Category": {
                        "S": "SPORTS"
                    },
                    "Description": {
                        "S": "Some description"
                    },
                    "Title": {
                        "S": "Some title"
                    },
                    "ArticleID": {
                        "S": "AR003"
                    }
                },
                "SequenceNumber": "13788400000000005446908685",
                "SizeBytes": 84,
                "StreamViewType": "NEW_AND_OLD_IMAGES"
            }
        }
    ]
}, null, (err, data) => {
    if (err) {
        console.error(err);
    }
    console.log(data,'result');
})