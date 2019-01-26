ng build --prod
gcloud config configurations activate babbage
gcloud app deploy dist/frontend.yaml --promote --quiet --version=live
# Copied so Jinja could access it. Get an error if it tires to pull from a static_dir.
cp dist/public/index.html dist/
