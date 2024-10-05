import { LightningElement,wire,api } from 'lwc';
import PortfolioAssets from '@salesforce/resourceUrl/PortfolioAssets'
import {getRecord, getFieldValue} from 'lightning/uiRecordApi'
import FULLNAME from '@salesforce/schema/Portfolio__c.FullName__c'
import COMPANY_LOCATION from '@salesforce/schema/Portfolio__c.CompanyLocation__c'
import COMPANY_NAME from '@salesforce/schema/Portfolio__c.CompanyName__c'
import DESIGNATION from '@salesforce/schema/Portfolio__c.Designation__c'

export default class PortfolioBanner extends LightningElement {

    @api recordId // = 'a00dL00000P5xilQAB'
    @api linkedinUrl //  = 'https://www.linkedin.com/in/nikhilasatpute'
    @api twitterUrl // = 'https://x.com/nikhilaksatpute'
    @api youtubeUrl
    @api githubUrl // = 'https://github.com/Nasatpute'
    @api trailheadUrl // = 'https://www.salesforce.com/trailblazer/amdit'
    @api blogUrl 


    userPic = `${PortfolioAssets}/PortfolioAssets/userpic.png`
    linkedin = `${PortfolioAssets}/PortfolioAssets/Social/linkedin.svg`
    github = `${PortfolioAssets}/PortfolioAssets/Social/github.svg`
    twitter = `${PortfolioAssets}/PortfolioAssets/Social/twitter.svg`
    trailhead = `${PortfolioAssets}/PortfolioAssets/Social/trailhead1.svg`
    blog = `${PortfolioAssets}/PortfolioAssets/Social/blogger.svg`
    youtube = `${PortfolioAssets}/PortfolioAssets/Social/youtube.svg`
    
    @wire(getRecord, {recordId:'$recordId', fields:[FULLNAME,COMPANY_LOCATION,COMPANY_NAME,DESIGNATION]})
    portfolioData

    get fullName(){
        return getFieldValue(this.portfolioData.data, FULLNAME)
    }
    get companyLocation(){
        return getFieldValue(this.portfolioData.data, COMPANY_LOCATION)
    }
    get companyName(){
        return getFieldValue(this.portfolioData.data, COMPANY_NAME)
    }
    get designation(){
        return getFieldValue(this.portfolioData.data, DESIGNATION)
    }
}