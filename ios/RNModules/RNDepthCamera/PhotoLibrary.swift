import Photos

class PhotoLibrary: NSObject {
  static let shared = PhotoLibrary()
  
  func saveToPhotoLibrary(image: UIImage, resolve: RCTPromiseResolveBlock?, reject: RCTPromiseRejectBlock?) -> Void {
    PHPhotoLibrary.shared().performChanges({
          PHAssetChangeRequest.creationRequestForAsset(from: image)
      }) { (isSuccess: Bool, error: Error?) in
          if isSuccess {
            resolve?([:])
          } else{
            reject?("ERROR_saveToPhotoLibrary", error?.localizedDescription, error)
          }
      }
  }
}
