import { LightningElement,wire,track  } from 'lwc';
import getTasks from '@salesforce/apex/TaskControl.getTasksForUser';
import createTask from '@salesforce/apex/TaskControl.createTask';
import updateTask from '@salesforce/apex/TaskControl.updateTaskStatus';

export default class TaskManagement extends LightningElement {
    @track tasks = [];
    @track error;
    @track task = {};
    @track isModalOpen = false;
    @track isEdit = false;

    columns = [
        { label: 'Task Name', fieldName: 'Name' },
        { label: 'Description', fieldName: 'Description__c' },
        { label: 'Due Date', fieldName: 'Due_Date__c', type: 'date' },
        { label: 'Priority', fieldName: 'Priority__c' },
        { label: 'Status', fieldName: 'Status__c' },
        {
            type: 'action',
            typeAttributes: {
                rowActions: [
                    { label: 'Edit', name: 'edit' },
                    { label: 'Delete', name: 'delete' }
                ]
            }
        }
    ];
    @wire(getTasks)
    wiredTasks({ error, data }) {
        if (data) {
            this.tasks = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.tasks = [];
        }
    }
    handleNewTask() {
        this.isModalOpen = true;
        this.isEdit = false;
        this.task = {}; // Reset the task object
    }

    closeModal() {
        this.isModalOpen = false;
    }

    handleInputChange(event) {
        const field = event.target.dataset.field;
        this.task[field] = event.target.value;
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;

        if (actionName === 'edit') {
            this.isEdit = true;
            this.task = { ...row }; // Copy the row data to the task object
            this.isModalOpen = true;
        } else if (actionName === 'delete') {
            this.handleDeleteTask(row.Id);
        }
    }

    async handleSave() {
        try {
            if (this.isEdit) {
                await updateTask(this.task);
            } else {
                await createTask(this.task);
            }
            this.closeModal();
            return this.refreshTasks(); // Refresh the task list after save
        } catch (error) {
            this.error = error;
        }
    }

    async handleDeleteTask(taskId) {
        try {
            await deleteTask({ taskId }); // Assuming you have a deleteTask method in Apex
            return this.refreshTasks(); // Refresh the task list after deletion
        } catch (error) {
            this.error = error;
        }
    }

    refreshTasks() {
        return getTasksForCurrentUser ()
            .then((data) => {
                this.tasks = data;
                this.error = undefined;
            })
            .catch((error) => {
                this.error = error;
                this.tasks = [];
            });
    }

    
}