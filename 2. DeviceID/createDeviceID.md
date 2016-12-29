########################################################################################################################
#
# Creating a azure function to create a new device ID. 
#
# Steps:
# 1: Create local Azure Function environment
# 2: ....
#
########################################################################################################################


# 1] ###################################################################################################################
#
#  Running local Azure function (serverless computing).
#  Inspiration: https://blogs.msdn.microsoft.com/appserviceteam/2016/12/01/running-azure-functions-locally-with-the-cli/ 
#
########################################################################################################################

# Commands used to create a local Azure functions to create a device ID.
npm i -g azure-functions-cli

# Initialize & create local function. Make sure you are in the right directory
func Initialize
func new

# 2] ###################################################################################################################

# Get IoTHub Connection String
az iot hub show-connection-string --name troopcon-IoTHub




