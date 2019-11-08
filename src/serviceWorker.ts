// 主要是用于在生产环境中为用户在本地创建一个service worker 来缓存资源到本地，提升应用的访问速度
// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
};

export function register(config?: Config) {
  //如果当前是生产环境且浏览器支持 service worker 那么就进行注册操作
  //之所以要是生产环境是因为开发环境总是进行缓存那么开发者要频繁的清空缓存才能获取最新的内容，这样不利于快速开发
  // 如果浏览器不支持 service worker 只能放弃注册
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    // 如果浏览器支持sw的话 那么就存在URL构造方法
    const publicUrl = new URL(
      (process as { env: { [key: string]: string } }).env.PUBLIC_URL,
      window.location.href
    );
    // 生成静态文件夹的路径，service worker 主要是用于缓存静态文件
    if (publicUrl.origin !== window.location.origin) {
      // 如果静态文件与当前环境不是在同一个域下，那么注册没什么意义，那么直接返回
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
      // 如果是本地环境进行访问
      if (isLocalhost) {
        // 检查service worker服务是否存在
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://bit.ly/CRA-PWA'
          );
        });
      } else {
        // 如果不是本地地址，那么只注册 service worker
        // 这样做是因为此时已不再是开发环境了，开发者已经将其暴露在外网（网内网）环境中，其它用户已经可以对其进行访问了
        // Is not localhost. Just register service worker
        registerValidSW(swUrl, config);
      }
    });
  }
}

// 注册有效的 service worker
function registerValidSW(swUrl: string, config?: Config) {
  // 通过注册 service worker 然后使用相应 API 来进行操作
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      // 如果发现内容有更新，那么就会自动在后台进行安装，当安装结束之后再判断安装状态,向用户进行提示
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // 在这一步我们已经获取到了预缓存的内容,但是之前的service worker服务还是缓存着旧的数据，我们需要关闭所以的标签页来更新缓存
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
              );

              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              //在这个节点 所有数据都被缓存了 这是提醒用户可以使用完整的缓存数据的绝佳位置
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.');

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

// 检查 service worker 的状态
function checkValidServiceWorker(swUrl: string, config?: Config) {
  //检查service work的状态 如果不存在 重新加载请求
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl)
    .then(response => {
      // 确保service work存在
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // 没有找到service work服务 很有可能是不在同一个app 重新加载
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // 找到service work服务 走正常流程
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

// 取消 service worker 的注册
export function unregister() {
  // 如果浏览器支持 service worker 且 service worker 处于就绪状态的时候，那么调用其提供的取消注册方法来进行操作 
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
