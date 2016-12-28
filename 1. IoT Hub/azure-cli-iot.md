
# Create an IoT Hub by using Azure Cross Platform Command Line"
# https://docs.microsoft.com/nl-nl/azure/iot-hub/iot-hub-create-using-cli"

# Run Azure CLI in docker container:  
docker run -it azuresdk/azure-cli-python:latest bash`

# Login  to azure
az login
az account set --subscription <id>
az provider register -namespace Microsoft.Devices

# Create Azure Resources. S1 for Azure IoT Hub
az group create --name <resource Group Name> --location <location>
az iot hub create --name <IoT Hub Name> --resource-group <resourceGroup Name> --sku <sku size>