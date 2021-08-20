/* eslint-disable */

let ws = null;
let wsUrl;
let reconnectTimeout;

// 连接失败不进行重连
let lockReconnect = false;

// 消息
const CONNECTING_MESSAGE = 'connecting';

// 上一个版本号
const lastVersion = JSON.parse(localStorage.getItem('lastVersion')) || {};

console.log(lastVersion)

export default {
  // websocket实例
  initWebsocket: initWebSocket,
  // 发送消息
  send: (msg) => {
    if (ws && ws.readyState === 1) {
      ws.send(msg);
    }
  },
};

const isProduction = process.env.NODE_ENV === 'production';

// 创建连接
function initWebSocket() {
  if (!isProduction) {
    wsUrl = `wss://www.wutong31.shop/websocket/update/${lastVersion.version || 0}`;
  } else {
    wsUrl = `wss://${window.location.host}/websocket/update/${lastVersion.version || 0}`;
  }
  // wsUrl = `ws://8.134.113.62/websocket/backend/${cookieUtils.getJwtToken()}`
  //   wsUrl = `wss://echo.websocket.org`

  const websocket = new WebSocket(wsUrl);

  // 用于指定连接成功后的回调函数。
  websocket.onopen = () => {
    onOpen();
  };

  // 用于指定收到服务器数据后的回调函数。
  websocket.onmessage = (ev) => {
    onMessage(ev);
  };

  // 用于指定连接关闭后的回调函数
  websocket.onclose = () => {
    onClose();
  };

  // 用于指定报错时的回调函数
  websocket.onerror = () => {
    onError();
  };

  ws = websocket;
}

// open钩子
function onOpen() {
  console.log('WebSocket连接成功', ws.readyState);

  heartCheck.start(ws);

  // 发送消息连接
  ws.send(CONNECTING_MESSAGE);
}

// onmessage钩子
function onMessage(msg) {

  // 消息获取成功，重置心跳
  heartCheck.start(ws);

  console.log(msg);
  console.log(msg.data);
  console.log(JSON.parse(msg.data));

  const version = localStorage.getItem('version');

  if (!version) {
    window.vm.$store.dispatch('setLastVersion', JSON.parse(msg.data));
  }

  window.vm.$store.dispatch('setVersion', JSON.parse(msg.data));
}

// onError钩子
function onError(e) {
  console.log('WebSocket连接发生错误', e);

  reconnect();

}

// close钩子
function onClose(e) {
  console.log('connection closed');

  // 重连
  reconnect();
}

// 心跳重连
const heartCheck = {
  timeout: 60 * 1000,
  timer: null,
  serverTimer: null,

  // 重置
  reset() {
    this.timer && clearTimeout(this.timer);
    this.serverTimer && clearTimeout(this.serverTimer);
  },
  // 开始
  start(ws) {
    this.reset();

    this.timer = setTimeout(() => {
      // console.log('发送心跳,后端收到后，返回一个心跳消息')
      // onmessage拿到返回的心跳就说明连接正常
      ws.send(CONNECTING_MESSAGE);

      // 断开请求
      this.serverTimer = setTimeout(() => {
        // 如果超过一定时间还没响应(响应后触发重置)，说明后端断开了
        ws.close();
      }, this.timeout);

    }, this.timeout);
  },
};

// 重连
function reconnect() {
  console.log('尝试重连')

  if (lockReconnect) {
    return;
  }

  lockReconnect = true;

  //尝试重连，设置延迟避免请求过多
  reconnectTimeout && clearTimeout(reconnectTimeout);

  reconnectTimeout = setTimeout(() => {
    // 重建连接
    initWebSocket();

    lockReconnect = false;
  }, 5000)
}
