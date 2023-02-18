import SPAlert

@objc(RNAlert)
class RNAlert: NSObject {
  @objc(show:)
  func show(options: NSDictionary) -> Void {
    let title = options["title"] as! String
    let message = options["message"] as! String
    var preset: SPAlertIconPreset
    var haptic: SPAlertHaptic

    switch options["preset"] as? String {
    case "error":
      preset = .error
    case "spinner":
      preset = .spinner
    default:
      preset = .done
    }
    
    switch options["haptic"] as? String {
    case "error":
      haptic = .error
    case "warning":
      haptic = .warning
    case "none":
      haptic = .none
    default:
      haptic = .success
    }
    
    let view = SPAlertView(
      title: title,
      message: message,
      preset: preset)
    
    DispatchQueue.main.async {
      view.present(
        haptic: haptic)
    }
  }
  
  @objc(dismissAll)
  func dismissAll() -> Void {
    SPAlert.dismiss()
  }
}
