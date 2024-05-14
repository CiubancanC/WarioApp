import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

const bedrockClient = new BedrockRuntimeClient({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

export const generateMemeText = async (prompt: string) => {
  const payload = {
    inputText: prompt,
    textGenerationConfig: {
      maxTokenCount: 4096,
      stopSequences: [],
      temperature: 0,
      topP: 1,
    },
  };

  const command = new InvokeModelCommand({
    contentType: "application/json",
    body: JSON.stringify(payload),
    modelId: "amazon.titan-text-express-v1",
    accept: "application/json",
  });

  try {
    const apiResponse = await bedrockClient.send(command);
    const decodedResponseBody = new TextDecoder().decode(apiResponse.body);
    const responseBody = JSON.parse(decodedResponseBody);
    return responseBody.results[0].outputText;
  } catch (error) {
    console.error("Error generating meme text:", error);
    return null;
  }
};

export const generateMemeImage = async (text: string) => {
  const payload = {
    taskType: "TEXT_IMAGE",
    textToImageParams: {
      text: text,
    },
    imageGenerationConfig: {
      numberOfImages: 1,
      quality: "premium",
      height: 768,
      width: 1280,
      cfgScale: 7.5,
      seed: 42,
    },
  };

  const command = new InvokeModelCommand({
    contentType: "application/json",
    body: JSON.stringify(payload),
    modelId: "amazon.titan-image-generator-v1",
    accept: "application/json",
  });

  try {
    const apiResponse = await bedrockClient.send(command);
    const decodedResponseBody = new TextDecoder().decode(apiResponse.body);
    const responseBody = JSON.parse(decodedResponseBody);
    return responseBody.images[0]; // Assuming responseBody contains base64 image data
  } catch (error) {
    console.error("Error generating meme image:", error);
    return null;
  }
};
