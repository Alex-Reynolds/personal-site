#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;  // Canvas/screen resolution
uniform vec2 u_mouse;       // Mouse position in screen coordinates
uniform float u_time;       // Time, if you need animation
uniform vec2 u_offset;      // Offset (panning) in fractal coordinates
uniform float u_zoom;       // Zoom factor
uniform int u_steps;        // Fractal Detail Level
// Returns 1.0 if 'z' never escapes the set, 0.0 if it does.
float julia(vec2 z, vec2 c, float power) {
    const int MAX_ITER = 1000;
    
    for (int i = 0; i < MAX_ITER; i++) {
        if (i >= u_steps) {//glsl requires constant loop bounds so this is a workaround for dynamic loop count
            break;
        }
        // Check for escape
        if (dot(z, z) > 4.0) {
            // We consider this point "outside" => return 0 (black)
            return 0.0;
        }
        
        // Compute z^(power) in polar form
        float r = length(z);
        float theta = atan(z.y, z.x);
        
        // Update z
        z = pow(r, power) * vec2(cos(power * theta), sin(power * theta)) + c;
    }
    
    // If we finish all iterations without escaping, it's "inside" => return 1 (white)
    return 1.0;
}

void main() {
    // Keep the fractal square
    float minRes = min(u_resolution.x, u_resolution.y);

    // Convert screen coords to [-1,1]
    vec2 uv = (2.0 * gl_FragCoord.xy - u_resolution.xy) / minRes;
    
    // Apply zoom and offset
    uv = uv / u_zoom + u_offset;

    // Define 'c' from mouse coords mapped to [-1,1], scaled for variety
    vec2 c = 1.2 * ((u_mouse - 0.5 * u_resolution) / minRes);

    // Evaluate the fractal
    float value = julia(uv, c, 5.0);

    // White if inside, black if outside
    gl_FragColor = vec4(vec3(value), 1.0);
}
