import { GoogleGenAI, Type } from "@google/genai";
import { ChecklistResponse, ServiceType } from '../types';

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateProcessChecklist = async (
  serviceType: ServiceType, 
  userRequest: string
): Promise<ChecklistResponse | null> => {
  try {
    const model = "gemini-2.5-flash";
    
    const prompt = `
      You are an expert operations manager for Bebest Group, a conglomerate specializing in ${serviceType}.
      
      The user needs a detailed process checklist for: "${userRequest}".
      
      Create a professional, step-by-step checklist that a client or employee would need to follow to complete this process.
      Ensure the tone is corporate, helpful, and precise.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: "You are a helpful corporate assistant for Bebest Group. You generate structured JSON checklists for business processes.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "A professional title for the checklist process",
            },
            items: {
              type: Type.ARRAY,
              description: "List of actionable steps",
              items: {
                type: Type.OBJECT,
                properties: {
                  task: {
                    type: Type.STRING,
                    description: "The action item title",
                  },
                  description: {
                    type: Type.STRING,
                    description: "A brief explanation of what needs to be done",
                  },
                },
                required: ["task", "description"],
              },
            },
          },
          required: ["title", "items"],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as ChecklistResponse;
    }
    return null;
  } catch (error) {
    console.error("Error generating checklist:", error);
    return null;
  }
};

export const chatWithAssistant = async (message: string, context: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Context: User is browsing the ${context} section of Bebest Group website.
      User Question: ${message}
      
      Answer briefly and professionally as a customer service representative.`,
    });
    return response.text || "I apologize, I could not generate a response at this time.";
  } catch (error) {
    console.error("Error in chat:", error);
    return "I am currently experiencing high traffic. Please try again later.";
  }
};

export const generateServiceDescription = async (
  serviceType: string,
  featureName: string
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
        Write a detailed, professional service description for "${featureName}" which is a service offered by Bebest Group under our "${serviceType}" division.
        
        The description should:
        1. Clearly explain what the service entails in a corporate context.
        2. Explain the benefits and why a client would need it.
        3. Highlight how Bebest Group handles this process efficiently and professionally.
        
        Format the output as 2-3 well-structured paragraphs. Do not use markdown formatting like bold or headers, just plain text with paragraph breaks.
      `,
    });
    return response.text || "Information for this service is currently being updated. Please contact us for details.";
  } catch (error) {
    console.error("Error generating service description:", error);
    return "We are currently unable to load the details for this service. Please contact our support team at 8111786.";
  }
};