#version 330 core

#define MAX_LIGHT_ARRAY 256
#define PI 3.14159265359
#define EPSILON 0.0001

out vec4 FragColor;
in vec3 NewPosition; 
in vec3 Normal;    
in vec3 Colour;     
in vec2 TextureCoord;
in vec3 FragPos;

uniform mat4 Model;     
uniform sampler2D Diffuse0;
uniform sampler2D Specular0;
uniform sampler2D RoughnessMap; 
uniform sampler2D MetalnessMap;
uniform int ObjectLightInstanceNumber;
uniform vec3 LightColour[MAX_LIGHT_ARRAY];
uniform vec3 LightSource[MAX_LIGHT_ARRAY];
uniform int FullBright;
uniform float Gloss[MAX_LIGHT_ARRAY];
uniform float Brightness[MAX_LIGHT_ARRAY];
uniform float Transparency;
uniform vec3 CameraPosition; 

vec3 ProduceLighting(vec3 NewLightColour, vec3 NewLightSource,float NewBrightness,vec3 CameraLookDown)
{
    float RadiusFactor = 1.0; // Adjust radius (1.0 = default, >1.0 = larger radius)
    float AmbienceConstant = 0.1;
    float SpecularConstant = 0.5;
    vec3 AdjustedLightColour = NewLightColour * NewBrightness;
    float Distance = length(NewLightSource - FragPos);
    float linear = 0.09 * RadiusFactor;
    float quadratic = 0.032 * RadiusFactor;
    float Attenuation = 1.0 / (1.0f + linear * Distance + quadratic * (Distance * Distance));

    float Cutoff = cos(radians(12.5));
    float OuterCutoff = cos(radians(17.5));
    vec3 LightDirection = normalize(NewLightSource - FragPos);
    float Theta = dot(LightDirection, normalize(-CameraLookDown));
    float Intensity = smoothstep(OuterCutoff, Cutoff, Theta);
    vec3 NewNormal = normalize(Normal);
    float DiffuseStrength = max(dot(NewNormal, LightDirection), 0.0f);
    vec3 NewDiffuse = DiffuseStrength * AdjustedLightColour;

    vec3 ViewDirection = normalize(CameraPosition - FragPos);
    vec3 ReflectDirection = reflect(-LightDirection, NewNormal);
    float SpecularStrength = pow(max(dot(ViewDirection, ReflectDirection), 0.0f), 32.0f);
    vec3 NewSpecular = SpecularConstant * SpecularStrength * AdjustedLightColour;
    vec3 NewAmbience = AmbienceConstant * AdjustedLightColour;

    NewDiffuse *= Intensity;
    NewSpecular *= Intensity;

    NewAmbience *= Attenuation;
    NewSpecular *= Attenuation;
    NewDiffuse *= Attenuation;
    return NewAmbience + NewDiffuse + NewSpecular;
}

vec4 GlobalLighting()
{
    vec3 TotalLight = vec3(0.0f);
    for (int Index = 0; Index < ObjectLightInstanceNumber; Index++)
    {
        TotalLight += ProduceLighting(LightColour[Index],LightSource[Index],Brightness[Index],vec3(0,-1,0));
    }

    TotalLight += ProduceLighting(vec3(1,0,0),CameraPosition,2.0,CameraPosition);
    return vec4(TotalLight,1.0f) * texture(Diffuse0,TextureCoord);
}

void main()
{
    if (FullBright == 0) {
        FragColor = GlobalLighting();
    } else {
        FragColor = vec4(LightColour[0],1) * texture(Diffuse0,TextureCoord) * texture(Specular0,TextureCoord).r;
    }
}
