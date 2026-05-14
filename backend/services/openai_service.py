import os

from openai import AzureOpenAI


def get_openai_client():

    api_key = os.getenv("AZURE_OPENAI_API_KEY")
    endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")

    if not api_key or not endpoint:
        return None

    return AzureOpenAI(
        api_key=api_key,
        api_version="2024-02-15-preview",
        azure_endpoint=endpoint
    )


def generate_completion(system_prompt, user_prompt):

    client = get_openai_client()

    if client is None:
        return """
Azure OpenAI credentials are not configured yet.
AI reasoning currently running in mock mode.
"""

    deployment = os.getenv("AZURE_OPENAI_DEPLOYMENT")

    response = client.chat.completions.create(
        model=deployment,
        messages=[
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": user_prompt
            }
        ],
        temperature=0.2,
        max_tokens=400
    )

    return response.choices[0].message.content