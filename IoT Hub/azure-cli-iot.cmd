cls
Echo " Create an IoT Hub by using Azure Cross Platform Command Line"
Echo " https://docs.microsoft.com/nl-nl/azure/iot-hub/iot-hub-create-using-cli"
Echo
Echo " Run Azure CLI in docker container: "
Echo " docker run -it azuresdk/azure-cli-python:latest bash`"

Echo " Login in to azure"
az login
az account set --subscription edec7517-05b6-483f-908c-d708fb5f5f33
az provider register -namespace Microsoft.Devices

Echo " Create resource group"
az group create --name "troopcon-test-rg" --location westeu
az iot hub create --name "troopcon-iothub" --resource-group "troopcon-test-rg" --sku S1