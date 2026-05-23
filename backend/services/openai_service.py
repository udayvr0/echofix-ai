import os

from openai import AzureOpenAI


def generate_completion(system_prompt, user_prompt):

    endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")
    api_key = os.getenv("AZURE_OPENAI_API_KEY")
    deployment = os.getenv("AZURE_OPENAI_DEPLOYMENT")

    if not endpoint or not api_key or not deployment:

        return """
        Azure OpenAI credentials are not configured yet.
        AI reasoning currently running in mock mode.
        """

    try:

        client = AzureOpenAI(
            api_key=api_key,
            api_version="2024-02-15-preview",
            azure_endpoint=endpoint
        )

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
            temperature=0.3,
            max_tokens=400
        )

        return response.choices[0].message.content

    except Exception as ex:

        print(f"Azure OpenAI Error: {str(ex)}")

        return """
        AI reasoning service temporarily unavailable.
        Fallback operational analysis activated.
        """