from openai import OpenAI
# BU FAYLDA OPENROUTER MODELLERI ISLEDILE BILER
client = OpenAI(
  base_url="https://openrouter.ai/api/v1",
  api_key="Enter your API key", # <-- HERE
)

completion = client.chat.completions.create(
  extra_headers={
    "HTTP-Referer": "<SITE_URL>", # This is left blank for now
    "X-Title": "<SITE_NAME>", 
  },
  extra_body={},
  model="google/gemma-3n-e2b-it:free",
  messages=[
    {
      "role": "user",
      "content": "Write a short poem about a tree."
    }
  ]
)
print(completion.choices[0].message.content)