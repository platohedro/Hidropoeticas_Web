#!/bin/bash

# Create previews directory if it doesn't exist
mkdir -p public/previews

# Function to generate preview from video
generate_preview() {
    local input_video="$1"
    local output_image="$2"
    
    # Extract first frame from video
    ffmpeg -i "$input_video" -ss 00:00:01 -vframes 1 -q:v 2 "$output_image"
    
    # Optimize the image
    if [ -f "$output_image" ]; then
        convert "$output_image" -resize 400x400^ -gravity center -extent 400x400 "$output_image"
        echo "Created preview: $output_image"
    fi
}

# Generate previews for each video
generate_preview "public/vidoes-rios/RIOQUILICHAOHOME.MOV" "public/rio-quilichao-preview.jpg"
generate_preview "public/vidoes-rios/RIODEOROHOME.mp4" "public/rio-de-oro-preview.jpg"
generate_preview "public /vidoes-rios/SANATAELENAHOME.MOV" "public//vistaprevia/Quebrada-Santaelena.png"
generate_preview "public/vidoes-rios/RIOSAMANAHOME.MOV" "public/rio-samana-preview.jpg"

echo "All previews have been generated in the public directory."
