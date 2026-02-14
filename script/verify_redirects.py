import argparse
import json
import sys
import time
import urllib.request
import urllib.error

def verify_redirects(input_file, base_url, delay):
    """
    Verifies that old URLs redirect to the expected new URLs.
    Input file format (JSON): {"/old/path": "/new/path", ...}
    """
    try:
        with open(input_file, 'r') as f:
            redirects = json.load(f)
    except Exception as e:
        print(f"Error reading input file: {e}")
        sys.exit(1)

    success_count = 0
    failure_count = 0

    print(f"Verifying {len(redirects)} redirects against {base_url}...")

    for old_path, expected_new_path in redirects.items():
        old_url = f"{base_url}{old_path}"
        # Ensure expected new path is absolute or relative to base? 
        # For simplicity, if it starts with /, we assume it's relative to domain root.
        expected_new_url = f"{base_url}{expected_new_path}" if expected_new_path.startswith('/') else expected_new_path

        try:
            req = urllib.request.Request(old_url, method='HEAD')
            # We want to check the redirect, but urllib follows them by default.
            # So we check the final URL.
            
            with urllib.request.urlopen(req) as response:
                final_url = response.geturl()
                # Normalize trailing slashes for comparison
                final_normalized = final_url.rstrip('/')
                expected_normalized = expected_new_url.rstrip('/')
                
                if final_normalized == expected_normalized:
                    print(f"[OK] {old_path} -> {final_url}")
                    success_count += 1
                else:
                    print(f"[FAIL] {old_path}")
                    print(f"  Expected: {expected_normalized}")
                    print(f"  Actual:   {final_normalized}")
                    failure_count += 1

        except urllib.error.HTTPError as e:
            print(f"[ERROR] {old_path} returned {e.code}")
            failure_count += 1
        except Exception as e:
            print(f"[ERROR] {old_path} - {e}")
            failure_count += 1
        
        if delay > 0:
            time.sleep(delay)

    print("\nSummary:")
    print(f"  Success: {success_count}")
    print(f"  Failure: {failure_count}")

    if failure_count > 0:
        sys.exit(1)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Verify URL redirects.")
    parser.add_argument("--input", required=True, help="JSON file containing old_path -> new_path mapping")
    parser.add_argument("--base-url", default="https://x157.github.io", help="Base URL of the site")
    parser.add_argument("--delay", type=float, default=0.1, help="Delay between requests in seconds")

    args = parser.parse_args()
    verify_redirects(args.input, args.base_url, args.delay)
