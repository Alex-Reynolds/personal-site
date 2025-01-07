// shader.vert
attribute vec3 aPosition;  // Input position attribute
attribute vec2 aTexCoord;  // Input texture coordinates (if used)

varying vec2 vTexCoord;    // Passing texture coordinates to fragment shader

void main() {
  // Pass the position and texture coordinates through to the fragment shader
  gl_Position = vec4(aPosition, 1.0);
  vTexCoord = aTexCoord;  // Set the varying value
}