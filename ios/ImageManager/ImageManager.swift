//
//  ImageManager.swift
//  AvatarCropExample
//
//  Created by Дмитрий on 23.10.2023.
//

import Foundation

@objc(ImageManager)
class ImageManager: NSObject {
  @objc func saveImage(_ url: String, x: NSNumber, y: NSNumber, width: NSNumber, height: NSNumber, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {

    let contentsUrl = URL(string: url)
    let data = try? Data(contentsOf: contentsUrl!)

    let cgRect = CGRect(x: x as! Int, y: y as! Int, width: width as! Int, height: height as! Int)
    
    if (data == nil) {
      reject("1002", "Something went wrong", "FailedToSave" as? Error)
      return
    }
        
    let cgImage = UIImage(data: data!)!.cgImage!
    
    let croppedCGImage = cgImage.cropping(to: cgRect)
    
    if (croppedCGImage == nil) {
      reject("1003", "Something went wrong", "FailedToSave" as? Error)
      return
    }
    
    let croppedImage = UIImage(cgImage: croppedCGImage!)

    let previewURL = FileManager.default.temporaryDirectory.appendingPathExtension("preview.png")
    let pngImageData = croppedImage.pngData()

    do {
      try pngImageData?.write(to: previewURL, options: .atomic)
      resolve(previewURL.absoluteString)
    }
    catch {
      reject("1001", "Something went wrong", "FailedToSave" as? Error)
    }
  }
  
  @objc func constantsToExport() -> [String: Any] { return [:] }
  
  @objc static func requiresMainQueueSetup() -> Bool { return false }
}
