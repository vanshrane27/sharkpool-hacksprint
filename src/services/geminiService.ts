import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API with your API key
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("Gemini API key is not set. Please set VITE_GEMINI_API_KEY in your .env file.");
}

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(API_KEY || "");

// Define the model - using the correct model name and API version
const model = genAI.getGenerativeModel({ 
  model: "gemini-pro",
  generationConfig: {
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 1024,
  }
});

// System prompt to guide the model's responses
const systemPrompt = `You are a helpful assistant specializing in Indian government schemes for startups. Your role is to:

1. Provide accurate information about government schemes, programs, and initiatives that can benefit startups
2. Focus on schemes that are currently active and relevant
3. Include eligibility criteria, application process, and benefits for each scheme
4. Organize information by industry and startup stage when applicable
5. Provide links to official websites and resources when available
6. Be concise but informative in your responses

When responding to queries:
- Ask clarifying questions if needed to provide more relevant information
- Highlight the most important and relevant schemes first
- Include both central and state government schemes when applicable
- Mention any recent updates or changes to schemes
- Provide practical advice on how to apply for and maximize benefits from these schemes`;

// Function to get a response from Gemini
export const getGeminiResponse = async (userInput: string): Promise<string> => {
  if (!API_KEY) {
    throw new Error("Gemini API key is not configured. Please set VITE_GEMINI_API_KEY in your .env file.");
  }

  try {
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "What government schemes are available for startups in India?" }],
        },
        {
          role: "model",
          parts: [{ text: "I can help you find government schemes for your startup. To provide more relevant information, could you tell me:\n\n1. What industry is your startup in? (e.g., tech, healthcare, agriculture)\n2. What stage is your startup at? (idea, MVP, growth)\n3. What specific problem are you trying to solve?" }],
        },
      ],
    });

    const result = await chat.sendMessage([{ text: userInput }]);
    const response = await result.response;
    return response.text();
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    if (error.message?.includes("API key")) {
      throw new Error("Invalid or missing Gemini API key. Please check your configuration.");
    } else if (error.message?.includes("quota")) {
      throw new Error("Gemini API quota exceeded. Please try again later.");
    } else {
      throw new Error(`Failed to get response from Gemini API: ${error.message || "Unknown error"}`);
    }
  }
};

// Function to get specific information about government schemes
export const getGovernmentSchemesInfo = async (
  industry: string,
  stage: string,
  problem: string
): Promise<string> => {
  if (!API_KEY) {
    throw new Error("Gemini API key is not configured. Please set VITE_GEMINI_API_KEY in your .env file.");
  }

  try {
    const prompt = `Please provide information about government schemes for a ${stage} stage startup in the ${industry} industry that is solving the problem of ${problem}. Include eligibility criteria, application process, and benefits.`;

    const result = await model.generateContent([{ text: prompt }]);
    const response = await result.response;
    return response.text();
  } catch (error: any) {
    console.error("Error getting government schemes info:", error);
    if (error.message?.includes("API key")) {
      throw new Error("Invalid or missing Gemini API key. Please check your configuration.");
    } else if (error.message?.includes("quota")) {
      throw new Error("Gemini API quota exceeded. Please try again later.");
    } else {
      throw new Error(`Failed to get government schemes information: ${error.message || "Unknown error"}`);
    }
  }
}; 