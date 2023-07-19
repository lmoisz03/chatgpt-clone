import { ChatCompletionFunctions, Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { lookupWeather } from "@/src/helpers/functions";

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();
  const functions: ChatCompletionFunctions[] = [
    {
      name: "get_current_time",
      description: "get the current time in a given location",
      parameters: {
        type: "object", // specify that the parameter is an object
        properties: {
          location: {
            type: "string", // specify the parameter type as a string
            description:
              "The location, e.g. Beijing, China. But it should be written in a timezone name like Asia/Shanghai",
          },
        },
        required: ["location"], // specify that the location parameter is required
      },
    },
    {
      name: "get_current_weather",
      description: "get the weather forecast in a given location",
      parameters: {
        type: "object", // specify that the parameter is an object
        properties: {
          location: {
            type: "string", // specify the parameter type as a string
            description:
              "The location, e.g. Beijing, China. But it should be written in a city, state, country",
          },
        },
        required: ["location"], // specify that the location parameter is required
      },
    },
  ];
  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages,
    functions: functions,
    function_call: "auto",
  });
  // Convert the response into a friendly text-stream

  const stream = OpenAIStream(response, {
    experimental_onFunctionCall: async (
      { name, arguments: args },
      createFunctionCallMessages
    ) => {
      // if you skip the function call and return nothing, the `function_call`
      // message will be sent to the client for it to handle
      if (name === "get_current_weather") {
        // Call a weather API here
        const weatherData = await lookupWeather(String(args.location));

        // `createFunctionCallMessages` constructs the relevant "assistant" and "function" messages for you
        const newMessages = createFunctionCallMessages(weatherData);
        return openai.createChatCompletion({
          messages: [...messages, ...newMessages],
          stream: true,
          model: "gpt-3.5-turbo-0613",
          // see "Recursive Function Calls" below
          functions,
        });
      }
    },
  });
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
