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
    //c.x *= u_resolution.x / u_resolution.y;
    //c.y *= u_resolution.y / u_resolution.x;

    // Define zoom level (scales the view) and volatility (controls intensity)
    float zoom = 10.0;
    float volatility = 3.0;

    // Apply zoom by scaling coordinates
    c *= zoom;

    // Define rotation angle (in radians, based on time to animate it)
    float angle = u_scroll/150.0;  // Rotate over time
    // 2D rotation matrix
    mat2 rotationMatrix = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));

    // Apply rotation to the coordinates
    c = rotationMatrix * c;

    // Define the equation and parameters
    float x = c.x;
    float y = c.y;

    // The equation
    float equation = (y - x) * (y * y + x * x - 5.0);


    // Make the equation "faster" when the mouse is near the center
    equation += sin(u_time) * 0.5;

    // Use a threshold to create contour lines
    float threshold = 0.1;
    float result = abs(equation) - threshold;

    // Divide into two distinct regions (half white, half black)
    float signResult = sign(equation);  // This will give -1 or 1

    // Set the color to black or white depending on the sign of the equation
    vec3 color = vec3(signResult * 0.5 + 0.5);  // -1 => 0 (black), 1 => 1 (white)

    // Invert the color (black becomes white and vice versa)
    color = vec3(1.0) - color;

    // Output the final color
    gl_FragColor = vec4(color, 1.0);
}
