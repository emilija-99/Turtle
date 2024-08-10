// LogConfig.ts
import {LogLevel} from "typescript-logging";
import {Category, CategoryProvider} from "typescript-logging-category-style";
import {NodeChannelProvider} from "typescript-logging-node-channel";

// Create the node channel, which writes the log files to a dist/log directory. Uses default settings.
const channel = NodeChannelProvider.createLogChannel(
  NodeChannelProvider.createRetentionStrategyMaxFiles({
    directory: "dist/log"
  })
);

// Create a provider
const provider = CategoryProvider.createProvider("TestProvider", {
  level: LogLevel.Info,
  channel
});

// Export function which creates a logger with given name
export function getLogger(name: string): Category {
  return provider.getCategory(name);
}