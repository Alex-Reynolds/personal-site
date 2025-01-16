#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;  // Canvas/screen resolution
uniform vec2 u_mouse;       // Mouse position in screen coordinates
uniform float u_time;       // Time, if you need animation
uniform vec2 u_offset;      // Offset (panning) in fractal coordinates
uniform float u_zoom;       // Zoom factor
uniform int u_steps;        // Fractal Detail Level

// Returns a grayscale value between 0.0 and 1.0, based on the iteration
// at which the complex number z escapes the threshold radius.
float julia(vec2 z, vec2 c, float power) {
    // For performance, we can cap the maximum iteration count to something high.
    const int MAX_ITER = 1000;
    
    for (int i = 0; i < MAX_ITER; i++) {
        // Stop if we've hit our user-defined iteration limit
        if (i >= u_steps) {
            break;
        }

        // Check for escape
        if (dot(z, z) > 4.0) {
            // Return a fraction of how far into the total iteration count we escaped.
            // 0.0 = escaped very quickly (black), 1.0 = near the last iteration (lighter).
            return float(i) / float(u_steps);
        }
        
        // Convert z to polar and raise to 'power'
        float r = length(z);
        float theta = atan(z.y, z.x);

        // Update z
        z = pow(r, power) * vec2(cos(power * theta), sin(power * theta)) + c;
    }
    
    // If we finish all iterations without escaping, treat it as "inside" = 1.0 (white).
    return 1.0;
}

void main() {
    float minRes = min(u_resolution.x, u_resolution.y);

    // Convert screen coords to [-1,1] range, keeping aspect ratio
    vec2 uv = (2.0 * gl_FragCoord.xy - u_resolution.xy) / minRes;
    
    // Apply zoom and offset
    uv = uv / u_zoom + u_offset;

    // Define the Julia constant 'c' from the mouse coordinates
    // mapped to [-1,1], scaled for variety
    vec2 c = 1.2 * ((u_mouse - 0.5 * u_resolution) / minRes);

    // Evaluate our Julia function
    float value = julia(uv, c, 5.0);

    // Use the returned value as a grayscale level (0 = black, 1 = white)
    gl_FragColor = vec4(vec3(value), 1.0);
}
