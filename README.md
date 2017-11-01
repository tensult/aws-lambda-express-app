### News article application
We can create, search, and delete articles by using this application, Here we are using aws webservices for hosting application, and used database servers on aws.   

## Requirements 
 - Node.js
 - AWS 
 - DynamoDB
 - ElasticSearch
 - Lambda
 - API Gateway

## Installation

 - npm install

## Imporant points to remember :

#### AWS part in application

1. This application is maily developed based on aws services, So for accessing aws services create account in AWS before you start.
1. We have taken instance of DynamoDB and Elasticsearch services for data storage.
1. To host application we have taken Lambda service in aws.
1. To track logs of application, using cloudwatch which is integrated with lambda by default.
1. APIGateway service provides application access through web.

#### Explantion about application

1. Firstly install node.js in your local system, next install packages as per package.json.
1. We have used visual studio Code tool, after installing visual studio Code open application on it to better understanding.
1. This application interacts with all folders and files in repository except dynamoDB2Elasticsearch folder, which comes later part of the game.

1. Running application :

    * Create a Lambada function in aws and set a role to the function for that create a role in aws IAM, while creating role need to include certain policies so that these policies will give permissions to lambada function to access other services in the aws, this application needs Elasticsearch, dynamodb, and cloudwatch services.

    * Zip application files except dynamoDB2Elasticsearch folder, to make zip use this command (zip -9 -r ../lambda.zip *),  Upload zipped file to created lamba function, for uploaading zipped file into lambda function use this command (aws lambda --region us-east-2 update-function-code --zip-file fileb://lambda.zip  --function-name lambadafunctionName).

    * In lambda function, at handler change index.handler as lambda.js so that lambda function will run the lambda.js in the uploaded zipped file.

1. Now we discuss about dynomoDB2Elasticsearch folder, which is maily designed for a task to export records from dynamodb to Elasticsearch. so that we took a seperate lambda function for this functionality, first you need to move dynomoDB2Elasticsearch folder to some where in your system, then do(npm install), make it zip as above explained but while uploading need to chage lambadafunctionName with new lambda funcation.

1. DynamoDB setup :
    *  Create a table in DynamoDB, table name should be 'Articles' and Key should be 'ArticleID'.
    * At Overview, Enable Stream for DynamoDB and view type should be 'New and old images'.
    * At Triggers, Create trigger and select existing lambda function that should be lambada function of dynomoDB2Elasticsearch file.

1. API Gateway setup :
    * create an API in API Gateway service, Select new API.
    * At resources select create method and add lambada function in method integration. then deploy method it will generate stage.
    * At stages invoke url to access application.

1. S3 setup :
    * Create a bucket in S3 and set bucket policy, after creating bucket we can store objects(static files i.e images, files etc) into bucket.
    * Store images and css files in S3 bucket.
    * S3 provides links to access images and css files.
    * Example link :  	https://s3.us-east-2.amazonaws.com/news-article-app-bucket/public/img/tensult-img-logo.png









