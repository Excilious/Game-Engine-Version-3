vec4 AmbienceLighting()
{
	float SpecularStrength	= 0.5;
	float AmbienceStrength 	= 0.1;
	float GammaStrength		= 2.2;

	vec3 Ambience			= AmbienceStrength * vec3(LightColour.x,LightColour.y,LightColour.z);
	vec3 AmbienceNormal		= normalize(Normal);
	vec3 LightDirection		= normalize(LightSource-NewPosition);
	vec3 ViewDirection		= normalize(CameraPosition - NewPosition);
	vec3 ReflectDirection	= reflect(-LightDirection,AmbienceNormal);
	float Distance			= length(LightSource-NewPosition);
	float Attuation			= 1.0/(1.0+0.1*Distance+0.01*Distance*Distance);

	float Diffuse			= max(dot(AmbienceNormal,LightDirection),0.0);
	vec3 NewDiffuse			= Diffuse * vec3(LightColour.x,LightColour.y,LightColour.z);

	float Conservation		= (2.0+LightGloss)/(2.0*3.14159265);
	float Specular			= Conservation * pow(max(dot(ViewDirection,ReflectDirection),0.0),LightGloss);
	vec3 NewSpecular		= SpecularStrength * Specular * vec3(LightColour.x,LightColour.y,LightColour.z);

	vec3 Result				= (Ambience+Attuation*(NewDiffuse+NewSpecular)) * Colour;
	vec4 FinalResult		= vec4(Result,1.0);
	FinalResult.rgb			= pow(FinalResult.rgb,vec3(1.0/GammaStrength));
	return texture(Diffuse0,TextureCoord) * FinalResult;
}

vec4 WaterShader()
{
	vec3 Lighting 		= vec3(0.0f,0.0f,0.0f);
	vec3 Ambience		= vec3(0.5,0.5,0.5);
	vec3 Normal			= normalize(Normal);
	vec3 LightColour	= vec3(1.0f,1.0f,1.0f);
    vec3 LightSource2   = vec3(0.0f,0.0f,0.0f);
	float DiffuseDot	= max(0.0,dot(LightSource2,Normal));

	float Distance = length(LightSource2 - CameraPosition);
	float Intensity = 1.0f / (3.0*Distance*Distance+0.7*Distance+1.0);

	vec3 ViewSource		= normalize(CameraPosition);
	vec3 ReflectSource	= normalize(reflect(-LightSource2,Normal));
	float SpecularDot	= max(0.0,dot(ViewSource,ReflectSource));
	SpecularDot			= pow(SpecularDot,0);
	
	vec3 Diffuse 		= DiffuseDot * LightColour;
	vec3 Specular 		= SpecularDot * LightColour;

	Lighting 			= Ambience + Diffuse * 0.25 + Specular * 0.25;
	vec3 FinalColour 	= Colour * Lighting;
	return texture(Diffuse0,TextureCoord) * texture(Specular0, TextureCoord).r * vec4(FinalColour,1.0f);  
}

vec4 PhongLight()
{
	vec3 Lighting 		= vec3(0.0f,0.0f,0.0f);
	vec3 Ambience		= vec3(0.5,0.5,0.5);
	vec3 Normal			= normalize(Normal);
	vec3 LightColour	= vec3(1.0f,1.0f,1.0f);
    vec3 LightSource2   = vec3(0.0f,0.0f,0.0f);
	float DiffuseDot	= max(0.0,dot(LightSource2,Normal));

	float Distance = length(LightSource2 - CameraPosition);
	float Intensity = 1.0f / (3.0*Distance*Distance+0.7*Distance+1.0);

	vec3 ViewSource		= normalize(CameraPosition);
	vec3 ReflectSource	= normalize(reflect(-LightSource2,Normal));
	float SpecularDot	= max(0.0,dot(ViewSource,ReflectSource));
	SpecularDot			= pow(SpecularDot,0);
	
	vec3 Diffuse 		= DiffuseDot * LightColour;
	vec3 Specular 		= SpecularDot * LightColour;

	Lighting 			= Ambience + Diffuse * 0.25 + Specular * 0.25;
	vec3 FinalColour 	= Colour * Lighting;
	return texture(Diffuse0,TextureCoord) * texture(Specular0, TextureCoord).r * vec4(FinalColour,1.0f);  
}

{
            "Directory":"../../Meshes/Crate.gltf",
            "Position":[4,7,-1],
            "Rotation":[0,0,0,0],
            "Scale":[0.15,0.15,0.15],
            "Colour":[1,0,0],
            "Brightness": [2],
            "Gloss": [8]
        },
        {
            "Directory":"../../Meshes/Crate.gltf",
            "Position":[4,7,1.5],
            "Rotation":[0,0,0,0],
            "Scale":[0.15,0.15,0.15],
            "Colour":[0,1,0],
            "Brightness": [2],
            "Gloss": [8]
        }