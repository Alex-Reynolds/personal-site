precision mediump float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Higher-order Julia set function
float julia(vec2 z, vec2 c, float power) {
    for (float i = 0.0; i < 200.0; i++) {
        if (dot(z, z) > 4.0) {
            return i / 200.0;
        }
        float r = length(z);
        float theta = atan(z.y, z.x);
        z = pow(r, power) * vec2(cos(power * theta), sin(power * theta)) + c;
    }
    return 200.0;
}

void main() {
 // Determine the size of the square area
    float minRes = min(u_resolution.x, u_resolution.y);
    
    // Adjust UV coordinates to center the square in the canvas
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / minRes;

    // Zoom factor
    float zoom = 3.0;
    uv *= zoom;

    // Dynamic constant 'c' controlled by mouse movement (adjusted to square area)
    vec2 c = 0.8 * ((u_mouse - 0.5 * u_resolution) / minRes);

    // Julia fractal calculation with adjustable power
    float power = 5.0;
    float b = julia(uv, c, power);

    // Map the iteration count to a grayscale value
    float grayscale = b;

    // Output the final color in grayscale
    gl_FragColor = vec4(vec3(grayscale), 1.0);
}
