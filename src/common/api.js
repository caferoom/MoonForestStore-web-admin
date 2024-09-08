const rootUrl = "http://localhost:3000/"

const api = {
    rootUrl : rootUrl,
    qiniu: 'http://up-z0.qiniu.com',
    // 请根据自己创建的七牛的区域进行设置：
    // https://developer.qiniu.com/kodo/manual/1671/region-endpoint
	// 华东	  http(s)://up.qiniup.com
	// 华北	  http(s)://up-z1.qiniup.com
	// 华南	  http(s)://up-z2.qiniup.com
	// 北美	  http(s)://up-na0.qiniup.com
	// 东南亚 http(s)://up-as0.qiniup.com
};

export default api;
