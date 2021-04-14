/* 
Storage封装
*/
const STORAGE_KEY = 'mall';
export default {
  // 存储值
  setItem(key, value, modules_name) {
    if (modules_name) {
      var all = this.getItem(modules_name)
      all[key] = value;
      // 这里递归本方法将modules_name作为key(已有),再将当前添加进去的all放进此module_name中,此时的val就包含了所有值，最后直接添加即可
      this.setItem(modules_name, all)
    } else {
      //只传入两个参数：
      let val = this.getStorage();
      console.log(val);
      val[key] = value;
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    }
  },
  /*
  获取值(可以传入一个值也可传入两个值)
  一个参数：没有moudle直接单对象
  一个参数：获得moudle下的key对应的对象
  */
  getItem(key, modules_name) {
    if (modules_name) {
      let val = this.getItem(modules_name);
      if (val) return val[key]
    }
    return this.getStorage()[key];
  },
  // 获取整个数据(转为json格式):将数据转换为json格式。
  getStorage() {
    return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}')
  },
  // 删除某一个值
  clear(key, modules_name) {
    let val = this.getStorage();
    if (modules_name) {
      delete val[modules_name][key]
    } else {
      delete val[key]
    }
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
  }
}

