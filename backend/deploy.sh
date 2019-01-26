PROJECT=babbage-stable
gcloud app deploy backend.yaml --promote --quiet --version=live --project=$PROJECT
