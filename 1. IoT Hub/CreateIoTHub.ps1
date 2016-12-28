########################################################
#
#   Deploy IoT Hub via powershell
#   Inspiration: https://docs.microsoft.com/nl-nl/azure/iot-hub/iot-hub-rm-template-powershell
#
########################################################


# ***** Make sure you are running in the source directory!


#  Setting things up
########################################################

    #login to Azure
    Login-AzureRmAccount
    
    #Get required vars
    $configfile = "..\troopcontrol.config"
    Get-Content $configFile | Foreach-Object{
        $var = $_.Split('=')
        Write-Output "New Variable created: name ""$($var[0])"" with value ""$($var[1])""."
        New-Variable -Name $var[0] -Value $var[1] -ErrorAction SilentlyContinue
    }

#  Creating the beast
########################################################
    
    $location = "west europe"

    New-AzureRmResourceGroup -Name $rsgroup -Location $location
    New-AzureRmResourceGroupDeployment -ResourceGroupName $rsgroup -TemplateFile "azuredeploy.json" -hubName $IoTHubName 

