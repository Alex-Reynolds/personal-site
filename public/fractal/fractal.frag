precision mediump float;

uniform vec2 u_resolution; // Canvas resolution (width, height)
uniform float u_time;
uniform vec2 u_mouse; // Mouse position
uniform float u_scroll; // User scroll position (0 to 1)

void main() {
    // Normalize fragment coordinates to [0, 1] range
    vec2 normalizedCoord = gl_FragCoord.xy / u_resolution;

    // Adjust to center the coordinates around (0, 0), so we get the range [-1, 1]
    vec2 c = (normalizedCoord - 0.5) * 2.0;

    // Correct for aspect ratio to prevent distortion
    c.x *= u_resolution.x / u_resolution.y;
    c.y *= u_resolution.y / u_resolution.x;

    // Define zoom level (scales the view) and volatility (controls intensity)
    float zoom = 10.0;
    float volatility = 3.0;

    // Apply zoom by scaling coordinates
    c *= zoom;

    // Define rotation angle (in radians, based on time to animate it)
    float angle = u_scroll;  // Rotate over time

    // 2D rotation matrix
    mat2 rotationMatrix = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));

    // Apply rotation to the coordinates
    c = rotationMatrix * c;

    // Define the equation and parameters
    vec2 z = c;

    // zm(z, z) -> z * z (self-application as a squaring operation)
    vec2 zm_z = z * z;

    // Apply zm(z, zm(z, z)) -> z * zm_z (self-application with nested result)
    vec2 zm_nested = zm_z * zm_z;

    // za(z, c) -> zm_nested + c (combining the result with original c)
    vec2 result = zm_nested + c;

    // The resulting complex-like operation (just for illustration)
    float magnitude = length(result); // Magnitude to control intensity

    // Use a threshold to create contour lines or variation
    float threshold = 0.1;
    float value = abs(magnitude) - threshold;

    // Define color based on the magnitude
    vec3 color = vec3(sin(value * 10.0) * 0.5 + 0.5); // Visualize intensity using a color

    // Output the final color
    gl_FragColor = vec4(color, 1.0);
}
