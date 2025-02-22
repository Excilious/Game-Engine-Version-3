#version 330 core

layout (location = 0) in vec3 aPos;
layout (location = 1) in vec3 aNormal;
layout (location = 2) in vec3 aColor;
layout (location = 3) in vec2 aTex;

out vec3 NewPosition;
out vec3 Normal;
out vec3 NormalAmbience;
out vec3 Colour;
out vec2 TextureCoord;
out vec3 FragPos;

uniform mat4 CameraMatrix;
uniform mat4 Translation;
uniform mat4 Rotation;
uniform mat4 Scale;
uniform mat4 AnimationMatrix;

void main()
{
	mat4 Model		= Translation * Rotation * Scale;
	NewPosition 	= vec3(CameraMatrix * Model * vec4(aPos,1.0));
	Normal 			= aNormal;
	NormalAmbience	= mat3(transpose(inverse(Model))) * aNormal;
	Colour 			= aColor;
	TextureCoord 	= mat2(0.0, 1.0, 1.0, 0.0) * aTex;
	FragPos			= vec3(Model * vec4(aPos,1.0f)) - vec3(-0.75,0,1);
	
	gl_Position = CameraMatrix * Model * vec4(aPos,1.0);
}