ng build --prod
gcloud app deploy dist/frontend.yaml --promote --quiet --version=live --project=babbage-stable
# Copied so Jinja could access it. Get an error if it tires to pull from a static_dir.
cp dist/public/index.html dist/
