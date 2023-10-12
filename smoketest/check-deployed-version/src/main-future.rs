/*
Certainly! Here are some suggestions for improving the Rust program:

1. **Error Handling**: Implement more robust error handling throughout the program. Currently, many functions return `Result` with a `reqwest::Error`, but you may want to handle different error cases more specifically and provide more informative error messages.

2. **Configuration**: Consider using a configuration library like `config` to manage environment variables and configuration values. This can make it easier to change settings without modifying the code.

3. **Logging**: Instead of using `println!` and `eprintln!` for output and error messages, you can use a logging library like `log` combined with a logging framework like `env_logger` to have more control over logging levels and destinations.

4. **Command Line Arguments**: Allow users to specify the base URL and expected Git SHA1 as command-line arguments instead of relying solely on environment variables.

5. **Constants**: Define constants at the top of the file for values like `META_JSONX_URL` and `EXPECTED_GIT_SHA1` to make the code more readable and maintainable.

6. **Structuring Code**: Consider breaking down the code into smaller functions and modules to improve readability and maintainability. For example, you can create a separate module for HTTP-related functions.

7. **Timeouts**: Implement a timeout mechanism for HTTP requests to prevent indefinite waits. The `reqwest` library supports setting timeouts for requests.

8. **Concurrency**: If you need to check multiple URLs concurrently, you can explore using Rust's async/await for concurrent HTTP requests.

9. **Testing**: Write unit tests and possibly integration tests to ensure the correctness of your code. Rust's testing framework makes it easy to write tests.

10. **Dependency Versions**: Keep an eye on the versions of your dependencies and periodically update them to benefit from bug fixes and improvements.

11. **Documentation**: Add comments and documentation to your code to explain the purpose of functions, structs, and modules. This will make it easier for others (and your future self) to understand the code.

12. **Error Messages**: Consider customizing error messages to provide more context to users when things go wrong.

13. **Use `?` Operator**: In functions that return `Result`, you can use the `?` operator to simplify error propagation instead of using explicit `match` statements.

Remember that these suggestions depend on your specific use case and requirements. Implementing some or all of these improvements can make your Rust program more maintainable, reliable, and user-friendly.

 */
use reqwest;
use std::env;
use std::time::Duration;
use tokio::time::delay_for;
use serde_json::Value;
use log::{error, info, warn};

const BASE_URL: &str = "https://coolboard.fun";
const META_JSONX_URL: &str = "/meta.jsonx";

#[derive(Debug)]
struct AppConfig {
  base_url: String,
  expected_git_sha1: String,
  retry_interval_ms: u64,
  max_retries: i32,
}

impl AppConfig {
  fn new() -> Result<Self, String> {
    let base_url = env::var("CYPRESS_baseUrl").unwrap_or_else(|_| BASE_URL.to_string());
    let expected_git_sha1 = env::var("GIT_SHA1").map_err(|_| "Missing environment variable: GIT_SHA1")?;
    let retry_interval_ms = 1000; // retry period in milliseconds
    let max_retries = 1; // number retries

    Ok(AppConfig {
      base_url,
      expected_git_sha1,
      retry_interval_ms,
      max_retries,
    })
  }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
  // Initialize logging
  env_logger::init();

  let config = AppConfig::new()?;
  let url = format!("{}{}", config.base_url, META_JSONX_URL);

  info!("Checking if deployed site on this URL: {}", url);
  info!("...is based on this GIT_SHA1: {}", config.expected_git_sha1);

  if run_check(&config, &url).await {
    std::process::exit(0);
  } else {
    error!("Timeout. Error.");
    std::process::exit(-1);
  }
}

async fn check_site_version(
  url: &str,
  expected_git_sha1: &str,
) -> Result<bool, Box<dyn std::error::Error>> {
  let response_text = reqwest::get(url)
    .await?
    .text()
    .await?;

  let response_json: Value = serde_json::from_str(&response_text)?;

  if let Some(git_sha1) = response_json["GIT_SHA1"].as_str() {
    if git_sha1 == expected_git_sha1 {
      info!("✓ Deployed site is based on the expected commit. ✓");
      return Ok(true);
    } else {
      warn!(
                "⚠️ Deployed site is based on this commit: {} - expected: {}",
                git_sha1, expected_git_sha1
            );
    }
  }

  Ok(false)
}

async fn run_check(config: &AppConfig, url: &str) -> bool {
  for retries in 0..config.max_retries {
    match check_site_version(url, &config.expected_git_sha1).await {
      Ok(true) => return true,
      Ok(false) => {
        if retries == config.max_retries - 1 {
          break;
        }
        info!(
                    "Will retry check another {} times after waiting {} ms",
                    config.max_retries - retries - 1,
                    config.retry_interval_ms
                );
        delay_for(Duration::from_millis(config.retry_interval_ms)).await;
      }
      Err(err) => {
        error!("Error fetching from {} details: {:?}", url, err);
        break;
      }
    }
  }
  false
}
