const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const {
  AssistantsClient,
  AzureKeyCredential,
} = require("@azure/openai-assistants");
const { AZURE_ENDPOINT, API_KEY } = process.env;

let assistantId;
let pollingInterval;

const assistantsClient = new AssistantsClient(
  AZURE_ENDPOINT,
  new AzureKeyCredential(API_KEY)
);

// @desc Create an assistant
// @route POST /api/assistant
// @access Public
exports.createAssistant = catchAsyncErrors(async (req, res, next) => {
  console.log("Creating a new assistant...");
  const assistant = await assistantsClient.createAssistant({
    model: "gpt41106",
    name: "JS Math Tutor",
    instructions:
      "You are a personal math tutor. Write and run code to answer math questions.",
    tools: [{ type: "code_interpreter" }],
  });
  assistantId = assistant.id;
  console.log(assistantId);

  res.status(200).json({
    success: true,
    assistant: assistant,
  });
});

exports.createDynamicAssistant = catchAsyncErrors(async (req, res, next) => {
  const { name, instructions, model } = req.body;

  // Check if the name, instructions, model exists
  if (!name || !instructions || !model) {
    return next(
      new ErrorHandler("Please enter the name, instructions, and model", 400)
    );
  }

  console.log("Creating a new dynamic assistant...");
  const assistant = await assistantsClient.createAssistant({
    model: model,
    name: name,
    instructions: instructions,
    tools: [{ type: "code_interpreter" }],
  });
  assistantId = assistant.id;

  res.status(200).json({
    success: true,
    assistant: assistant,
  });
});

// @desc Get an assistant
// @route GET /api/assistant
// @access Public
exports.getAssistant = catchAsyncErrors(async (req, res, next) => {
  const assistant = await assistantsClient.getAssistant(assistantId);

  if (!assistant) {
    return next(new ErrorHandler("Assistant not found", 404));
  }

  res.status(200).json({
    success: true,
    assistant: assistant,
  });
});

// @desc Get an assistant
// @route GET /api/thread
// @access Public
exports.createThread = catchAsyncErrors(async (req, res, next) => {
  console.log("Creating a new thread...");
  const thread = await assistantsClient.createThread();

  res.status(200).json({
    success: true,
    threadId: thread.id,
  });
});

exports.addMessage = catchAsyncErrors(async (req, res, next) => {
  const { message, threadId } = req.body;
  addMessage(threadId, message).then((message) => {
    console.log(message);
    console.log(message.id);

    runAssistant(threadId).then((run) => {
      console.log(run);
      console.log(run.id);
      const runId = run.id;

      // Check the status
      pollingInterval = setInterval(() => {
        checkingStatus(res, threadId, run.id);
      }, 5000);
    });

    // res.status(200).json({
    //   success: true,
    //   message: message,
    // });
  });
});

// Helper functions
async function addMessage(threadId, message) {
  const response = await assistantsClient.createMessage(
    threadId,
    "user",
    message
  );
  return response;
}

async function runAssistant(threadId) {
  const response = await assistantsClient.createRun(threadId, {
    assistantId: assistantId,
  });

  console.log(response);

  return response;
}

async function checkingStatus(res, threadId, runId) {
  const runObject = await assistantsClient.getRun(threadId, runId);
  console.log(runObject.status);

  if (runObject.status == "completed") {
    clearInterval(pollingInterval);

    const messageList = await assistantsClient.listMessages(threadId);
    let messages = [];

    console.log(messageList);

    messageList.data.forEach((message) => {
      messages.push(message.content);
    });

    res.json({ messages });
  }
}
