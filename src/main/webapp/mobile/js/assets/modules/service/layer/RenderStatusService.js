/**
 * Service class used for managing and tracking the status of the layer rendering
 * @class RenderStatusService
 * 
 */
allModules.service('RenderStatusService',['$rootScope','Constants','UtilitiesService',function ($rootScope,Constants,UtilitiesService) {
    
    this.renderStatus={};
    
    /**
     * @method getRenderStatus
     * @return renderStatus - a object that contains the status of the rendering
     */
    this.getRenderStatus = function(){
        return this.renderStatus; 
    };
    
    /**
     * Set the total number of request, used in progress bar
     * @method setMaxValue
     * @param layer - layer
     * @param maxValue - the max value used in progress bar
     */
    this.setMaxValue = function(layer,maxValue){
        if(UtilitiesService.isEmpty(this.renderStatus[layer.id])){
            this.renderStatus[layer.id]={};
        }
        this.renderStatus[layer.id].max=maxValue;
        this.renderStatus[layer.id].completed = 0;
        
        if(UtilitiesService.isEmpty(this.renderStatus.group)){
            this.renderStatus.group={};
            this.renderStatus.group[layer.group]={};
            this.renderStatus.group[layer.group].max=0;
            this.renderStatus.group[layer.group].current=0;
            this.renderStatus.group[layer.group].activeLayerCount = 0;
        }
        
        if(UtilitiesService.isEmpty(this.renderStatus.group[layer.group])){          
            this.renderStatus.group[layer.group]={};
            this.renderStatus.group[layer.group].max=0;
            this.renderStatus.group[layer.group].current=0;
            this.renderStatus.group[layer.group].activeLayerCount = 0;
        }
        
        this.renderStatus.group[layer.group].max += maxValue;
        this.renderStatus.group[layer.group].activeLayerCount += 1;
    };
    
    /**
     * capture and action on the status.update event.
     * @method onUpdate
     * @param $scope of the caller
     * @param callback - callback function
     */
    this.onUpdate = function ($scope, callback) {
        $scope.$on('status.update', function (evt,renderStatus) {
            callback(renderStatus);
          });
    };
    
    this.broadcast = function (renderStatus) {
        $rootScope.$broadcast('status.update', renderStatus);
    };
    
    /**
     * update the status of the rendering request
     * @method updateCompleteStatus
     * @param layer - the layer
     * @param resource - the resource
     * @param status - Constants.statusProgress
     */
    this.updateCompleteStatus = function(layer,resource,status){  
        if(UtilitiesService.isEmpty(this.renderStatus[layer.id])){
            this.renderStatus[layer.id]={};
        }
        if(UtilitiesService.isEmpty(this.renderStatus[layer.id].resources)){
            this.renderStatus[layer.id].resources = {};
        }
        this.renderStatus[layer.id].resources[resource.url] = resource;
        this.renderStatus[layer.id].resources[resource.url].status = status;
        if(status == Constants.statusProgress.COMPLETED || status == Constants.statusProgress.ERROR){
            this.renderStatus[layer.id].completed +=  1;
            this.renderStatus.group[layer.group].current += 1;
        };
        
        this.broadcast(this.renderStatus);
        
    };
    
    
    /**
     * Clear the status when there is not use for it anymore or removed of layer.
     * @method clearStatus
     * @param layerId - layerId
     */
    this.clearStatus = function(layer){
        this.renderStatus[layer.id] = {};
        this.renderStatus.group[layer.group].activeLayerCount -= 1;
    };
     
   
     
     
        
    
     
}]);