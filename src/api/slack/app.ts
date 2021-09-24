import { App } from "@slack/bolt";
import { invokeCommand } from "../../commands";

const app = new App({
  token: process.env.BOT_TOKEN,
  signingSecret: process.env.SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.APP_TOKEN
});

const commandsListener = async ({
  message: { text, user, thread_ts, ts },
  say,
  payload,
  client
}: any) => {
  let responseText = "";

  try {
    const [cmd, ...args] = text.split(" ");
    invokeCommand(cmd, ...args);
    responseText = `Hey there <@${user}>!`;
  } catch (error) {
    responseText = `Could not invoke command <@${user}>!`;
  }

  const result = await client.views.open({
    trigger_id: "d6235627-ec68-4e2b-a89c-3635ebecfd0d",
    view: {
      type: "modal",
      title: {
        type: "plain_text",
        text: "My App"
      },
      close: {
        type: "plain_text",
        text: "Close"
      },
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text:
              "About the simplest modal you could conceive of :smile:\n\nMaybe <https://api.slack.com/reference/block-kit/interactive-components|*make the modal interactive*> or <https://api.slack.com/surfaces/modals/using#modifying|*learn more advanced modal use cases*>."
          }
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text:
                "Psssst this modal was designed using <https://api.slack.com/tools/block-kit-builder|*Block Kit Builder*>"
            }
          ]
        }
      ]
    }
  });
  // await say({ text: responseText, thread_ts: thread_ts || ts });
};

const start = async (commands: string[]) => {
  const port = parseInt(process.env.PORT, 10);
  const cmds = commands.join("|");
  const cmdsRegExp = new RegExp(`^!${cmds}.*`);

  app.message(cmdsRegExp, commandsListener);
  await app.start(port);

  console.log("⚡️ Bolt app is running!");
};

export { start };
