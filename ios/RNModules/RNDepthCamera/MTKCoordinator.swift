import Foundation
import SwiftUI
import MetalKit
import Metal

//- Tag: MTKCoordinator`
class MTKCoordinator: NSObject, MTKViewDelegate {
    var content: MetalTextureContent
    var mtkView: MTKView!
    var pipelineState: MTLRenderPipelineState!
    var metalCommandQueue: MTLCommandQueue!
    
    init(content: MetalTextureContent) {
        self.content = content
        super.init()
    }
    /// Saves a reference to the `MTKView` in the coordinator and sets up the default settings.
    func setupView(mtkView: MTKView) {
        self.mtkView = mtkView
        self.mtkView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        self.mtkView.preferredFramesPerSecond = 60
        self.mtkView.isOpaque = true
        self.mtkView.framebufferOnly = false
        self.mtkView.clearColor = MTLClearColor(red: 0, green: 0, blue: 0, alpha: 0)
        self.mtkView.drawableSize = mtkView.frame.size
        self.mtkView.enableSetNeedsDisplay = false
        self.mtkView.colorPixelFormat = .bgra8Unorm
        self.mtkView.depthStencilPixelFormat = .depth32Float
        self.mtkView.contentMode = .scaleAspectFit
        self.mtkView.device = EnvironmentVariables.shared.metalDevice
        self.metalCommandQueue = EnvironmentVariables.shared.metalCommandQueue
        prepareFunctions(fragmentFunction: "planeFragmentShaderDepth")
    }
    
    func prepareFunctions(fragmentFunction: String) {
        guard let metalDevice = mtkView.device else { fatalError("Expected a Metal device.") }
        do {
            let library = EnvironmentVariables.shared.metalLibrary
            let pipelineDescriptor = MTLRenderPipelineDescriptor()
            pipelineDescriptor.colorAttachments[0].pixelFormat = .bgra8Unorm
            pipelineDescriptor.depthAttachmentPixelFormat = .depth32Float
            pipelineDescriptor.vertexFunction = library.makeFunction(name: "planeVertexShader")
            pipelineDescriptor.fragmentFunction = library.makeFunction(name: fragmentFunction)
            pipelineDescriptor.vertexDescriptor = createPlaneMetalVertexDescriptor()
            pipelineState = try metalDevice.makeRenderPipelineState(descriptor: pipelineDescriptor)
        } catch {
            print("Unexpected error: \(error).")
        }
    }

    func createPlaneMetalVertexDescriptor() -> MTLVertexDescriptor {
        let mtlVertexDescriptor: MTLVertexDescriptor = MTLVertexDescriptor()
        // Store position in `attribute[[0]]`.
        mtlVertexDescriptor.attributes[0].format = .float2
        mtlVertexDescriptor.attributes[0].offset = 0
        mtlVertexDescriptor.attributes[0].bufferIndex = 0
        
        // Store texture coordinates in `attribute[[1]]`.
        mtlVertexDescriptor.attributes[1].format = .float2
        mtlVertexDescriptor.attributes[1].offset = 8
        mtlVertexDescriptor.attributes[1].bufferIndex = 0
        
        // Set stride to twice the `float2` bytes per vertex.
        mtlVertexDescriptor.layouts[0].stride = 2 * MemoryLayout<SIMD2<Float>>.stride
        mtlVertexDescriptor.layouts[0].stepRate = 1
        mtlVertexDescriptor.layouts[0].stepFunction = .perVertex
        
        return mtlVertexDescriptor
    }
    
    func mtkView(_ view: MTKView, drawableSizeWillChange size: CGSize) {
        
    }
    
    // Draw a textured quad.
    func draw(in view: MTKView) {
        guard content.texture != nil else {
            print("There's no content to display.")
            return
        }
        guard let commandBuffer = metalCommandQueue.makeCommandBuffer() else { return }
        guard let passDescriptor = view.currentRenderPassDescriptor else { return }
        guard let encoder = commandBuffer.makeRenderCommandEncoder(descriptor: passDescriptor) else { return }
        let vertexData: [Float] = [  -1, -1, 1, 1,
                                     1, -1, 1, 0,
                                     -1, 1, 0, 1,
                                     1, 1, 0, 0]
        encoder.setVertexBytes(vertexData, length: vertexData.count * MemoryLayout<Float>.stride, index: 0)
        encoder.setFragmentTexture(content.texture, index: 0)
        encoder.setRenderPipelineState(pipelineState)
        encoder.drawPrimitives(type: .triangleStrip, vertexStart: 0, vertexCount: 4)
        encoder.endEncoding()
        commandBuffer.present(view.currentDrawable!)
        commandBuffer.commit()
      
        print("-----draw----", mtkView.frame.width, mtkView.frame.height)
    }
}
