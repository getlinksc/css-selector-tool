import { NextResponse } from "next/server";

import OpenAI from "openpipe/openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = 'edge'

// Fully compatible with original OpenAI initialization
const openai = new OpenAI({
    // openpipe key is optional
    openpipe: {
        baseUrl: process.env["OPENPIPE_BASE_URL"], // defaults to process.env["OPENPIPE_BASE_URL"] or https://app.openpipe.ai/api/v1 if not set
    },
});


const generateCompleteStream = async (prompt) => {

    const response = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
        // optional
        openpipe: {
            // Add custom searchable tags
            tags: {
                prompt_id: "extract_user_intent",
                any_key: "any_value",
            },
            logRequest: true, // Enable/disable data collection. Defaults to true.
        },
        stream: true
    });

    const stream = await OpenAIStream(response);

    return stream;
};



export default async function handler(req, res) {
    if (req.method === 'POST') {
        const body = await req.json();
        const stream = await generateCompleteStream(body.prompt);
        return new StreamingTextResponse(stream);
    } else {
        console.log(`got another request type: ${req.method}`)
        return NextResponse.json({ message: "Hello, you're calling this API incorrectly!"}, {
            status: 400,
        })
    }
}