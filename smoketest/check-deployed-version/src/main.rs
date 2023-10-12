use reqwest;
use std::env;
use std::time::Duration;

const BASE_URL: &str = "https://coolboard.fun";
const META_JSON_URL: &str = "/meta.json";

const EXPECTED_GIT_SHA1: &str = "GIT_SHA1";

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let base_url = env::var("CYPRESS_baseUrl").unwrap_or_else(|_| BASE_URL.to_string());
    println!("Checking if deployed site on this base url: {}", base_url);

    let url = format!("{}{}", base_url, META_JSON_URL);
    println!("Checking if deployed site on this url: {}", url);

    let expected_git_sha1 = env::var(EXPECTED_GIT_SHA1).unwrap_or("".to_string());
    println!("...is based on this GIT_SHA1: {}", expected_git_sha1);
    //let expected_git_sha1 = env::var(EXPECTED_GIT_SHA1)?;

    println!("Checking if deployed site on this url: {}", url);

    let int_time_ms = 1000; // retry period
    let no_retries = 5; // number retries

    if run_check(no_retries, &url, &expected_git_sha1, int_time_ms).await {
        std::process::exit(0);
    } else {
        eprintln!("Timeout. Error.");
        std::process::exit(-1);
    }
}

async fn check_site_version(url: &str, expected_git_sha1: &str) -> Result<bool, reqwest::Error> {
    let response_all = reqwest::get(url).await?;
    let response_text = response_all.text().await?;

    if let Ok(response_json) = serde_json::from_str::<serde_json::Value>(&response_text) {
        if let Some(git_sha1) = response_json["GIT_SHA1"].as_str() {
            if git_sha1 == expected_git_sha1 {
                println!("✓ Deployed site is based on the expected commit. ✓");
                return Ok(true);
            } else {
                eprintln!(
                    "⚠️ Deployed site is based on this commit: {} - expected: {}",
                    git_sha1, expected_git_sha1
                );
            }
        }
    }

    Ok(false)
}

async fn run_check(
    mut no_retries: i32,
    url: &str,
    expected_git_sha1: &str,
    int_time_ms: i32,
) -> bool {
    while no_retries > 0 {
        match check_site_version(url, expected_git_sha1).await {
            Ok(true) => return true,
            Ok(false) => {
                if no_retries == 1 {
                    break;
                }
                println!(
                    "Will retry check another {} times after waiting {} ms",
                    no_retries, int_time_ms
                );
                delay_for(Duration::from_millis(int_time_ms as u64)).await;
                no_retries -= 1;
            }
            Err(err) => {
                println!("Error fetching from {} details: {:?}", url, err);
                break;
            }
        }
    }
    false
}

async fn delay_for(duration: Duration) {
    tokio::time::sleep(duration).await;
}
