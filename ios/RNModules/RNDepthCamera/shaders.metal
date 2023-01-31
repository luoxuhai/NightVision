#include <metal_stdlib>

using namespace metal;


typedef struct
{
    float2 position [[attribute(0)]];
    float2 texCoord [[attribute(1)]];
} Vertex;

typedef struct
{
    float4 position [[position]];
    float2 texCoord;
} ColorInOut;



// Display a 2D texture.
vertex ColorInOut planeVertexShader(Vertex in [[stage_in]])
{
    ColorInOut out;
    out.position = float4(in.position, 0.0f, 1.0f);
    out.texCoord = in.texCoord;
    return out;
}

// Convert a color value to RGB using a Jet color scheme.
static half4 getJetColorsFromNormalizedVal(half val) {
    half4 res ;
    if(val <= 0.01h)
        return half4();
    res.r = 1.5h - fabs(4.0h * val - 3.0h);
    res.g = 1.5h - fabs(4.0h * val - 2.0h);
    res.b = 1.5h - fabs(4.0h * val - 1.0h);
    res.a = 1.0h;
    res = clamp(res,0.0h,1.0h);
    return res;
}

// Convert a color value to RGB using a Jet color scheme.
static half4 getDarkColorsFromNormalizedVal(half val) {
    half4 res ;
    if(val <= 0.01h)
        return half4();
    res.r = 1.0h - val;
    res.g = 1.0h - val;
    res.b = 1.0h - val;
    res.a = 1.0h;
    res = clamp(res,0.0h, 1.0h);
    return res;
}

// Shade a texture with depth values using a Jet color scheme.
//- Tag: planeFragmentShaderDepth
fragment half4 planeFragmentShaderDepth(ColorInOut in [[stage_in]], texture2d<float, access::sample> textureDepth [[ texture(0) ]])
{
    constexpr sampler colorSampler(address::clamp_to_edge, filter::nearest);
    float4 s = textureDepth.sample(colorSampler, in.texCoord);
    
    // Size the color gradient to a maximum distance of 2.5 meters.
    // The LiDAR Scanner supports a value no larger than 5.0; the
    // sample app uses a value of 2.5 to better distinguish depth
    // in smaller environments.
    half val = s.r / 5.0h;
    half4 res = getJetColorsFromNormalizedVal(val);
    return res;
}

// Shade a texture with depth values using a Jet color scheme.
//- Tag: planeFragmentShaderDepth
fragment half4 planeFragmentShaderDarkDepth(ColorInOut in [[stage_in]], texture2d<float, access::sample> textureDepth [[ texture(0) ]])
{
    constexpr sampler colorSampler(address::clamp_to_edge, filter::nearest);
    float4 s = textureDepth.sample(colorSampler, in.texCoord);
    
    // Size the color gradient to a maximum distance of 2.5 meters.
    // The LiDAR Scanner supports a value no larger than 5.0; the
    // sample app uses a value of 2.5 to better distinguish depth
    // in smaller environments.
    half val = s.r / 5.0h;
    half4 res = getDarkColorsFromNormalizedVal(val);
    return res;
}
