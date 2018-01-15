import Vue from 'vue'

/* 发送一个get请求 */
export const axiosGet = (url, params, resolve) => {
    $axios.get(url, {
        params: params
      })
      .then(function (response) {
        resolve && resolve();
      })
      .catch(function (response) {
        console.log(response);
      });
  }
  /* 发送多个并发请求 */
  /* example
  const arrList = [getUserAccount(),getUserPermissions()]

  function getUserAccount() {
    return $axios.get('/user/12345');
  }
  function getUserPermissions() {
    return $axios.get('/user/12345/permissions');
  }
  */
export const axiosAsyn = (arrList, resolve) => {
  $axios.all(arrList)
    .then($axios.spread(function (acct, perms) { //全部请求都成功后执行
      resolve && resolve();
    }))
    .catch(function (response) {
      console.log(response);
    })
}
