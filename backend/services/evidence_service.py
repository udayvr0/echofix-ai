from azure.identity import DefaultAzureCredential
from azure.mgmt.web import WebSiteManagementClient

SUBSCRIPTION_ID = "d35d7276-b9bf-4471-b333-dd3a876c4820"

RESOURCE_GROUP = "echofix_alpha"

FUNCTION_APP_NAME = "ef-remed-fn"


def get_worker_count():

    credential = DefaultAzureCredential()

    client = WebSiteManagementClient(
        credential,
        SUBSCRIPTION_ID
    )

    settings = client.web_apps.list_application_settings(
        RESOURCE_GROUP,
        FUNCTION_APP_NAME
    )

    return settings.properties.get(
        "WORKER_COUNT",
        "Unknown"
    )