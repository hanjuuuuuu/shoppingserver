const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 8000

app.use(express.static('public'))   // 정적 파일 제공
app.use(bodyParser.json())

app.use(cors()) // 모든 요청에 대해 CORS 허용

app.post('/shopping', (req, res) => {   //해당 url을 요청하면 리소스를 생성한다.
    console.log("get shopping")
    const client_id = 'V78ekFsG2lsnqYrQ7dPA';
    const client_secret = 'im_A5Xuv9Z';
    const api_url = 'https://openapi.naver.com/v1/datalab/shopping/categories';

    const {
        startDate,
        endDate,
        timeUnit,
        category,
        device,
        ages,
        gender
    } = req.body;

    console.log(req.body)

    const request_body = {
        startDate: startDate,
        endDate: endDate,
        timeUnit: timeUnit,
        category: category,
        device: device,
        ages: ages,
        gender: gender,
    };

    request.post({
            url: api_url,
            body: JSON.stringify(request_body),
            headers: {
                'X-Naver-Client-Id': client_id,
                'X-Naver-Client-Secret': client_secret,
                'Content-Type': 'application/json'
            }
        },
        function (error, response, body) {
            console.log(response.statusCode);
            console.log(body);
            res.send(body)
    });
})

app.listen(port, ()=> {
    console.log('im listening on port ${port}')
})
