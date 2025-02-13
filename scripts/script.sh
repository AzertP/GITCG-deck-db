for file in ./downloads/actions/*; do
  npx wrangler r2 object put gitcg-thumbnail/$(basename "$file") --file "$file"
    # echo "$(basename "$file")"
done