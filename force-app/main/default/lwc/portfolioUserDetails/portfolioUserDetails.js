import { LightningElement,api } from 'lwc';

export default class PortfolioUserDetails extends LightningElement {
    @api recordId
    @api objectApiName

    downloadResume(){
        window.open("https://github.com/Nasatpute/Nikhil-resume/raw/main/_Nikhil%20satpute.pdf","_blank")
    }
}