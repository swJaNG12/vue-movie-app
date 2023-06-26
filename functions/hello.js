exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'Jang',
      age: 25,
      email: 'amazon121@naver.com'
    })
  }
}