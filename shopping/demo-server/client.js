let http = require('http');
let util = require('util');

http.get('http://www.imooc.com/u/card',function(res){
  let data = '';
  res.on("data",function(chunk){
    data += chunk;
  })

  res.on("end",function(){
    let result = JSON.parse(data);
    console.log("result:" + util.inspect(result))
  })
}).on('error', (e) => {
  console.error(`出现错误: ${e.message}`);
});
/*http.get('http://nodejs.cn/index.json', (res) => {
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    try {
      const parsedData = JSON.parse(rawData);
      console.log(parsedData);
    } catch (e) {
      console.error(e.message);
    }
  });
}).on('error', (e) => {
  console.error(`出现错误: ${e.message}`);
});*/
