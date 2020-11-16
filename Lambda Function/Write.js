const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {
    // TODO implement
    
    const requestId = context.awsRequestId;
    console.log (typeof requestId)
    var x = 1;
    if(x == 1) {
        // Handle promise fulfilled/rejected states
        await createMessage(requestId, event).then(() => {
            callback(null, {
                statusCode: 201,
                body: '',
                headers: {
                    'Access-Control-Allow-Origin' : '*'
                }
            });
        }).catch((err) => {
            console.error(err)
        })
    } else {
        callback(null, {
            statusCode: 400,
            body: 'Bad Request',
            headers: {
                'Access-Control-Allow-Origin' : '*'
            }
        });
    }
};

function createMessage(requestId, event) {
    
    const params = {
        TableName: 'Message',
        Item: {
            'messageId' : requestId,
            'name' : "ian",
            'email' : "email",
            'message' : "hello world"
        }
    }

    return docClient.put(params).promise();
}


/*
function createMessage(requestId, event) {
    
    const params = {
        TableName: 'Message',
        Item: {
            'messageId' : requestId,
            'name' : event.name,
            'email' : event.email,
            'message' : event.message
        }
    }

    return docClient.put(params).promise();
}
*/