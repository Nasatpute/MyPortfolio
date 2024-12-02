public  with sharing class Controller {

    @AuraEnabled(cacheable=true)
    public static List<Task_c__c> getTasksForUser() {
        User currentUser = [SELECT Id FROM User WHERE Id = :UserInfo.getUserId()];
        return [SELECT Id, Description__c, Status__c, OwnerId 
                FROM Task_c__c 
                WHERE OwnerId = :currentUser.Id];
    }

    @AuraEnabled
    public static Task_c__c createTask(Task_c__c Task) {
        insert Task;
        return Task;
    }

    @AuraEnabled
    public static void updateTaskStatus(Id taskId, String newStatus) {
        Task_c__c taskToUpdate = [SELECT Id, Status__c FROM Task_c__c WHERE Id = :taskId];
        taskToUpdate.Status__c = newStatus;
        update taskToUpdate;
    }

    @AuraEnabled
    public static void deleteTask(Id taskId) {
        delete [SELECT Id FROM Task_c__c WHERE Id = :taskId];
    }
}