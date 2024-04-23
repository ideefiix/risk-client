#!/bin/sh

# Ensure two arguments are provided
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <api_base_url> <base_url>"
    exit 1
fi

api_base_url="$1"
base_url="$2"
template_file=".env.prod.template"
output_file=".env.production"

# Check if the .env.production.template file exists
if [ ! -f "$template_file" ]; then
    echo "File $template_file not found!"
    exit 1
fi

# Replace placeholders using sed and write to the output file
sed "s#{{BASE_URL}}#$base_url#g; s#{{API_BASE_URL}}#$api_base_url#g" "$template_file" > "$output_file"

echo "Replacements made successfully and written to $output_file!"
