const zh = {
  common: {
    ok: '好',
    confirm: '确认',
    cancel: '取消',
    back: '返回',
    appName: '夜视仪',
    enable: '启动',
    disable: '禁用',
    enabled: '已启动',
    disabled: '已禁用',
    closed: '已关闭',
    opened: '已打开',
    close: '关闭',
    done: '完成',
    share: '分享',
    meter: '米',
    centimeter: '厘米',
  },
  homeScreen: {
    outOfRange: '超出检测范围：10cm - 5m',
    unavailable: {
      title: '无法在此设备运行',
      message:
        '只支持具有激光雷达扫描仪的设备，支持的机型：iPhone 12 Pro(Max)、iPhone 13 Pro (Max)、iPhone 14 Pro (Max)、iPad Pro',
    },
    maskTip: '连续快速点击 3 次屏幕，可退出息屏模式',
    rectTip: '双指捏放检测框可调整大小',
    color: '颜色',
    distance: '测距',
    take: '拍摄',
    offLight: '息屏',
    saveToPhotos: '已保存到相册',
  },
  settingsScreen: {
    title: '设置',
    version: '版本',
    connect: '联系开发者',
    goodReview: '给个5星好评',
    agreement: '协议',
    privacyPolicy: '隐私政策',
    userAgreement: '用户协议',
    advanced: {
      title: '高级设置',
      smoothed: '平滑处理图像',
      saveCameraImage: '拍摄普通相机图片',
      distance: '最小报警距离：',
      shake: '摇一摇息屏',
      vibrationEnabled: '开启震动报警',
    },
    donate: {
      needPremium: '需要购买高级版',
      purchasing: '开通中',
      purchased: '已开通',
      success: '已开通高级版',
      fail: '支付失败',
      title: '夜视仪 高级版',
      restore: '恢复购买',
      restoring: '恢复购买中',
      restoreSuccess: '恢复购买成功',
      restoreFail: '恢复购买失败',
      subtitle: '永久解锁所有高级功能：息屏 + 拍摄',
      footer: '用户确认购买并付款后将记入 Apple 账户。如果您有任何疑问，请联系我们。',
    },
  },
  permissionManager: {
    camera: '相机',
    saveToPhoto: '添加到相册',
    unavailable: '{{permission}}功能不可用',
    blocked: '请前往设置授予{{permissions}}权限，才能正常使用该功能',
    openSettings: '打开设置',
  },
  appUpdate: {
    alert: {
      title: '发现新版本(V{{version}})',
      ok: '更新',
      next: '下一次',
      ignore: '忽略',
    },
  },
  appPromote: {
    title: '我们的其他作品',
    privateBox: {
      id: '1597534147',
      name: '隐私盒子',
      description: '隐藏私密图片、视频和文件',
    },
    iGrammar: {
      id: '6447102989',
      name: '爱语法',
      description: '智能分析英语语法，从未如此热爱英语',
    },
  },
};

export default zh;

export type Translations = typeof zh;
