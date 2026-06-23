The SmartExam Web Application utilizes the standard Laravel logging facade and configuration system. The core logging behavior is defined in `config/logging.php`, which configures multiple channels (stacks) for routing log output.

### System Approach
- **Framework**: Laravel's built-in logging system, which acts as a wrapper around the Monolog library.
- **Configuration**: Centralized in `config/logging.php`. This file defines "channels" that determine where logs are sent (e.g., single file, daily files, stderr, slack).
- **Default Channel**: The `LOG_CHANNEL` environment variable (typically set in `.env`) determines the default stack. Common setups include `stack` (which might combine `single` and `slack`) or `daily`.
- **Log Levels**: Standard PSR-3 log levels are supported (`emergency`, `alert`, `critical`, `error`, `warning`, `notice`, `info`, `debug`). The minimum level logged is controlled by the `LOG_LEVEL` environment variable.

### Key Files
- `config/logging.php`: Defines all logging channels, their drivers (single, daily, slack, etc.), and formatting.
- `.env.example`: Shows typical environment variables for logging configuration (`LOG_CHANNEL`, `LOG_LEVEL`, `LOG_DAILY_DAYS`).
- `storage/logs/`: The directory where file-based logs are written. This directory is gitignored but essential for local debugging.

### Architecture and Conventions
- **Channel Stacking**: The application likely uses a `stack` channel in production to send logs to both a file and an external service (like Slack or Papertrail) if configured.
- **Daily Rotation**: For file-based logging, the `daily` driver is preferred over `single` to prevent massive log files, with retention controlled by `LOG_DAILY_DAYS`.
- **Contextual Data**: Laravel allows passing contextual data to logs (e.g., `Log::info('User logged in', ['user_id' => $id])`). This is structured as JSON in many modern drivers.

### Developer Rules
1. **Use Facades/Contracts**: Inject `Illuminate\Log\Logger` or use the `Log` facade. Avoid direct Monolog instantiation.
2. **Respect Levels**: Use appropriate log levels. `error` for exceptions/failures, `info` for significant business events, `debug` for development-only tracing.
3. **Sensitive Data**: Never log PII (passwords, tokens, full credit card numbers). Laravel's default exception handler masks some fields, but manual logging must be careful.
4. **Environment Awareness**: Do not hardcode log paths or channels. Rely on `config('logging.channels')` and environment variables.