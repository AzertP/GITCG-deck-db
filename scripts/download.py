import os
import requests

# Read file names (URLs) from file.txt
file_path = "filenames.txt"
download_folder = "downloads"

# Ensure the download folder exists
os.makedirs(download_folder, exist_ok=True)

with open(file_path, "r") as file:
    urls = file.read().splitlines()

# Download each file
for url in urls:
    try:
        response = requests.get(f"https://gi.yatta.moe/assets/UI/gcg/{url}.png", stream=True)
        response.raise_for_status()  # Check if request was successful

        # Extract file name from URL
        file_name = f"downloads/actions/{url}.png"

        # Save the file
        with open(file_name, "wb") as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)

        print(f"Downloaded: {file_name}")
    except requests.exceptions.RequestException as e:
        print(f"Failed to download {url}: {e}")