const zh = {
  common: {
    ok: '好',
    confirm: '确认',
    cancel: '取消',
    back: '返回',
    second: '秒',
    minute: '分钟',
    hour: '小时',
    appName: '隐私盒子',
    coming: '即将推出...',
    enable: '启动',
    disable: '禁用',
    enabled: '已启动',
    disabled: '已禁用',
    closed: '已关闭',
    opened: '已打开',
    open: '打开',
    close: '关闭',
    done: '完成',
    noData: '无数据',
    rename: '重命名',
    delete: '删除',
    share: '分享',
    save: '保存',
  },
  homeScreen: {},
  settingsScreen: {
    title: '设置',
    version: '版本',
    connect: '联系开发者',
    goodReview: '给个好评',
    recommend: {
      title: 'App 推荐',
      appName: '隐私盒子',
      desc: '隐藏私密图片、视频和文件',
    },
    agreement: '协议',
    privacyPolicy: '隐私政策',
    userAgreement: '用户协议',
  },
  permissionManager: {
    camera: '相机',
    photoLibrary: '相册',
    mediaLibrary: '媒体库',
    unavailable: '{{permission}}功能不可用',
    blocked: '请前往设置授予{{permissions}}权限，才能正常使用该功能',
    openSettings: '打开设置',
  },
};

export default zh;

export type Translations = typeof zh;
