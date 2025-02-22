#version 330 core
layout(location = 0) in vec3 aPos;

uniform mat4 camera;
uniform mat4 model;
uniform mat4 matrix;

void main() {
    gl_Position = camera*model*vec4(aPos,1.0);
}