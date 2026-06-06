from azure.identity import DefaultAzureCredential
from azure.mgmt.web import WebSiteManagementClient

SUBSCRIPTION_ID = "d35d7276-b9bf-4471-b333-dd3a876c4820"

RESOURCE_GROUP = "echofix_alpha"

FUNCTION_APP_NAME = "ef-remed-fn"


def update_worker_count(worker_count: int):

    credential = DefaultAzureCredential()

    client = WebSiteManagementClient(
        credential,
        SUBSCRIPTION_ID
    )

    settings = client.web_apps.list_application_settings(
        RESOURCE_GROUP,
        FUNCTION_APP_NAME
    )

    settings.properties["WORKER_COUNT"] = str(worker_count)

    client.web_apps.update_application_settings(
        RESOURCE_GROUP,
        FUNCTION_APP_NAME,
        settings
    )

    return {
        "success": True,
        "worker_count": worker_count
    }