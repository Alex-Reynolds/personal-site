precision mediump float;

uniform vec2 u_resolution; // Canvas resolution (width, height)
uniform float u_time;
uniform vec2 u_mouse; // Mouse position

void main() {
  // Normalize fragment coordinates to [0, 1] range
  vec2 normalizedCoord = gl_FragCoord.xy / u_resolution;

  // Adjust to center the coordinates around (0, 0), so we get the range [-1, 1]
  vec2 c = (normalizedCoord - 0.5) * 2.0;

  // Correct for aspect ratio to prevent distortion
  c.x *= u_resolution.x / u_resolution.y;
  c.y *= u_resolution.y / u_resolution.x;
  //c.x *= (u_resolution.x / 1000.0); // Scale x based on window width
  //c.y *= (u_resolution.y / 1000.0); // Scale y based on window height

  // Modify the Mandelbrot parameters based on mouse position
  //c.x += (u_mouse.x / u_resolution.x - 0.5) * 4.0;  // Translate based on x mouse position
  //c.y += (u_mouse.y / u_resolution.y - 0.5) * 4.0;  // Translate based on y mouse position

  // Set the initial value for z (the complex number)
  vec2 z = c;
  float iter = 0.0;
  const float maxIter = 100.0;

  // Mandelbrot iteration
  for (float i = 0.0; i < maxIter; i++) {
    if (dot(z, z) > 4.0) break;
    z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
    iter++;
  }

  // Color based on iteration count
  float color = iter / maxIter;
  gl_FragColor = vec4(vec3(color), 1.0); // Set the color (grayscale based on iterations)
}
