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
  const detailedPrompt = `
  Create a highly engaging, charismatic, funny, extravagant, and slightly cringe meme text based on the following input: "${prompt}". 
  Ensure the text is memorable, uses modern internet slang, and fits well with popular meme formats.
  Your response should not contain more than 16 words and should be suitable for a wide audience.
  Give your best shot at creating a meme that will make the internet go wild!
  Give your response directly, your response must only contain the 16 words of meme tete that's all. No introduction or conclusion.  
  `;

  const payload = {
    inputText: detailedPrompt,
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
  const detailedPrompt = `
  You are a meme generator, tailored to extract the essence of humor and wit from the following text: "${text}".
    Your task is to create a meme image that is both visually appealing and humorous, using the text as a reference.
  `;

  const payload = {
    taskType: "TEXT_IMAGE",
    textToImageParams: {
      text: detailedPrompt,
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
