import SPIndicator

@objc(RNToast)
class RNToast: NSObject {
  @objc(show:)
  func show(options: NSDictionary) -> Void {
    let title = options["title"] as! String
    let message = options["message"] as! String
    var preset: SPIndicatorIconPreset
    var haptic: SPIndicatorHaptic

    switch options["preset"] as? String {
    case "error":
      preset = .error
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
    
    DispatchQueue.main.async {
      SPIndicator.present(title: title, message: message, preset: preset, haptic: haptic)
    }
  }
}
